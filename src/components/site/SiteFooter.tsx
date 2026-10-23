import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="page-shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="eyebrow">
          © {siteConfig.year} {siteConfig.name}
        </p>
        <p className="eyebrow">Next.js / Tailwind CSS / Motion</p>
        <p className="eyebrow">
          Phase {siteConfig.phase.current} of {siteConfig.phase.total}
        </p>
      </div>
    </footer>
  );
}
