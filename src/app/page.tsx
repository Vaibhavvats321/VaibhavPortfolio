import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { ProjectsCarousel } from "@/components/projects/ProjectsCarousel";
import { Skills } from "@/components/sections/Skills";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div className="aurora" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="page-noise pointer-events-none fixed inset-0 z-30 opacity-[0.025] mix-blend-soft-light"
      />
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="relative flex-1">
        <Hero />
        <Introduction />
        <Skills />
        <ProjectsCarousel />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
