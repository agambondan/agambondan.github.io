import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("mobile app", () => {
  it("renders tabs and can navigate to experience", async () => {
    render(<App />);
    const experienceTab = await screen.findByText("Experience");
    fireEvent.click(experienceTab);
    expect(await screen.findByRole("heading", { name: "Experience" })).toBeInTheDocument();
  });

  it("toggles dark mode in more tab", async () => {
    render(<App />);
    fireEvent.click(await screen.findByText("More"));
    const toggle = await screen.findByLabelText("Toggle dark mode");
    fireEvent.click(toggle);
    expect(localStorage.getItem("cv-mobile-dark")).toBe("true");
  });
});
