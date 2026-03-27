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
