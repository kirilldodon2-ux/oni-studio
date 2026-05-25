"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useExportMode } from "@/systems/export";

interface PresenceLayerProps {
  children: ReactNode;
  className?: string;
  /** Onset delay in milliseconds — use to sequence staggered reveals */
  delay?: number;
  /** Emergence duration in milliseconds — default matches --atm-reveal (1200ms) */
  duration?: number;
  /** Intersection threshold — proportion of element visible before emerge fires (0–1) */
  threshold?: number;
  /** Starting translateY offset in px — arrives at 0 on reveal (0 = pure opacity) */
  y?: number;
  /** Emerge once and stay visible — default true */
  once?: boolean;
}

/**
 * PresenceLayer
 *
 * Scroll-driven cinematic presence system.
 *
 * Wraps content with opacity (and optional translateY) emergence when the
 * element enters the viewport. Sections PARTICIPATE in the atmosphere by
 * adopting PresenceLayer — the infrastructure governs motion behavior.
 *
 * Motion register: slow (1200ms default), ease-out confidence, nearly invisible.
 * This is not an entrance animation — it is an environmental reveal.
 *
 * Reduced-motion: the opacity transition is kept (imperceptible at 1200ms)
 * but translateY is suppressed via matchMedia prefers-reduced-motion.
 */
export function PresenceLayer({
  children,
  className,
  delay = 0,
  duration = 1200,
  threshold = 0.08,
  y = 0,
  once = true,
}: PresenceLayerProps) {
  const exportMode = useExportMode();
  const ref = useRef<HTMLDivElement>(null);
  const [present, setPresent] = useState(exportMode);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (exportMode) {
      setPresent(true);
      return;
    }
  }, [exportMode]);

  useEffect(() => {
    if (exportMode) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPresent(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setPresent(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, exportMode]);

  const applyTranslate = y !== 0 && !reducedMotion && !exportMode;

  const transform = applyTranslate
    ? present
      ? "translateY(0px)"
      : `translateY(${y}px)`
    : undefined;

  const transition = exportMode
    ? undefined
    : [
        `opacity ${duration}ms ${delay}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
        applyTranslate &&
          `transform ${duration}ms ${delay}ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
      ]
        .filter(Boolean)
        .join(", ");

  return (
    <div
      ref={ref}
      data-oni-presence=""
      className={className}
      style={{
        opacity: present ? 1 : 0,
        transform: exportMode ? undefined : transform,
        transition,
        willChange: exportMode
          ? "auto"
          : present
            ? "auto"
            : applyTranslate
              ? "opacity, transform"
              : "opacity",
      }}
    >
      {children}
    </div>
  );
}
