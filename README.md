# Vaibhav Portfolio

A cinematic, editorial personal developer portfolio. The project is being built in reviewed phases, with `PROJECT_SPEC.md` as the source of truth.

**Status:** Phase 0 — Foundation. Content is intentionally placeholder-only until verified details are supplied.

## Stack

- Next.js 16 App Router with React 19 and strict TypeScript
- Tailwind CSS 4 with CSS-first design tokens
- Motion for React for isolated UI animation
- Vitest + Testing Library for unit tests
- Playwright for browser-level verification
- pnpm as the package manager

Three.js and GSAP are not installed. They are deferred until a scene or timeline justifies them.

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

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
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
    foundation/         Temporary Phase 0 page content
    motion/             Client-only Motion wrappers
    site/               Shared site chrome
  config/               Typed site configuration and placeholders
  lib/                  Small shared utilities
e2e/                    Playwright browser tests
```

Planned section, content, and UI conventions are documented in `PROJECT_SPEC.md`.

## Content policy

Employers, achievements, metrics, project details, contact information, and professional claims must never be invented. Unknown details are marked `[Pending]` and are only replaced with verified information.

## Reference and licensing

The visual direction is informed by the ThreeUI Kage landing page. It is a reference only: no Kage source code, imagery, fonts, or copy are used in this repository. See `PROJECT_SPEC.md` for the source and license investigation and the reuse decision.
