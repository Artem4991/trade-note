# Trade Note

Локальное приложение для ведения инвестиционного портфеля. Первая версия работает в браузере и в дальнейшем будет хранить данные в IndexedDB.

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

Основные проверки:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Архитектура и текущее состояние описаны в [PROJECT_MAP.md](./PROJECT_MAP.md). Инструкции для coding agents находятся в [AGENTS.md](./AGENTS.md).
