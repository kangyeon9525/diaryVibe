import { test, expect } from "@playwright/test";

import { Emotion, getEmotionLabel } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

function buildDiaries(
  count: number,
  startId: number,
  titleForIndex: (id: number) => string,
  emotionForIndex: (id: number) => Emotion,
) {
  return Array.from({ length: count }, (_, i) => {
    const n = startId + i;
    return {
      id: n,
      title: titleForIndex(n),
      content: "c",
      emotion: emotionForIndex(n),
      createdAt: `2024-03-${String((n % 28) + 1).padStart(2, "0")}T10:00:00.000Z`,
    };
  });
}

test.describe("Diaries 일기 페이지네이션", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
  });

  test("페이지당 12개 카드, 번호 1~5 노출 후 페이지 클릭 시 해당 구간 목록이 보인다", async ({
    page,
  }) => {
    const testDiaries = buildDiaries(
      60,
      1,
      (n) => `목록-${String(n).padStart(2, "0")}`,
      () => Emotion.Happy,
    );

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(12);

    const nav = page.getByRole("navigation", { name: "페이지네이션" });
    for (const p of [1, 2, 3, 4, 5] as const) {
      await expect(nav.getByRole("button", { name: `${p}페이지` })).toBeVisible();
    }

    await nav.getByRole("button", { name: "2페이지" }).click();

    await expect(page.getByTestId("diary-card-13")).toBeVisible();
    await expect(page.getByTestId("diary-card-13-title")).toContainText("목록-13");
    await expect(page.getByTestId("diary-card-1")).toHaveCount(0);
  });

  test("검색 시 결과 개수에 맞게 페이지 수가 줄어든다", async ({ page }) => {
    const testDiaries = [
      ...buildDiaries(12, 1, (n) => `검색A-${n}`, () => Emotion.Happy),
      ...buildDiaries(12, 13, (n) => `검색B-${n}`, () => Emotion.Sad),
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const nav = page.getByRole("navigation", { name: "페이지네이션" });
    await expect(nav.getByRole("button", { name: "2페이지" })).toBeVisible();

    await page.getByTestId("diaries-search-input").fill("검색A");
    await page.getByTestId("diaries-search-submit").click();

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(12);
    await expect(nav.getByRole("button", { name: "1페이지" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "2페이지" })).toHaveCount(0);
  });

  test("필터 선택 시 감정에 맞는 카드만 남고 페이지 수가 바뀐다", async ({
    page,
  }) => {
    const testDiaries = [
      ...buildDiaries(12, 1, (n) => `필터-${n}`, () => Emotion.Happy),
      ...buildDiaries(12, 13, (n) => `필터-${n}`, () => Emotion.Sad),
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const nav = page.getByRole("navigation", { name: "페이지네이션" });
    await expect(nav.getByRole("button", { name: "2페이지" })).toBeVisible();

    const filter = page.getByTestId("diaries-emotion-filter");
    await filter.getByRole("button").click();
    await page
      .getByRole("option", { name: getEmotionLabel(Emotion.Sad), exact: true })
      .click();

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(12);
    await expect(nav.getByRole("button", { name: "1페이지" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "2페이지" })).toHaveCount(0);
    await expect(page.getByTestId("diary-card-13-emotion")).toHaveText(
      getEmotionLabel(Emotion.Sad),
    );
  });
});
