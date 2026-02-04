import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "../components/theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add("dark");
  });

  it("defaults to dark and switches to light with persistence", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /switch to light theme/i });
    expect(document.documentElement).toHaveClass("dark");

    fireEvent.click(button);
    expect(document.documentElement).toHaveClass("light");
    expect(localStorage.getItem("web-theme")).toBe("light");
  });
});
