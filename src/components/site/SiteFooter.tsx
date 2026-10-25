import { Heart } from "@/components/Heart";
import { siteConfig } from "@/config/site";
import { portfolio } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgb(var(--border))]">
      <div className="page-shell py-12 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#home"
              className="font-display text-3xl leading-none tracking-[-0.025em] text-[rgb(var(--text))] transition-colors hover:text-[rgb(var(--primary))] focus-visible:text-[rgb(var(--primary))]"
            >
              {siteConfig.fullName}
            </a>
            <p className="eyebrow mt-5">{portfolio.identity.positioning}</p>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[rgb(var(--muted))]">
              {portfolio.footer.note}
            </p>
            <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-[rgb(var(--muted))]">
              Built with <Heart /> by {siteConfig.fullName}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-4 md:col-start-7"
          >
            <p className="eyebrow">Index</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {portfolio.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[24px] items-center py-1 text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--primary))] focus-visible:text-[rgb(var(--primary))]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <p className="eyebrow">Built with</p>
            <p className="mt-5 text-sm leading-6 text-[rgb(var(--muted))]">
              {portfolio.footer.builtWith}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[rgb(var(--border))] pt-5">
          <p className="eyebrow">
            © {siteConfig.year} {siteConfig.fullName}
          </p>
          <a
            href="#home"
            className="eyebrow inline-flex min-h-[24px] items-center gap-2 py-1 transition-colors hover:text-[rgb(var(--primary))] focus-visible:text-[rgb(var(--primary))]"
          >
            {portfolio.footer.backToTop}
            <span aria-hidden="true">↑</span>
          </a>
          <p className="eyebrow hidden sm:block">Portfolio / {siteConfig.year}</p>
        </div>
      </div>
    </footer>
  );
}
