"use client";

import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { localeFromPathname, localeHref } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const labels = {
    en: {
        brandAccent: "Agam",
        profile: "Profile",
        cv: "CV",
        blog: "Blog",
        contact: "Contact",
        english: "English",
        indonesia: "Indonesia",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        themeDark: "Dark",
        themeLight: "Light",
        switchToLight: "Switch to light theme",
        switchToDark: "Switch to dark theme",
        switchLanguage: "Switch language",
    },
    id: {
        brandAccent: "Agam",
        profile: "Profil",
        cv: "CV",
        blog: "Blog",
        contact: "Kontak",
        english: "English",
        indonesia: "Indonesia",
        menuOpen: "Buka menu",
        menuClose: "Tutup menu",
        themeDark: "Gelap",
        themeLight: "Terang",
        switchToLight: "Ubah ke tema terang",
        switchToDark: "Ubah ke tema gelap",
        switchLanguage: "Ganti bahasa",
    },
} as const;

const navLinks = (locale: "en" | "id") => {
    const t = labels[locale];
    return [
        { href: "/", label: t.profile },
        { href: "/cv", label: t.cv },
        { href: "/blog", label: t.blog },
    ];
};

function isActive(pathname: string, href: string): boolean {
    const normalizedPathname =
        pathname === "/id" || pathname.startsWith("/id/")
            ? pathname.replace(/^\/id/, "") || "/"
            : pathname;

    if (href === "/") {
        return normalizedPathname === "/";
    }

    return (
        normalizedPathname === href || normalizedPathname.startsWith(`${href}/`)
    );
}

export function SiteHeader() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const activePath = useMemo(() => pathname ?? "/", [pathname]);
    const locale = localeFromPathname(pathname);
    const t = labels[locale];

    function toLocalizedHref(path: string) {
        return localeHref(path, locale);
    }

    function currentPathWithLocale(targetLocale: "en" | "id") {
        const path = pathname ?? "/";
        return localeHref(path, targetLocale);
    }

    return (
        <header className='site-header sticky top-0 z-40 border-b'>
            <div className='mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8'>
                <Link
                    className='header-brand text-base font-semibold tracking-tight'
                    href={toLocalizedHref("/")}
                >
                    Firman{" "}
                    <span className='header-brand-accent'>{t.brandAccent}</span>
                </Link>

                <nav
                    aria-label='Primary'
                    className='hidden items-center gap-2 md:flex'
                >
                    {navLinks(locale).map((link) => (
                        <Link
                            key={`${link.href}-${link.label}`}
                            className={cn(
                                "header-link rounded-full px-3 py-1.5 text-sm transition-colors",
                                isActive(activePath, link.href)
                                    ? "header-link-active neon-outline"
                                    : "header-link-idle",
                            )}
                            href={toLocalizedHref(link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <LocaleToggle
                        enHref={currentPathWithLocale("en")}
                        idHref={currentPathWithLocale("id")}
                        labels={{
                            enShort: "EN",
                            idShort: "ID",
                            english: t.english,
                            indonesia: t.indonesia,
                            switchLanguage: t.switchLanguage,
                        }}
                        locale={locale}
                    />
                    <ThemeToggle
                        labels={{
                            dark: t.themeDark,
                            light: t.themeLight,
                            switchToLight: t.switchToLight,
                            switchToDark: t.switchToDark,
                        }}
                    />
                    <a
                        className='header-contact neon-outline ml-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors'
                        href='mailto:agamwork28@gmail.com'
                    >
                        {t.contact}
                    </a>
                </nav>

                <button
                    aria-controls='mobile-nav'
                    aria-expanded={isOpen}
                    aria-label={isOpen ? t.menuClose : t.menuOpen}
                    className='header-mobile-toggle inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden'
                    onClick={() => setIsOpen((current) => !current)}
                    type='button'
                >
                    {isOpen ? (
                        <X className='h-5 w-5' />
                    ) : (
                        <Menu className='h-5 w-5' />
                    )}
                </button>
            </div>

            {isOpen && (
                <nav
                    aria-label='Mobile primary'
                    className='header-mobile-panel border-t p-4 md:hidden'
                    id='mobile-nav'
                >
                    <div className='mx-auto flex max-w-6xl flex-col gap-2'>
                        {navLinks(locale).map((link) => (
                            <Link
                                key={`${link.href}-${link.label}`}
                                className={cn(
                                    "header-mobile-link rounded-md px-3 py-2 text-sm",
                                    isActive(activePath, link.href)
                                        ? "header-mobile-link-active"
                                        : "header-mobile-link-idle",
                                )}
                                href={toLocalizedHref(link.href)}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <LocaleToggle
                            enHref={currentPathWithLocale("en")}
                            idHref={currentPathWithLocale("id")}
                            labels={{
                                enShort: "EN",
                                idShort: "ID",
                                english: t.english,
                                indonesia: t.indonesia,
                                switchLanguage: t.switchLanguage,
                            }}
                            locale={locale}
                            mobile
                            onSelect={() => setIsOpen(false)}
                        />
                        <div className='mt-1'>
                            <ThemeToggle
                                labels={{
                                    dark: t.themeDark,
                                    light: t.themeLight,
                                    switchToLight: t.switchToLight,
                                    switchToDark: t.switchToDark,
                                }}
                            />
                        </div>
                        <a
                            className='header-mobile-contact mt-2 rounded-md px-3 py-2 text-sm font-medium'
                            href='mailto:agamwork28@gmail.com'
                            onClick={() => setIsOpen(false)}
                        >
                            {t.contact}
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
