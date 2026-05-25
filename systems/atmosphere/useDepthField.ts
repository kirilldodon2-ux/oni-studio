"use client";

import { useEffect, useRef } from "react";
import { useExportMode } from "@/systems/export";

/**
 * useDepthField
 *
 * Scroll-driven parallax depth for decorative environmental layers.
 * Writes directly to DOM style — no React state updates, no re-renders.
 * Motion is lerped (smooth, physically calm) and gated behind prefers-reduced-motion.
 *
 * Use for: atmospheric ornaments, section-local geometric marks, decorative SVG layers.
 * Never use on: primary content, interactive elements, layout-bearing containers.
 *
 * @param factor  Parallax strength — proportion of scrollY applied as translateY.
 *                Range: 0.02 (barely perceptible) to 0.12 (restrained depth).
 *                Default: 0.05.
 * @param invert  Reverse scroll direction — layer appears to move toward the viewer.
 *
 * Usage:
 *   const depthRef = useDepthField(0.04);
 *   return <div ref={depthRef as React.Ref<HTMLDivElement>} className="...">...</div>;
 */
export function useDepthField(factor = 0.05, invert = false) {
  const exportMode = useExportMode();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      exportMode ||
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.transform = "";
      return;
    }

    const sign = invert ? -1 : 1;
    let current = 0;
    let target = 0;
    let rafId = 0;
    let ticking = false;

    const onScroll = () => {
      target = window.scrollY * factor * sign;
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      current += (target - current) * 0.06;
      el.style.transform = `translateY(${current.toFixed(2)}px)`;
      if (Math.abs(target - current) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        ticking = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [factor, invert, exportMode]);

  return ref;
}
