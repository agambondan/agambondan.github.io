import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CVPage } from "../components/cv-page";

const mockSearchParams = { get: () => null };

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/cv",
  useSearchParams: () => mockSearchParams
}));

describe("CVPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows CV version selector first", () => {
    render(<CVPage />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open new cv|buka cv baru/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open old cv|buka cv lama/i })).toBeInTheDocument();
  });

  it("opens new CV and switches locale from EN to ID", () => {
    render(<CVPage />);
    fireEvent.click(screen.getByRole("button", { name: /open new cv|buka cv baru/i }));
    expect(screen.getByText("Summary")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download Web CV PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-web-en.pdf"
    );
    expect(screen.getByRole("link", { name: "Download Document CV PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-doc-en.pdf"
    );
    expect(screen.getByRole("link", { name: "Download ATS CV PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-ats-en.pdf"
    );
    fireEvent.click(screen.getByRole("button", { name: "Switch to Indonesian" }));
    expect(screen.getByText("Ringkasan")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Unduh CV Web PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-web-id.pdf"
    );
    expect(screen.getByRole("link", { name: "Unduh CV Dokumen PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-doc-id.pdf"
    );
    expect(screen.getByRole("link", { name: "Unduh CV ATS PDF" })).toHaveAttribute(
      "href",
      "/cv/firman-agam-cv-ats-id.pdf"
    );
  });

  it("opens old CV mode and renders iframe", () => {
    render(<CVPage />);
    fireEvent.click(screen.getByRole("button", { name: /open old cv|buka cv lama/i }));
    expect(screen.getByTitle("Old CV")).toBeInTheDocument();
  });
});
