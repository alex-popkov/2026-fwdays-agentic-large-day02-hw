---
description: "Rules for the math package — pure geometry and vector operations"
globs: packages/math/**
alwaysApply: false
---

# Math Package Rules

- Use the `Point` type from `packages/math/src/types.ts` — never `{ x, y }` objects
- Pure functions only — no side effects, no state, no DOM access
- Prefer allocation-free implementations (reuse arrays/objects where possible)
- All geometric operations must handle edge cases (zero-length vectors, collinear points)

## How to Verify

- Grep for `{ x, y }` or `{ x:` in `packages/math/` — should use `Point` type instead
- Grep for `document`, `window`, `setState`, `console.log` in `packages/math/` — should not exist
- Run `vitest run packages/math/` to execute math-specific tests
- Review new functions for edge case tests (zero, negative, NaN inputs)
