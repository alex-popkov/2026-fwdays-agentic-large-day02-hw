---
description: "Rules for the common package — shared utilities base layer"
globs: packages/common/**
alwaysApply: false
---

# Common Package Rules

- Zero external dependencies — this package must stay dependency-free
- Utilities here must be generic and reusable across all other packages
- Do not import from other `@excalidraw/*` packages (common is the base layer)
- Export everything through `index.ts` for a clean public API

## How to Verify

- Check `packages/common/package.json` has no external dependencies (only devDependencies allowed)
- Grep for `from "@excalidraw/` in `packages/common/src/` — should not exist
- Confirm new utilities are exported in `packages/common/src/index.ts`
- Run `yarn build:packages` to ensure common builds independently
