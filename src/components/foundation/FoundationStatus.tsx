import { Reveal } from "@/components/motion/Reveal";
import { cx } from "@/lib/cx";

const items = [
  {
    index: "01",
    title: "Design system",
    status: "Established",
    description:
      "A restrained palette, editorial type scale, spacing, and motion tokens carry the experience.",
  },
  {
    index: "02",
    title: "Engineering",
    status: "Verified",
    description:
      "Next.js App Router, strict TypeScript, Tailwind CSS, and a repeatable verification loop.",
  },
  {
    index: "03",
    title: "Content",
    status: "Pending",
    description:
      "Projects, experience, and contact details are intentionally withheld until approved.",
  },
  {
    index: "04",
    title: "Next chapter",
    status: "Phase 1",
    description:
      "The cinematic hero narrative and introduction, pending direction approval.",
  },
] as const;

export function FoundationStatus() {
  return (
    <section
      id="foundation"
      aria-labelledby="foundation-title"
      className="border-t border-line bg-ink-raised/40"
    >
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">00 / Foundation</p>
            <h2
              id="foundation-title"
              className="mt-5 max-w-xs font-display text-[clamp(2.6rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.03em] text-paper"
            >
              The groundwork is set.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              This phase is deliberately small: establish the system, verify the
              toolchain, and leave the storytelling for the chapters that follow.
            </p>
          </Reveal>

          <ol className="border-t border-line md:col-span-7 md:col-start-6">
            {items.map((item) => (
              <li
                key={item.index}
                className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-5"
              >
                <span className="eyebrow text-accent">{item.index}</span>
                <div>
                  <p className="text-base text-paper">{item.title}</p>
                  <p className="mt-1 max-w-md text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </div>
                <span
                  className={cx(
                    "eyebrow sm:text-right",
                    item.status === "Pending" && "text-accent",
                  )}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
