"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePunchSection } from "./PunchSectionContext";
import { PUNCH_SCROLL_STYLE } from "./punchLayout";
import { PunchCover }       from "./sections/PunchCover";
import { PunchBrand }       from "./sections/PunchBrand";
import { PunchHeadliner }   from "./sections/PunchHeadliner";
import { PunchAbout }       from "./sections/PunchAbout";
import { PunchPosters }     from "./sections/PunchPosters";
import { PunchMerch }       from "./sections/PunchMerch";
import { PunchStickers }    from "./sections/PunchStickers";
import { PunchFooter }      from "./sections/PunchFooter";

const TOTAL_SECTIONS = 8;

export function PunchExperience() {
  const { setActiveSection, scrollContainerRef } = usePunchSection();
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (el) {
        const h = el.clientHeight;
        const section = h > 0 ? Math.round(el.scrollTop / h) : 0;
        setActiveSection(Math.min(Math.max(section, 0), TOTAL_SECTIONS - 1));
      }
      ticking.current = false;
    });
  }, [setActiveSection, scrollContainerRef]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="h-[100dvh] min-h-[100dvh] overflow-y-scroll overscroll-y-contain"
      style={PUNCH_SCROLL_STYLE}
    >
      <PunchCover />
      <PunchBrand />
      <PunchHeadliner />
      <PunchAbout />
      <PunchPosters />
      <PunchMerch />
      <PunchStickers />
      <PunchFooter />
    </div>
  );
}
