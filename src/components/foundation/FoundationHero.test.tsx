import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FoundationHero } from "./FoundationHero";

describe("FoundationHero", () => {
  it("renders a single page heading with the portfolio name", () => {
    render(<FoundationHero />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent("Vaibhav");
  });

  it("marks unverified identity details as pending", () => {
    render(<FoundationHero />);

    expect(screen.getAllByText("[Pending]")).toHaveLength(2);
  });
});
