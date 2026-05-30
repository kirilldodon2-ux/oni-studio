"use client";

import { useEffect, useRef, useState } from "react";
import { useExportMode } from "@/systems/export";
import { ArchiveFragmentGhostCore } from "./ArchiveFragmentGhostCore";
import { ArchiveFragmentTile } from "./ArchiveFragmentTile";
import type { ArchiveFragmentEntry, FragmentCoords } from "./curatedWindow";

type ArchiveFragmentFieldProps = {
  entries: ArchiveFragmentEntry[];
  remainder: number;
};

function tileStyle(coords: FragmentCoords): React.CSSProperties {
  const transforms = [
    coords.offsetX ? `translateX(${coords.offsetX})` : "",
    coords.offsetY ? `translateY(${coords.offsetY})` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    left: coords.left,
    top: coords.top,
    width: coords.width,
    zIndex: coords.zIndex,
    transform: transforms || undefined,
    ["--oni-emerge-x" as string]: coords.emergeX ?? "0px",
    ["--oni-emerge-y" as string]: coords.emergeY ?? "10px",
  };
}

/** Staggered surfacing — 140ms between tiles (within 100–180ms spec). */
const EMERGE_STAGGER_MS = 140;
const EMERGE_DURATION_S = 1.4;

function FragmentTileStack({
  entries,
  variant,
  emerged,
}: {
  entries: ArchiveFragmentEntry[];
  variant: "desktop" | "mobile";
  emerged: boolean;
}) {
  const isDesktop = variant === "desktop";

  return (
    <>
      {entries.map((entry, index) => {
        const coords = isDesktop ? entry.desktop : entry.mobile;

        return (
          <div
            key={`${variant}-${entry.slug}`}
            className={[
              "oni-fragment-tile-wrap absolute",
              isDesktop
                ? "hidden max-w-[38%] lg:block"
                : "max-w-[46%] lg:hidden",
            ].join(" ")}
            style={{
              ...tileStyle(coords),
              animationDelay: `${index * EMERGE_STAGGER_MS}ms`,
              ["--oni-emerge-duration" as string]: `${EMERGE_DURATION_S}s`,
            }}
          >
            <ArchiveFragmentTile entry={entry} />
          </div>
        );
      })}
    </>
  );
}

export function ArchiveFragmentField({ entries, remainder }: ArchiveFragmentFieldProps) {
  const exportMode = useExportMode();
  const fieldRef = useRef<HTMLDivElement>(null);
  const [emerged, setEmerged] = useState(exportMode);

  useEffect(() => {
    if (exportMode) {
      setEmerged(true);
      return;
    }

    const el = fieldRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEmerged(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [exportMode]);

  return (
    <div
      ref={fieldRef}
      className="oni-fragment-field relative h-[400px] min-h-[360px] overflow-hidden sm:h-[420px] lg:h-[min(40vw,580px)] lg:min-h-[480px]"
      data-oni-layer="archive-fragment-window"
      data-emerged={emerged ? "true" : "false"}
    >
      <ArchiveFragmentGhostCore />

      <FragmentTileStack entries={entries} variant="mobile" emerged={emerged} />
      <FragmentTileStack entries={entries} variant="desktop" emerged={emerged} />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[14%] right-[6%] z-[2] font-sans text-[9px] font-medium uppercase tracking-[0.38em] text-neutral-200/90"
      >
        +{remainder}
      </div>
    </div>
  );
}
