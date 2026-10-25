import { Reveal } from "@/components/motion/Reveal";
import { portfolio } from "@/content/portfolio";

export function Introduction() {
  const { introduction, identity } = portfolio;

  return (
    <section id="about" aria-labelledby="intro-title" className="border-b border-line">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {introduction.eyebrow}
            </p>
            <h2
              id="intro-title"
              className="mt-6 max-w-md font-display text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.035em] text-paper"
            >
              {introduction.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-paper-dim">
              {introduction.lede}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
              {identity.fullName} — {identity.positioning}
            </p>
            <div className="mt-8 border-t border-line pt-6">
              <p className="eyebrow">Coordinates</p>
              <dl className="mt-4 grid gap-3 text-sm text-paper-dim">
                <div className="flex items-baseline justify-between gap-6 border-b border-line-soft pb-2">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Discipline
                  </dt>
                  <dd>{introduction.facts[0].value}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 border-b border-line-soft pb-2">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Direction
                  </dt>
                  <dd>{introduction.facts[1].value}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 border-b border-line-soft pb-2">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
                    Location
                  </dt>
                  <dd>{introduction.facts[3].value}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={0.14}>
              <p className="max-w-2xl text-lg leading-9 text-paper sm:text-[1.2rem] sm:leading-[1.95]">
                {introduction.body}
              </p>
            </Reveal>

            <Reveal delay={0.22} className="mt-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-line py-4">
                <p className="eyebrow">{introduction.draftNote}</p>
                <span aria-hidden="true" className="h-px w-6 bg-accent" />
                <p className="eyebrow">{identity.positioning}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {introduction.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group border-t border-line pt-5 transition-colors hover:border-accent/60"
                  >
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="mt-3 text-base text-paper-dim">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
