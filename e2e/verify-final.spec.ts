import { test, expect } from "@playwright/test";

test.describe("hero scene verification", () => {
  for (const [name, width, height] of [
    ["desktop", 1440, 900],
    ["laptop", 1280, 800],
    ["mobile", 390, 844],
  ] as const) {
    test(`renders hero scene at ${name} (${width}x${height})`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
      page.on("pageerror", (e) => errors.push(e.message));

      await page.setViewportSize({ width, height });
      await page.goto("/");
      await page.waitForTimeout(4000);

      const h1 = await page.getByRole("heading", { level: 1 }).textContent();
      const scene = page.getByRole("img", { name: /^Engineer workflow:/ });

      console.log(`${name} H1:`, h1);
      console.log(`${name} ERRORS:`, JSON.stringify(errors));

      expect(h1).toBe("Vaibhav Vats");
      await expect(scene).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("plays every workflow stage in order", async ({ page }) => {
    test.skip(page.viewportSize()?.width !== 1440, "The full sequence is verified on desktop.");
    test.setTimeout(60_000);

    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/", { waitUntil: "domcontentloaded" });
    const scene = page.getByRole("img", { name: /^Engineer workflow:/ });
    const stages = ["FRONTEND", "API", "BUILD", "GIT PUSH", "DEPLOY", "HOORAY"];

    for (const stage of stages) {
      await expect(scene).toHaveAttribute("aria-label", `Engineer workflow: ${stage}`, {
        timeout: stage === "FRONTEND" ? 5000 : 15000,
      });
      if (stage === "DEPLOY") {
        await page.waitForTimeout(3800);
      } else if (stage === "HOORAY") {
        await page.waitForTimeout(350);
      } else {
        await page.waitForTimeout(1500);
      }
      await page.screenshot({
        path: `test-results/hero-${stage.toLowerCase().replace(" ", "-")}.png`,
      });
    }

    expect(errors).toEqual([]);
  });
});
