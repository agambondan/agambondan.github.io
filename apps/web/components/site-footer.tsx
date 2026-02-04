"use client";

import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { localeFromPathname, localeHref, type AppLocale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/firman-agam/", icon: Linkedin },
    { label: "GitHub", href: "https://github.com/agambondan", icon: Github },
    { label: "Instagram", href: "https://www.instagram.com/agammadesu/", icon: Instagram },
    { label: "Twitter", href: "https://twitter.com/AgamMADESU", icon: Twitter },
    { label: "Facebook", href: "https://www.facebook.com/agambondan", icon: Facebook }
  ] as const;
  const copy = getFooterCopy(locale);

  return (
    <footer className="site-footer mt-10 border-t">
      <div className="site-footer-shell mx-auto space-y-4 px-4 py-5 text-sm md:max-w-5xl md:px-8">
        <div className="space-y-2">
          <p className="site-footer-label">{copy.social}</p>
          <div className="site-footer-social flex flex-wrap items-center gap-2">
          {socialLinks.map((link) => (
            <a
              aria-label={link.label}
              className="site-footer-social-link"
              href={link.href}
              key={link.label}
              rel="noreferrer"
              target="_blank"
              title={link.label}
            >
              <link.icon aria-hidden="true" size={15} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        </div>

        <div className="site-footer-meta flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="site-footer-text font-medium">Firman Agam Portfolio</p>
            <p className="site-footer-text-muted">{copy.since}</p>
          </div>

          <div className="space-y-2">
            <p className="site-footer-label text-right">{copy.quickLinks}</p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Link className="site-footer-link" href={localeHref("/cv", locale)}>
                {copy.cv}
              </Link>
              <Link className="site-footer-link" href={localeHref("/blog", locale)}>
                {copy.blog}
              </Link>
              <a className="site-footer-link" href="https://github.com/agambondan" rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a className="site-footer-link" href="mailto:agamwork28@gmail.com">
                {copy.email}
              </a>
              <a className="site-footer-link" href="https://wa.me/6281214025919" rel="noreferrer" target="_blank">
                {copy.whatsapp}
              </a>
              <span className="site-footer-text-muted">© {currentYear}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function getFooterCopy(locale: AppLocale) {
  if (locale === "id") {
    return {
      since: "Dibangun sejak 2020",
      social: "Terhubung",
      quickLinks: "Akses cepat",
      cv: "CV",
      blog: "Blog",
      email: "Email",
      whatsapp: "WhatsApp"
    };
  }

  return {
    since: "Built since 2020",
    social: "Connect",
    quickLinks: "Quick links",
    cv: "CV",
    blog: "Blog",
    email: "Email",
    whatsapp: "WhatsApp"
  };
}
