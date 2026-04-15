import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  // testDir: "e2e",
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  // reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    // trace: "on-first-retry",
    // screenshot: "only-on-failure",
    // video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    // Windows 등에서 `pipe` 시 서버 로그가 많으면 버퍼·프로세스 이슈가 날 수 있어 `ignore` 사용
    stdout: "ignore",
    stderr: "ignore",
  },
});
