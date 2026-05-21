import type { CSSProperties } from "react";

/**
 * Artifact consumption — temporary interface dissolves; spatial artifact replaces it.
 *
 * Primary actor: trailing artifact (inward drift, mass, dominance).
 * Interface: coherence loss only — no visible slide, no typographic distortion.
 *
 * Sequence: artifact activates → interface dissolves → held state.
 * Release: artifact retreats → interface quietly reforms.
 */

/** Interface must not slide — structural drift disabled (opacity/blur only). */
export const INTERFACE_DRIFT_PX = 0;

/** Fully absent at peak — artifact replaces interface. */
export const INTERFACE_OPACITY_CONSUMED = 0;

export const INTERFACE_TRACKING_IDLE_EM = 0.22;

/** Minimal loosen before disappearance — not stretch/distort. */
export const INTERFACE_TRACKING_ACTIVE_EM = 0.24;

/** Artifact inward — closes gap and occupies interface perceptual space. */
export const ARTIFACT_DRIFT_PX = 17;

export const ARTIFACT_SCALE = 1.21;

export const ARTIFACT_ACTIVATE_DURATION_MS = 500;

export const INTERFACE_DISSOLVE_DURATION_MS = 580;

export const ARTIFACT_ACTIVATE_DELAY_MS = 0;

export const ARTIFACT_SCALE_DELAY_MS = 44;

/** Interface destabilizes after artifact is present. */
export const INTERFACE_DISSOLVE_DELAY_MS = 96;

export const INTERFACE_REFORM_DELAY_MS = 64;

/** Infrastructural easing — no spring, no cinematic snap. */
export const ARTIFACT_EASING = "cubic-bezier(0.25, 0, 0.2, 1)";

export const INTERFACE_EASING = "cubic-bezier(0.28, 0, 0.22, 1)";

/** Scale grows toward interface (consumption point). */
export const ARTIFACT_TRANSFORM_ORIGIN = "0% 50%";

/** @deprecated */
export const CONVERGENCE_LEADING_DRIFT_PX = INTERFACE_DRIFT_PX;

/** @deprecated */
export const CONVERGENCE_TRAILING_DRIFT_PX = ARTIFACT_DRIFT_PX;

/** @deprecated */
export const CONVERGENCE_DRIFT_PX = INTERFACE_DRIFT_PX;

/** @deprecated */
export const CONVERGENCE_SCALE = ARTIFACT_SCALE;

function transition(
  properties: string,
  durationMs: number,
  easing: string,
  delayMs: number,
): Pick<
  CSSProperties,
  "transitionProperty" | "transitionDuration" | "transitionTimingFunction" | "transitionDelay"
> {
  return {
    transitionProperty: properties,
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delayMs}ms`,
  };
}

/** Temporary interface — loses coherence; does not move. */
export function interfaceLayerStyle(
  active: boolean,
  reducedMotion: boolean,
): CSSProperties {
  const engaged = active && !reducedMotion;
  return {
    ...transition(
      "opacity, letter-spacing",
      INTERFACE_DISSOLVE_DURATION_MS,
      INTERFACE_EASING,
      engaged ? INTERFACE_DISSOLVE_DELAY_MS : INTERFACE_REFORM_DELAY_MS,
    ),
    opacity: engaged ? INTERFACE_OPACITY_CONSUMED : 1,
    letterSpacing: engaged
      ? `${INTERFACE_TRACKING_ACTIVE_EM}em`
      : `${INTERFACE_TRACKING_IDLE_EM}em`,
    pointerEvents: engaged ? "none" : "auto",
    visibility: engaged ? "hidden" : "visible",
  };
}

/** Artifact inward — primary spatial actor. */
export function artifactActivateTranslateStyle(
  active: boolean,
  reducedMotion: boolean,
): CSSProperties {
  const engaged = active && !reducedMotion;
  return {
    ...transition(
      "transform",
      ARTIFACT_ACTIVATE_DURATION_MS,
      ARTIFACT_EASING,
      engaged ? ARTIFACT_ACTIVATE_DELAY_MS : 0,
    ),
    transform: engaged
      ? `translateX(-${ARTIFACT_DRIFT_PX}px)`
      : "translateX(0)",
  };
}

/** Artifact mass — transform only; origin toward interface. */
export function artifactActivateScaleStyle(
  active: boolean,
  reducedMotion: boolean,
  options?: { scale?: boolean },
): CSSProperties {
  const engaged = active && !reducedMotion;
  const scale = options?.scale !== false ? ARTIFACT_SCALE : 1;
  return {
    ...transition(
      "transform",
      ARTIFACT_ACTIVATE_DURATION_MS,
      ARTIFACT_EASING,
      engaged ? ARTIFACT_SCALE_DELAY_MS : 0,
    ),
    transform: engaged ? `scale(${scale})` : "scale(1)",
    transformOrigin: ARTIFACT_TRANSFORM_ORIGIN,
  };
}

/** @deprecated Use interfaceLayerStyle */
export const convergenceLeadingStyle = interfaceLayerStyle;

/** @deprecated Use artifactActivateTranslateStyle */
export const convergenceTrailingTranslateStyle = artifactActivateTranslateStyle;

/** @deprecated Use artifactActivateScaleStyle */
export const convergenceTrailingScaleStyle = artifactActivateScaleStyle;

export function artifactActivateStyle(
  active: boolean,
  reducedMotion: boolean,
  options?: { scale?: boolean },
): CSSProperties {
  const engaged = active && !reducedMotion;
  const scale = options?.scale !== false ? ARTIFACT_SCALE : 1;
  return {
    ...transition(
      "transform",
      ARTIFACT_ACTIVATE_DURATION_MS,
      ARTIFACT_EASING,
      engaged ? ARTIFACT_ACTIVATE_DELAY_MS : 0,
    ),
    transform: engaged
      ? `translateX(-${ARTIFACT_DRIFT_PX}px) scale(${scale})`
      : "translateX(0) scale(1)",
    transformOrigin: ARTIFACT_TRANSFORM_ORIGIN,
  };
}

/** @deprecated Use artifactActivateStyle */
export const convergenceTrailingStyle = artifactActivateStyle;
