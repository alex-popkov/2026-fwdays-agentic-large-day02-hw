# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Excalidraw** monorepo — an open-source collaborative whiteboard/drawing tool built as a React component. The main app lives in `excalidraw-app/`, with shared logic split across `packages/`.

## Commands

```bash
# Install dependencies
yarn

# Dev server (Vite)
yarn start

# Build
yarn build              # Full app build (Vite for app, esbuild for packages)
yarn build:packages     # Build all packages (common → math → element → excalidraw)

# Tests
yarn test:app           # Vitest in watch mode
yarn test:app --watch=false  # Single run
yarn test:update        # Run all tests with snapshot updates
vitest run packages/excalidraw/tests/someFile.test.tsx  # Single test file
yarn test:all           # Typecheck + lint + prettier + tests
yarn test:typecheck     # tsc only
yarn test:code          # ESLint (--max-warnings=0)
yarn test:other         # Prettier check

# Fix lint/format
yarn fix                # Auto-fix prettier + eslint
yarn fix:code           # ESLint --fix only
```

## Monorepo Structure

Yarn workspaces with these packages (import via `@excalidraw/<name>`):

| Package | Path | Purpose |
|---------|------|---------|
| `@excalidraw/common` | `packages/common/` | Shared utilities and constants |
| `@excalidraw/math` | `packages/math/` | Geometry, vectors, curves |
| `@excalidraw/element` | `packages/element/` | Element types, mutations, bounds |
| `@excalidraw/excalidraw` | `packages/excalidraw/` | Main React component, UI, actions, rendering |
| `@excalidraw/utils` | `packages/utils/` | Public utility helpers |
| `excalidraw-app` | `excalidraw-app/` | The hosted web app (Firebase, Sentry, collab) |

Package build order matters: `common → math → element → excalidraw`.

Path aliases are configured in both `tsconfig.json` and `vitest.config.mts` so `@excalidraw/*` resolves to source during dev/test.

## Key Conventions

- **TypeScript** for all new code. Strict mode enabled.
- **Separate type imports** are enforced: `import type { Foo } from "..."` (ESLint `consistent-type-imports`).
- **Do not import from `"jotai"` directly.** Use `"editor-jotai"` or `"app-jotai"` app-specific modules instead.
- **Do not import from barrel `index.tsx`** inside `packages/excalidraw/` — use direct relative imports to the specific module.
- **Import order** is enforced by ESLint (`import/order`): builtins → external → `@excalidraw/**` → internal → parent → sibling.
- **Use the `Point` type** from `packages/math/src/types.ts` instead of `{ x, y }` for math-related code.
- Prefer **immutable data** (`const`, `readonly`), optional chaining (`?.`), and nullish coalescing (`??`).
- Prefer **allocation-free, CPU-efficient** implementations when possible.
- React: functional components with hooks, CSS modules for styling.
- Naming: PascalCase for components/interfaces/types, camelCase for variables/functions, ALL_CAPS for constants.

## Testing

- **Vitest** with jsdom environment. Test globals are enabled (`describe`, `it`, `expect` available without import).
- Tests use `@testing-library/react`. Setup file: `setupTests.ts`.
- Coverage thresholds: lines 60%, branches 70%, functions 63%, statements 60%.

## State Management

Jotai atoms for state, with custom wrappers (`editor-jotai`, `app-jotai`). The core `appState` and `elements` array drive the canvas rendering pipeline.

## Pre-commit Hooks

Husky + lint-staged: ESLint `--fix` on `*.{js,ts,tsx}`, Prettier on `*.{css,scss,json,md,html,yml}`.

## Memory Bank

Before starting any task, read the files in `docs/memory/` for project context:
- `projectbrief.md` — project goals and scope
- `productContext.md` — why the product exists, UX goals
- `techContext.md` — tech stack, dependencies, commands
- `systemPatterns.md` — architecture, state management, rendering
- `activeContext.md` — current work state, known issues
- `progress.md` — what's done, in progress, and pending
- `decisionLog.md` — key decisions with rationale