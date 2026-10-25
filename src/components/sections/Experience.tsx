import { Reveal } from "@/components/motion/Reveal";
import { portfolio } from "@/content/portfolio";

export function Experience() {
  const { experience } = portfolio;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-b border-line"
    >
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {experience.eyebrow}
            </p>
            <h2
              id="experience-title"
              className="mt-6 max-w-md font-display text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.035em] text-paper"
            >
              {experience.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
              {experience.intro}
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <ol className="relative border-l border-line">
              {experience.items.map((item, index) => (
                <li key={item.id} className="relative pl-8 sm:pl-10">
                  <Reveal delay={0.12 + index * 0.1}>
                    <article className="group relative pb-14 last:pb-0">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[6px] top-2 size-3 rounded-full border border-accent bg-ink transition-shadow duration-500 group-hover:shadow-[0_0_0_8px_rgba(211,243,106,0.06)]"
                      />
                      <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8">
                        <div>
                          <p className="eyebrow">
                            {item.index} / {item.period}
                          </p>
                          <h3 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.8rem)] leading-[1.02] tracking-[-0.025em] text-paper">
                            {item.role}
                          </h3>
                          <p className="mt-3 text-sm text-paper-dim">
                            {item.organization}
                          </p>
                          <p className="mt-1 text-sm text-muted">
                            {item.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm leading-7 text-paper-dim">
                            {item.summary}
                          </p>
                          <ul className="mt-6 space-y-3">
                            {item.highlights.map((highlight) => (
                              <li
                                key={highlight}
                                className="flex items-start gap-4 text-sm leading-7 text-muted"
                              >
                                <span
                                  aria-hidden="true"
                                  className="mt-2.5 h-px w-4 shrink-0 bg-accent/70"
                                />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="eyebrow mt-6 flex items-center gap-3 text-accent">
                            <span
                              aria-hidden="true"
                              className="size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {item.status}
                          </p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal delay={0.22} className="mt-6">
              <p className="eyebrow">{experience.footnote}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
