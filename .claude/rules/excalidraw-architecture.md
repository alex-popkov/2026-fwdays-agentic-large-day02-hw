---
description: "Architecture constraints for Excalidraw"
globs: packages/excalidraw/**
alwaysApply: false
---

# Excalidraw Architecture

## State Management

- Custom state via actionManager — NOT Redux/Zustand/MobX
- State updates: actionManager.dispatch() ONLY
- State type: AppState (packages/excalidraw/types.ts)

## Rendering

- Canvas 2D rendering — NOT React DOM for drawing
- Render pipeline: Scene → renderScene() → canvas context
- DO NOT use react-konva, fabric.js, pixi.js

## Dependencies

- No new npm packages without explicit approval
- Check packages/utils/ before adding external helpers

## How to Verify

- Grep changed files for `Redux`, `Zustand`, `MobX`, `useSelector`, `useDispatch` — should not exist
- Grep for `react-konva`, `fabric`, `pixi` in `package.json` — should not exist
- Grep for state mutations outside `actionManager.dispatch()` in `packages/excalidraw/`
- Run `yarn test:app --watch=false` to verify rendering pipeline is intact