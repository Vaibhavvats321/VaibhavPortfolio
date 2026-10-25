# PROJECT_SPEC — Vaibhav Portfolio

**Source of truth.** Read this document before starting every phase. Update it whenever requirements, architecture, or implementation decisions change.

| Field | Value |
| --- | --- |
| Project | Vaibhav Portfolio |
| Repository | `C:\Projects\VaibhavPortfolio` |
| Owner | Vaibhav (identity details pending confirmation) |
| Current phase | Phase 3 — Cinematic Visual Audit & Advanced Motion Polish (complete) |
| Status | Implemented and verified — awaiting owner approval before Phase 4 |
| Last updated | 2026-10-24 |
| Package manager | pnpm 10.26.2 |
| Node requirement | `>=22.12.0` (verified with 22.23.2) |

---

## 1. Product vision

Build a premium personal developer portfolio that feels like an authored editorial experience rather than a template. The site should make a strong first impression through typography, composition, restrained motion, and deliberate pacing, then make the work easy to understand and navigate.

The experience should feel cinematic without sacrificing clarity. It must remain fast, accessible, and honest about the owner's actual experience.

### Goals

1. Establish a distinctive visual identity that is recognisably Vaibhav's, not a clone of a reference site.
2. Present selected projects with enough context and craft to earn trust.
3. Use scroll, depth, and transitions to support the story rather than decorate it.
4. Ship a maintainable, strictly typed codebase with repeatable verification.
5. Work well on desktop, tablet, and mobile, including reduced-motion and keyboard users.

### Non-goals for this project

- No backend, database, authentication, CMS, or contact form service.
- No e-commerce, blog platform, or dashboard.
- No heavy 3D scene unless it materially improves the story.
- No invented employers, achievements, metrics, project results, or contact details.
- No generic dashboard cards, decorative glassmorphism, random gradient collections, or animation that harms readability.

### Success criteria

- A first-time visitor understands who the site belongs to and what they do within the first viewport.
- Selected projects are the strongest visual and informational moment of the page.
- The experience feels intentional on desktop and mobile, not merely scaled down.
- All content and interactions are real; placeholders are explicit `[Pending]` labels, not fake functionality.
- Lint, strict type-check, unit tests, production build, and browser tests pass before a phase is considered complete.

---

## 2. Reference research and licensing

**Reference:** https://threeui.com/landing-pages/kage-landing-page

**Observed direction (source-level inspection, 2026-10-23):**

- Full-height cinematic hero with a large display wordmark, editorial side copy, and a scroll cue.
- Five named scroll scenes with a persistent minimal navigation and camera/data-driven section transitions.
- Dark, near-black ground with pale type and a single saturated accent.
- A mix of expressive serif display type, clean sans body copy, and a small monospaced label system.
- Local Three.js world, local WebP foreground assets, scroll-reveal attributes, and explicit `prefers-reduced-motion` handling.

**Source and license findings:**

