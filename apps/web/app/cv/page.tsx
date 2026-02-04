import type { Metadata } from "next";
import { CVPage } from "@/components/cv-page";

export const metadata: Metadata = {
  title: "Backend Engineer CV",
  description: "Detailed bilingual CV for Firman Agam including experience, education, and technical skills.",
  alternates: {
    canonical: "/cv",
    languages: {
      en: "/cv",
      id: "/id/cv"
    }
  },
  openGraph: {
    title: "Backend Engineer CV",
    description: "Experience, education, and technical skills in a structured bilingual CV.",
    url: "/cv",
    type: "profile"
  }
};

export default function CVRoutePage() {
  return <CVPage />;
}
