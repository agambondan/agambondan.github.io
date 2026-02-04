import React from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectsGrid } from "@/components/projects-grid";
import { getBlogPosts } from "@/lib/blog-posts";
import type { GithubProject } from "@/lib/github-projects";
import fallbackProjects from "@/lib/github-projects.fallback.json";
import type { AppLocale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getCV } from "@agambondan/cv-data";
import { ArrowRight, BookOpenText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProfilePageProps = {
  projects?: GithubProject[];
  locale?: AppLocale;
};

const copy = {
  en: {
    hello: "Hello,",
    titleLead: "My Name is",
    contactMe: "Contact Me",
    viewCV: "View Full CV",
    readWriting: "Read Writing",
    resume: "Resume",
    techWriting: "Tech Writing",
    cvVersions: "CV Versions",
    profileTag: "Developer Profile",
    about: "About",
    alwaysLearning: "Always Learning",
    alwaysLearningDesc:
      "Curiosity-first mindset for backend architecture and product delivery.",
    character: "Character",
    projects: "My Projects",
    projectsDesc:
      "Top starred public repositories from GitHub, filtered to active non-fork projects.",
    updated: "Updated",
    seeAllProjects: "See all projects",
    loadMore: "Load more",
    showingProjects: "Showing {shown} of {total} projects",
    allProjectsLoaded: "All projects loaded",
    recentWriting: "Recent Writing",
    recentWritingDesc:
      "Technical notes from real project and system design experience.",
    services: "My Services",
    servicesDesc: "Core technical capabilities and tooling.",
    openForWork: "Open for backend, platform, and product engineering work.",
    characterDesc:
      "Collaborative, accountable, and structured in execution from planning to production support.",
    fallbackProjectDesc:
      "Production-focused engineering experiments and implementation notes.",
    product: "Product",
    portfolio: "Portfolio",
    github: "GitHub",
    yearsExperience: "Years Experience",
    completedProjects: "Completed Projects",
    productionServices: "Production Services",
    topbarPrefix: "Now building robust services at"
  },
  id: {
    hello: "Halo,",
    titleLead: "Nama saya",
    contactMe: "Hubungi Saya",
    viewCV: "Lihat CV Lengkap",
    readWriting: "Baca Tulisan",
    resume: "Resume",
    techWriting: "Tulisan Teknis",
    cvVersions: "Versi CV",
    profileTag: "Profil Developer",
    about: "Tentang",
    alwaysLearning: "Selalu Belajar",
    alwaysLearningDesc:
      "Mindset berbasis rasa ingin tahu untuk arsitektur backend dan delivery produk.",
    character: "Karakter",
    projects: "Proyek Saya",
    projectsDesc:
      "Repository publik dengan bintang tertinggi dari GitHub, difilter untuk proyek aktif non-fork.",
    updated: "Diperbarui",
    seeAllProjects: "Lihat semua proyek",
    loadMore: "Muat lebih banyak",
    showingProjects: "Menampilkan {shown} dari {total} proyek",
    allProjectsLoaded: "Semua proyek sudah ditampilkan",
    recentWriting: "Tulisan Terbaru",
    recentWritingDesc:
      "Catatan teknis dari pengalaman project nyata dan desain sistem.",
    services: "Layanan Saya",
    servicesDesc: "Kapabilitas teknis utama dan tooling.",
    openForWork: "Terbuka untuk backend, platform, dan product engineering.",
    characterDesc:
      "Kolaboratif, akuntabel, dan terstruktur dalam eksekusi dari perencanaan hingga support produksi.",
    fallbackProjectDesc:
      "Eksperimen engineering berfokus produksi dan catatan implementasi.",
    product: "Produk",
    portfolio: "Portofolio",
    github: "GitHub",
    yearsExperience: "Tahun Pengalaman",
    completedProjects: "Project Selesai",
    productionServices: "Service Produksi",
    topbarPrefix: "Saat ini membangun layanan andal di"
  }
} as const;

export function ProfilePage({
  projects = fallbackProjects as GithubProject[],
  locale = "en"
}: ProfilePageProps) {
  const profile = getCV(locale);
  const posts = getBlogPosts(locale).slice(0, 3);
  const skillGroups = Object.entries(profile.skills);
  const topExperienceNotes = profile.experience
    .slice(0, 3)
    .map((item) => item.bullets[0])
    .filter(Boolean);
  const t = copy[locale];
  const heroStats = [
    { value: "5+", label: t.yearsExperience },
    { value: "20+", label: t.completedProjects },
    { value: "10+", label: t.productionServices }
  ];

  return (
    <main className="profile-shell mx-auto max-w-6xl space-y-10">
      <section className="profile-reference-hero fade-up overflow-hidden rounded-2xl border">
        <div className="profile-reference-topbar flex flex-wrap items-center justify-between gap-3 border-b border-violet-200/15 px-5 py-3">
          <p className="type-caption profile-text-primary font-medium">
            {t.topbarPrefix} {profile.experience[0]?.company}
          </p>
          <a
            className="neon-outline rounded-full bg-violet-500/30 px-3 py-1 text-xs font-semibold text-violet-100 hover:bg-violet-500/45"
            href={`mailto:${profile.identity.email}`}
          >
            {t.contactMe}
          </a>
        </div>

        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="type-section-title profile-text-primary">{t.hello}</p>
            <h1 className="type-hero-title profile-hero-title max-w-lg">
              {t.titleLead}
              <br />
              {profile.identity.name}
            </h1>
            <div className="h-1.5 w-14 rounded-full bg-violet-400" />
            <p className="type-body profile-text-primary max-w-xl">{profile.summary}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                className={cn(
                  buttonVariants(),
                  "neon-outline bg-violet-500/35 text-violet-50 hover:bg-violet-500/50"
                )}
                href={localeHref("/cv", locale)}
              >
                {t.viewCV} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                className={cn(buttonVariants({ variant: "outline" }), "profile-button-outline")}
                href={localeHref("/blog", locale)}
              >
                {t.readWriting}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link
                className="profile-chip profile-chip-tertiary rounded-full px-3 py-1"
                href={localeHref("/cv", locale)}
              >
                {t.resume}
              </Link>
              <Link
                className="profile-chip profile-chip-tertiary rounded-full px-3 py-1"
                href={localeHref("/blog", locale)}
              >
                {t.techWriting}
              </Link>
              <Link
                className="profile-chip profile-chip-tertiary rounded-full px-3 py-1"
                href={localeHref("/cv", locale)}
              >
                {t.cvVersions}
              </Link>
            </div>
            <p className="type-caption profile-text-primary font-medium uppercase tracking-[0.2em]">
              {t.profileTag}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-x-5 bottom-1 top-5 rounded-full bg-violet-500/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-violet-200/30 bg-slate-900/35 p-2 backdrop-blur-sm">
              <Image
                alt={`${profile.identity.name} portrait`}
                className="h-[390px] w-full rounded-xl object-cover object-[center_16%] md:h-[430px]"
                height={860}
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                src="/linkedin-profile.jpeg?v=20260203"
                width={640}
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 grid w-[95%] -translate-x-1/2 grid-cols-3 gap-2 rounded-xl border border-violet-200/25 bg-slate-950/75 p-3 backdrop-blur-md">
              {heroStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="type-h3 profile-text-primary text-xl font-semibold">{stat.value}</p>
                  <p className="type-caption profile-text-secondary uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="glass-card fade-up">
          <CardHeader className="space-y-2">
            <CardTitle className="profile-section-title type-section-title leading-tight">
              {t.about} {profile.identity.name}
            </CardTitle>
            <CardDescription className="type-caption profile-text-secondary">
              {profile.identity.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Image
              alt={`${profile.identity.name} portrait`}
              className="h-56 w-full rounded-xl object-cover object-[center_18%]"
              height={384}
              sizes="(max-width: 1024px) 100vw, 460px"
              src="/linkedin-profile.jpeg?v=20260203"
              width={640}
            />
            <div className="space-y-2">
              {topExperienceNotes.map((note) => (
                <div
                  key={note}
                  className="type-caption profile-chip profile-chip-secondary rounded-md border px-3 py-2 font-medium"
                >
                  {note}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card fade-up">
          <CardHeader className="space-y-2">
            <CardTitle className="profile-section-title type-section-title">{t.alwaysLearning}</CardTitle>
            <CardDescription className="type-caption profile-text-secondary">
              {t.alwaysLearningDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="type-body profile-text-secondary space-y-4">
            <p>{profile.summary}</p>
            <p>{profile.experience[0]?.bullets[1]}</p>
            <div className="rounded-lg border border-violet-200/25 bg-slate-900/55 p-4">
              <p className="profile-text-primary font-semibold">{t.character}</p>
              <p>{t.characterDesc}</p>
            </div>
            <p className="profile-text-primary">
              {t.openForWork} — <span className="font-semibold">{profile.identity.email}</span>.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="fade-up profile-section-title type-section-title">{t.projects}</h2>
        <p className="type-body fade-up profile-text-secondary">{t.projectsDesc}</p>
      </section>

      <ProjectsGrid
        labels={{
          updated: t.updated,
          fallbackProjectDesc: t.fallbackProjectDesc,
          seeAllProjects: t.seeAllProjects,
          loadMore: t.loadMore,
          showingProjects: t.showingProjects,
          allProjectsLoaded: t.allProjectsLoaded
        }}
        locale={locale}
        projects={projects}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="glass-card fade-up">
          <CardHeader>
            <CardTitle className="profile-section-title type-h3 flex items-center gap-2 text-xl">
              <BookOpenText className="h-5 w-5" /> {t.recentWriting}
            </CardTitle>
            <CardDescription className="type-caption profile-text-secondary">
              {t.recentWritingDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {posts.map((post) => (
              <article
                className="space-y-2 border-b border-violet-200/15 pb-4 last:border-b-0 last:pb-0"
                key={post.slug}
              >
                <Link
                  className="profile-link text-base font-medium hover:underline"
                  href={localeHref(`/blog/${post.slug}`, locale)}
                >
                  {post.title}
                </Link>
                <p className="type-caption profile-text-secondary">{post.description}</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card fade-up">
          <CardHeader>
            <CardTitle className="profile-section-title type-h3 text-xl">{t.services}</CardTitle>
            <CardDescription className="type-caption profile-text-secondary">
              {t.servicesDesc}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillGroups.map(([group, values]) => (
              <div key={group}>
                <p className="type-caption profile-text-secondary mb-2 font-semibold uppercase tracking-wide">
                  {group}
                </p>
                <div className="flex flex-wrap gap-2 border-b border-violet-200/15 pb-3 last:border-b-0 last:pb-0">
                  {values.slice(0, 5).map((value) => (
                    <Badge className="profile-chip profile-chip-primary" key={value} variant="secondary">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="glass-card fade-up">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="type-caption profile-text-secondary font-medium">{t.openForWork}</p>
            <p className="profile-text-primary text-lg font-semibold">{profile.identity.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className={cn(buttonVariants({ variant: "outline" }), "profile-button-outline")}
              href={profile.links.github}
              rel="noreferrer"
              target="_blank"
            >
              {t.github}
            </a>
            <a
              className={cn(buttonVariants({ variant: "outline" }), "profile-button-outline")}
              href={profile.links.portfolio}
              rel="noreferrer"
              target="_blank"
            >
              {t.portfolio}
            </a>
            <a
              className={cn(buttonVariants({ variant: "outline" }), "profile-button-outline")}
              href={profile.links.product}
              rel="noreferrer"
              target="_blank"
            >
              {t.product}
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
