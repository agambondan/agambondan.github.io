import { describe, expect, it } from "vitest";
import enCV from "../locales/en/cv.json";
import idCV from "../locales/id/cv.json";
import { getCV, validateCV } from "../src/index";

describe("cv-data", () => {
  it("validates EN and ID locale files", () => {
    expect(validateCV(enCV).success).toBe(true);
    expect(validateCV(idCV).success).toBe(true);
  });

  it("exposes current role in EN profile", () => {
    const profile = getCV("en");
    expect(profile.experience[0].company).toBe("Blue Bird Group");
    expect(profile.identity.title).toBe("Backend Engineer");
  });
});
