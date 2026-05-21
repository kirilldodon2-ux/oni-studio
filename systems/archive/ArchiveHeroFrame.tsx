import type { ReactNode } from "react";

type ArchiveHeroFrameProps = {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

/**
 * Inspect hero — environmental atmosphere only (gradients on this wrapper).
 * Object grounding: ONI_SILHOUETTE_FILTER on img/video in ArchiveInspectView.
 * See AI_RULES.md § Spatial Separation.
 */
export function ArchiveHeroFrame({ children, style, className = "" }: ArchiveHeroFrameProps) {
  return (
    <div
      className={`archive-hero-atmosphere mx-auto ${className}`.trim()}
      style={style}
    >
      <div className="archive-hero-optical">
        <div className="archive-hero-separation" aria-hidden />
        <div className="archive-hero-media">{children}</div>
      </div>
    </div>
  );
}
