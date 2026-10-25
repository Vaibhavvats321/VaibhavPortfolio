import { Reveal } from "@/components/motion/Reveal";
import { portfolio } from "@/content/portfolio";

export function Projects() {
  const { projects } = portfolio;

  return (
    <section
      id="work"
      aria-labelledby="projects-title"
      className="border-b border-line bg-ink-raised/25"
    >
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {projects.eyebrow}
            </p>
            <h2
              id="projects-title"
              className="mt-6 max-w-md font-display text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.035em] text-paper"
            >
              {projects.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
              {projects.intro}
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <ol className="space-y-8">
              {projects.items.map((project, index) => (
                <li key={project.id} className="relative">
                  <Reveal delay={0.12 + index * 0.1}>
                    <article className="group relative grid gap-6 overflow-hidden border border-line bg-ink-raised/15 p-6 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 md:p-8 lg:p-12">
                      <div className="flex flex-col justify-between gap-6">
                        <div>
                          <div className="flex items-start justify-between gap-6">
                            <div>
                              <p className="eyebrow">
                                {project.index} / {project.year}
                              </p>
                              <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[0.98] tracking-[-0.03em] text-paper">
                                {project.name}
                              </h3>
                            </div>
                            <span
                              aria-hidden="true"
                              className="mt-1 hidden size-9 items-center justify-center rounded-full border border-line text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:flex"
                            >
                              ↗
                            </span>
                          </div>
                          <p className="mt-5 max-w-md text-sm leading-7 text-paper-dim">
                            {project.description}
                          </p>
                        </div>
                        <div>
                          <p className="eyebrow">Technologies</p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <li
                                key={tech}
                                className="border border-line px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6">
                        <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(211,243,106,0.09),transparent_55%),repeating-linear-gradient(0deg,transparent_0,transparent_24px,rgba(243,240,232,0.035)_24px,rgba(243,240,232,0.035)_25px)]"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[90px] transition-opacity duration-500 group-hover:opacity-80"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center justify-center p-6"
                          >
                            <svg
                              viewBox="0 0 320 200"
                              className="h-full w-full max-w-[18rem] opacity-80"
                              fill="none"
                            >
                              <g stroke="var(--color-line)" strokeWidth="1">
                                <rect x="18" y="28" width="72" height="40" rx="4" />
                                <rect x="124" y="18" width="72" height="40" rx="4" />
                                <rect x="124" y="78" width="72" height="40" rx="4" />
                                <rect x="230" y="52" width="72" height="40" rx="4" />
                                <path d="M90 48h34M90 48v40h34M196 38h34M196 98h34" />
                              </g>
                              <g fill="var(--color-accent)">
                                <circle cx="90" cy="48" r="3" />
                                <circle cx="196" cy="38" r="3" />
                                <circle cx="196" cy="98" r="3" />
                                <circle cx="230" cy="72" r="3" />
                              </g>
                              <text
                                x="54"
                                y="52"
                                textAnchor="middle"
                                className="fill-[var(--color-muted)] font-mono text-[8px] uppercase tracking-[0.18em]"
                              >
                                API
                              </text>
                              <text
                                x="160"
                                y="42"
                                textAnchor="middle"
                                className="fill-[var(--color-muted)] font-mono text-[8px] uppercase tracking-[0.18em]"
                              >
                                MODEL
                              </text>
                              <text
                                x="160"
                                y="102"
                                textAnchor="middle"
                                className="fill-[var(--color-muted)] font-mono text-[8px] uppercase tracking-[0.18em]"
                              >
                                DATA
                              </text>
                              <text
                                x="266"
                                y="76"
                                textAnchor="middle"
                                className="fill-[var(--color-muted)] font-mono text-[8px] uppercase tracking-[0.18em]"
                              >
                                OUTPUT
                              </text>
                            </svg>
                          </div>
                          <div
                            aria-hidden="true"
                            className="absolute left-5 top-5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted"
                          >
                            Pending preview
                          </div>
                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 border-t border-line bg-ink/40 px-5 py-3 backdrop-blur-[1px]">
                            <p className="eyebrow min-w-0 truncate">
                              {project.thumbnail.alt}
                            </p>
                            <p className="eyebrow shrink-0 text-accent">
                              {project.status}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="eyebrow">Links</p>
                          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
                            {project.links.map((link) => (
                              <span
                                key={link.label}
                                className="group/link inline-flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted"
                              >
                                <span>{link.label}</span>
                                <span
                                  aria-hidden="true"
                                  className="text-accent/60 transition-colors group-hover/link:text-accent"
                                >
                                  —
                                </span>
                                <span className="text-muted">
                                  {link.href ? link.href : "[Pending]"}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal delay={0.24} className="mt-8">
              <p className="eyebrow">{projects.footnote}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
