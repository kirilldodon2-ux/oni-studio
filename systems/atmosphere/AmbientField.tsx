import { type ReactNode } from "react";

interface AmbientFieldProps {
  children: ReactNode;
  className?: string;
  /** Apply slow ambient Y drift (oni-ambient-drift keyframe — 14s, ±4px) */
  drift?: boolean;
  /** Apply subtle opacity breathing (oni-breath keyframe — 18s, 1→0.78) */
  breathe?: boolean;
  /**
   * Animation phase offset in milliseconds.
   * Negative values pre-start the animation at that offset into its cycle,
   * producing asynchronous motion across multiple field elements.
   * Positive values delay onset from zero.
   * Only meaningful when drift or breathe is true.
   */
  delay?: number;
}

/**
 * AmbientField
 *
 * CSS-driven environmental motion wrapper.
 * Server component — zero JS overhead; motion is pure CSS keyframes.
 *
 * Use for decorative spatial elements: backdrop ornaments, section-local
 * geometric marks, atmospheric annotations. Never apply to primary content,
 * interactive elements, or layout-bearing containers.
 *
 * Motion character: very slow, restrained, nearly imperceptible.
 * Reduced-motion gates are defined in globals.css.
 *
 * When both drift and breathe are true, both animations play simultaneously
 * via the .oni-ambient-drift.oni-breath combined rule in globals.css.
 */
export function AmbientField({
  children,
  className,
  drift = false,
  breathe = false,
  delay,
}: AmbientFieldProps) {
  const classes = [className, drift && "oni-ambient-drift", breathe && "oni-breath"]
    .filter(Boolean)
    .join(" ");

  const style =
    delay !== undefined ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <div className={classes || undefined} style={style}>
      {children}
    </div>
  );
}
