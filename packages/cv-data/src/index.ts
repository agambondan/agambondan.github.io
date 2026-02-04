import { type ZodIssue } from "zod";
import enCV from "../locales/en/cv.json";
import idCV from "../locales/id/cv.json";
import { CVLocale, CVProfile, cvLocaleSchema, cvProfileSchema } from "./schema";

const cvs: Record<CVLocale, CVProfile> = {
    en: cvProfileSchema.parse(enCV),
    id: cvProfileSchema.parse(idCV),
};

export type { CVLocale, CVProfile };

export type ValidationResult =
    | { success: true; data: CVProfile }
    | { success: false; errors: string[] };

export function getCV(locale: CVLocale): CVProfile {
    return cvs[locale];
}

export function validateCV(data: unknown): ValidationResult {
    const result = cvProfileSchema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }

    return {
        success: false,
        errors: result.error.issues.map(
            (issue: ZodIssue) => `${issue.path.join(".")}: ${issue.message}`,
        ),
    };
}

export function parseLocale(input: string): CVLocale {
    const parsed = cvLocaleSchema.safeParse(input);
    return parsed.success ? parsed.data : "en";
}
