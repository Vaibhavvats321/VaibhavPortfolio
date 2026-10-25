"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

type Project = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  github?: string | null;
  demo?: string | null;
  year?: string;
};

const projects: Project[] = [
  {
    id: "proj-1",
    name: "Codes Collection",
    description: "A curated collection of programming solutions across multiple languages.",
    tags: ["C", "C++", "Java", "Algorithms"],
    github: "https://github.com/vaibhavvats/Codes",
    demo: null,
    year: "2024",
  },
  {
    id: "proj-2",
    name: "OS Algorithms",
    description: "Operating system algorithm implementations including scheduling and memory management.",
    tags: ["C", "OS", "Algorithms"],
    github: "https://github.com/vaibhavvats/OS-Codes",
    demo: null,
    year: "2024",
  },
];

export function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const reduce = useReducedMotion();

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % projects.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!paused.current) {
        next();
      }
    }, 7000);
    return () => clearInterval(id);
  }, [next, reduce]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (card) {
      el.scrollTo({ left: card.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
  }, [index, reduce]);

  return (
    <section id="work" aria-labelledby="projects-title" className="border-b border-[rgb(var(--border))]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[rgb(var(--primary))]" />
            Work
          </p>
          <h2 id="projects-title" className="mt-6 font-display text-4xl tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            Selected projects
          </h2>
          <p className="mt-3 max-w-xl text-[rgb(var(--muted))]">
            A focused set of projects. GitHub links are shown when available.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-12"
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            onFocusCapture={() => (paused.current = true)}
            onBlurCapture={() => (paused.current = false)}
          >
            <button
              type="button"
              aria-label="Previous project"
              onClick={prev}
              className="absolute -left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 text-[rgb(var(--text))] shadow-lg backdrop-blur transition-colors hover:border-[rgb(var(--primary))]/60 hover:text-[rgb(var(--primary))] sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={next}
              className="absolute -right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))]/90 text-[rgb(var(--text))] shadow-lg backdrop-blur transition-colors hover:border-[rgb(var(--primary))]/60 hover:text-[rgb(var(--primary))] sm:flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div
              ref={trackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="w-[88%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl text-[rgb(var(--text))]">{project.name}</h3>
                      {project.year && (
                        <span className="font-mono text-xs text-[rgb(var(--muted))]">{project.year}</span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-7 text-[rgb(var(--muted))]">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[rgb(var(--border))] px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-[rgb(var(--border))] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--text))] transition-colors hover:border-[rgb(var(--primary))]/60 hover:text-[rgb(var(--primary))]"
                        >
                          GitHub →
                        </a>
                      ) : (
                        <span className="rounded-full border border-[rgb(var(--border))] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                          GitHub — [Pending]
                        </span>
                      )}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-[rgb(var(--primary))] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--bg))] transition-transform hover:scale-[1.02]"
                        >
                          Live demo →
                        </a>
                      ) : (
                        <span className="rounded-full border border-[rgb(var(--border))] px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-[rgb(var(--muted))]">
                          Live demo — [Pending]
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to project ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-[rgb(var(--primary))]" : "w-2 bg-[rgb(var(--border))]"}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
