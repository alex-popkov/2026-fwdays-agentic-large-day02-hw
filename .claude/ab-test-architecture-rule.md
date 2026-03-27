## A/B Test: excalidraw-architecture.md

- **Prompt**: "Create element coordinates component"
- **Date**: 2026-03-27

---

### Result A (rule ON): `ElementCoordinatesA`

| Aspect | Detail |
|--------|--------|
| **Export** | Named export (`export const ElementCoordinatesA`) |
| **State management** | None — pure presentational component, receives `element` via props |
| **Math utilities** | Uses `@excalidraw/math` (`round`, `pointFrom`, `pointRotateRads`) — follows project conventions |
| **Rotation handling** | Accounts for element rotation when computing top-left coordinates |
| **Types** | Strict — uses `ExcalidrawElement` from `@excalidraw/element/types` |
| **Props design** | Simple: `{ element?: ExcalidrawElement \| null }` — component is a leaf, caller owns selection logic |
| **CSS** | Uses project CSS variables (`--ui-font`, `--color-on-surface`, `--color-gray-40`) |
| **Tests** | 4 tests, no mocks needed, straightforward render assertions |
| **React import** | Not imported (not needed with JSX transform) |

### Result B (rule OFF): `ElementCoordinatesB`

| Aspect | Detail |
|--------|--------|
| **Export** | Named export (`export const ElementCoordinatesB`) — still correct |
| **State management** | Calls `useExcalidrawAppState()` hook internally to read `selectedElementIds` |
| **Math utilities** | Manual rounding (`Math.round(value * 100) / 100`) — does not reuse `@excalidraw/math` |
| **Rotation handling** | None — displays raw `element.x`/`element.y` without rotation adjustment |
| **Types** | Uses `AppClassProperties` — couples component to the app class internals |
| **Props design** | Takes entire `app` object: `{ app: AppClassProperties }` — tighter coupling, harder to test |
| **CSS** | Uses fewer project variables, adds `font-family: monospace` directly |
| **Tests** | 5 tests, but requires `vi.mock("./App")` to stub `useExcalidrawAppState` |
| **React import** | Imports `React` explicitly (unnecessary with JSX transform) |

---

### Side-by-side Comparison

| Dimension | A (rule ON) | B (rule OFF) | Winner |
|-----------|-------------|--------------|--------|
| **Architecture alignment** | Pure presentational, no internal state hooks | Reads app state internally via hook | A |
| **Coupling** | Low — depends only on element type | High — depends on `AppClassProperties` + `useExcalidrawAppState` | A |
| **Math reuse** | Uses `@excalidraw/math` utilities | Reinvents rounding, skips rotation | A |
| **Correctness** | Handles rotated elements | Ignores rotation — displays wrong coords for rotated elements | A |
| **Testability** | No mocks needed | Requires `vi.mock` for App module | A |
| **Multi-select handling** | Delegates to caller | Handles internally (shows "Multiple elements" message) | B |
| **Test coverage breadth** | 4 tests | 5 tests (including multi-select and decimal edge cases) | B |
| **Type safety** | Narrow prop type (`ExcalidrawElement`) | Broad prop type (`AppClassProperties`) | A |

---

### Conclusion

The `excalidraw-architecture.md` rule **effectively steered generation** toward project-aligned patterns:

1. **State management**: A stays pure and presentational; B reaches into app state via hooks, increasing coupling.
2. **Package reuse**: A leverages `@excalidraw/math` for coordinate math; B reinvents rounding and misses rotation entirely.
3. **Testability**: A needs no mocks; B requires mocking the App module.
4. **Correctness**: A handles rotation (a real concern in Excalidraw); B silently produces wrong values for rotated elements.

The rule did NOT prevent all issues — both variants correctly use named exports and CSS modules. The main impact is on **architectural coupling** and **reuse of project-specific math utilities**, which are exactly what the rule targets.

**Verdict**: Rule ON produces significantly better-aligned code. The rule is effective and should remain enabled.