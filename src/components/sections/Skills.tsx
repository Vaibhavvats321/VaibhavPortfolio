"use client";

import { Reveal } from "@/components/motion/Reveal";
import SkillGlobe from "@/components/SkillGlobe";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-b border-[rgb(var(--border))]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[rgb(var(--primary))]" />
            Skills
          </p>
          <h2 id="skills-title" className="mt-6 font-display text-4xl tracking-tight text-[rgb(var(--text))] sm:text-5xl">
            A world of tools I build with
          </h2>
          <p className="mt-3 max-w-xl text-[rgb(var(--muted))]">
            Drag the globe to spin it. It picks the rotation back up on its own after a few seconds.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <SkillGlobe />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {skillCategories.map((cat) => (
              <span key={cat.name} className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[rgb(var(--muted))]">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: cat.color }} />
                {cat.name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
