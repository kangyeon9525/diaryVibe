import { test, expect } from "@playwright/test";

import { getDiaryDetailPath, staticPaths } from "@/commons/constants/url";

test.describe("commons layout 영역 노출", () => {
  test("일기 목록 경로에서는 헤더·배너·내비·푸터가 모두 보인다", async ({
    page,
  }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("commons-layout-root")).toBeVisible();

    await expect(page.getByTestId("layout-area-header")).toBeVisible();
    await expect(page.getByTestId("layout-header-logo-link")).toBeVisible();
    await expect(page.getByTestId("layout-area-banner")).toBeVisible();
    await expect(page.getByTestId("layout-area-navigation")).toBeVisible();
    await expect(page.getByTestId("layout-area-footer")).toBeVisible();
  });

  test("일기 상세 경로에서는 배너와 내비가 숨겨지고 헤더·푸터는 보인다", async ({
    page,
  }) => {
    const detailPath = getDiaryDetailPath("1");
    await page.goto(detailPath);
    await expect(page.getByTestId("commons-layout-root")).toBeVisible();
    await expect(page).toHaveURL(detailPath);

    await expect(page.getByTestId("layout-area-header")).toBeVisible();
    await expect(page.getByTestId("layout-header-logo-link")).toBeVisible();
    await expect(page.getByTestId("layout-area-banner")).toHaveCount(0);
    await expect(page.getByTestId("layout-area-navigation")).toHaveCount(0);
    await expect(page.getByTestId("layout-area-footer")).toBeVisible();
  });

  test.skip("/auth/login 은 프롬프트 조건에 따라 테스트하지 않음", async () => {
    /* 스킵 — /auth/login 경로 검증은 범위에서 제외 */
  });

  test.skip("/auth/signup 은 프롬프트 조건에 따라 테스트하지 않음", async () => {
    /* 스킵 — /auth/signup 경로 검증은 범위에서 제외 */
  });

  test.skip("/pictures 는 프롬프트 조건에 따라 테스트하지 않음", async () => {
    /* 스킵 — /pictures 경로 검증은 범위에서 제외 */
  });
});
