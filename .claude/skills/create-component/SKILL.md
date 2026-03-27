---
name: create-component
description: Scaffolds a new React component with TypeScript types, CSS module, and test file following project conventions. Use when the user asks to create, scaffold, or generate a new component.
---

# Skill: Create Component

## When to use

When creating a new React component. Triggered by: "create component", "new component", "scaffold component".

## Arguments

- `$1` — Component name (PascalCase, e.g. `ColorPicker`)
- `$2` — Target directory (optional, defaults to `packages/excalidraw/components/`)

## Steps

1. Validate the component name is PascalCase
2. Determine the target directory:
   - If `$2` provided, use it
   - Otherwise use `packages/excalidraw/components/`
3. Check that the component doesn't already exist
4. Create the following files:

### Component file: `<ComponentName>.tsx`

```tsx
import React from "react";
import type { <ComponentName>Props } from "./<ComponentName>.types";
import styles from "./<ComponentName>.module.css";

export const <ComponentName> = ({ ...props }: <ComponentName>Props) => {
  return (
    <div className={styles.container}>
      {/* TODO: implement */}
    </div>
  );
};
```

### Types file: `<ComponentName>.types.ts`

```ts
export type <ComponentName>Props = {
  // TODO: define props
};
```

### CSS module: `<ComponentName>.module.css`

```css
.container {

}
```

### Test file: `<ComponentName>.test.tsx`

```tsx
import { render, screen } from "@testing-library/react";
import { <ComponentName> } from "./<ComponentName>";

describe("<ComponentName>", () => {
  it("renders without crashing", () => {
    render(<<ComponentName> />);
    // TODO: add assertions
  });
});
```

5. Report created files to the user

## Conventions

- Functional components + hooks ONLY
- Named exports only — no `export default`
- Props type: `<ComponentName>Props` in a separate `.types.ts` file
- CSS modules for styling — no inline styles
- Colocated test file
- Separate type imports: `import type { X } from "..."`
- Do not import from barrel `index.tsx` inside `packages/excalidraw/`

## Safety

- Do NOT overwrite existing files — abort and notify the user
- Do NOT add the component to any barrel/index file automatically
- Do NOT install new dependencies