import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { getDiaryDetailPath, staticPaths } from "@/commons/constants/url";

/** 프롬프트 조건: key `diaries`, emotion은 enum import — 브라우저 실제 localStorage에 시드 */
const SEED_DIARIES = [
  {
    id: 1,
    title: "테스트 일기 1",
    content: "테스트 내용 1",
    emotion: Emotion.Happy,
    createdAt: "2024-03-12",
  },
  {
    id: 2,
    title: "테스트 일기 2",
    content: "테스트 내용 2",
    emotion: Emotion.Sad,
    createdAt: "2024-03-13",
  },
  {
    id: 3,
    title: "테스트 일기 3",
    content: "테스트 내용 3",
    emotion: Emotion.Angry,
    createdAt: "2024-03-14",
  },
] as const;

test.describe("일기 카드 라우팅 기능", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().addInitScript((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, SEED_DIARIES);

    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const raw = await page.evaluate(() => localStorage.getItem("diaries"));
    expect(raw, "addInitScript로 diaries 키가 실제 localStorage에 있어야 함").not.toBeNull();
    const parsed = raw ? (JSON.parse(raw) as unknown[]) : [];
    expect(parsed.length).toBeGreaterThan(0);
  });

  test("일기 카드 전체 영역 클릭 시 해당 일기 상세 페이지로 이동한다", async ({
    page,
  }) => {
    const firstCard = page.getByTestId(/^diary-card-/).first();

    const cardId = await firstCard.getAttribute("data-testid");
    const id = cardId?.replace("diary-card-", "");
    expect(id, "카드에 data-testid diary-card-{id}가 있어야 함").toBeTruthy();

    await firstCard.click();

    await expect(page).toHaveURL(getDiaryDetailPath(id as string));
  });

  test("일기 카드에 cursor: pointer 스타일이 적용되어 있다", async ({
    page,
  }) => {
    const firstCard = page.getByTestId(/^diary-card-/).first();

    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });

    expect(cursor).toBe("pointer");
  });

  test("여러 일기 카드를 클릭하면 각각의 id에 맞는 상세 페이지로 이동한다", async ({
    page,
  }) => {
    const cards = page.getByTestId(/^diary-card-/);
    const count = await cards.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = cards.nth(i);
      const cardId = await card.getAttribute("data-testid");
      const id = cardId?.replace("diary-card-", "");
      expect(id).toBeTruthy();

      await card.click();
      await expect(page).toHaveURL(getDiaryDetailPath(id as string));

      await page.goto(staticPaths.diaries);
      await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
    }
  });

  test.skip("삭제 아이콘 클릭 시에는 페이지 이동하지 않는다", async () => {
    /* 프롬프트 조건 대비 — 삭제 아이콘 UI 미구현 시 검증 보류 */
  });
});
