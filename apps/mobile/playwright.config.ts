import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/smoke",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4174",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4174",
    port: 4174,
    timeout: 120000,
    reuseExistingServer: false
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] }
    }
  ]
});
