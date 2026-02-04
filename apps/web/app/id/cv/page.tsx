import type { Metadata } from "next";
import { CVPage } from "@/components/cv-page";

export const metadata: Metadata = {
  title: "CV Backend Engineer",
  description: "CV bilingual Firman Agam dalam Bahasa Indonesia.",
  alternates: {
    canonical: "/id/cv",
    languages: {
      en: "/cv",
      id: "/id/cv"
    }
  },
  openGraph: {
    title: "CV Backend Engineer",
    description: "Pengalaman, pendidikan, dan keahlian teknis dalam format CV bilingual.",
    url: "/id/cv",
    type: "profile",
    locale: "id_ID"
  }
};

export default function IndonesianCVRoutePage() {
  return <CVPage />;
}
