import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

const VALID_PASSWORD = "Abcd1234";
const VALID_NAME = "플레이wright";

test.describe("auth-signup 회원가입 폼", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.authSignup);
    await expect(page.getByTestId("auth-signup-page-loaded")).toBeVisible();
  });

  test("모든 인풋이 비어있을 때 회원가입 버튼이 비활성화된다", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("auth-signup-func-form-submit"),
    ).toBeDisabled();
  });

  test("이메일만 입력 시 회원가입 버튼이 비활성화된다", async ({ page }) => {
    await page.getByTestId("auth-signup-func-form-email").fill("a@b.com");
    await expect(
      page.getByTestId("auth-signup-func-form-submit"),
    ).toBeDisabled();
  });

  test("모든 인풋이 유효하면 회원가입 버튼이 활성화된다", async ({ page }) => {
    const email = `pw-${Date.now()}@example.com`;
    await page.getByTestId("auth-signup-func-form-email").fill(email);
    await page.getByTestId("auth-signup-func-form-password").fill(VALID_PASSWORD);
    await page
      .getByTestId("auth-signup-func-form-password-confirm")
      .fill(VALID_PASSWORD);
    await page.getByTestId("auth-signup-func-form-name").fill(VALID_NAME);

    await expect(
      page.getByTestId("auth-signup-func-form-submit"),
    ).toBeEnabled();
  });

  test("회원가입 성공 시 응답에 _id가 있고 가입완료 모달 후 로그인 페이지로 이동한다", async ({
    page,
  }) => {
    const email = `pw-${Date.now()}@example.com`;

    await page.getByTestId("auth-signup-func-form-email").fill(email);
    await page.getByTestId("auth-signup-func-form-password").fill(VALID_PASSWORD);
    await page
      .getByTestId("auth-signup-func-form-password-confirm")
      .fill(VALID_PASSWORD);
    await page.getByTestId("auth-signup-func-form-name").fill(VALID_NAME);

    await expect(
      page.getByTestId("auth-signup-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });

    const responsePromise = page.waitForResponse(
      (res) =>
        res.url().includes("main-practice.codebootcamp.co.kr/graphql") &&
        res.request().method() === "POST",
      { timeout: 1999 },
    );

    await page.getByTestId("auth-signup-func-form-submit").click();

    const graphqlResponse = await responsePromise;
    expect(graphqlResponse.ok()).toBeTruthy();

    const body = (await graphqlResponse.json()) as {
      data?: { createUser?: { _id?: string } };
      errors?: unknown[];
    };

    expect(body.errors ?? []).toHaveLength(0);
    expect(body.data?.createUser?._id).toEqual(expect.any(String));
    expect(body.data?.createUser?._id?.length).toBeGreaterThan(0);

    await expect(
      page.getByTestId("auth-signup-func-form-success-modal"),
    ).toBeVisible();

    await page
      .getByTestId("auth-signup-func-form-success-modal")
      .getByRole("button", { name: "확인" })
      .click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(staticPaths.authLogin);
  });

  test("회원가입 실패 시 가입실패 모달이 보인다", async ({ page }) => {
    await page.route(
      "**/main-practice.codebootcamp.co.kr/graphql",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            errors: [{ message: "테스트용 가입 실패 응답" }],
          }),
        });
      },
    );

    const email = `pw-${Date.now()}@example.com`;

    await page.getByTestId("auth-signup-func-form-email").fill(email);
    await page.getByTestId("auth-signup-func-form-password").fill(VALID_PASSWORD);
    await page
      .getByTestId("auth-signup-func-form-password-confirm")
      .fill(VALID_PASSWORD);
    await page.getByTestId("auth-signup-func-form-name").fill(VALID_NAME);

    await expect(
      page.getByTestId("auth-signup-func-form-submit"),
    ).toBeEnabled({
      timeout: 499,
    });

    await page.getByTestId("auth-signup-func-form-submit").click();

    await expect(
      page.getByTestId("auth-signup-func-form-failure-modal"),
    ).toBeVisible({
      timeout: 1999,
    });
  });
});
