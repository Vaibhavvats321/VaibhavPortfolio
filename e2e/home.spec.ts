import { expect, test } from "@playwright/test";

test("renders the portfolio landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Vaibhav/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Vaibhav Vats/);
  await expect(
    page.getByRole("heading", { level: 2, name: "Engineering clarity into the work." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore selected work/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Selected projects" })).toBeAttached();
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeAttached();
  await expect(page.getByRole("heading", { level: 2, name: "Get in touch" })).toBeAttached();
});

test("loads without browser errors", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  expect(errors).toEqual([]);
});

test("skip link moves focus to the main landmark", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#main$/);
  await expect(page.locator("#main")).toBeFocused();
});

test("reveals below-the-fold sections on scroll", async ({ page }) => {
  await page.goto("/");

  const projectReveal = page.locator("#work [data-reveal]").first();
  await expect(projectReveal).toHaveCSS("opacity", "0");

  await page
    .getByRole("heading", { level: 2, name: "Selected projects" })
    .scrollIntoViewIfNeeded();
  await expect(projectReveal).toHaveCSS("opacity", "1");
});

test("marks the current section in the desktop navigation", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) < 1024);

  await page.goto("/");
  const primaryNav = page.locator('header nav[aria-label="Primary"]');
  const workLink = primaryNav.locator('a[href="#work"]');

  await page.evaluate(() => {
    document.querySelector("#work")?.scrollIntoView({ block: "center", behavior: "instant" });
  });

  await expect(workLink).toHaveAttribute("aria-current", "location");
});

test("keeps footer link targets at least 24px tall", async ({ page }) => {
  await page.goto("/");

  for (const link of await page.locator("footer nav a").all()) {
    const box = await link.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(24);
  }
});

test("opens and closes the mobile menu with Escape", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 768);
  await page.goto("/");

  const trigger = page.getByRole("button", { name: /navigation menu/i });
  await trigger.click();

  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Mobile primary" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("does not overflow horizontally across widths", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });

    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("keeps all content visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Engineering clarity into the work." }),
    ).toBeVisible();

    const hiddenReveals = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.filter((element) => Number(getComputedStyle(element).opacity) < 1).length,
    );
    expect(hiddenReveals).toBe(0);
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("keeps the narrative content readable", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "Engineering clarity into the work." }),
    ).toBeVisible();

    const hiddenReveals = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.filter((element) => Number(getComputedStyle(element).opacity) < 1).length,
    );
    expect(hiddenReveals).toBe(0);
  });
});
