import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { getDiaryDetailPath } from "@/commons/constants/url";

const RETROSPECT_TEXT = "플레이wright 회고 본문입니다.";

test.describe("diaries-detail 회고 등록 폼", () => {
  test.beforeEach(async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: "회고폼 테스트 일기",
        content: "회고폼 테스트 본문입니다.",
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

  test("일기 상세가 로드되면 제목이 보인다", async ({ page }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();
    await expect(page.getByTestId("diary-detail-title")).toHaveText(
      "회고폼 테스트 일기",
    );
  });

  test("회고 인풋이 비어 있으면 입력 버튼이 비활성화된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await expect(
      page.getByTestId("diary-detail-retrospect-func-form-submit"),
    ).toBeDisabled();
  });

  test("회고 인풋에 내용이 있으면 입력 버튼이 활성화된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page
      .getByTestId("diary-detail-retrospect-func-form-content")
      .fill(RETROSPECT_TEXT);

    await expect(
      page.getByTestId("diary-detail-retrospect-func-form-submit"),
    ).toBeEnabled({ timeout: 499 });
  });

  test("retrospects가 없을 때 등록하면 id 1·diaryId가 현재 일기로 저장된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.evaluate(() => localStorage.removeItem("retrospects"));

    await page
      .getByTestId("diary-detail-retrospect-func-form-content")
      .fill(RETROSPECT_TEXT);
    await page.getByTestId("diary-detail-retrospect-func-form-submit").click();

    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    const raw = await page.evaluate(() =>
      window.localStorage.getItem("retrospects"),
    );
    const list = JSON.parse(raw ?? "[]") as Array<{
      id: number;
      diaryId: number;
      content: string;
      createdAt: string;
    }>;

    expect(list).toHaveLength(1);
    expect(list[0].id).toBe(1);
    expect(list[0].diaryId).toBe(1);
    expect(list[0].content).toBe(RETROSPECT_TEXT);
    expect(list[0].createdAt).toEqual(expect.any(String));
  });

  test("기존 retrospects가 있으면 가장 큰 id+1로 추가된다", async ({
    page,
  }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.evaluate(() => {
      window.localStorage.setItem(
        "retrospects",
        JSON.stringify([
          {
            id: 4,
            content: "기존",
            diaryId: 2,
            createdAt: "2024-01-01T00:00:00.000Z",
          },
          {
            id: 9,
            content: "기존2",
            diaryId: 1,
            createdAt: "2024-01-02T00:00:00.000Z",
          },
        ]),
      );
    });

    await page
      .getByTestId("diary-detail-retrospect-func-form-content")
      .fill("새 회고");
    await page.getByTestId("diary-detail-retrospect-func-form-submit").click();

    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    const raw = await page.evaluate(() =>
      window.localStorage.getItem("retrospects"),
    );
    const list = JSON.parse(raw ?? "[]") as Array<{ id: number; content: string }>;

    expect(list).toHaveLength(3);
    expect(list.find((r) => r.content === "새 회고")?.id).toBe(10);
  });

  test("등록 완료 후 새로고침되어 목록에 회고가 보인다", async ({ page }) => {
    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-title")).toBeVisible();

    await page.evaluate(() => localStorage.removeItem("retrospects"));

    const unique = `회고-고유-${Date.now()}`;
    await page
      .getByTestId("diary-detail-retrospect-func-form-content")
      .fill(unique);
    await page.getByTestId("diary-detail-retrospect-func-form-submit").click();

    await expect(page.getByTestId("diary-detail-title")).toBeVisible();
    await expect(page.getByText(unique, { exact: true })).toBeVisible();
  });
});
