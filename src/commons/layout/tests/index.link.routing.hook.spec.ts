import { test, expect } from "@playwright/test";

import { getDiaryDetailPath, staticPaths } from "@/commons/constants/url";

test.describe("commons layout 링크·라우팅", () => {
  test("루트 접속 시 일기 목록 경로로 이동한다", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(staticPaths.diaries);
    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();

    const diariesTab = page.getByTestId("layout-nav-diaries");
    await expect(diariesTab).toHaveAttribute("data-active", "true");
  });

  test("사진보관함에서 일기 탭 클릭 시 일기 목록으로 이동하고 탭 활성 상태가 반영된다", async ({
    page,
  }) => {
    await page.goto(staticPaths.pictures);
    await expect(page.getByTestId("commons-layout-root")).toBeVisible();

    const diariesTab = page.getByTestId("layout-nav-diaries");
    await expect(diariesTab).toHaveAttribute("data-active", "false");

    await diariesTab.click({ force: true });
    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();

    await expect(page).toHaveURL(staticPaths.diaries);
    await expect(diariesTab).toHaveAttribute("data-active", "true");
  });

  test("일기 상세 경로에서는 url.ts 기준 내비가 렌더되지 않는다", async ({ page }) => {
    const detailPath = getDiaryDetailPath("1");
    await page.goto(detailPath);
    await expect(page.getByTestId("commons-layout-root")).toBeVisible();
    await expect(page).toHaveURL(detailPath);

    await expect(page.getByTestId("layout-area-navigation")).toHaveCount(0);
  });

  test("헤더 로고 클릭 시 일기 목록 경로로 이동한다", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("commons-layout-root")).toBeVisible();

    await page.getByTestId("layout-header-logo-link").click();
    await expect(page.getByTestId("commons-page-diaries")).toBeVisible();

    await expect(page).toHaveURL(staticPaths.diaries);
  });

  test.skip("/pictures 는 프롬프트 조건에 따라 테스트하지 않음", async () => {
    /* 스킵 전용 플레이스홀더 — 사진보관함 경로 검증은 범위에서 제외 */
  });
});
