import { test, expect, type Response } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

const TEST_EMAIL = "a@c.com";
const TEST_PASSWORD = "1234qwer";

test.describe("auth-login 로그인 폼", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.authLogin);
    await expect(page.getByTestId("auth-login-page-loaded")).toBeVisible();
  });

  test("모든 인풋이 비어있을 때 로그인 버튼이 비활성화된다", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeDisabled();
  });

  test("이메일만 입력 시 로그인 버튼이 비활성화된다", async ({ page }) => {
    await page.getByTestId("auth-login-func-form-email").fill("a@b.com");
    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeDisabled();
  });

  test("이메일과 비밀번호가 유효하면 로그인 버튼이 활성화된다", async ({
    page,
  }) => {
    await page.getByTestId("auth-login-func-form-email").fill(TEST_EMAIL);
    await page.getByTestId("auth-login-func-form-password").fill(TEST_PASSWORD);

    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });
  });

  test("로그인 성공 시 accessToken·회원정보가 응답되고 완료 모달 후 일기 목록으로 이동한다", async ({
    page,
  }) => {
    await page.getByTestId("auth-login-func-form-email").fill(TEST_EMAIL);
    await page.getByTestId("auth-login-func-form-password").fill(TEST_PASSWORD);

    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });

    const graphqlPost = (res: Response) =>
      res.url().includes("main-practice.codebootcamp.co.kr/graphql") &&
      res.request().method() === "POST";

    await page.getByTestId("auth-login-func-form-submit").click();

    const loginRes = await page.waitForResponse(graphqlPost, { timeout: 1999 });
    const userRes = await page.waitForResponse(graphqlPost, { timeout: 1999 });

    expect(loginRes.ok()).toBeTruthy();
    expect(userRes.ok()).toBeTruthy();

    const loginJson = (await loginRes.json()) as {
      data?: { loginUser?: { accessToken?: string } };
      errors?: unknown[];
    };
    const userJson = (await userRes.json()) as {
      data?: { fetchUserLoggedIn?: { _id?: string; name?: string } };
      errors?: unknown[];
    };

    expect(loginJson.errors ?? []).toHaveLength(0);
    expect(loginJson.data?.loginUser?.accessToken).toEqual(expect.any(String));
    expect((loginJson.data?.loginUser?.accessToken ?? "").length).toBeGreaterThan(
      0,
    );

    expect(userJson.errors ?? []).toHaveLength(0);
    expect(userJson.data?.fetchUserLoggedIn?._id).toEqual(expect.any(String));
    expect(userJson.data?.fetchUserLoggedIn?.name).toEqual(expect.any(String));

    const storedAccessToken = await page.evaluate(() =>
      window.localStorage.getItem("accessToken"),
    );
    const storedUserRaw = await page.evaluate(() =>
      window.localStorage.getItem("user"),
    );
    expect(storedAccessToken).toEqual(loginJson.data?.loginUser?.accessToken);
    const storedUser = JSON.parse(storedUserRaw ?? "null") as {
      _id?: string;
      name?: string;
    };
    expect(storedUser._id).toEqual(userJson.data?.fetchUserLoggedIn?._id);
    expect(storedUser.name).toEqual(userJson.data?.fetchUserLoggedIn?.name);

    await expect(
      page.getByTestId("auth-login-func-form-success-modal"),
    ).toBeVisible();

    await page
      .getByTestId("auth-login-func-form-success-modal")
      .getByRole("button", { name: "확인" })
      .click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(staticPaths.diaries);
  });

  test("로그인 실패 시 실패 모달이 보인다", async ({ page }) => {
    await page.route(
      "**/main-practice.codebootcamp.co.kr/graphql",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [{ message: "테스트용 로그인 실패 응답" }],
          }),
        });
      },
    );

    await page.getByTestId("auth-login-func-form-email").fill(TEST_EMAIL);
    await page.getByTestId("auth-login-func-form-password").fill(TEST_PASSWORD);

    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });

    await page.getByTestId("auth-login-func-form-submit").click();

    await expect(
      page.getByTestId("auth-login-func-form-failure-modal"),
    ).toBeVisible({
      timeout: 1999,
    });

    await page
      .getByTestId("auth-login-func-form-failure-modal")
      .getByRole("button", { name: "확인" })
      .click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
