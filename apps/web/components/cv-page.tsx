"use client";

import React from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCV, type CVLocale } from "@agambondan/cv-data";
import { BriefcaseBusiness, GraduationCap, Languages, Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import { localeFromPathname, localeHref } from "@/lib/i18n";

const copy = {
  en: {
    summary: "Summary",
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
    profileLinks: "Links",
    chooseVersion: "Choose CV Version",
    chooseVersionDesc: "Select which CV version you want to view on this route.",
    openNew: "Open New CV",
    openOld: "Open Old CV",
    showNew: "Show New CV",
    showOld: "Show Old CV",
    newLabel: "New CV",
    oldLabel: "Old CV",
    oldArchiveTitle: "Old CV Archive",
    oldArchiveDesc: "Legacy CV version preserved for historical reference.",
    profile: "Profile",
    blog: "Blog",
    cvVersions: "CV Versions",
    product: "Product",
    portfolio: "Portfolio",
    github: "GitHub",
    linkedin: "LinkedIn",
    newDesc: "Modern, bilingual, and structured for current roles.",
    oldDesc: "Legacy archive to compare your previous profile version.",
    switchToEnglish: "Switch to English",
    switchToIndonesian: "Switch to Indonesian",
    downloadWebCV: "Download Web CV PDF",
    downloadDocCV: "Download Document CV PDF",
    downloadATSCV: "Download ATS CV PDF"
  },
  id: {
    summary: "Ringkasan",
    experience: "Pengalaman",
    skills: "Keahlian",
    education: "Pendidikan",
    languages: "Bahasa",
    profileLinks: "Tautan",
    chooseVersion: "Pilih Versi CV",
    chooseVersionDesc: "Pilih versi CV yang ingin kamu lihat di route ini.",
    openNew: "Buka CV Baru",
    openOld: "Buka CV Lama",
    showNew: "Lihat CV Baru",
    showOld: "Lihat CV Lama",
    newLabel: "CV Baru",
    oldLabel: "CV Lama",
    oldArchiveTitle: "Arsip CV Lama",
    oldArchiveDesc: "Versi CV lama disimpan sebagai referensi historis.",
    profile: "Profil",
    blog: "Blog",
    cvVersions: "Versi CV",
    product: "Produk",
    portfolio: "Portofolio",
    github: "GitHub",
    linkedin: "LinkedIn",
    newDesc: "Modern, bilingual, dan terstruktur untuk kebutuhan role saat ini.",
    oldDesc: "Arsip lama untuk membandingkan versi profil sebelumnya.",
    switchToEnglish: "Ubah ke Bahasa Inggris",
    switchToIndonesian: "Ubah ke Bahasa Indonesia",
    downloadWebCV: "Unduh CV Web PDF",
    downloadDocCV: "Unduh CV Dokumen PDF",
    downloadATSCV: "Unduh CV ATS PDF"
  }
} as const;

function periodLabel(start: string, end: string) {
  return `${start} - ${end}`;
}

export function CVPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<CVLocale>("en");
  const [mode, setMode] = useState<"new" | "old" | null>(null);

  useEffect(() => {
    const routeLocale = localeFromPathname(pathname);
    setLocale(routeLocale);
  }, [pathname]);

  function setLocaleAndUrl(nextLocale: CVLocale) {
    setLocale(nextLocale);
    router.push(localeHref("/cv", nextLocale));
  }

  const profile = useMemo(() => getCV(locale), [locale]);
  const dictionary = copy[locale];

  return (
    <main className="mx-auto max-w-6xl space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.identity.name,
            jobTitle: profile.identity.title,
            email: profile.identity.email,
            telephone: profile.identity.phone,
            address: profile.identity.location,
            sameAs: [profile.links.product, profile.links.portfolio, profile.links.github, profile.links.linkedin].filter(Boolean)
          })
        }}
      />
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 text-white">
        <CardContent className="grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-4">
            <Badge className="bg-cyan-400 text-slate-900 hover:bg-cyan-300" variant="secondary">
              {profile.identity.title}
            </Badge>
            <h1 className="text-3xl font-semibold md:text-4xl">{profile.identity.name}</h1>
            <div className="space-y-2 text-sm text-slate-100 md:text-base">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {profile.identity.location}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> {profile.identity.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {profile.identity.phone}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              <Link className="rounded-md bg-white/15 px-3 py-1.5 hover:bg-white/25" href={localeHref("/", locale)}>
                {dictionary.profile}
              </Link>
              <Link className="rounded-md bg-white/15 px-3 py-1.5 hover:bg-white/25" href={localeHref("/blog", locale)}>
                {dictionary.blog}
              </Link>
              <Link className="rounded-md bg-white/15 px-3 py-1.5 hover:bg-white/25" href={localeHref("/cv", locale)}>
                {dictionary.cvVersions}
              </Link>
            </div>
          </div>

          <div className="space-y-2">
            {mode && (
              <div className="flex gap-2 self-start rounded-lg bg-white/10 p-1">
                <Button
                  variant={mode === "new" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("new")}
                  aria-label={dictionary.showNew}
                >
                  {dictionary.newLabel}
                </Button>
                <Button
                  variant={mode === "old" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("old")}
                  aria-label={dictionary.showOld}
                >
                  {dictionary.oldLabel}
                </Button>
              </div>
            )}

            <div className="flex gap-2 self-start rounded-lg bg-white/10 p-1">
            <Button
              variant={locale === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLocaleAndUrl("en")}
              aria-label={dictionary.switchToEnglish}
            >
              EN
            </Button>
            <Button
              variant={locale === "id" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLocaleAndUrl("id")}
              aria-label={dictionary.switchToIndonesian}
            >
              ID
            </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                className="inline-flex h-9 items-center justify-center rounded-md bg-white/20 px-3 text-sm font-medium text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                href={`/cv/firman-agam-cv-web-${locale}.pdf`}
                rel="noreferrer"
                target="_blank"
              >
                {dictionary.downloadWebCV}
              </a>
              <a
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/40 bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                href={`/cv/firman-agam-cv-doc-${locale}.pdf`}
                rel="noreferrer"
                target="_blank"
              >
                {dictionary.downloadDocCV}
              </a>
              <a
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/40 bg-white/10 px-3 text-sm font-medium text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                href={`/cv/firman-agam-cv-ats-${locale}.pdf`}
                rel="noreferrer"
                target="_blank"
              >
                {dictionary.downloadATSCV}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {mode === "new" && (
        <>
          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{dictionary.summary}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{profile.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon size={18} /> {dictionary.profileLinks}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <a className="block text-primary underline-offset-4 hover:underline" href={profile.links.product} target="_blank" rel="noreferrer">
                  {dictionary.product}
                </a>
                <a className="block text-primary underline-offset-4 hover:underline" href={profile.links.portfolio} target="_blank" rel="noreferrer">
                  {dictionary.portfolio}
                </a>
                <a className="block text-primary underline-offset-4 hover:underline" href={profile.links.github} target="_blank" rel="noreferrer">
                  {dictionary.github}
                </a>
                {profile.links.linkedin && (
                  <a className="block text-primary underline-offset-4 hover:underline" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                    {dictionary.linkedin}
                  </a>
                )}
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseBusiness size={18} /> {dictionary.experience}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-6 border-l border-dashed border-muted pl-5">
                {profile.experience.map((job) => (
                  <li key={`${job.company}-${job.role}`} className="relative space-y-2">
                    <span className="absolute -left-[1.62rem] top-1 h-3 w-3 rounded-full bg-primary" />
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold md:text-lg">{job.role}</h3>
                      <CardDescription>
                        {job.company} · {job.location} · {periodLabel(job.period.start, job.period.end)}
                      </CardDescription>
                    </div>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <section className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap size={18} /> {dictionary.education}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.education.map((item) => (
                  <article key={`${item.institution}-${item.degree}`}>
                    <h3 className="font-semibold">{item.institution}</h3>
                    <p className="text-sm text-muted-foreground">{item.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.location} · {periodLabel(item.period.start, item.period.end)}
                    </p>
                  </article>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages size={18} /> {dictionary.languages}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.languages.map((lang) => (
                  <div className="flex items-center justify-between" key={lang.name}>
                    <span>{lang.name}</span>
                    <Badge variant="secondary">{lang.proficiency}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>{dictionary.skills}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {Object.entries(profile.skills).map(([group, values]) => (
                <article className="space-y-2" key={group}>
                  <h3 className="font-semibold capitalize">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </article>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      {mode === "old" && (
        <Card>
          <CardHeader>
            <CardTitle>{dictionary.oldArchiveTitle}</CardTitle>
            <CardDescription>{dictionary.oldArchiveDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white">
              <iframe
                title="Old CV"
                src="/old-cv/index.html"
                className="h-[80vh] w-full"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {!mode && (
        <div
          aria-labelledby="cv-version-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <Card className="w-full max-w-xl border-violet-200/30 bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle id="cv-version-dialog-title">{dictionary.chooseVersion}</CardTitle>
              <CardDescription>{dictionary.chooseVersionDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
                <li>
                  <span className="font-semibold text-slate-100">{dictionary.newLabel}:</span> {dictionary.newDesc}
                </li>
                <li>
                  <span className="font-semibold text-slate-100">{dictionary.oldLabel}:</span> {dictionary.oldDesc}
                </li>
              </ul>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="sm:flex-1" onClick={() => setMode("new")} aria-label={dictionary.openNew}>
                  {dictionary.openNew}
                </Button>
                <Button className="sm:flex-1" variant="outline" onClick={() => setMode("old")} aria-label={dictionary.openOld}>
                  {dictionary.openOld}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
