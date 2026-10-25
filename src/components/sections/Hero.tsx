import { HeroSceneLoader } from "@/components/motion/HeroSceneLoader";
import { Reveal } from "@/components/motion/Reveal";
import { portfolio } from "@/content/portfolio";

export function Hero() {
  const { hero, identity } = portfolio;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-[rgb(var(--border))]"
    >
      <div className="aurora" aria-hidden="true" />

      <div className="page-shell relative z-10 flex min-h-[calc(100svh-5rem)] flex-col pb-8 pt-8 sm:pb-10 sm:pt-10">
        <div className="grid flex-1 items-center gap-6 lg:grid-cols-[1fr_minmax(0,1fr)] lg:gap-0">
          <div className="relative z-10">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
                Hello, I&apos;m
              </p>
              <h1
                id="hero-title"
                className="mt-2 text-balance font-sans text-[clamp(3.75rem,8.5vw,7rem)] font-bold leading-[1.02] tracking-[-0.02em] text-[rgb(var(--text))]"
              >
                Vaibhav Vats
                </h1>
            </Reveal>

            <Reveal delay={0.12} className="mt-2">
              <p className="text-lg font-medium text-[rgb(var(--text))] sm:text-xl">
                {identity.positioning}
              </p>
            </Reveal>

            <Reveal delay={0.18} className="mt-4 max-w-xl">
              <p className="text-base leading-7 text-[rgb(var(--muted))] sm:text-[1.0625rem] sm:leading-8">
                {hero.summary}
              </p>
            </Reveal>

            <Reveal delay={0.24} className="mt-9">
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[rgb(var(--primary))] px-7 py-3 font-medium text-[rgb(var(--bg))] transition-transform hover:scale-[1.02] focus-visible:scale-[1.02]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>
                <a
                  href={hero.primaryAction.href}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[rgb(var(--border))] px-7 py-3 font-medium text-[rgb(var(--text))] transition-colors hover:border-[rgb(var(--primary))]/70 hover:text-[rgb(var(--primary))]"
                >
                  {hero.primaryAction.label}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          <HeroSceneLoader className="relative flex items-center justify-center lg:h-full" />
        </div>

        <Reveal delay={0.36} className="mt-10 flex items-center justify-center gap-3 sm:mt-12">
          <a href="#about" className="group inline-flex items-center gap-3 text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--primary))]">
            <span>{hero.nextLabel}</span>
            <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--border))] transition-transform group-hover:translate-y-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
