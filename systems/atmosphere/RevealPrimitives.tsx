import { type ReactNode } from "react";
import { PresenceLayer } from "./PresenceLayer";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Onset delay in milliseconds */
  delay?: number;
  /** Override default emergence duration */
  duration?: number;
  /** Intersection threshold before reveal fires */
  threshold?: number;
}

/**
 * FadeIn
 *
 * Pure opacity emergence — the most restrained atmospheric reveal.
 * Content materializes with no spatial movement: presence without performance.
 *
 * Default: 1200ms ease-out, 8% threshold (matches --atm-reveal token).
 * Use for section content wrappers, secondary atmospheric elements.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 1200,
  threshold = 0.08,
}: RevealProps) {
  return (
    <PresenceLayer
      className={className}
      delay={delay}
      duration={duration}
      threshold={threshold}
    >
      {children}
    </PresenceLayer>
  );
}

/**
 * RevealUp
 *
 * Opacity + restrained upward spatial emergence.
 * Motion: opacity 0→1 + translateY 10px→0, simultaneous.
 *
 * Default: 1400ms ease-out — slightly slower than FadeIn for spatial weight.
 * Use sparingly: editorial headings, primary section anchors.
 * Prefer FadeIn for secondary content — less motion, more restrained.
 */
export function RevealUp({
  children,
  className,
  delay = 0,
  duration = 1400,
  threshold = 0.08,
}: RevealProps) {
  return (
    <PresenceLayer
      className={className}
      delay={delay}
      duration={duration}
      threshold={threshold}
      y={10}
    >
      {children}
    </PresenceLayer>
  );
}