- The official source is publicly reachable in the MIT-licensed [ThreeUI Community repository](https://github.com/MengTo/threeui).
- `public/landing-pages/kage.html` (approximately 243 KB) is present, along with its local asset package and bundled Three.js runtime.
- Repository license: MIT. `ASSET-LICENSES.md` states that ThreeUI-authored Community imagery is MIT, bundled fonts are SIL Open Font License 1.1, and bundled Three.js files are MIT. Remote catalog previews and thumbnails are explicitly **not** covered by the repository's MIT license.
- There is a documentation discrepancy: the Kage page is presented as a complete authored experience and the README says Pro/Beta implementation source is excluded, yet a Kage document and assets are present in the public repository. Because the licensing boundary is not entirely unambiguous, Kage source and assets must **not** be copied into this repository.
- The reference thumbnail could not be visually inspected by the agent runtime used for this phase (image input unsupported). Design analysis is therefore based on the published description, DOM structure, styles, copy, and asset inventory.

**Reuse decision:** Use the reference only for high-level design principles: dramatic hierarchy, editorial typography, chapter-like pacing, layered depth, reduced-motion support, and restrained navigation. Do not reproduce Kage's temple subject matter, Japanese-language elements, copy, imagery, scene geometry, or visual assemblage. All identity, content, imagery, and eventually 3D work in this project must be original or properly licensed, with attribution recorded here if third-party material is ever added.

---

## 3. Identity and content policy

1. Never invent employers, job titles, dates, achievements, project metrics, client names, testimonials, locations, contact information, or social profiles.
2. Unknown information is rendered as clearly identified `[Pending]` placeholders or omitted entirely.
3. A placeholder must never look or behave like a working control. No dead links, fake forms, or empty navigation destinations.
4. External links are added only after the destination is verified and the owner approves publishing it.
5. Project screenshots must be the owner's own assets or have documented permission. Remote images require explicit license and availability checks.
6. Case studies should state what is known: problem, role, constraints, approach, stack, and verified outcome. Metrics appear only when verifiable.

### Content to collect before or during Phase 1

- Preferred display name and spelling, role/positioning statement, location (or intentional omission).
- Short biography, working principles, and a portrait or approved substitute visual.
- 2–4 selected projects: title, summary, role, year, stack, constraints, verified outcomes, screenshots, and live/source links.
- Skills grouped by capability; no percentage bars or invented proficiency levels.
- Professional experience: company, role, dates, and verified contributions.
- Public email and social links.
- Site title, description, canonical URL, and social preview assets for launch.

---

## 4. Technology stack

### Installed and verified

| Package | Version | Role |
| --- | --- | --- |
| next | 16.4.2 | App Router, rendering, image/font optimisation |
| react / react-dom | 19.3.1 | UI runtime |
| typescript | 5.9.3 | Strict static typing |
| tailwindcss | 4.3.3 | CSS-first styling and tokens |
| @tailwindcss/turbopack | 4.3.3 | Tailwind integration for Turbopack |
| motion | 14.6.0 | UI and scroll animation (client islands) |
| eslint | 9.39.5 | Linting |
| eslint-config-next | 16.4.2 | Next.js and accessibility rules |
| vitest | 5.0.5 | Unit tests |
| @vitejs/plugin-react | 6.1.2 | React transform for Vitest |
| vite | 8.3.5 | Vitest peer runtime |
| jsdom | 30.1.3 | Unit-test DOM |
| @testing-library/react | 16.3.3 | Component testing |
| @testing-library/dom | 10.4.2 | DOM queries peer |
| @testing-library/jest-dom | 7.0.1 | DOM matchers |
| @playwright/test | 1.64.1 | Browser verification |

### Deliberately deferred

- **three.js** — install only when a specific original scene is approved and has a measurable storytelling purpose.
- **GSAP** — install only if a scroll timeline cannot be expressed cleanly with Motion and the complexity is justified in this document.

### Version notes

- ESLint is intentionally pinned to the latest 9.x line. Next.js 16.4.2's bundled plugins declare peer support only through ESLint 9; ESLint 10 produced unmet peer warnings. Revisit when `eslint-config-next` supports 10.
- TypeScript 5.9.x is used rather than the TypeScript 7 major to stay within the versions supported by the current Next.js, ESLint, and testing toolchain.
- Core dependencies that define the framework are pinned exactly; tooling uses caret ranges and is locked by `pnpm-lock.yaml`.

---

## 5. Architecture

### Rendering model

- Next.js App Router with server components by default.
- Static prerendering for portfolio pages; no dynamic APIs in Phase 0.
- `cacheComponents` and `partialPrefetching` are enabled by the Next.js 16 scaffold. Re-evaluate only if they conflict with future interactive requirements.
- Client components are leaf islands with a clear reason to run in the browser. Animation wrappers live in `src/components/motion/`.
- Expensive optional scenes will be dynamically imported client-side with a static fallback and WebGL detection.

### Directory conventions

```text
src/
  app/                      Routes, metadata, global CSS, icons
  components/
    foundation/             Temporary Phase 0 content (removed in Phase 1)
    motion/                 Client-only reusable motion wrappers
    site/                   Header, footer, skip link, shared chrome
    sections/               Phase 1+: page sections
    ui/                     Phase 1+: small reusable primitives
  config/                   Typed site configuration
  content/                  Phase 1+: typed copy and project data
  lib/                      Framework-agnostic utilities
e2e/                        Playwright specs
```

Rules:

- Components stay small and focused; a section may compose smaller components but should not become a monolith.
- No barrel files unless they solve a real import problem.
- No duplicated design values in components when a token exists.
- Server components do not import client-only libraries.
- All user-facing copy lives in typed content/config modules once real content arrives, not scattered through JSX.
- Unit tests sit next to the code they test; browser tests live in `e2e/`.

### Styling model

- Tailwind CSS 4, configured through `@theme` in `src/app/globals.css`; no separate JavaScript Tailwind config.
- Design tokens are the source of truth for colour, type, spacing, and easing.
- Shared layout primitives are defined once as small component classes (`.page-shell`, `.eyebrow`) or utilities.
- Inline arbitrary values are acceptable for one-off art direction but must be promoted to a token when reused.
- No CSS-in-JS runtime.

### Configuration

`next.config.ts` keeps the scaffolded Turbopack/Tailwind integration, Cache Components, partial prefetching, and disables the `X-Powered-By` header.

`tsconfig.json` keeps `strict: true`, the `@/*` alias, and the Next.js TypeScript plugin. Type checks run separately from builds because Next.js 16 no longer runs ESLint during `next build`. The `typecheck` script runs `next typegen` first so generated `LayoutProps` route types exist on a clean checkout.

---

## 6. Design direction

### Concept: Intelligence, Systems, and Software in Motion

An ink-black stage, warm paper typography, and a single electric chartreuse signal, now anchored by an original technical environment. The mood is late-night engineering work: precise, quiet, confident, and human. The visual language combines software architecture, interconnected systems, AI-inspired neural structures, data flow, and computational geometry into restrained procedural art.

The hero uses an original Three.js neural-network scene: layered nodes, connected pathways, and subtle data packets moving through the system, with pointer and scroll depth. It is not a temple, fantasy landscape, generic cyberpunk city, stock AI brain, fake code block, or decorative terminal. The grid is strict; the typography is expressive; the accent is earned rather than sprayed across the page.

This direction deliberately avoids the reference's temple subject, vermilion/gold palette, Japanese motifs, and scene composition.

### Typography

| Role | Family | Usage |
| --- | --- | --- |
| Display | Instrument Serif | Name, hero wordmark, editorial statements, project titles |
| Body | Manrope | Paragraphs, navigation, supporting copy |
| Label | IBM Plex Mono | Eyebrows, indices, metadata, status labels |

- Hero type is fluid (`clamp`) and dominates the viewport without causing horizontal overflow.
- Body measure stays near 60–70 characters.
- Labels use uppercase monospace with generous tracking.
- Fonts are loaded through `next/font/google` (self-hosted by Next.js at build time) with `display: swap` and metric fallbacks.
- Instrument Serif, Manrope, and IBM Plex Mono are distributed under the SIL Open Font License 1.1.

### Colour tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--color-ink` | `#07080a` | Page ground |
| `--color-ink-raised` | `#0c0e11` | Alternate section surface |
| `--color-paper` | `#f3f0e8` | Primary text |
| `--color-paper-dim` | `#c7c3b9` | Editorial secondary text |
| `--color-muted` | `#8b8a84` | Metadata and supporting copy |
| `--color-line` | `rgb(243 240 232 / 0.16)` | Structural rules |
| `--color-line-soft` | `rgb(243 240 232 / 0.07)` | Quiet separators |
| `--color-accent` | `#d3f36a` | Signal accent, focus, status |
| `--color-accent-strong` | `#b7d94c` | Hover/pressed accent |
| `--color-accent-ink` | `#0a0b07` | Text on accent |

### Type and motion tokens

| Token | Value |
| --- | --- |
| `--text-hero` | `clamp(5.25rem, 22vw, 22rem)` |
| Hero line-height | `0.78` |
| Hero tracking | `-0.055em` |
| `--ease-editorial` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-entrance` | `cubic-bezier(0.22, 1, 0.36, 1)` |

Spacing uses Tailwind's base scale, with page gutters from `clamp(1.25rem, 4vw, 4.5rem)` and a maximum content width of `100rem`.

### Composition principles

- One strong focal point per viewport.
- Hairline rules and generous negative space instead of card grids.
- Numbers, labels, and status text create editorial rhythm.
- Depth comes from type scale, contrast, and restrained light—not from stacking glowing cards.
- Project presentation should eventually use full-bleed or asymmetric compositions with real screenshots, not generic thumbnails.
- Every section needs a reason to exist and a clear transition into the next.

---

## 7. Motion and 3D policy

### Motion

- Motion for React is the default animation tool.
- Phase 0 uses entrance reveals only. A reusable `Reveal` client island respects `prefers-reduced-motion`.
- Future scroll work may use Motion's scroll utilities, `useScroll`, and `useTransform`.
- Prefer `transform` and `opacity`; avoid layout-thrashing properties and long-running main-thread work.
- Motion must never be required to read content. Server-rendered content remains visible without JavaScript and with reduced motion.
- CSS animations and transitions are disabled or shortened globally under `prefers-reduced-motion`.
- GSAP is considered only if a specific, art-directed timeline cannot be delivered cleanly with Motion; the decision must be recorded here.

### 3D

- Three.js is now used for the approved original hero scene (`CinematicScene`): a procedural neural-network/systems visualization with WebGL, static fallback through the dynamic-import loading state, reduced-motion rendering, visibility pausing, and disposal on unmount.
- A 3D scene must add narrative value, use original or licensed assets, and have a designed fallback.
- Requirements for any 3D phase: dynamic import, WebGL capability check, static poster fallback, pause rendering offscreen, cap device pixel ratio, avoid blocking LCP, and no interaction that is unavailable to keyboard/reduced-motion users.

---

## 8. Content architecture

| # | Section | Status | Requirements |
| --- | --- | --- | --- |
| 1 | Navigation | Phase 1 | Minimal anchor navigation; only links to destinations that exist; accessible mobile treatment |
| 2 | Cinematic hero | Phase 1 | Name, positioning statement, one genuine primary action, opening composition |
| 3 | Introduction / about | Phase 1 | Verified biography, principles, optional portrait |
| 4 | Selected projects | Phase 2 | 2–4 premium case studies with own screenshots and verified details |
| 5 | Skills and capabilities | Phase 3 | Grouped capabilities, no fabricated proficiency meters |
| 6 | Professional experience | Phase 3 | Verified roles and dates; editorial timeline without invented outcomes |
| 7 | Contact / collaboration | Phase 4 | Real email and approved social links; no backend form |
| 8 | Footer | Phase 4 | Utility links, attribution, back-to-top if useful |

The Phase 0 foundation status section is temporary and will be removed when the real narrative arrives.

---

## 9. Phased roadmap

### Phase 0 — Foundation (current)

Scope: scaffold, tooling, design tokens, folder conventions, spec, README, initial verification loop, initial commit.

Acceptance criteria:

- Next.js App Router, strict TypeScript, Tailwind CSS, Motion, ESLint, Vitest, and Playwright configured.
- Token foundation and an accessible temporary foundation page exist.
- `PROJECT_SPEC.md`, `README.md`, `.gitignore`, `.editorconfig`, and `.gitattributes` exist.
- Lint, type-check, unit tests, production build, and Playwright tests pass.
- No content is invented; unverified fields are explicit placeholders.
- No heavy or unjustified dependencies are added.

### Phase 1 — Content intake, narrative hero, and introduction

Scope: collect verified identity content, replace the placeholder page, build navigation, cinematic hero, and about introduction. Establish the first real scroll transition.

Acceptance criteria: real content only; responsive composition; keyboard navigation; reduced-motion behavior; content readable without JavaScript; tests updated.

### Phase 2 — Selected projects

Scope: project data model, premium project compositions, screenshots, optional detail routes if justified.

Acceptance criteria: no fake project links; optimised local imagery; meaningful alt text; mobile compositions; no layout shift; verified metrics only.

### Phase 3 — Skills and experience

Scope: capability grouping, experience timeline, supporting details, cross-section rhythm.

Acceptance criteria: no unsupported claims; readable typography; accessible structure; consistent tokens; motion does not obscure information.

### Phase 4 — Contact, footer, and conversion

Scope: real contact paths, collaboration CTA, footer links, metadata for launch.

Acceptance criteria: verified links; no backend; privacy-conscious; visible focus states; no fake form.

### Phase 5 — Scroll storytelling and transitions

Scope: refine pacing, chapter transitions, parallax/depth, section reveals, navigation state.

Acceptance criteria: 60 fps target on representative hardware; content remains legible; reduced-motion parity; no horizontal overflow; no animation traps.

### Phase 6 — Optional 3D evaluation

Scope: decide whether an original Three.js scene improves the story; prototype only if approved.

Acceptance criteria: documented value, performance budget, fallback, lazy loading, mobile behavior, and accessible non-3D equivalent. If these cannot be met, do not ship 3D.

### Phase 7 — Accessibility, performance, SEO, and launch

Scope: audit and harden; Lighthouse/axe/Playwright checks; metadata, sitemap/robots, social preview; deployment verification.

Acceptance criteria: WCAG 2.2 AA target met for interactive content; performance budgets met or documented; no broken links; production build verified; launch checklist complete.

---

## 10. Verification requirements

### Commands

```bash
pnpm install
pnpm exec playwright install chromium

pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e

# Or the full loop:
pnpm verify
```

`pnpm test:e2e` expects a built app because Playwright starts it with `pnpm start`. `pnpm verify` builds before running browser tests.

### Required checks every phase

1. Lint passes with no errors.
2. Strict TypeScript check passes.
3. Unit tests pass.
4. Production build succeeds.
5. Playwright passes for desktop and mobile Chromium.
6. Keyboard-only pass: skip link, focus order, focus visibility, no traps.
7. Reduced-motion pass: content remains visible and usable.
8. Responsive pass at 320 px, 390 px, 768 px, 1024 px, 1440 px, and a wide desktop width.
9. No horizontal overflow.
10. No fake links, buttons, or form controls.
11. Content audit: every claim and contact detail is verified or explicitly `[Pending]`.
12. Performance sanity check: no new heavy client dependency without justification; local images optimised; 3D/WebGL work has a fallback.

### Performance and accessibility targets

- LCP ≤ 2.5 s, CLS ≤ 0.1, and INP ≤ 200 ms on a representative mid-tier mobile profile.
- Initial client JavaScript kept lean; 3D and below-the-fold heavy modules lazy-loaded.
- WCAG 2.2 AA contrast and interaction target for all text and controls.
- Motion is never the only signal for state or content.
- All remote assets require a recorded license and availability check.

Targets are goals to measure in Phase 7, not claims made in Phase 0.

---

## 11. Phase 0 completion checklist

- [x] Repository inspected; confirmed new project with no inherited source.
- [x] Next.js stable documentation and compatible versions verified.
- [x] Kage reference source and license investigated; reuse boundary documented.
- [x] Next.js App Router scaffold created at the repository root.
- [x] TypeScript strict mode, Tailwind CSS, ESLint, Vitest, and Playwright configured.
- [x] Design-token foundation established.
- [x] Accessible temporary foundation page implemented.
- [x] `PROJECT_SPEC.md`, `README.md`, `.gitignore`, `.editorconfig`, and `.gitattributes` created.
- [x] Heavy 3D dependencies intentionally deferred.
- [x] Lint, type-check, unit tests, build, and browser tests verified.
- [x] Development server smoke test verified.
- [x] Initial repository state reviewed and verified safe to commit.

---

## 12. Open issues and decisions

| Item | Status | Notes |
| --- | --- | --- |
| Identity content | Blocked on owner input | Role, location, email, socials, biography, projects, and experience are pending |
| Display name spelling | Needs confirmation | Repository implies "Vaibhav"; confirm preferred public spelling and wordmark |
| Kage license ambiguity | Resolved for this project | Source is publicly MIT-listed, but Pro/README inconsistency means no code or assets will be copied |
| Visual inspection of reference thumbnail | Limitation noted | Agent runtime could not process images; analysis used source structure and copy |
| 3D scene | Deferred | Evaluate only after narrative and projects are real; must justify cost and fallback |
| GSAP | Not installed | Motion must be insufficient for a specific timeline before adding GSAP |
| ESLint 10 | Deferred | Next.js 16.4.2 plugins currently declare peer support through ESLint 9 |
| Deployment target and canonical URL | Pending | Needed for metadata, sitemap, and social previews before launch |
| Placeholder foundation page | Temporary | Remove in Phase 1 when real narrative content lands |

---

## 13. Verification log

| Date | Command | Result |
| --- | --- | --- |
| 2026-10-23 | `pnpm install` | Passed; dependencies installed with pnpm 10.26.2 |
| 2026-10-23 | `pnpm lint` | Passed with no errors |
| 2026-10-23 | `pnpm typecheck` | Passed after adding `next typegen` before `tsc --noEmit` |
| 2026-10-23 | `pnpm test` | Passed; 2 files, 4 tests |
| 2026-10-23 | `pnpm build` | Passed; `/`, `/_not-found`, and `/icon.svg` statically prerendered |
| 2026-10-23 | `pnpm test:e2e` | Passed; 18 tests across desktop, tablet, and mobile Chromium, including no-console-error, reduced-motion, and no-JavaScript checks |
| 2026-10-23 | `pnpm verify` | Passed end-to-end after the Vitest config rename |
| 2026-10-23 | `pnpm dev --port 3100` + HTTP request | Passed; HTTP 200 and expected server-rendered content |
| 2026-10-23 | Clean-checkout `pnpm typecheck` (no `.next` or `next-env.d.ts`) | Passed; `next typegen` regenerated the required route types |

---

## 14. Change log

- **2026-10-23 — Phase 0:** Created the project scaffold, tooling, token foundation, temporary accessible landing page, reference/licensing research, and project documentation.
- **2026-10-23 — Phase 1:** Replaced the temporary foundation page with navigation, a cinematic hero with restrained motion, an introduction section, and placeholder sections for Work/Experience/Contact. Centralized typed content in `src/content/portfolio.ts`, refined header/nav/footer, added a reduced-motion-safe hero signal, and updated tests/e2e/README/PROJECT_SPEC. No Third-party assets, Three.js, or GSAP were added; placeholders remain explicit and non-functional.
- **2026-10-23 — Phase 2:** Added typed projects, experience, and contact content to `src/content/portfolio.ts`; implemented `Projects`, `Experience`, and `Contact` sections with responsive editorial layouts, disabled/pending link states, and section reveals via existing `Reveal`/Motion. Wired sections into the home page, updated metadata/navigation/content to use Vaibhav Vats identity, and expanded tests/e2e/README/PROJECT_SPEC. No new dependencies added; placeholders remain explicit and non-functional.
- **2026-10-24 — Phase 3:** Completed a browser-based visual audit and polished the Editorial Nocturne UI: larger cinematic hero composition, original SVG signal artwork, responsive section rhythm, project-card previews and hover/focus states, experience timeline nodes, contact cards, active navigation, reduced-motion and no-JS support, and accessible footer targets. Refined `Reveal` to use viewport-triggered Motion, added `HeroDepth` parallax, and expanded Playwright checks for reveals, navigation state, footer targets, mobile menu, reduced motion, and no-JS reading. No dependencies added.
- **2026-10-24 — Visual direction correction:** Replaced the generic cinematic hero background with an original procedural Three.js neural-network/systems scene communicating software engineering and AI engineering. Updated `PROJECT_SPEC.md` to document the approved concept "Intelligence, Systems, and Software in Motion." No new dependencies added.
- **2026-10-24 — Major visual redesign:** Reworked the hero into a focused computational core with orbital rings, satellite nodes, signal nodes, connecting pathways, and data packets; improved project preview diagrams, contrast, and responsive composition. Captured before/after screenshots at desktop, tablet, mobile, and narrow widths. `pnpm verify` passed (lint, typecheck, 2 unit tests, build, 27/30 Playwright with 3 skipped).
