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

## Документация

- [Продукт и границы MVP](./docs/PRODUCT.md)
- [Архитектура проекта](./docs/ARCHITECTURE.md)
- [Текущее состояние и следующие шаги](./PROGRESS.md)
- [Инструкции для coding agents](./AGENTS.md)
