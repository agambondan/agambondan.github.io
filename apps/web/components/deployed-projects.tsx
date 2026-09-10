import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deployedProjects } from "@/lib/deployed-projects";
import type { AppLocale } from "@/lib/i18n";
import { ArrowUpRight } from "lucide-react";

type DeployedProjectsProps = {
  locale: AppLocale;
  liveLabel: string;
};

export function DeployedProjects({ locale, liveLabel }: DeployedProjectsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {deployedProjects.map((project, index) => (
        <Card
          className="glass-card fade-up"
          key={project.url}
          style={{ animationDelay: `${index * 0.06}s` }}
        >
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="project-card-title text-lg">
                <a
                  className="profile-link inline-flex items-center gap-1 hover:underline"
                  href={project.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.name}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </CardTitle>
              <span className="inline-flex items-center gap-1.5 text-xs profile-text-secondary">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {liveLabel}
              </span>
            </div>
            <p className="type-body project-card-body">{project.description[locale]}</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge className="profile-chip profile-chip-primary" key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
