import { FoundationHero } from "@/components/foundation/FoundationHero";
import { FoundationStatus } from "@/components/foundation/FoundationStatus";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SkipLink } from "@/components/site/SkipLink";

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      <div
        aria-hidden="true"
        className="page-noise pointer-events-none fixed inset-0 z-30 opacity-[0.035] mix-blend-soft-light"
      />
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="relative flex-1">
        <FoundationHero />
        <FoundationStatus />
      </main>
      <SiteFooter />
    </div>
  );
}
