---
name: code-change-verification
description: Verify Trade Note changes with the required documentation, pnpm, skill, and Git checks. Use after changing runtime code, workspace packages, dependencies, tests, build or lint configuration, or repository skills. Use a lightweight route for prose-only documentation changes.
---

# Code Change Verification

Verify the selected checkout without changing branches, discarding user work, or hiding failed checks.

## Preflight

1. Run `git status --short` and preserve pre-existing changes.
2. Inspect the diff and classify the highest applicable route below.
3. Run focused checks while iterating, then complete the selected final route before handoff.

## Select the route

- Runtime code, workspace package, dependency, test, build, TypeScript, ESLint, Prettier, or package-script change: run the full stack.
- Repository skill change: validate every changed skill with the bundled `quick_validate.py`, then run formatting and `git diff --check`. Also run the full stack when application or build behavior changed in the same diff.
- Prose-only `README.md`, `AGENTS.md`, `PROGRESS.md`, or `docs/*.md` change: run `pnpm format:check` and `git diff --check`. Do not claim application behavior was tested by this route.

When routes overlap, combine their requirements.

## Reconcile documentation

Before final verification, compare the completed scope with the documentation ownership rules in `AGENTS.md`:

- update `PROGRESS.md` when a feature enters current or next work, is completed, or changes the milestone, focus, next steps, or open decisions;
- update `docs/PRODUCT.md` when user-visible scope, an MVP scenario, or a non-goal changes;
- update `docs/ARCHITECTURE.md` when a material boundary, contract, dependency policy, or long-lived technical decision changes;
- update `README.md` when setup, prerequisites, commands, or documentation navigation changes.

Do not mark a feature complete in `PROGRESS.md` until the checks required for that feature pass. Do not change a document when its owned information is unaffected.

## Full stack

Run from the repository root:

```bash
bash .agents/skills/code-change-verification/scripts/run.sh
```

The script runs these barriers in order:

1. `pnpm format:check`
2. `pnpm lint`
3. `pnpm typecheck`
4. `pnpm test`
5. `pnpm build`
6. `git diff --check`

The verification runner executes every barrier and prints a final pass/fail summary instead of stopping at the first failure.

Run `pnpm install --frozen-lockfile` first when dependency manifests or `pnpm-lock.yaml` changed, or when dependencies are unavailable. If installation needs network access, request the required permission instead of removing `--frozen-lockfile` or skipping the step.

## Skill validation

For each changed skill directory, run:

```bash
python3 /Users/astonuser/.codex/skills/.system/skill-creator/scripts/quick_validate.py <skill-directory>
```

Also inspect the skill for unresolved placeholders, unreachable references, unnecessary files, and mismatch between `SKILL.md` and `agents/openai.yaml`.

## Failure handling and report

- Fix only failures caused by the authorized change. Report unrelated failures without rewriting unrelated code.
- After a fix, rerun every check whose evidence was invalidated; rerun the full stack when runtime or configuration changed.
- Report each command and its result. Keep skipped checks, missing tests, environment limits, and unresolved failures visible.
- Never describe a skipped, failed, or unexecuted check as passing.
