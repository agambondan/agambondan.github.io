import { expect, test } from "@playwright/test";

async function expectGlobalNavbar(page: import("@playwright/test").Page) {
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.getByRole("link", { name: "Profile", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "CV", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Blog", exact: true })).toBeVisible();
}

test("renders modern profile homepage", async ({ page }) => {
  await page.goto("/");
  await expectGlobalNavbar(page);
  await expect(page.getByRole("heading", { name: "My Name is Firman Agam" })).toBeVisible();
  await expect(page.getByText("Developer Profile")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Recent Writing" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "My Services" })).toBeVisible();
  await expect(page.getByRole("link", { name: "See all projects" })).toHaveAttribute(
    "href",
    "https://github.com/agambondan?tab=repositories"
  );
  await expect(page.getByText("Built since 2020")).toBeVisible();
});

test("keeps locale switch on cv route", async ({ page }) => {
  await page.goto("/cv");
  await expectGlobalNavbar(page);
  await expect(page.getByRole("dialog", { name: "Choose CV Version" })).toBeVisible();
  await page.getByRole("button", { name: "Open New CV" }).click();
  await page.getByRole("button", { name: "Switch to Indonesian" }).click();
  await expect(page.getByRole("heading", { name: "Ringkasan" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pengalaman" })).toBeVisible();
});

test("opens cv and blog routes", async ({ page }) => {
  await page.goto("/");
  await expectGlobalNavbar(page);
  await page.getByRole("link", { name: "View Full CV" }).click();
  await expect(page).toHaveURL(/\/cv\/?$/);
  await expectGlobalNavbar(page);
  await page.getByRole("button", { name: "Open New CV" }).click();
  await expect(page.getByRole("heading", { name: "Summary" })).toBeVisible();

  await page.goto("/");
  await page.getByRole("link", { name: "Read Writing" }).click();
  await expectGlobalNavbar(page);
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  await expect(page.getByText("Built since 2020")).toBeVisible();
});

test("keeps blog locale equivalence when switching language", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Load more" })).toBeVisible();
  await page.getByRole("button", { name: "Load more" }).click();
  await expect(page.getByText("Showing 12 of 22 articles")).toBeVisible();

  await page.getByRole("searchbox", { name: "Blog search input" }).fill("adapter");
  await expect(page).toHaveURL(/\/blog\/?\?q=adapter/);
  await expect(page.getByText("Showing 1 of 1 articles")).toBeVisible();
  await page.getByRole("button", { name: "#Design Pattern" }).click();
  await page.getByRole("button", { name: "#Golang" }).click();
  await page.getByLabel("Sort by").selectOption("title-asc");
  await expect(page).toHaveURL(/tags=/);
  await expect(page).toHaveURL(/sort=title-asc/);
  await page.getByRole("link", { name: "ID", exact: true }).click();
  await expect(page).toHaveURL(/\/id\/blog\/?$/);
  await page.getByRole("searchbox", { name: "Blog search input" }).fill("adapter");
  await expect(page).toHaveURL(/\/id\/blog\/?\?q=adapter/);
  await expect(page.getByRole("link", { name: "Baca artikel →" }).first()).toBeVisible();

  await page.getByRole("link", { name: "Baca artikel →" }).first().click();
  await expect(page).toHaveURL(/\/id\/blog\/[^/]+\/?$/);
  await expect(page.locator(".blog-detail-thumbnail")).toBeVisible();
  await expect(page.getByRole("button", { name: "Salin blok kode" }).first()).toBeVisible();
  await expect(page.locator("article.markdown-body pre code").first()).toBeVisible();

  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/[^/]+\/?$/);
});
