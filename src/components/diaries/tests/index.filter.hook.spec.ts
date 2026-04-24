import { test, expect } from "@playwright/test";

import { Emotion, getEmotionLabel } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

test.describe("Diaries 일기 감정 필터", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
  });

  test("필터 메뉴는 전체·4가지 감정 라벨과 일치하고, 선택 시 해당 감정 카드만 보인다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 1,
        title: "A일기",
        content: "a",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 2,
        title: "B일기",
        content: "b",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
      {
        id: 3,
        title: "C일기",
        content: "c",
        emotion: Emotion.Angry,
        createdAt: "2024-03-13T08:10:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const filter = page.getByTestId("diaries-emotion-filter");
    await filter.getByRole("button").click();

    await expect(
      page.getByRole("option", { name: "전체", exact: true }),
    ).toBeVisible();
    for (const e of [Emotion.Happy, Emotion.Sad, Emotion.Surprise, Emotion.Angry] as const) {
      await expect(
        page.getByRole("option", { name: getEmotionLabel(e), exact: true }),
      ).toBeVisible();
    }

    await page.getByRole("option", { name: "전체" }).click();
    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(3);

    await filter.getByRole("button").click();
    await page
      .getByRole("option", { name: getEmotionLabel(Emotion.Happy), exact: true })
      .click();
    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(1);
    await expect(page.getByTestId("diary-card-1")).toBeVisible();
    await expect(page.getByTestId("diary-card-1-emotion")).toHaveText(
      getEmotionLabel(Emotion.Happy),
    );

    await filter.getByRole("button").click();
    await page
      .getByRole("option", { name: getEmotionLabel(Emotion.Sad), exact: true })
      .click();
    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(1);
    await expect(page.getByTestId("diary-card-2-emotion")).toHaveText(
      getEmotionLabel(Emotion.Sad),
    );
  });

  test("검색 후 필터를 바꾸면 검색된 목록에서 감정이 일치하는 카드만 보인다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 10,
        title: "행복 키워드",
        content: "c",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 20,
        title: "행복 다른",
        content: "c",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
      {
        id: 30,
        title: "둘다 제외",
        content: "c",
        emotion: Emotion.Surprise,
        createdAt: "2024-03-12T01:00:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.getByTestId("diaries-search-input").fill("행복");
    await page.getByTestId("diaries-search-submit").click();
    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(2);

    const filter = page.getByTestId("diaries-emotion-filter");
    await filter.getByRole("button").click();
    await page
      .getByRole("option", { name: getEmotionLabel(Emotion.Happy), exact: true })
      .click();

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(1);
    await expect(page.getByTestId("diary-card-10")).toBeVisible();
    await expect(page.getByTestId("diary-card-10-emotion")).toHaveText(
      getEmotionLabel(Emotion.Happy),
    );
  });
});
