"use client";

import { useCallback, useEffect } from "react";
import { BrandbookHero } from "./components/BrandbookHero";
import { BrandbookAbout } from "./components/BrandbookAbout";
import { BrandbookLogo } from "./components/BrandbookLogo";
import { BrandbookColors } from "./components/BrandbookColors";
import { BrandbookFonts } from "./components/BrandbookFonts";
import { BrandbookLinks } from "./components/BrandbookLinks";
import { useBrandbookSection } from "./BrandbookSectionContext";

const SECTION_COUNT = 6;

export function BrandbookExperience() {
  const { setActiveSection, scrollContainerRef } = useBrandbookSection();

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;
    if (clientHeight === 0) return;
    const idx = Math.min(
      Math.round(scrollTop / clientHeight),
      SECTION_COUNT - 1
    );
    setActiveSection(idx);
  }, [scrollContainerRef, setActiveSection]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, scrollContainerRef]);

  return (
    <div className="relative h-screen w-full">
      <div
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory" }}
      >
        <BrandbookHero />
        <BrandbookAbout />
        <BrandbookLogo />
        <BrandbookColors />
        <BrandbookFonts />
        <BrandbookLinks />
      </div>
    </div>
  );
}
