import { Reveal } from "@/components/motion/Reveal";
import { portfolio } from "@/content/portfolio";

export function Contact() {
  const { contact } = portfolio;

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-b border-line">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {contact.eyebrow}
            </p>
            <h2
              id="contact-title"
              className="mt-6 max-w-md font-display text-[clamp(2.8rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.035em] text-paper"
            >
              {contact.title}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
              {contact.body}
            </p>
          </Reveal>

          <div className="md:col-span-7 md:col-start-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Reveal delay={0.12}>
                <div className="group relative overflow-hidden border border-line p-6 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-accent/40 md:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-accent/[0.04] blur-[70px]"
                  />
                  <div className="relative">
                    <p className="eyebrow">Email</p>
                    <p className="mt-4 text-lg text-paper-dim">
                      {contact.email ? contact.email : "[Pending]"}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      Published only when a verified email is available.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="group relative overflow-hidden border border-line p-6 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-accent/40 md:p-8">
                  <div
                    aria-hidden="true"
                    className="absolute -left-20 bottom-0 h-36 w-36 rounded-full bg-accent/[0.035] blur-[70px]"
                  />
                  <div className="relative">
                    <p className="eyebrow">Elsewhere</p>
                    <ul className="mt-4 space-y-3">
                      {contact.links.map((link) => (
                        <li key={link.label}>
                          <span className="group/link inline-flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted">
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
                <div>
                  <p className="eyebrow">Resume</p>
                  <p className="mt-3 text-lg text-paper-dim">
                    {contact.resume.href ? contact.resume.href : "[Pending]"}
                  </p>
                </div>
                <p className="eyebrow flex items-center gap-3 text-accent">
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {contact.note}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
