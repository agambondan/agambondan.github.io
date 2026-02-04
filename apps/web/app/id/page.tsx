import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile-page";
import { getGithubProjects } from "@/lib/github-projects";

export const metadata: Metadata = {
  title: "Profil Backend Engineer",
  description: "Profil developer modern Firman Agam dalam Bahasa Indonesia.",
  alternates: {
    canonical: "/id",
    languages: {
      en: "/",
      id: "/id"
    }
  },
  openGraph: {
    title: "Profil Backend Engineer",
    description: "Lihat proyek unggulan, tulisan teknis, dan kapabilitas backend engineering.",
    url: "/id",
    type: "website",
    locale: "id_ID"
  }
};

export default async function IndonesianHomePage() {
  const projects = await getGithubProjects(100);
  return <ProfilePage projects={projects} locale="id" />;
}
