export type AppLocale = "en" | "id";

export function parseAppLocale(input?: string | string[]): AppLocale {
  const value = Array.isArray(input) ? input[0] : input;
  return value === "id" ? "id" : "en";
}

export function localeHref(path: string, locale: AppLocale): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const cleanPath = path === "" ? "/" : path;
  const pathWithoutId = cleanPath === "/id" || cleanPath.startsWith("/id/")
    ? cleanPath.replace(/^\/id/, "") || "/"
    : cleanPath;

  if (locale === "en") {
    return pathWithoutId;
  }

  if (pathWithoutId === "/") {
    return "/id";
  }

  return `/id${pathWithoutId}`;
}

export function localeFromPathname(pathname?: string | null): AppLocale {
  if (!pathname) {
    return "en";
  }

  return pathname === "/id" || pathname.startsWith("/id/") ? "id" : "en";
}
