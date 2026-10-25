# Vaibhav Portfolio

A cinematic, editorial personal developer portfolio. The project is being built in reviewed phases, with `PROJECT_SPEC.md` as the source of truth.

**Status:** Phase 3 — Cinematic Visual Audit & Advanced Motion Polish complete. Content is published only when verified; placeholders and unlinked actions are explicit and non-functional.

## Stack

- Next.js 16 App Router with React 19 and strict TypeScript
- Tailwind CSS 4 with CSS-first design tokens
- Motion for React for isolated UI animation
- Vitest + Testing Library for unit tests
- Playwright for browser-level verification
- pnpm as the package manager

Three.js powers the existing interactive hero and skills scenes. GSAP remains deferred.

## Requirements

- Node.js 22.12 or newer (verified with 22.23.2)
- pnpm 10.26.2 (declared through `packageManager`)

## Getting started

```bash
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

Open http://localhost:3000.

## GitHub Pages deployment

The `main` branch deploys automatically to
<https://vaibhavvats321.github.io/VaibhavPortfolio/> through GitHub Actions. The workflow
can also be started manually from the Actions tab. In the repository settings, set
**Pages → Build and deployment → Source** to **GitHub Actions**.

The production build uses Next.js static export and the `/VaibhavPortfolio` base path.
After `pnpm build`, run `pnpm start` to preview the exported site locally at
<http://127.0.0.1:3000/VaibhavPortfolio/>.

GitHub Pages only hosts static files. This portfolio currently has no server-dependent
routes or features; its interactive scenes and theme behavior run in the browser.

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Create a production build |
| `pnpm start` | Preview the exported site at `/VaibhavPortfolio/` |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Apply ESLint fixes |
| `pnpm typecheck` | Generate route types and run `tsc --noEmit` |
| `pnpm test` | Run Vitest once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm test:e2e` | Run Playwright against the built app (run `pnpm build` first) |
| `pnpm verify` | Run lint, type-check, unit tests, build, and browser tests |

## Structure

```text
src/
  app/                  App Router entry points and global styles
  components/
    motion/             Client-only Motion wrappers
    sections/           Page sections (hero, introduction, projects, experience, contact)
    site/               Shared site chrome (header/nav/footer/skip link)
    ui/                 Reserved for small reusable primitives
  config/               Typed site configuration
  content/              Typed portfolio content and placeholders
  lib/                  Small shared utilities
e2e/                    Playwright browser tests
```

Planned section, content, and UI conventions are documented in `PROJECT_SPEC.md`.

## Content policy

Employers, achievements, metrics, project details, contact information, and professional claims must never be invented. Unknown details are marked `[Pending]` and are only replaced with verified information.

## Reference and licensing

The visual direction is informed by the ThreeUI Kage landing page. It is a reference only: no Kage source code, imagery, fonts, or copy are used in this repository. See `PROJECT_SPEC.md` for the source and license investigation and the reuse decision.
