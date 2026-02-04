import type { Metadata } from "next";
import { ProfilePage } from "@/components/profile-page";
import { getGithubProjects } from "@/lib/github-projects";

export const metadata: Metadata = {
  title: "Backend Engineer Profile",
  description: "Backend engineer profile with featured projects, writing highlights, and production-focused technical skills.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      id: "/id"
    }
  },
  openGraph: {
    title: "Backend Engineer Profile",
    description: "Explore featured backend projects, engineering writing, and technical capabilities.",
    url: "/",
    type: "website"
  }
};

export default async function Home() {
  const projects = await getGithubProjects(100);
  return <ProfilePage projects={projects} locale="en" />;
}
