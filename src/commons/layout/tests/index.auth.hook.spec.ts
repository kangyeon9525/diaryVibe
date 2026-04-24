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

async function clearAuthStorage(page: Page) {
  await page.evaluate(() => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("user");
  });
}

test.describe("commons layout 인증 표시", () => {
  test("비로그인: 일기 목록에서 로그인 버튼이 보이고 클릭 시 로그인 페이지로 이동한다", async ({
    page,
  }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();

    const loginBtn = page.getByTestId("layout-header-login-button");
    await expect(loginBtn).toBeVisible();

    await loginBtn.click();
    await expect(page).toHaveURL(staticPaths.authLogin);
    await expect(page.getByTestId("auth-login-page-loaded")).toBeVisible();
  });

  test("로그인 후 헤더에 이름·로그아웃이 보이고, 로그아웃 후 비로그인 헤더로 돌아간다", async ({
    page,
  }) => {
    await page.goto(staticPaths.authLogin);
    await clearAuthStorage(page);
    await page.reload();
    await expect(page.getByTestId("auth-login-page-loaded")).toBeVisible();

    await page.getByTestId("auth-login-func-form-email").fill(TEST_EMAIL);
    await page.getByTestId("auth-login-func-form-password").fill(TEST_PASSWORD);

    await mockSuccessfulLoginGraphql(page);

    await expect(page.getByTestId("auth-login-func-form-submit")).toBeEnabled({
      timeout: 499,
    });

    await page.getByTestId("auth-login-func-form-submit").click();

    const expectedName = MOCK_USER_NAME;

    await expect(
      page.getByTestId("auth-login-func-form-success-modal"),
    ).toBeVisible();

    await page
      .getByTestId("auth-login-func-form-success-modal")
      .getByRole("button", { name: "확인" })
      .click();

    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();
    await expect(page).toHaveURL(staticPaths.diaries);

    await expect(page.getByTestId("layout-header-user-name")).toHaveText(
      expectedName,
    );
    await expect(page.getByTestId("layout-header-logout-button")).toBeVisible();

    await page.getByTestId("layout-header-logout-button").click();
    await expect(page).toHaveURL(staticPaths.authLogin);
    await expect(page.getByTestId("auth-login-page-loaded")).toBeVisible();

    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();
    await expect(page.getByTestId("layout-header-login-button")).toBeVisible();
  });
});
