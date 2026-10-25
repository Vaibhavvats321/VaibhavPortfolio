"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center rounded-full border border-[rgb(var(--border))] p-1" role="group" aria-label="Theme switcher">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-pressed={theme === "light"}
        aria-label="Switch to light theme"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          theme === "light"
            ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
            : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-pressed={theme === "dark"}
        aria-label="Switch to dark theme"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          theme === "dark"
            ? "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]"
            : "text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
    </div>
  );
}
