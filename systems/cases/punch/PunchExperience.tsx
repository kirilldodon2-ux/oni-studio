"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePunchSection } from "./PunchSectionContext";
import { PunchCover }    from "./sections/PunchCover";
import { PunchBrand }    from "./sections/PunchBrand";
import { PunchAbout }    from "./sections/PunchAbout";
import { PunchColors }   from "./sections/PunchColors";
import { PunchPosters }  from "./sections/PunchPosters";
import { PunchSocial }   from "./sections/PunchSocial";
import { PunchPeople }   from "./sections/PunchPeople";
import { PunchMerch }    from "./sections/PunchMerch";
import { PunchStickers } from "./sections/PunchStickers";
import { PunchCredits }  from "./sections/PunchCredits";

const TOTAL_SECTIONS = 10;

export function PunchExperience() {
  const { setActiveSection, scrollContainerRef } = usePunchSection();
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const el = scrollContainerRef.current;
      if (el) {
        const section = Math.round(el.scrollTop / el.clientHeight);
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
      className="h-screen overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory", scrollBehavior: "auto" }}
    >
      <PunchCover />
      <PunchBrand />
      <PunchAbout />
      <PunchColors />
      <PunchPosters />
      <PunchSocial />
      <PunchPeople />
      <PunchMerch />
      <PunchStickers />
      <PunchCredits />
    </div>
  );
}
