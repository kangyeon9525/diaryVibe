import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

test.describe("Pictures 강아지 사진 바인딩", () => {
  test.describe("성공 및 무한 스크롤", () => {
    test.beforeAll(async ({ browser }) => {
      const page = await browser.newPage();
      try {
        await page.goto(staticPaths.pictures);
        await expect(page.getByTestId("pictures-page-loaded")).toBeVisible();
        await expect(page.getByTestId("picture-dog-0")).toBeVisible({
          timeout: 60000,
        });
      } finally {
        await page.close();
      }
    }, { timeout: 120000 });

    test.beforeEach(async ({ page }) => {
      await page.goto(staticPaths.pictures);
      await expect(page.getByTestId("pictures-page-loaded")).toBeVisible();
    });

    test("조회 성공 시 dog.ceo 이미지 주소가 노출되어야 한다", async ({
      page,
    }) => {
      const firstDog = page.getByTestId("picture-dog-0").locator("img");
      await expect(firstDog).toBeVisible({ timeout: 1900 });
      await expect(firstDog).toHaveAttribute("src", /dog\.ceo/i, {
        timeout: 1900,
      });
    });

    test("스크롤 시 추가 강아지 이미지가 로드되어야 한다", async ({ page }) => {
      await expect(page.getByTestId("picture-dog-5")).toBeVisible({
        timeout: 1900,
      });
      await expect(page.getByTestId(/^picture-dog-\d+$/)).toHaveCount(6);

      await page
        .getByTestId("pictures-infinite-sentinel")
        .scrollIntoViewIfNeeded();

      await expect(page.getByTestId("picture-dog-6")).toBeVisible({
        timeout: 1900,
      });
      const after = page.getByTestId(/^picture-dog-\d+$/);
      await expect(after).not.toHaveCount(6);
    });
  });

  test("조회 실패 시 오류 안내가 보여야 한다", async ({ page }) => {
    await page.route(
      "https://dog.ceo/api/breeds/image/random/6",
      async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: "{}",
        });
      },
    );

    await page.goto(staticPaths.pictures);
    await expect(page.getByTestId("pictures-page-loaded")).toBeVisible();
    await expect(page.getByTestId("pictures-fetch-error")).toBeVisible({
      timeout: 1900,
    });
  });
});
