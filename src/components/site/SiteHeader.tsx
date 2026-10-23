import Link from "next/link";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-line">
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-2xl leading-none tracking-[-0.025em] text-paper transition-colors hover:text-accent focus-visible:text-accent"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>
        <p className="eyebrow hidden md:block">
          Portfolio / {siteConfig.year}
        </p>
        <p className="eyebrow flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse"
          />
          Phase {siteConfig.phase.current} — {siteConfig.phase.label}
        </p>
      </div>
    </header>
  );
}
