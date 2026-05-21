import type { CSSProperties } from "react";

/**
 * Inspect occupancy — evidence-scale perceptual truth (not masonry).
 * Browse uses mediaAspect + Frame; inspect uses svh budget + stage max rem cap.
 */
export const INSPECT_VIEWPORT_OVERHEAD_PX = 410;

/** Hero image sizes — matches stage max at lg+ (47.5rem / 760px) */
export const INSPECT_HERO_IMAGE_SIZES = "(max-width: 1023px) 100vw, 760px";

export function getInspectHeroOccupancy(
  aspectW: number,
  aspectH: number
): CSSProperties {
  const ratio = aspectW / aspectH;
  return {
    width: `min(100%, calc(${ratio.toFixed(4)} * (100svh - ${INSPECT_VIEWPORT_OVERHEAD_PX}px)))`,
    aspectRatio: `${aspectW} / ${aspectH}`,
    marginInline: "auto",
  };
}
