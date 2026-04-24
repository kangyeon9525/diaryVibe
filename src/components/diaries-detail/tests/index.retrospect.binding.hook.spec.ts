import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { getDiaryDetailPath } from "@/commons/constants/url";

const ASSERT_MS = 499;

const TEST_DIARIES = [
  {
    id: 1,
    title: "바인딩 테스트 일기 1",
    content: "본문 1",
    emotion: Emotion.Happy,
    createdAt: "2024-07-12T10:00:00.000Z",
  },
  {
    id: 2,
    title: "바인딩 테스트 일기 2",
    content: "본문 2",
    emotion: Emotion.Sad,
    createdAt: "2024-07-13T10:00:00.000Z",
  },
];

test.describe("diaries-detail 회고 목록 URL·로컬스토리지 바인딩", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ([diariesPayload, token, userPayload]) => {
        window.localStorage.setItem("diaries", diariesPayload);
        window.localStorage.setItem("accessToken", token);
        window.localStorage.setItem("user", userPayload);
      },
      [
        JSON.stringify(TEST_DIARIES),
        "e2e-access-token",
        JSON.stringify({ _id: "e2e-user", name: "E2E회원" }),
      ],
    );
  });

  test("URL의 일기 id와 diaryId가 같은 회고만 id 순으로 표시된다", async ({
    page,
  }) => {
    await page.addInitScript((retrospectsPayload) => {
      window.localStorage.setItem("retrospects", retrospectsPayload);
    }, JSON.stringify([
      {
        id: 1,
        content: "일기1 전용 회고 A",
        diaryId: 1,
        createdAt: "2024-08-01T12:00:00.000Z",
      },
      {
        id: 2,
        content: "일기2 전용 회고",
        diaryId: 2,
        createdAt: "2024-08-02T15:30:00.000Z",
      },
      {
        id: 3,
        content: "일기1 전용 회고 B",
        diaryId: 1,
        createdAt: "2024-08-03T09:00:00.000Z",
      },
    ]));

    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-container")).toBeVisible({
      timeout: ASSERT_MS,
    });

    await expect(
      page.getByTestId("diary-detail-retrospect-binding-content-1"),
    ).toHaveText("일기1 전용 회고 A", { timeout: ASSERT_MS });
    await expect(
      page.getByTestId("diary-detail-retrospect-binding-content-3"),
    ).toHaveText("일기1 전용 회고 B", { timeout: ASSERT_MS });

    await expect(
      page.getByTestId("diary-detail-retrospect-binding-date-1"),
    ).toHaveText("[2024. 08. 01]", { timeout: ASSERT_MS });
    await expect(
      page.getByTestId("diary-detail-retrospect-binding-date-3"),
    ).toHaveText("[2024. 08. 03]", { timeout: ASSERT_MS });

    await expect(
      page.getByTestId("diary-detail-retrospect-binding-content-2"),
    ).toHaveCount(0, { timeout: ASSERT_MS });

    await expect(
      page.getByTestId("diary-detail-retrospect-binding-item"),
    ).toHaveCount(2, { timeout: ASSERT_MS });
  });

  test("다른 일기 상세로 이동하면 해당 diaryId 회고만 보인다", async ({
    page,
  }) => {
    await page.addInitScript((retrospectsPayload) => {
      window.localStorage.setItem("retrospects", retrospectsPayload);
    }, JSON.stringify([
      {
        id: 1,
        content: "일기1 전용 회고 A",
        diaryId: 1,
        createdAt: "2024-08-01T12:00:00.000Z",
      },
      {
        id: 2,
        content: "일기2 전용 회고",
        diaryId: 2,
        createdAt: "2024-08-02T15:30:00.000Z",
      },
      {
        id: 3,
        content: "일기1 전용 회고 B",
        diaryId: 1,
        createdAt: "2024-08-03T09:00:00.000Z",
      },
    ]));

    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-container")).toBeVisible({
      timeout: ASSERT_MS,
    });
    await expect(
      page.getByTestId("diary-detail-retrospect-binding-item"),
    ).toHaveCount(2, { timeout: ASSERT_MS });

    await page.goto(getDiaryDetailPath(2));
    await expect(page.getByTestId("diary-detail-container")).toBeVisible({
      timeout: ASSERT_MS,
    });

    await expect(
      page.getByTestId("diary-detail-retrospect-binding-content-2"),
    ).toHaveText("일기2 전용 회고", { timeout: ASSERT_MS });
    await expect(
      page.getByTestId("diary-detail-retrospect-binding-item"),
    ).toHaveCount(1, { timeout: ASSERT_MS });
  });

  test("해당 일기에 맞는 회고가 없으면 목록 행이 없다", async ({ page }) => {
    await page.addInitScript(
      ([diariesPayload, retrospectsPayload, token, userPayload]) => {
        window.localStorage.setItem("diaries", diariesPayload);
        window.localStorage.setItem("retrospects", retrospectsPayload);
        window.localStorage.setItem("accessToken", token);
        window.localStorage.setItem("user", userPayload);
      },
      [
        JSON.stringify([
          {
            id: 1,
            title: "빈 목록 테스트",
            content: "본문",
            emotion: Emotion.Happy,
            createdAt: "2024-07-12T10:00:00.000Z",
          },
        ]),
        JSON.stringify([
          {
            id: 1,
            content: "다른 일기",
            diaryId: 99,
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ]),
        "e2e-access-token",
        JSON.stringify({ _id: "e2e-user", name: "E2E회원" }),
      ],
    );

    await page.goto(getDiaryDetailPath(1));
    await expect(page.getByTestId("diary-detail-container")).toBeVisible({
      timeout: ASSERT_MS,
    });

    await expect(
      page.getByTestId("diary-detail-retrospect-list"),
    ).toBeAttached({ timeout: ASSERT_MS });
    await expect(
      page.getByTestId("diary-detail-retrospect-binding-item"),
    ).toHaveCount(0, { timeout: ASSERT_MS });
  });
});
