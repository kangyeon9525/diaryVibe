import { test, expect } from "@playwright/test";

import { Emotion, getEmotionLabel } from "@/commons/constants/enum";
import { getDiaryDetailPath } from "@/commons/constants/url";

test.describe("diaries-detail 일기 상세 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "첫 번째 일기 제목",
        content: "첫 번째 일기 내용입니다.",
        emotion: Emotion.Happy,
        createdAt: "2024-07-12T10:00:00.000Z",
      },
      {
        id: 2,
        title: "두 번째 일기 제목",
        content: "두 번째 일기 내용입니다.",
        emotion: Emotion.Sad,
        createdAt: "2024-07-13T15:30:00.000Z",
      },
      {
        id: 3,
        title: "세 번째 일기 제목",
        content: "세 번째 일기 내용입니다.",
        emotion: Emotion.Angry,
        createdAt: "2024-07-14T20:45:00.000Z",
      },
    ];

    await page.addInitScript((payload: string) => {
      localStorage.setItem("diaries", payload);
    }, JSON.stringify(testDiaries));
  });

  test("라우트 id와 일치하는 일기 제목·내용·감정 텍스트가 표시된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await expect(page.getByTestId("diary-detail-title")).toHaveText(
      "첫 번째 일기 제목",
    );
    await expect(page.getByTestId("diary-detail-content")).toHaveText(
      "첫 번째 일기 내용입니다.",
    );
    await expect(page.getByTestId("diary-detail-emotion-text")).toHaveText(
      getEmotionLabel(Emotion.Happy),
    );
  });

  test("다른 id 경로에서는 해당 일기 데이터가 표시된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(2));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await expect(page.getByTestId("diary-detail-title")).toHaveText(
      "두 번째 일기 제목",
    );
    await expect(page.getByTestId("diary-detail-content")).toHaveText(
      "두 번째 일기 내용입니다.",
    );
    await expect(page.getByTestId("diary-detail-emotion-text")).toHaveText(
      getEmotionLabel(Emotion.Sad),
    );
  });

  test("감정 이미지 src에 해당 emotion 아이콘 파일명이 포함된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(3));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    const emotionImage = page.getByTestId("diary-detail-emotion-image");
    await expect(emotionImage).toHaveAttribute("src", /emotion-angry-s/);
  });

  test("작성일이 YYYY. MM. DD 형태로 표시된다", async ({ page }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    const dateText = page.getByTestId("diary-detail-date");
    await expect(dateText).toHaveText(/2024\. \d{2}\. \d{2}/);
  });

  test("존재하지 않는 id면 안내 문구가 표시된다", async ({ page }) => {
    await page.goto(getDiaryDetailPath(999));
    await expect(page.getByTestId("diary-detail-not-found")).toBeVisible();
    await expect(page.getByTestId("diary-detail-not-found")).toHaveText(
      "일기를 찾을 수 없습니다.",
    );
  });
});
