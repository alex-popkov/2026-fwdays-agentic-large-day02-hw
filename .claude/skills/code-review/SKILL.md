---
name: code-review
description: Reviews staged or recent changes for bugs, security issues, performance problems, and convention violations. Use when the user asks to review code, check changes, or before committing.
---

# Skill: Code Review

## When to use

Before committing or pushing changes. Triggered by: "review", "check my code", "review changes".

## Inputs

- Staged changes (`git diff --cached`) or unstaged changes (`git diff`)
- If no diff available, review files changed since the last commit (`git diff HEAD~1`)

## Steps

1. Get the diff:
   a. Check `git diff --cached` for staged changes
   b. If empty, check `git diff` for unstaged changes
   c. If empty, use `git diff HEAD~1` for last commit changes

2. For each changed file, review against these categories:

### Bugs & Logic
- Off-by-one errors, null/undefined access, missing error handling
- Incorrect conditional logic, unreachable code
- Race conditions in async code

### Security
- XSS vectors (`dangerouslySetInnerHTML`, `innerHTML`, `eval`)
- Unsanitized user input, hardcoded secrets
- Unsafe deserialization, open redirects

### Performance
- Unnecessary re-renders (missing `useMemo`, `useCallback` where needed)
- Allocations inside hot loops or render paths
- Missing cleanup in `useEffect`

### Conventions
- Import order (builtins → external → @excalidraw → internal → relative)
- Separate type imports (`import type { X }`)
- No direct `jotai` imports — use `editor-jotai` or `app-jotai`
- No barrel imports inside `packages/excalidraw/`
- Named exports only, correct file casing

### TypeScript
- No `any` or `@ts-ignore`
- Proper type narrowing, no unnecessary type assertions
- Generic types used where appropriate

3. Read the full file for any flagged issue to confirm it's a real problem (not a false positive from diff context)

## Output Format

Report findings grouped by severity:

```
## Code Review: <summary>

### 🔴 Critical (must fix)
- **file.ts:42** — [Bug] Possible null dereference: `element.parent.id` when parent is optional

### 🟡 Suggestions (should fix)
- **utils.ts:15** — [Perf] `filter().map()` can be combined into a single `reduce()`

### 🟢 Nits (optional)
- **Component.tsx:8** — [Convention] Import order: move `@excalidraw/math` before relative imports

### ✅ Looks good
- Clean type usage, proper error handling in async flows
```

## Safety

- Do NOT auto-fix issues — only report them
- Do NOT review files in `do-not-touch.md` protected list unless explicitly asked
- If no issues found — say so, don't invent problems