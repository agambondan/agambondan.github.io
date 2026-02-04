"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type Locale = "en" | "id";

type LocaleToggleLabels = {
  enShort: string;
  idShort: string;
  english: string;
  indonesia: string;
  switchLanguage: string;
};

const defaultLabels: LocaleToggleLabels = {
  enShort: "EN",
  idShort: "ID",
  english: "English",
  indonesia: "Indonesia",
  switchLanguage: "Switch language"
};

type LocaleToggleProps = {
  locale: Locale;
  enHref: string;
  idHref: string;
  labels?: LocaleToggleLabels;
  mobile?: boolean;
  onSelect?: () => void;
};

export function LocaleToggle({
  locale,
  enHref,
  idHref,
  labels = defaultLabels,
  mobile = false,
  onSelect
}: LocaleToggleProps) {
  return (
    <div
      aria-label={labels.switchLanguage}
      className={cn("locale-toggle", mobile && "locale-toggle-mobile")}
      role="group"
    >
      <div className="locale-toggle-track">
        <Link
          aria-current={locale === "en" ? "page" : undefined}
          className={cn(
            "locale-toggle-option",
            locale === "en" ? "locale-toggle-option-active" : "locale-toggle-option-idle"
          )}
          href={enHref}
          onClick={onSelect}
          title={labels.english}
        >
          {labels.enShort}
        </Link>
        <Link
          aria-current={locale === "id" ? "page" : undefined}
          className={cn(
            "locale-toggle-option",
            locale === "id" ? "locale-toggle-option-active" : "locale-toggle-option-idle"
          )}
          href={idHref}
          onClick={onSelect}
          title={labels.indonesia}
        >
          {labels.idShort}
        </Link>
      </div>
    </div>
  );
}

