import { test, expect } from "@playwright/test";

import { Emotion, getEmotionLabel } from "@/commons/constants/enum";
import { getDiaryDetailPath } from "@/commons/constants/url";

test.describe("diaries-detail 일기 수정 폼", () => {
  test.beforeEach(async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "수정 전 제목",
        content: "수정 전 본문입니다.",
        emotion: Emotion.Happy,
        createdAt: "2024-07-12T10:00:00.000Z",
      },
    ];

    await page.addInitScript(
      ([diariesPayload, token, userPayload]) => {
        window.localStorage.setItem("diaries", diariesPayload);
        window.localStorage.setItem("accessToken", token);
        window.localStorage.setItem("user", userPayload);
      },
      [
        JSON.stringify(testDiaries),
        "e2e-access-token",
        JSON.stringify({ _id: "e2e-user", name: "E2E회원" }),
      ],
    );
  });

  test("수정 버튼 후 편집 UI·회고 비활성·저장 시 상세 반영 및 뷰 복귀", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.getByTestId("diary-detail-update-enter").click();

    await expect(page.getByTestId("diary-detail-edit-mode")).toBeVisible();
    await expect(page.getByTestId("diary-detail-view-mode")).toHaveCount(0);

    const retrospectInput = page.getByTestId(
      "diary-detail-retrospect-func-form-content",
    );
    await expect(retrospectInput).toBeDisabled();

    await page
      .getByTestId(`diary-detail-update-emotion-${Emotion.Surprise}`)
      .click();
    await page.getByTestId("diary-detail-update-title").fill("수정된 제목");
    await page
      .getByTestId("diary-detail-update-content")
      .fill("수정된 본문입니다.");

    await page.getByTestId("diary-detail-update-submit").click();

    await expect(page.getByTestId("diary-detail-view-mode")).toBeVisible();
    await expect(page.getByTestId("diary-detail-edit-mode")).toHaveCount(0);

    await expect(page.getByTestId("diary-detail-title")).toHaveText(
      "수정된 제목",
    );
    await expect(page.getByTestId("diary-detail-content")).toHaveText(
      "수정된 본문입니다.",
    );
    await expect(page.getByTestId("diary-detail-emotion-text")).toHaveText(
      getEmotionLabel(Emotion.Surprise),
    );

    const raw = await page.evaluate(() =>
      window.localStorage.getItem("diaries"),
    );
    const list = JSON.parse(raw ?? "[]") as Array<{
      id: number;
      title: string;
      content: string;
      emotion: string;
    }>;
    expect(list[0].emotion).toBe(Emotion.Surprise);
    expect(list[0].title).toBe("수정된 제목");
    expect(list[0].content).toBe("수정된 본문입니다.");

    await expect(retrospectInput).toBeEnabled();
  });
});
