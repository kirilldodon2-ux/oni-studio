"use client";

import { useCallback, useEffect } from "react";
import { CasesCover } from "./components/CasesCover";
import { CasesCard } from "./components/CasesCard";
import { CasesPunch } from "./components/CasesPunch";
import { useCasesSection } from "./CasesSectionContext";
import { casesRegistry } from "./casesData";

// cover (1) + sum of each case's section count (default 1 per case)
const TOTAL_SECTIONS =
  1 + casesRegistry.reduce((sum, e) => sum + (e.sections ?? 1), 0);

function renderCase(entry: (typeof casesRegistry)[number]) {
  // Cases with custom components — extend this map as new cases are ported
  if (entry.id === "01") return <CasesPunch key={entry.id} />;
  return <CasesCard key={entry.id} entry={entry} />;
}

export function CasesExperience() {
  const { setActiveSection, scrollContainerRef } = useCasesSection();

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, clientHeight } = container;
    if (clientHeight === 0) return;
    const idx = Math.min(
      Math.round(scrollTop / clientHeight),
      TOTAL_SECTIONS - 1
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
        <CasesCover />
        {casesRegistry.map(renderCase)}
      </div>
    </div>
  );
}
