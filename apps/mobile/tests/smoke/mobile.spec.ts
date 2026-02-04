import { expect, test } from "@playwright/test";

test("navigates between tabs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "I am Firman Agam" })).toBeVisible();

  await page.getByRole("tab", { name: "Experience" }).click();
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
});

test("toggles dark mode in more tab", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "More" }).click();
  await page.locator("ion-toggle").click();
  await expect.poll(() => page.evaluate(() => document.body.classList.contains("dark"))).toBe(true);
});

test("switches locale to Indonesian from toolbar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Experience" }).click();
  await page.getByRole("button", { name: "Switch to Indonesian" }).click();
  await expect(page.getByRole("heading", { name: "Pengalaman" })).toBeVisible();
});
