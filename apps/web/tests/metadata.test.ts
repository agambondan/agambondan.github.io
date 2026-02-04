import { describe, expect, it } from "vitest";
import { metadata } from "../app/layout";

describe("metadata", () => {
  it("contains expected title", () => {
    expect(metadata.title).toEqual({
      default: "Backend Engineer Portfolio | Firman Agam",
      template: "%s | Firman Agam"
    });
  });

  it("enables indexing and canonical URL", () => {
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.alternates?.canonical).toBe("/");
  });
});
