import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

test.describe("diaries-new 닫기버튼 등록취소 모달", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
    await page.getByTestId("diaries-func-link-write").click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("닫기버튼 클릭 시 등록취소모달이 일기쓰기폼모달 위에 2중으로 열린다", async ({
    page,
  }) => {
    await page.getByTestId("diaries-new-func-link-modal-close").click();

    await expect(page.getByRole("dialog")).toHaveCount(2);
  });

  test("등록취소모달의 계속작성버튼 클릭 시 등록취소모달만 닫힌다", async ({
    page,
  }) => {
    await page.getByTestId("diaries-new-func-link-modal-close").click();
    await page.getByRole("button", { name: "계속작성" }).click();

    await expect(page.getByRole("dialog")).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "일기 쓰기" }),
    ).toBeVisible();
  });

  test("등록취소모달의 등록취소버튼 클릭 시 모든 모달이 닫힌다", async ({
    page,
  }) => {
    await page.getByTestId("diaries-new-func-link-modal-close").click();
    await page.getByRole("button", { name: "등록취소" }).click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
