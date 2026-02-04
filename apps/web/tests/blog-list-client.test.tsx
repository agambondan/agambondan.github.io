import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BlogListClient } from "../components/blog-list-client";
import type { BlogPost } from "../lib/blog-posts";

const navigationState = vi.hoisted(() => ({
  pathname: "/blog"
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname
}));

const posts: BlogPost[] = [
  {
    slug: "adapter-pattern-go",
    title: "Adapter Pattern in Go",
    description: "Translate external interfaces into internal contracts.",
    publishedAt: "2026-02-01",
    thumbnail: "/blog-thumbnails/structural.svg",
    tags: ["Design Pattern", "Golang", "Structural"],
    contentMarkdown: "adapter"
  },
  {
    slug: "factory-method-go",
    title: "Factory Method in Go",
    description: "Create notifier objects from config.",
    publishedAt: "2026-02-02",
    thumbnail: "/blog-thumbnails/creational.svg",
    tags: ["Design Pattern", "Golang", "Creational"],
    contentMarkdown: "factory"
  },
  {
    slug: "observer-pattern-go",
    title: "Observer Pattern in Go",
    description: "Broadcast events with loose coupling.",
    publishedAt: "2026-02-03",
    thumbnail: "/blog-thumbnails/behavioral.svg",
    tags: ["Design Pattern", "Golang", "Behavioral"],
    contentMarkdown: "observer"
  }
];

const manyPosts: BlogPost[] = Array.from({ length: 8 }).map((_, idx) => ({
  slug: `pattern-${idx + 1}`,
  title: `Pattern ${idx + 1}`,
  description: `Description ${idx + 1}`,
  publishedAt: `2026-02-${String(10 - idx).padStart(2, "0")}`,
  thumbnail: "/blog-thumbnails/creational.svg",
  tags: ["Design Pattern", "Golang", idx % 2 === 0 ? "Behavioral" : "Structural"],
  contentMarkdown: "content"
}));

describe("BlogListClient", () => {
  beforeEach(() => {
    navigationState.pathname = "/blog";
    window.history.replaceState(null, "", "/blog");
  });

  it("renders all posts by default", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    expect(screen.getByText("Showing 3 of 3 articles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Adapter Pattern in Go" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Factory Method in Go" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Observer Pattern in Go" })).toBeInTheDocument();
  });

  it("filters by search text (title/description/tag)", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Blog search input" }), {
      target: { value: "observer" }
    });

    expect(screen.getByText("Showing 1 of 1 articles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Observer Pattern in Go" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Factory Method in Go" })).not.toBeInTheDocument();
    expect(window.location.search).toContain("q=observer");
  });

  it("supports AND logic for multi tag filters", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    fireEvent.click(screen.getByRole("button", { name: "#Design Pattern" }));
    fireEvent.click(screen.getByRole("button", { name: "#Creational" }));

    expect(screen.getByText("Showing 1 of 1 articles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Factory Method in Go" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Adapter Pattern in Go" })).not.toBeInTheDocument();
  });

  it("can remove selected tag from selected tags card", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    fireEvent.click(screen.getByRole("button", { name: "#Creational" }));
    expect(screen.getByRole("button", { name: "#Creational ×" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "#Creational ×" }));
    expect(screen.queryByRole("button", { name: "#Creational ×" })).not.toBeInTheDocument();
  });

  it("supports sorting and writes to URL", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    fireEvent.change(screen.getByLabelText("Sort by"), { target: { value: "title-asc" } });

    const links = screen.getAllByRole("link", { name: /Pattern in Go/ });
    expect(links[0]).toHaveTextContent("Adapter Pattern in Go");
    expect(window.location.search).toContain("sort=title-asc");
  });

  it("loads more in increments of six", () => {
    render(<BlogListClient locale="en" posts={manyPosts} />);

    expect(screen.getByText("Showing 6 of 8 articles")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Load more" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(screen.getByText("Showing 8 of 8 articles")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Load more" })).not.toBeInTheDocument();
    expect(screen.getByText("All articles loaded")).toBeInTheDocument();
  });

  it("clears filters with reset button", () => {
    render(<BlogListClient locale="en" posts={posts} />);
    fireEvent.change(screen.getByRole("searchbox", { name: "Blog search input" }), {
      target: { value: "adapter" }
    });
    fireEvent.change(screen.getByLabelText("Sort by"), { target: { value: "title-desc" } });
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(screen.getByText("Showing 3 of 3 articles")).toBeInTheDocument();
    expect(window.location.search).toBe("");
  });

  it("applies initial state from URL query params", () => {
    window.history.replaceState(
      null,
      "",
      "/blog?q=factory&tags=Design%20Pattern,Golang&sort=title-desc"
    );
    render(<BlogListClient locale="en" posts={posts} />);

    const input = screen.getByRole("searchbox", { name: "Blog search input" }) as HTMLInputElement;
    expect(input.value).toBe("factory");
    expect(screen.getByText("Showing 1 of 1 articles")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Factory Method in Go" })).toBeInTheDocument();
  });
});
