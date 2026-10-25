"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "vaibhav-portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // ignore
  }

  return "dark";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [mounted] = useState(() => typeof window !== "undefined");

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme, mounted]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const value: ThemeContextValue = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
