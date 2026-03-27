---
description: "Rules for the element package — element types, mutations, and bounds"
globs: packages/element/**
alwaysApply: false
---

# Element Package Rules

- Element mutations must go through `mutateElement()` — never modify properties directly
- Respect element immutability in read paths — clone before modifying
- New element types require updates to `types.ts`, serialization, and restore logic
- Bounds calculations must account for rotation and padding

## How to Verify

- Grep for direct property assignments on elements (e.g. `element.x =`) — should use `mutateElement()` instead
- For new element types: confirm changes in `types.ts`, serialization, and `restore.ts`
- Run `yarn test:app --watch=false` — element tests cover bounds and mutation logic
- Run `yarn test:typecheck` to catch type mismatches in element interfaces
