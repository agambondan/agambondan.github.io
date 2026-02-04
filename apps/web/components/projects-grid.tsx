"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { GithubProject } from "@/lib/github-projects";
import type { AppLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useMemo, useState } from "react";

type ProjectsGridLabels = {
  updated: string;
  fallbackProjectDesc: string;
  seeAllProjects: string;
  loadMore: string;
  showingProjects: string;
  allProjectsLoaded: string;
};

type ProjectsGridProps = {
  projects: GithubProject[];
  locale: AppLocale;
  labels: ProjectsGridLabels;
};

const INITIAL_VISIBLE = 6;
const LOAD_MORE_STEP = 6;

function toReadableDate(input: string, locale: AppLocale): string {
  return new Date(input).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    month: "short",
    year: "numeric"
  });
}

export function ProjectsGrid({ projects, locale, labels }: ProjectsGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const totalProjects = projects.length;
  const safeVisibleCount = Math.min(visibleCount, totalProjects);

  const visibleProjects = useMemo(
    () => projects.slice(0, safeVisibleCount),
    [projects, safeVisibleCount]
  );

  const hasMore = safeVisibleCount < totalProjects;

  function onLoadMore() {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_STEP, totalProjects));
  }

  return (
    <>
      <p className="type-caption profile-text-secondary fade-up">
        {labels.showingProjects.replace("{shown}", String(safeVisibleCount)).replace("{total}", String(totalProjects))}
      </p>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <Card
            className="glass-card fade-up"
            key={project.html_url}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="project-card-title text-lg">
                  <a
                    className="profile-link hover:underline"
                    href={project.html_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {project.name}
                  </a>
                </CardTitle>
                <span className="inline-flex items-center gap-1 text-xs profile-text-secondary">
                  <Star className="h-3.5 w-3.5" /> {project.stargazers_count}
                </span>
              </div>
              <CardDescription className="type-body project-card-body">
                {project.description || labels.fallbackProjectDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="profile-chip profile-chip-primary" variant="secondary">
                  {project.language}
                </Badge>
                <Badge className="profile-chip profile-chip-secondary" variant="secondary">
                  {labels.updated} {toReadableDate(project.updated_at, locale)}
                </Badge>
              </div>
              {project.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.topics.slice(0, 2).map((topic) => (
                    <Badge className="profile-chip profile-chip-tertiary" key={topic} variant="secondary">
                      #{topic}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      <div className="fade-up flex flex-wrap items-center gap-3">
        {hasMore ? (
          <button
            className={cn(
              buttonVariants({ variant: "outline" }),
              "profile-button-outline w-full md:w-auto"
            )}
            onClick={onLoadMore}
            type="button"
          >
            {labels.loadMore}
          </button>
        ) : (
          <p className="type-caption profile-text-secondary">{labels.allProjectsLoaded}</p>
        )}
        <a
          className={cn(
            buttonVariants({ variant: "outline" }),
            "profile-button-outline w-full md:w-auto"
          )}
          href="https://github.com/agambondan?tab=repositories"
          rel="noreferrer"
          target="_blank"
        >
          {labels.seeAllProjects}
        </a>
      </div>
    </>
  );
}
