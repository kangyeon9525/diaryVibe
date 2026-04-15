import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

test.describe("diaries 일기쓰기 모달 링크", () => {
  test("일기쓰기 클릭 시 일기 쓰기 모달이 페이지 중앙 오버레이로 열린다", async ({
    page,
  }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.getByTestId("diaries-func-link-write").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "일기 쓰기" }),
    ).toBeVisible();
  });
});
