---
name: architecture-decision
description: Define a bounded architecture decision for Trade Note before changing FSD boundaries, workspace packages, IndexedDB schemas or persistence contracts, financial value representation, runtime dependencies, or future client/server contracts. Do not use for a localized implementation that preserves existing ownership and contracts.
---

# Architecture Decision

Use this skill to decide ownership and compatibility before implementation. It does not authorize unrelated refactoring or new dependencies.

## Establish the current boundary

1. Read the applicable `AGENTS.md`, `docs/PRODUCT.md`, and `docs/ARCHITECTURE.md`. Read `PROGRESS.md` when the decision affects current work or the roadmap.
2. Inspect the live code and tests around the requested change. Treat the repository as the source of truth.
3. Classify the decision surface:
   - FSD placement, slice ownership, or public API;
   - workspace application or package boundary;
   - IndexedDB schema, migration, transaction, or repository contract;
   - persisted money, quantity, exchange-rate, scale, or rounding rule;
   - runtime dependency or platform API choice;
   - browser/server contract or synchronization boundary.
4. For FSD placement or extraction decisions, invoke `$feature-sliced-design` and use its current decision framework. Do not duplicate or override its layer rules here.

## Record a scope contract

Before editing, state a concise contract in the working conversation or plan:

- requested outcome and observable acceptance criteria;
- in-scope behavior and explicit non-goals;
- current owning module and affected public or persisted contracts;
- compatibility and migration requirements;
- viable alternatives, including keeping the code at its current consumer;
- selected approach and why it is the smallest coherent option;
- failure, rollback, or recovery behavior when persisted data is affected;
- focused tests and final verification required.

Do not create an ADR or another planning document unless the user requests one or `docs/ARCHITECTURE.md` cannot preserve a material long-lived decision concisely.

## Decision rules

- Prefer extending the nearest existing owner over creating a parallel abstraction.
- Do not create a workspace package, FSD layer, feature, or entity for hypothetical reuse. Require current reuse, an independent reason to change, and a focused responsibility.
- Keep `packages/indexed-db` framework-agnostic. Business entities and Vue reactivity stay outside it.
- For an IndexedDB schema change, define the version transition, migration behavior, transaction completion, error propagation, and what happens to existing data before coding.
- Do not perform unrelated asynchronous work inside an active IndexedDB transaction. Separate network, timers, and user interaction from the transaction boundary.
- For financial data, define canonical string representation, scale, accepted input, rounding direction, overflow or invalid-input behavior, and serialization before implementation.
- Before adding a runtime dependency, identify the exact capability, inspect the platform or local alternative, and record the maintenance and bundle trade-off.
- Keep a future server behind an explicit contract. Do not move browser-owned behavior to `apps/api` before synchronization or multi-client requirements exist.

## Human decision gate

Stop and ask one focused question when two valid options materially differ in product behavior, persisted-data compatibility, public API, dependency cost, security boundary, or future migration cost. Continue without asking when repository evidence makes the smallest compatible option clear.

After an approved material decision, update `docs/ARCHITECTURE.md` so it remains the durable architecture source. Update `PROGRESS.md` only when the decision changes current work, next steps, or an open question. Use `$code-change-verification` after implementation changes.
