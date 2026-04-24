// `playwright.config.ts`는 Windows에서 TS 설정 로드 시 프로세스 비정상 종료가 나는 경우가 있어 JS(CJS)로 둡니다.
const { defineConfig, devices } = require("@playwright/test");

/** 병렬 실행 시 에이전트별로 포트를 나누기: 기본 3000 + agentIndex */
function resolvePort() {
  if (process.env.PLAYWRIGHT_DEV_PORT != null && process.env.PLAYWRIGHT_DEV_PORT !== "") {
    return Number(process.env.PLAYWRIGHT_DEV_PORT);
  }
  if (process.env.PLAYWRIGHT_BASE_URL) {
    try {
      const u = new URL(process.env.PLAYWRIGHT_BASE_URL);
      if (u.port) return Number(u.port);
    } catch {
      // ignore
    }
  }
  const agentIndex = Number(
    process.env.PLAYWRIGHT_AGENT_INDEX ?? process.env.AGENT_INDEX ?? 0
  );
  return 3000 + agentIndex;
}

const port = resolvePort();
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`;

module.exports = defineConfig({
  testDir: "src",
  use: { baseURL },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- -p ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "ignore",
    // AuthGuard: E2E는 prompt.201 기준 테스트 환경으로 상세 등 MemberOnly 페이지 접근 허용
    env: {
      ...process.env,
      NEXT_PUBLIC_TEST_ENV: "test",
    },
  },
});
