"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "web-theme";

type ThemeToggleLabels = {
  dark: string;
  light: string;
  switchToLight: string;
  switchToDark: string;
};

const defaultLabels: ThemeToggleLabels = {
  dark: "Dark",
  light: "Light",
  switchToLight: "Switch to light theme",
  switchToDark: "Switch to dark theme"
};

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);
}

export function ThemeToggle({ labels = defaultLabels }: { labels?: ThemeToggleLabels }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme: Theme = stored === "light" ? "light" : "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      aria-label={theme === "dark" ? labels.switchToLight : labels.switchToDark}
      className="theme-toggle-btn neon-outline inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium"
      onClick={toggleTheme}
      type="button"
    >
      {!mounted || theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
      <span>{!mounted || theme === "dark" ? labels.dark : labels.light}</span>
    </button>
  );
}
