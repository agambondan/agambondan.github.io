import { expect, test } from "@playwright/test";

test.describe("visual regression", () => {
  test.use({
    viewport: { width: 1440, height: 900 }
  });

  test("home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("home-page.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.12
    });
  });

  test("blog page", async ({ page }) => {
    await page.goto("/blog");
    await expect(page).toHaveScreenshot("blog-page.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.12
    });
  });

  test("cv page", async ({ page }) => {
    await page.goto("/cv");
    await expect(page).toHaveScreenshot("cv-page.png", {
      animations: "disabled",
      fullPage: false,
      maxDiffPixelRatio: 0.01
    });
  });

});
