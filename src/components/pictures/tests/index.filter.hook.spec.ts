import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

test.describe("Pictures 강아지 사진 필터", () => {
  test.describe.configure({ timeout: 120000 });

  test.beforeAll("개발 서버 및 API 워밍업", async ({ browser }) => {
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
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.pictures);
    await expect(page.getByTestId("pictures-page-loaded")).toBeVisible();
  });

  test("필터에 따라 이미지 표시 크기(px)가 바뀐다", async ({ page }) => {
    const firstImg = page.getByTestId("picture-dog-0").locator("img");
    await expect(firstImg).toBeVisible({ timeout: 1900 });

    await expect(firstImg).toHaveAttribute("width", "640");
    await expect(firstImg).toHaveAttribute("height", "640");

    await page.getByTestId("picture-filter-select").getByRole("button").click();
    await page.getByRole("option", { name: "가로형" }).click();
    await expect(firstImg).toHaveAttribute("width", "640");
    await expect(firstImg).toHaveAttribute("height", "480");

    await page.getByTestId("picture-filter-select").getByRole("button").click();
    await page.getByRole("option", { name: "세로형" }).click();
    await expect(firstImg).toHaveAttribute("width", "480");
    await expect(firstImg).toHaveAttribute("height", "640");

    await page.getByTestId("picture-filter-select").getByRole("button").click();
    await page.getByRole("option", { name: "기본" }).click();
    await expect(firstImg).toHaveAttribute("width", "640");
    await expect(firstImg).toHaveAttribute("height", "640");
  });
});
