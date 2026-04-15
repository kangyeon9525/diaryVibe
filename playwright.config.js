// `playwright.config.ts`는 Windows에서 TS 설정 로드 시 프로세스 비정상 종료가 나는 경우가 있어 JS(CJS)로 둡니다.
const { defineConfig, devices } = require("@playwright/test");

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

module.exports = defineConfig({
  testDir: "src",
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "ignore",
  },
});
