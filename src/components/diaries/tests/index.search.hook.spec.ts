import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

test.describe("Diaries 일기 검색 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
  });

  test("검색어가 없을 때 돋보기 버튼이 비활성화되고, 입력 후 엔터로 제목 검색이 동작해야 한다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 1,
        title: "행복한 하루",
        content: "내용1",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 2,
        title: "슬픈 하루",
        content: "내용2",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const submit = page.getByTestId("diaries-search-submit");
    const input = page.getByTestId("diaries-search-input");

    await expect(submit).toBeDisabled();

    await input.fill("행복");
    await expect(submit).toBeEnabled();

    await input.press("Enter");

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(1);
    await expect(page.getByTestId("diary-card-1")).toBeVisible();
    await expect(page.getByTestId("diary-card-1-title")).toContainText("행복한 하루");

    await input.clear();
    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(2);
  });

  test("돋보기 버튼 클릭 시 로컬스토리지 diaries 기준으로 제목이 검색어를 포함하는 카드만 보여야 한다", async ({
    page,
  }) => {
    const testDiaries = [
      {
        id: 10,
        title: "운동 일기",
        content: "c",
        emotion: Emotion.Happy,
        createdAt: "2024-03-15T10:30:00.000Z",
      },
      {
        id: 20,
        title: "독서 노트",
        content: "c",
        emotion: Emotion.Sad,
        createdAt: "2024-03-14T09:20:00.000Z",
      },
    ];

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, testDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.getByTestId("diaries-search-input").fill("독서");
    await page.getByTestId("diaries-search-submit").click();

    await expect(page.getByTestId(/^diary-card-\d+$/)).toHaveCount(1);
    await expect(page.getByTestId("diary-card-20")).toBeVisible();
    await expect(page.getByTestId("diary-card-20-title")).toContainText("독서 노트");
  });
});
