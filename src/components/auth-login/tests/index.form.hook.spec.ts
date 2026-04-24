import { test, expect, type Page } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

const TEST_EMAIL = "a@c.com";
const TEST_PASSWORD = "1234qwer";

const MOCK_ACCESS_TOKEN = "pw-e2e-mock-access-token";
const MOCK_USER_ID = "pw-e2e-mock-user-id";
const MOCK_USER_NAME = "플레이wright모킹";

async function mockSuccessfulLoginGraphql(page: Page) {
  await page.route(
    "**/main-practice.codebootcamp.co.kr/graphql",
    async (route) => {
      const raw = route.request().postData() ?? "";
      if (raw.includes("loginUser")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: { loginUser: { accessToken: MOCK_ACCESS_TOKEN } },
          }),
        });
        return;
      }
      if (raw.includes("fetchUserLoggedIn")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              fetchUserLoggedIn: {
                _id: MOCK_USER_ID,
                name: MOCK_USER_NAME,
              },
            },
          }),
        });
        return;
      }
      await route.continue();
    },
  );
}

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
    await mockSuccessfulLoginGraphql(page);

    await page.getByTestId("auth-login-func-form-email").fill(TEST_EMAIL);
    await page.getByTestId("auth-login-func-form-password").fill(TEST_PASSWORD);

    await expect(
      page.getByTestId("auth-login-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });

    await page.getByTestId("auth-login-func-form-submit").click();

    await expect(
      page.getByTestId("auth-login-func-form-success-modal"),
    ).toBeVisible();

    const storedAccessToken = await page.evaluate(() =>
      window.localStorage.getItem("accessToken"),
    );
    const storedUserRaw = await page.evaluate(() =>
      window.localStorage.getItem("user"),
    );
    expect(storedAccessToken).toBe(MOCK_ACCESS_TOKEN);
    const storedUser = JSON.parse(storedUserRaw ?? "null") as {
      _id?: string;
      name?: string;
    };
    expect(storedUser._id).toBe(MOCK_USER_ID);
    expect(storedUser.name).toBe(MOCK_USER_NAME);

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
