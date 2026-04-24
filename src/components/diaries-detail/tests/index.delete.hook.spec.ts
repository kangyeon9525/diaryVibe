import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { getDiaryDetailPath, staticPaths } from "@/commons/constants/url";

test.describe("diaries-detail 일기 삭제", () => {
  test.beforeEach(async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "삭제 테스트 제목",
        content: "삭제 테스트 본문입니다.",
        emotion: Emotion.Happy,
        createdAt: "2024-07-12T10:00:00.000Z",
      },
      {
        id: 2,
        title: "유지될 일기",
        content: "이 일기는 남습니다.",
        emotion: Emotion.Sad,
        createdAt: "2024-07-13T10:00:00.000Z",
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

  test("삭제 버튼 후 모달에서 취소 시 모달만 닫히고 데이터·경로 유지", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.getByTestId("diary-detail-delete-open").click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByTestId("diary-detail-delete-modal"),
    ).toBeVisible();

    await dialog.getByRole("button", { name: "취소" }).click();
    await expect(page.getByTestId("diary-detail-delete-modal")).toHaveCount(0);
    await expect(page.getByTestId("diary-detail-title")).toHaveText(
      "삭제 테스트 제목",
    );

    const raw = await page.evaluate(() =>
      window.localStorage.getItem("diaries"),
    );
    const list = JSON.parse(raw ?? "[]") as Array<{ id: number }>;
    expect(list.map((d) => d.id).sort()).toEqual([1, 2]);
    expect(page.url()).toContain(getDiaryDetailPath(1));
  });

  test("삭제 버튼 후 모달에서 삭제 시 스토리지에서 제거되고 일기 목록으로 이동", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.getByTestId("diary-detail-delete-open").click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByTestId("diary-detail-delete-modal"),
    ).toBeVisible();

    await dialog.getByRole("button", { name: "삭제" }).click();

    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const raw = await page.evaluate(() =>
      window.localStorage.getItem("diaries"),
    );
    const list = JSON.parse(raw ?? "[]") as Array<{
      id: number;
      title: string;
    }>;
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe(2);
    expect(list[0].title).toBe("유지될 일기");
    expect(page.url()).toContain(staticPaths.diaries);
  });
});
