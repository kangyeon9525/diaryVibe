import { test, expect, type Page, type Response } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

const TEST_EMAIL = "a@c.com";
const TEST_PASSWORD = "1234qwer";

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

    await expect(page.getByTestId("auth-login-func-form-submit")).toBeEnabled({
      timeout: 499,
    });

    const graphqlPost = (res: Response) =>
      res.url().includes("main-practice.codebootcamp.co.kr/graphql") &&
      res.request().method() === "POST";

    await page.getByTestId("auth-login-func-form-submit").click();

    const loginRes = await page.waitForResponse(graphqlPost, {
      timeout: 1999,
    });
    const userRes = await page.waitForResponse(graphqlPost, {
      timeout: 1999,
    });

    expect(loginRes.ok()).toBeTruthy();
    expect(userRes.ok()).toBeTruthy();

    const userJson = (await userRes.json()) as {
      data?: { fetchUserLoggedIn?: { name?: string } };
    };
    const expectedName = userJson.data?.fetchUserLoggedIn?.name;
    expect(expectedName).toEqual(expect.any(String));

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
      expectedName as string,
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
