import { describe, expect, it } from "vitest";
import { getBlogPostBySlug, getBlogPosts } from "../lib/blog-posts";

describe("blog posts dataset", () => {
  it("returns 22 posts for EN and ID", () => {
    expect(getBlogPosts("en")).toHaveLength(22);
    expect(getBlogPosts("id")).toHaveLength(22);
  });

  it("uses unique slugs", () => {
    const slugs = getBlogPosts("en").map((post) => post.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("is sorted by publishedAt descending", () => {
    const posts = getBlogPosts("en");
    for (let i = 0; i < posts.length - 1; i += 1) {
      expect(new Date(posts[i].publishedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i + 1].publishedAt).getTime()
      );
    }
  });

  it("resolves sample slugs in both locales", () => {
    const sample = ["factory-method-go", "adapter-pattern-go", "observer-pattern-go", "visitor-pattern-go"];
    for (const slug of sample) {
      expect(getBlogPostBySlug(slug, "en")).toBeDefined();
      expect(getBlogPostBySlug(slug, "id")).toBeDefined();
    }
  });

  it("contains required deep-content markers", () => {
    const sample = getBlogPostBySlug("factory-method-go", "en");
    expect(sample).toBeDefined();

    const body = sample?.contentMarkdown ?? "";
    expect(body).toContain("## 5W + 1H");
    expect(body).toContain("## Suggested Project Structure");
    expect(body).toContain("## Clean/Hexagonal Placement");
    expect(body).toContain("```go");
  });

  it("includes thumbnail for every post", () => {
    const posts = getBlogPosts("en");
    const uniquePaths = new Set<string>();

    for (const post of posts) {
      expect(post.thumbnail).toMatch(/^\/blog-thumbnails\/.+/);
      expect(post.thumbnail).toBe(`/blog-thumbnails/${post.slug}.svg`);
      uniquePaths.add(post.thumbnail);
    }

    expect(uniquePaths.size).toBe(22);
  });
});
