---
description: "Testing conventions for Vitest and React Testing Library"
globs: "**/*.test.ts,**/*.test.tsx"
alwaysApply: false
---

# Testing Rules

## Framework

- Vitest with jsdom environment — `describe`, `it`, `expect` are global (no imports needed)
- Use `@testing-library/react` for component tests — query by role, label, or text, not by CSS selectors
- Setup file: `setupTests.ts` — do not duplicate its configuration in individual tests

## Test Structure

- One `describe` block per function/component
- Test names should describe behavior, not implementation: `"shows error when input is empty"` not `"calls setError"`
- Arrange → Act → Assert pattern — keep each section visually separated
- Prefer `it` over `test` for consistency

## What to Test

- User-visible behavior and interactions, not internal state
- Edge cases: empty inputs, boundary values, null/undefined
- Error states and loading states
- Keyboard and mouse interactions for interactive components

## What NOT to Do

- Do not mock internal modules unless absolutely necessary — prefer real implementations
- Do not test implementation details (internal state, private methods, component re-renders)
- Do not use `snapshot` tests for UI — they are brittle and hard to review
- Do not add `setTimeout` or arbitrary waits — use `waitFor` or `findBy` queries instead
- Do not skip or disable tests with `.skip` or `.todo` without a linked issue

## Coverage

- Minimum thresholds: lines 60%, branches 70%, functions 63%, statements 60%
- New code should meet or exceed these thresholds