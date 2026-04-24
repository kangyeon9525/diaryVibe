import { test, expect } from "@playwright/test";

import { staticPaths } from "@/commons/constants/url";

type WindowAuthTestFlags = Window & {
  __TEST_BYPASS__?: boolean;
  __TEST_AUTH_STRICT__?: boolean;
};

test.describe("diaries 일기쓰기 모달 링크 (권한분기)", () => {
  test("비로그인: 일기쓰기 클릭 시 로그인 요청 모달이 열린다", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const w = window as WindowAuthTestFlags;
      w.__TEST_BYPASS__ = false;
      w.__TEST_AUTH_STRICT__ = true;
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("user");
    });

    await page.goto(staticPaths.diaries);
    await expect(page.getByTestId("diaries-page-loaded")).toBeVisible();

    await page.getByTestId("diaries-func-link-write").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "로그인하시겠습니까" }),
    ).toBeVisible();
  });

  test("로그인(테스트 바이패스): 일기쓰기 클릭 시 일기 쓰기 모달이 열린다", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const w = window as WindowAuthTestFlags;
      w.__TEST_BYPASS__ = true;
    });

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
