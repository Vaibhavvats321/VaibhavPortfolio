import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";

const metaItems = [
  { label: "Discipline", value: "[Pending]" },
  { label: "Location", value: "[Pending]" },
  {
    label: "Status",
    value: `Phase ${siteConfig.phase.current} / ${siteConfig.phase.total}`,
  },
] as const;

export function FoundationHero() {
  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[46%] size-[68rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.045] blur-[140px] md:size-[82rem]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-line-soft" />
      </div>

      <div className="page-shell flex min-h-[calc(100svh-5rem)] flex-col justify-between pb-8 pt-8 md:pb-12 md:pt-12">
        <Reveal className="flex items-center justify-between gap-6">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Portfolio / {siteConfig.year}
          </p>
          <p className="eyebrow hidden text-right sm:block">
            Phase {siteConfig.phase.current} — {siteConfig.phase.label}
          </p>
        </Reveal>

        <div className="py-14 md:py-20">
          <Reveal delay={0.08}>
            <h1
              id="hero-title"
              className="text-hero font-display font-normal text-paper"
            >
              Vaibhav<span className="text-accent">.</span>
            </h1>
          </Reveal>

          <div className="mt-8 grid gap-8 border-t border-line pt-6 md:mt-12 md:grid-cols-12 md:pt-8">
            <Reveal delay={0.16} className="md:col-span-5">
              <p className="max-w-md font-display text-[clamp(1.65rem,2.8vw,2.5rem)] italic leading-[1.06] tracking-[-0.015em] text-paper-dim">
                A developer portfolio, arriving in chapters.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="md:col-span-4 md:col-start-9">
              <p className="max-w-sm text-sm leading-7 text-muted">
                Phase {siteConfig.phase.current} establishes the visual language
                and engineering foundation. Selected work, experience, and contact
                details remain unpublished until verified information is supplied.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.32}>
          <dl className="grid gap-5 border-t border-line pt-6 sm:grid-cols-3">
            {metaItems.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-4 sm:block"
              >
                <dt className="eyebrow">{item.label}</dt>
                <dd className="mt-0 text-sm text-paper-dim sm:mt-2">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
