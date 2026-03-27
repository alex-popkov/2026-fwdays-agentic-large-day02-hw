import { round, pointFrom, pointRotateRads } from "@excalidraw/math";

import type { ElementCoordinatesAProps } from "./ElementCoordinatesA.types";
import styles from "./ElementCoordinatesA.module.css";

export const ElementCoordinatesA = ({ element }: ElementCoordinatesAProps) => {
  if (!element) {
    return (
      <div className={styles.container}>
        <span className={styles.empty}>No element selected</span>
      </div>
    );
  }

  const cx = element.x + element.width / 2;
  const cy = element.y + element.height / 2;

  const [topLeftX, topLeftY] = pointRotateRads(
    pointFrom(element.x, element.y),
    pointFrom(cx, cy),
    element.angle,
  );

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.label}>X</span>
        <span className={styles.value}>{round(topLeftX, 2)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Y</span>
        <span className={styles.value}>{round(topLeftY, 2)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Width</span>
        <span className={styles.value}>{round(element.width, 2)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Height</span>
        <span className={styles.value}>{round(element.height, 2)}</span>
      </div>
    </div>
  );
};
