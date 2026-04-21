import { test, expect } from "@playwright/test";

import { Emotion } from "@/commons/constants/enum";
import { staticPaths } from "@/commons/constants/url";

const DIARY_TITLE = "playwright 테스트 제목";
const DIARY_CONTENT = "playwright 테스트 내용입니다.";

test.describe("diaries-new 일기쓰기 폼 등록", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();
    await page.getByTestId("diaries-func-link-write").click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("모든 인풋이 비어있을 때 등록하기 버튼이 비활성화된다", async ({
    page,
  }) => {
    await expect(
      page.getByTestId("diaries-new-func-form-submit"),
    ).toBeDisabled();
  });

  test("제목만 입력 시 등록하기 버튼이 비활성화된다", async ({ page }) => {
    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await expect(
      page.getByTestId("diaries-new-func-form-submit"),
    ).toBeDisabled();
  });

  test("내용만 입력 시 등록하기 버튼이 비활성화된다", async ({ page }) => {
    await page.getByTestId("diaries-new-func-form-content").fill(DIARY_CONTENT);
    await expect(
      page.getByTestId("diaries-new-func-form-submit"),
    ).toBeDisabled();
  });

  test("모든 인풋 입력 시 등록하기 버튼이 활성화된다", async ({ page }) => {
    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await page
      .getByTestId("diaries-new-func-form-content")
      .fill(DIARY_CONTENT);
    await expect(
      page.getByTestId("diaries-new-func-form-submit"),
    ).toBeEnabled();
  });

  test("등록하기 버튼 클릭 시 등록완료 모달이 열린다", async ({ page }) => {
    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await page
      .getByTestId("diaries-new-func-form-content")
      .fill(DIARY_CONTENT);
    await page.getByTestId("diaries-new-func-form-submit").click();

    await expect(page.getByRole("dialog")).toHaveCount(2);
    await expect(
      page.getByTestId("diaries-new-func-form-success-modal"),
    ).toBeVisible();
  });

  test("등록완료 모달의 확인 버튼 클릭 시 일기상세페이지로 이동하고 모든 모달이 닫힌다", async ({
    page,
  }) => {
    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await page
      .getByTestId("diaries-new-func-form-content")
      .fill(DIARY_CONTENT);
    await page.getByTestId("diaries-new-func-form-submit").click();

    await expect(
      page.getByTestId("diaries-new-func-form-success-modal"),
    ).toBeVisible();
    await page
      .getByTestId("diaries-new-func-form-success-modal")
      .getByRole("button", { name: "확인" })
      .click();

    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page).toHaveURL(/\/diaries\/\d+/);
  });

  test("로컬스토리지에 기존 diaries가 없으면 id=1로 등록된다", async ({
    page,
  }) => {
    await page.evaluate(() => localStorage.removeItem("diaries"));

    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await page
      .getByTestId("diaries-new-func-form-content")
      .fill(DIARY_CONTENT);
    await page.getByTestId("diaries-new-func-form-submit").click();

    const saved = await page.evaluate(() => localStorage.getItem("diaries"));
    const diaries = JSON.parse(saved ?? "[]");

    expect(diaries).toHaveLength(1);
    expect(diaries[0].id).toBe(1);
    expect(diaries[0].title).toBe(DIARY_TITLE);
    expect(diaries[0].content).toBe(DIARY_CONTENT);
  });

  test("로컬스토리지에 기존 diaries가 있으면 가장 큰 id+1로 등록된다", async ({
    page,
  }) => {
    await page.evaluate(
      ([happy, sad]) => {
        const existing = [
          {
            id: 3,
            title: "기존 일기",
            content: "기존 내용",
            emotion: happy,
            createdAt: new Date().toISOString(),
          },
          {
            id: 7,
            title: "기존 일기2",
            content: "기존 내용2",
            emotion: sad,
            createdAt: new Date().toISOString(),
          },
        ];
        localStorage.setItem("diaries", JSON.stringify(existing));
      },
      [Emotion.Happy, Emotion.Sad],
    );

    await page.getByTestId("diaries-new-func-form-title").fill(DIARY_TITLE);
    await page
      .getByTestId("diaries-new-func-form-content")
      .fill(DIARY_CONTENT);
    await page.getByTestId("diaries-new-func-form-submit").click();

    const saved = await page.evaluate(() => localStorage.getItem("diaries"));
    const diaries = JSON.parse(saved ?? "[]");

    expect(diaries).toHaveLength(3);
    expect(diaries[2].id).toBe(8);
    expect(diaries[2].title).toBe(DIARY_TITLE);
  });
});
