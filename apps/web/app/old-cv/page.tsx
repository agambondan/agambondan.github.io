import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Versions",
  description: "CV route now includes both modern and legacy CV versions in one place.",
  alternates: {
    canonical: "/cv",
    languages: {
      en: "/cv",
      id: "/id/cv"
    }
  }
};

export default function OldCVPage() {
  redirect("/cv");
}
