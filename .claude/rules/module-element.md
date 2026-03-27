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
