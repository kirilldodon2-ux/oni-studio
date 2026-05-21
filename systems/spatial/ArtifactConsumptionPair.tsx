"use client";

import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import {
  artifactActivateScaleStyle,
  artifactActivateTranslateStyle,
  interfaceLayerStyle,
} from "./convergenceInteraction";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export interface ArtifactConsumptionPairProps {
  /** Attention — artifact replaces interface. */
  active: boolean;
  /** Temporary interface layer (dissolves). */
  interfaceLayer: ReactNode;
  /** Spatial artifact (activates, becomes center of mass). */
  artifact: ReactNode;
  artifactScale?: boolean;
  gapClassName?: string;
  className?: string;
}

/**
 * Interface consumed by artifact — reusable ritual shell.
 * Nav, archive triggers, inspect transitions, loading/404 rituals.
 */
export function ArtifactConsumptionPair({
  active,
  interfaceLayer,
  artifact,
  artifactScale = true,
  gapClassName = "gap-2.5",
  className = "",
}: ArtifactConsumptionPairProps) {
  const reducedMotion = usePrefersReducedMotion();
  const consuming = active && !reducedMotion;

  const interfaceStyle: CSSProperties = interfaceLayerStyle(active, reducedMotion);
  const artifactTranslateStyle: CSSProperties = artifactActivateTranslateStyle(
    active,
    reducedMotion,
  );
  const artifactScaleStyle: CSSProperties = artifactActivateScaleStyle(
    active,
    reducedMotion,
    { scale: artifactScale },
  );

  return (
    <span
      className={["inline-flex items-center", gapClassName, className].join(" ")}
    >
      <span
        className={[
          "inline-flex shrink-0",
          consuming ? "will-change-opacity" : "",
        ].join(" ")}
        style={interfaceStyle}
      >
        {interfaceLayer}
      </span>
      <span
        className={[
          "inline-flex shrink-0",
          consuming ? "relative z-[1] will-change-transform" : "",
        ].join(" ")}
        style={artifactTranslateStyle}
      >
        <span
          className={consuming ? "inline-flex will-change-transform" : "inline-flex"}
          style={artifactScaleStyle}
        >
          {artifact}
        </span>
      </span>
    </span>
  );
}
