import { test, expect } from '@playwright/test';
import { Emotion } from '@/commons/constants/enum';

test.describe('일기 카드 라우팅 기능', () => {
  test.beforeEach(async ({ page }) => {
    const testDiaries = [
      {
        id: 1,
        title: '테스트 일기 1',
        content: '테스트 내용 1',
        emotion: Emotion.Happy,
        createdAt: '2024-03-12',
      },
      {
        id: 2,
        title: '테스트 일기 2',
        content: '테스트 내용 2',
        emotion: Emotion.Sad,
        createdAt: '2024-03-13',
      },
      {
        id: 3,
        title: '테스트 일기 3',
        content: '테스트 내용 3',
        emotion: Emotion.Angry,
        createdAt: '2024-03-14',
      },
    ];

    await page.context().addInitScript((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-page-loaded"]');
  });

  test('일기 카드 전체 영역 클릭 시 해당 일기 상세 페이지로 이동한다', async ({
    page,
  }) => {
    const firstCard = page
      .locator('[data-testid^="diary-card-"]')
      .first();

    const cardId = await firstCard.getAttribute('data-testid');
    const id = cardId?.replace('diary-card-', '');

    await firstCard.click();

    await expect(page).toHaveURL(`/diaries/${id}`);
  });

  test('일기 카드에 cursor: pointer 스타일이 적용되어 있다', async ({
    page,
  }) => {
    const firstCard = page
      .locator('[data-testid^="diary-card-"]')
      .first();

    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });

    expect(cursor).toBe('pointer');
  });

  test('여러 일기 카드를 클릭하면 각각의 id에 맞는 상세 페이지로 이동한다', async ({
    page,
  }) => {
    const cards = page.locator('[data-testid^="diary-card-"]');
    const count = await cards.count();

    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = cards.nth(i);
      const cardId = await card.getAttribute('data-testid');
      const id = cardId?.replace('diary-card-', '');

      await card.click();
      await expect(page).toHaveURL(`/diaries/${id}`);

      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page-loaded"]');
    }
  });
});
