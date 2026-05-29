"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 100;

/**
 * Phase 5 scroll state — transparent → subtle surface after meaningful scroll.
 * See NAVIGATION_ARCHITECTURE.md § Scroll State Transition (~100px, 400–600ms).
 */
export function useControlSurfaceScroll(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return scrolled;
}
