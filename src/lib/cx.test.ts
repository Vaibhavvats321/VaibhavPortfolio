import { describe, expect, it } from "vitest";

import { cx } from "./cx";

describe("cx", () => {
  it("joins truthy class names", () => {
    expect(cx("base", "accent", undefined, false, null)).toBe("base accent");
  });

  it("returns an empty string when no class names are provided", () => {
    expect(cx()).toBe("");
  });
});
