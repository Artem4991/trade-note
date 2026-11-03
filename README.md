# Trade Note

Offline-first приложение для ведения личного инвестиционного портфеля. Первая версия работает локально в браузере и не требует сервера.

## Стек

- Vue 3 и TypeScript
- Vite
- Naive UI
- pnpm workspaces
- Feature-Sliced Design
- ESLint, Prettier и Vitest

## Быстрый старт

Требуются Node `24.22.1` и pnpm `12.16.1`. Версия Node зафиксирована в `.node-version`, версия pnpm — в `packageManager`.

```bash
pnpm install
pnpm dev
```

Быстрые проверки форматирования, ESLint и типов:

```bash
pnpm check
```

Полная проверка с тестами, production-сборкой и итоговой сводкой:

```bash
pnpm verify
```

Автоматическое исправление форматирования и безопасно исправляемых ESLint-ошибок:

```bash
pnpm fix
```

## Git hooks

Husky устанавливает локальные Git hooks через `prepare` во время `pnpm install`. Перед каждым коммитом `.husky/pre-commit` запускает `pnpm check`: Prettier, ESLint и typecheck.

Pre-commit является быстрым локальным барьером и не заменяет полный `pnpm verify` перед завершением задачи или отправкой изменений.

## Continuous integration

GitHub Actions запускает `pnpm verify` для каждого pull request в `main`, после push в `main` и вручную через `workflow_dispatch`. CI использует Node `24.22.1`, pnpm `12.16.1`, frozen lockfile и cache pnpm store.

## Документация

- [Продукт и границы MVP](./docs/PRODUCT.md)
- [Архитектура проекта](./docs/ARCHITECTURE.md)
- [Дизайн-система и план проектирования](./docs/DESIGN_SYSTEM.md)
- [Информационная архитектура портфеля](./docs/design/PORTFOLIO_IA.md)
- [Low-fidelity wireframes портфеля](./docs/design/WIREFRAMES.md)
- [Текущее состояние и следующие шаги](./PROGRESS.md)
- [Инструкции для coding agents](./AGENTS.md)
