# Trade Note repository instructions

## Project context

- Read `PROJECT_MAP.md` before making architectural or cross-package changes.
- This repository contains an offline-first investment portfolio application.
- The current application is personal and local-only. A server may be added later as a separate app.

## Architecture

- Use pnpm workspaces. Applications belong in `apps/`; reusable packages belong in `packages/`.
- The web application follows Feature-Sliced Design.
- Respect the dependency direction: `app -> pages -> widgets -> features -> entities -> shared`.
- A slice may not import another slice from the same layer. Import slices through their public `index.ts` API.
- Do not create FSD layers or workspace packages until they have a concrete responsibility.
- Keep browser storage behind repository interfaces. Vue components must not call IndexedDB directly.
- Keep `packages/indexed-db` framework-agnostic and free of Vue dependencies.

## Dependency policy

- Prefer platform APIs and small local modules when the behavior can remain clear and well-tested.
- Do not add a runtime dependency without explaining the capability it provides and why a local implementation is inappropriate.
- Do not add global state, routing, PWA, server, or data-fetching libraries before a feature requires them.
- Naive UI is the selected component library. Wrap repeated application-level primitives in `shared/ui` instead of spreading library-specific conventions through business modules.

## Financial data

- Do not use floating-point arithmetic for persisted monetary values.
- Store money, quantities, and rates as canonical decimal strings; use explicit `bigint`-based conversion and rounding helpers for calculations.
- Cover parsing, scaling, multiplication, conversion, and rounding rules with unit tests before using them in portfolio calculations.

## Verification

- Run the narrowest relevant tests while developing.
- Before handing off a code change, run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` when the affected workspace supports them.
- Do not claim a check passed unless it was executed successfully.
- Update `PROJECT_MAP.md` when a material architectural decision, milestone, or next step changes.

## Repository skills

- Repository-local agent skills live under `.agents/skills/<skill-name>/SKILL.md`.
- Keep skill names lowercase and hyphenated.
- Each skill must contain concise `name` and `description` front matter and should include scripts, references, or assets only when they materially support the workflow.
