"use client";

import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { portfolio } from "@/content/portfolio";
import { cx } from "@/lib/cx";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = portfolio.navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) {
          setActiveHref(`#${current.target.id}`);
        }
      },
      {
        rootMargin: "-42% 0px -50% 0px",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setIsOpen(false);
      }
    };

    desktop.addEventListener("change", closeOnDesktop);

    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-6">
          {portfolio.navigation.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cx(
                    "text-sm transition-colors hover:text-[rgb(var(--primary))] focus-visible:text-[rgb(var(--primary))]",
                    isActive ? "text-[rgb(var(--text))]" : "text-[rgb(var(--muted))]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={menuButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex min-h-11 items-center gap-3 text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--text))] focus-visible:text-[rgb(var(--text))] md:hidden"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={cx(
              "absolute left-0 top-1/2 h-px w-full bg-current transition-transform duration-300",
              isOpen ? "rotate-45" : "-translate-y-1",
            )}
          />
          <span
            className={cx(
              "absolute left-0 top-1/2 h-px w-full bg-current transition-transform duration-300",
              isOpen ? "-rotate-45" : "translate-y-1",
            )}
          />
        </span>
      </button>

      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/98 backdrop-blur md:hidden"
      >
        <nav aria-label="Mobile primary" className="page-shell py-4">
          <ul>
            {portfolio.navigation.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <li key={item.href} className="border-b border-[rgb(var(--border))]/60">
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={cx(
                      "flex items-center justify-between gap-6 py-3 text-lg transition-colors",
                      isActive ? "text-[rgb(var(--text))]" : "text-[rgb(var(--muted))]",
                    )}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
