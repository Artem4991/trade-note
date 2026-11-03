# Trade Note repository instructions

## Project context

- Read `docs/PRODUCT.md` for product scope and `docs/ARCHITECTURE.md` before making architectural or cross-package changes.
- Read `PROGRESS.md` before planning a milestone or selecting the next task.
- This repository contains an offline-first investment portfolio application.
- The current application is personal and local-only. A server may be added later as a separate app.

## Architecture

- Use pnpm workspaces. Applications belong in `apps/`; reusable packages belong in `packages/`.
- The web application follows Feature-Sliced Design.
- Respect the dependency direction: `app -> pages -> widgets -> features -> entities -> shared`.
- Start with `app`, `pages`, and `shared`. Add `features` or `entities` only after a current reusable responsibility earns the boundary; avoid `widgets` unless it has a clear reusable composition role.
- Avoid cross-imports between slices on the same layer. Import slices through their public `index.ts` API and follow the FSD skill when an exception is being considered.
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
- Use `pnpm check` for the fast formatting, lint, and typecheck loop.
- Before handing off an application, package, dependency, test, build, lint, or TypeScript change, run `pnpm verify` from the repository root.
- Run `pnpm install --frozen-lockfile` before verification when dependency manifests or `pnpm-lock.yaml` changed, or when dependencies are unavailable.
- Do not claim a check passed unless it was executed successfully.

## Documentation ownership

- Update `PROGRESS.md` when a user-visible feature is accepted into current or next work, completed, or materially rescoped. Mark it complete only after its required verification passes.
- Update `PROGRESS.md` when a milestone, current focus, next step, or open decision changes.
- Update `docs/PRODUCT.md` when user-visible scope, an MVP scenario, or an explicit non-goal changes.
- Update `docs/ARCHITECTURE.md` when a material boundary, persisted or public contract, dependency policy, or long-lived technical decision changes. Do not update it for an implementation that follows the existing architecture.
- Update `README.md` when setup commands, prerequisites, or documentation entry points change.
- Do not edit documentation merely to produce a diff. Leave it unchanged when none of the ownership conditions above applies.

## Repository skills

- Repository-local agent skills live under `.agents/skills/<skill-name>/SKILL.md`.
- Keep skill names lowercase and hyphenated.
- Each skill must contain concise `name` and `description` front matter and should include scripts, references, or assets only when they materially support the workflow.

### Mandatory skill usage

- Use `$feature-sliced-design` before adding or reorganizing FSD layers, slices, segments, public APIs, imports, static assets, or framework integration.
- Use `$architecture-decision` before changing workspace boundaries, runtime dependencies, IndexedDB schemas or persistence contracts, financial value representation, or future browser/server contracts.
- Use `$code-change-verification` after changing application code, workspace packages, dependencies, tests, build or lint configuration, or repository skills. Follow its lightweight route for prose-only documentation.
- Keep skill routing explicit in this file and in narrow skill descriptions. Do not add a catch-all orchestration skill unless a stable, repeated workflow needs its own branching procedure.
