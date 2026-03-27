---
description: "Protected files that should not be modified"
globs: "packages/excalidraw/**"
alwaysApply: true
---

# Protected Files

NEVER modify these files without explicit approval:

- `packages/excalidraw/scene/renderer.ts` — render pipeline
- `packages/excalidraw/data/restore.ts` — file format compat
- `packages/excalidraw/actions/manager.ts` — action system
- `packages/excalidraw/types.ts` — core types

Changes to protected files require:

1. Full understanding of dependencies
2. Running complete test suite
3. Manual QA verification

## How to Verify

- Run `git diff --name-only` and check none of the protected files appear in the changeset
- If a protected file was modified, confirm explicit user approval exists in the conversation
- Run `yarn test:app --watch=false` to ensure no regressions after any approved changes