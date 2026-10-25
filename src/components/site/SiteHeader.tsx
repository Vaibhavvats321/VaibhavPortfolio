"use client";

import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgb(var(--bg))]/90 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <a
          href="#home"
          aria-label={`${siteConfig.fullName}, back to top`}
          className="text-lg font-semibold tracking-tight text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--primary))] focus-visible:text-[rgb(var(--primary))]"
        >
          {siteConfig.fullName}
        </a>
        <div className="flex items-center gap-6">
          <SiteNav />
          <ThemeToggle />
        </div>
      </div>
      <div
        className={`h-px w-full transition-opacity duration-300 ${
          scrolled ? "bg-[rgb(var(--border))]/60 opacity-100" : "bg-[rgb(var(--border))]/60 opacity-0"
        }`}
      />
    </header>
  );
}
