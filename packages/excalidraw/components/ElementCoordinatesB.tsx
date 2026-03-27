import React from "react";

import type { ElementCoordinatesBProps } from "./ElementCoordinatesB.types";

import { useExcalidrawAppState } from "./App";

import styles from "./ElementCoordinatesB.module.css";

const formatCoord = (value: number): string => Math.round(value * 100) / 100 + "";

export const ElementCoordinatesB = ({ app }: ElementCoordinatesBProps) => {
  const appState = useExcalidrawAppState();

  const selectedElements = app.scene.getSelectedElements({
    selectedElementIds: appState.selectedElementIds,
    includeBoundTextElement: false,
  });

  if (selectedElements.length === 0) {
    return <div className={styles.empty}>No element selected</div>;
  }

  if (selectedElements.length > 1) {
    return <div className={styles.empty}>Multiple elements selected</div>;
  }

  const element = selectedElements[0];

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>X</span>
        <span className={styles.value}>{formatCoord(element.x)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Y</span>
        <span className={styles.value}>{formatCoord(element.y)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>W</span>
        <span className={styles.value}>{formatCoord(element.width)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>H</span>
        <span className={styles.value}>{formatCoord(element.height)}</span>
      </div>
    </div>
  );
};
