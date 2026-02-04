import React from "react";
import { fireEvent } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfilePage } from "../components/profile-page";
import type { GithubProject } from "../lib/github-projects";

function buildProjects(total: number): GithubProject[] {
  return Array.from({ length: total }, (_, index) => ({
    name: `project-${index + 1}`,
    description: `description-${index + 1}`,
    html_url: `https://example.com/project-${index + 1}`,
    language: "TypeScript",
    stargazers_count: total - index,
    updated_at: "2026-02-01T00:00:00.000Z",
    topics: []
  }));
}

describe("ProfilePage", () => {
  it("renders modern profile sections", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Developer Profile")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My Name is Firman Agam" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent Writing" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My Services" })).toBeInTheDocument();
  });

  it("contains CTA link to cv route", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("link", { name: /view full cv/i })).toHaveAttribute("href", "/cv");
  });

  it("shows github projects section with all-projects link", () => {
    render(<ProfilePage />);
    expect(screen.getByRole("heading", { name: "My Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see all projects/i })).toHaveAttribute(
      "href",
      "https://github.com/agambondan?tab=repositories"
    );
  });

  it("shows projects progressively with load more button", () => {
    render(<ProfilePage projects={buildProjects(8)} />);
    expect(screen.getByText("Showing 6 of 8 projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Load more" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "project-6" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "project-7" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));

    expect(screen.getByText("Showing 8 of 8 projects")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "project-8" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
    expect(screen.getByText("All projects loaded")).toBeInTheDocument();
  });

  it("shows localized project pagination labels in indonesian", () => {
    render(<ProfilePage locale="id" projects={buildProjects(6)} />);
    expect(screen.getByText("Menampilkan 6 dari 6 proyek")).toBeInTheDocument();
    expect(screen.getByText("Semua proyek sudah ditampilkan")).toBeInTheDocument();
  });

  it("uses localized route links for indonesian locale", () => {
    render(<ProfilePage locale="id" />);
    expect(screen.getByRole("link", { name: /lihat cv lengkap/i })).toHaveAttribute("href", "/id/cv");
    expect(screen.getByRole("link", { name: /baca tulisan/i })).toHaveAttribute("href", "/id/blog");
  });
});
