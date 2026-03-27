---
description: "Code conventions for Excalidraw components and utilities"
globs: packages/**/*.ts,packages/**/*.tsx
alwaysApply: false
---

# Code Conventions

## Components

- Functional components + hooks ONLY (no class components)
- Props interface: `{ComponentName}Props`
- Named exports only (no default exports)
- Colocated tests: `ComponentName.test.tsx`

## TypeScript

- Strict mode — no `any`, no `@ts-ignore`
- Prefer `type` over `interface` for simple types
- Import types: `import type { X } from "..."`

## Files

- kebab-case for files: `element-utils.ts`
- PascalCase for components: `LayerUI.tsx`

## How to Verify

- Run `yarn test:code` — ESLint checks import order, consistent type imports, and naming
- Run `yarn test:other` — Prettier checks file formatting
- Grep for `export default` in changed files — should not exist
- Grep for `import { ... } from "..."` without `type` keyword on type-only imports