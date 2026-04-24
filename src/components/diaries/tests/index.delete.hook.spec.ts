import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

type WindowAuthTestFlags = Window & {
  __TEST_BYPASS__?: boolean;
  __TEST_AUTH_STRICT__?: boolean;
};

const sampleDiaries = [
  {
    id: 1,
    title: "삭제대상-1",
    content: "c1",
    emotion: Emotion.Happy,
    createdAt: "2024-03-10T10:00:00.000Z",
  },
  {
    id: 2,
    title: "유지-2",
    content: "c2",
    emotion: Emotion.Sad,
    createdAt: "2024-03-11T10:00:00.000Z",
  },
];

test.describe("Diaries 일기 삭제 (권한·모달·스토리지)", () => {
  test("비로그인: 일기카드에 삭제(X) 아이콘이 보이지 않는다", async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as WindowAuthTestFlags;
      w.__TEST_BYPASS__ = false;
      w.__TEST_AUTH_STRICT__ = true;
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("user");
    });

    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, sampleDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await expect(page.getByTestId("diary-card-1-delete")).toHaveCount(0);
    await expect(page.getByTestId("diary-card-2-delete")).toHaveCount(0);
  });

  test("로그인(바이패스): 삭제 모달·취소·삭제 시 스토리지 반영 및 목록 갱신", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const w = window as WindowAuthTestFlags;
      w.__TEST_BYPASS__ = true;
    });

    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.evaluate((diaries) => {
      localStorage.setItem("diaries", JSON.stringify(diaries));
    }, sampleDiaries);

    await page.reload();
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    const del1 = page.getByTestId("diary-card-1-delete");
    await expect(del1).toBeVisible();
    await expect(page.getByTestId("diary-card-2-delete")).toBeVisible();

    await del1.click();
    const modal = page.getByTestId("diaries-delete-confirm-modal");
    await expect(modal).toBeVisible();

    await modal.getByRole("button", { name: "취소" }).click();
    await expect(page.getByTestId("diaries-delete-confirm-modal")).toHaveCount(0);
    await expect(page.getByTestId("diary-card-1")).toBeVisible();

    await page.getByTestId("diary-card-1-delete").click();
    const modal2 = page.getByTestId("diaries-delete-confirm-modal");
    await expect(modal2).toBeVisible();
    await modal2.getByRole("button", { name: "삭제" }).click();

    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
    await expect(page.getByTestId("diary-card-1")).toHaveCount(0);
    await expect(page.getByTestId("diary-card-2")).toBeVisible();

    const after = await page.evaluate(() => localStorage.getItem("diaries"));
    const parsed = after ? (JSON.parse(after) as { id: number }[]) : [];
    expect(parsed.some((d) => d.id === 1)).toBe(false);
    expect(parsed.some((d) => d.id === 2)).toBe(true);
  });
});
