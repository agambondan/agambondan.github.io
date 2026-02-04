import enCV from "../locales/en/cv.json";
import idCV from "../locales/id/cv.json";
import { validateCV } from "./index";

const datasets = [
  ["en", enCV],
  ["id", idCV]
] as const;

let failed = false;

for (const [locale, data] of datasets) {
  const result = validateCV(data);
  if (!result.success) {
    failed = true;
    console.error(`Validation failed for locale: ${locale}`);
    for (const error of result.errors) {
      console.error(`- ${error}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("CV validation passed for all locales.");
