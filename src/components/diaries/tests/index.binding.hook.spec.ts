import { test, expect } from "@playwright/test";

import { Emotion, getEmotionLabel } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

test.describe("Diaries 데이터 바인딩 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
  });

  test("로컬스토리지의 일기 데이터가 화면에 올바르게 표시되어야 한다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 1,
        title: "행복한 하루",
        content: "오늘은 정말 좋은 일이 있었다.",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 2,
        title: "슬픈 하루",
        content: "오늘은 슬픈 일이 있었다.",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
      {
        id: 3,
        title: "화난 하루",
        content: "오늘은 화가 났다.",
        emotion: Emotion.Angry,
        createdAt: "2024-03-13T15:45:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await expect(page.getByTestId("diary-card-1")).toBeVisible();
    await expect(page.getByTestId("diary-card-2")).toBeVisible();
    await expect(page.getByTestId("diary-card-3")).toBeVisible();

    await expect(page.getByTestId("diary-card-1-emotion")).toContainText(
      "행복해요",
    );
    await expect(page.getByTestId("diary-card-2-emotion")).toContainText(
      "슬퍼요",
    );
    await expect(page.getByTestId("diary-card-3-emotion")).toContainText(
      "화나요",
    );

    await expect(page.getByTestId("diary-card-1-title")).toContainText(
      "행복한 하루",
    );
    await expect(page.getByTestId("diary-card-2-title")).toContainText(
      "슬픈 하루",
    );
    await expect(page.getByTestId("diary-card-3-title")).toContainText(
      "화난 하루",
    );
  });

  test("로컬스토리지에 데이터가 없으면 빈 화면을 표시해야 한다", async ({
    page,
  }) => {
    await page.evaluate(() => {
      localStorage.removeItem("diaries");
    });

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const cards = page.getByTestId(/^diary-card-\d+$/);
    await expect(cards).toHaveCount(0);
  });

  test("제목이 길면 말줄임표로 표시되어야 한다", async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title:
          "매우 긴 제목입니다. 이 제목은 카드 영역을 넘어가기 때문에 말줄임표로 표시되어야 합니다. 계속해서 더 긴 텍스트를 추가합니다.",
        content: "내용",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const titleElement = page.getByTestId("diary-card-1-title");

    await expect(titleElement).toBeVisible();
    await expect(titleElement).toHaveCSS("overflow", "hidden");
    await expect(titleElement).toHaveCSS("text-overflow", "ellipsis");
    await expect(titleElement).toHaveCSS("white-space", "nowrap");

    const titleBox = await titleElement.boundingBox();
    expect(titleBox?.height).toBeLessThanOrEqual(24);
  });

  test("날짜가 올바른 형식으로 표시되어야 한다", async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "테스트 일기",
        content: "내용",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const dateElement = page.getByTestId("diary-card-1-date");

    const dateText = await dateElement.textContent();
    expect(dateText).toMatch(/\d{4}\.\s*\d{2}\.\s*\d{2}/);
  });

  test("감정에 따라 올바른 이미지가 표시되어야 한다", async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "행복",
        content: "내용",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 2,
        title: "슬픔",
        content: "내용",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const image1 = page
      .getByTestId("diary-card-1-image")
      .getByRole("img", { name: getEmotionLabel(Emotion.Happy) });
    const src1 = await image1.getAttribute("src");
    expect(src1).toContain("emotion-happy-m");

    const image2 = page
      .getByTestId("diary-card-2-image")
      .getByRole("img", { name: getEmotionLabel(Emotion.Sad) });
    const src2 = await image2.getAttribute("src");
    expect(src2).toContain("emotion-sad-m");
  });

  test("여러 감정 타입의 일기가 모두 올바르게 표시되어야 한다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 1,
        title: "행복",
        content: "내용",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 2,
        title: "슬픔",
        content: "내용",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
      {
        id: 3,
        title: "화남",
        content: "내용",
        emotion: Emotion.Angry,
        createdAt: "2024-03-13T15:45:00.000Z",
      },
      {
        id: 4,
        title: "놀람",
        content: "내용",
        emotion: Emotion.Surprise,
        createdAt: "2024-03-12T11:00:00.000Z",
      },
      {
        id: 5,
        title: "기타",
        content: "내용",
        emotion: Emotion.Etc,
        createdAt: "2024-03-11T14:30:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await expect(page.getByTestId("diary-card-1")).toBeVisible();
    await expect(page.getByTestId("diary-card-2")).toBeVisible();
    await expect(page.getByTestId("diary-card-3")).toBeVisible();
    await expect(page.getByTestId("diary-card-4")).toBeVisible();
    await expect(page.getByTestId("diary-card-5")).toBeVisible();

    await expect(page.getByTestId("diary-card-1-emotion")).toContainText(
      "행복해요",
    );
    await expect(page.getByTestId("diary-card-2-emotion")).toContainText(
      "슬퍼요",
    );
    await expect(page.getByTestId("diary-card-3-emotion")).toContainText(
      "화나요",
    );
    await expect(page.getByTestId("diary-card-4-emotion")).toContainText(
      "놀랐어요",
    );
    await expect(page.getByTestId("diary-card-5-emotion")).toContainText("기타");
  });
});
