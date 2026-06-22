"use client";

import { useEffect, useState } from "react";
import { PunchCanvas } from "./imports/PunchCanvas";

// Figma Make export dimensions — 1920×16485px fixed canvas
const CANVAS_W = 1920;
const CANVAS_H = 16485;

/**
 * PunchExperience — scales the fixed-px Figma Make PUNCH landing
 * to fill the current viewport width. Height adjusts proportionally.
 */
export function PunchExperience() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => setScale(window.innerWidth / CANVAS_W);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${CANVAS_H * scale}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${CANVAS_W}px`,
          height: `${CANVAS_H}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        <PunchCanvas />
      </div>
    </div>
  );
}
