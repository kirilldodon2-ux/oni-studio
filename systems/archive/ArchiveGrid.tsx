"use client";

import { useState, useEffect } from "react";
import { BalancedMasonryGrid, Frame } from "@masonry-grid/react";
import { archiveFieldEntries } from "@/content/field";
import { ArchiveTile } from "./ArchiveTile";

/* Browse field: BalancedMasonryGrid + Frame. Geometry from entry.mediaAspect — not DOM measurement. */
function useFrameWidth(): number {
  const [frameWidth, setFrameWidth] = useState(280);

  useEffect(() => {
    function update() {
      const vw = window.innerWidth;
      if (vw < 640) setFrameWidth(150);
      else if (vw < 1024) setFrameWidth(220);
      else setFrameWidth(280);
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return frameWidth;
}

export function ArchiveGrid() {
  const frameWidth = useFrameWidth();

  return (
    <BalancedMasonryGrid
      frameWidth={frameWidth}
      gap={6}
      role="list"
      aria-label="Archive objects"
    >
      {archiveFieldEntries.map((entry) => {
        const [w, h] = entry.mediaAspect ?? [4, 3];
        return (
          <Frame key={entry.slug} width={w} height={h} role="listitem">
            <ArchiveTile entry={entry} />
          </Frame>
        );
      })}
    </BalancedMasonryGrid>
  );
}
