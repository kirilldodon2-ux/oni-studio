"use client";

import { motion, useReducedMotion } from "motion/react";
import heroSvgPaths from "../imports/heroSvgPaths";

type StructuralArc = {
  id: string;
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  rotateDeg: number;
  objectPosition: string;
  blurPx: number;
};

type GhostElement = {
  id: string;
  kind: "wire" | "archive" | "telemetry";
  left: string;
  top: string;
  width: string;
  height?: string;
  opacity: number;
  blurPx: number;
  rotateDeg?: number;
  objectPosition?: string;
  scale?: number;
};

/** Layer 1 — oversized remnants crossing the frame; field dominates. */
const STRUCTURAL_ARCS: StructuralArc[] = [
  {
    id: "struct-a",
    left: "-58%",
    top: "-38%",
    width: "195%",
    height: "82%",
    opacity: 0.78,
    rotateDeg: -31,
    objectPosition: "68% 14%",
    blurPx: 0,
  },
  {
    id: "struct-b",
    left: "22%",
    top: "-42%",
    width: "175%",
    height: "78%",
    opacity: 0.72,
    rotateDeg: 19,
    objectPosition: "32% 8%",
    blurPx: 0,
  },
  {
    id: "struct-c",
    left: "-52%",
    top: "32%",
    width: "188%",
    height: "76%",
    opacity: 0.65,
    rotateDeg: 11,
    objectPosition: "14% 82%",
    blurPx: 1,
  },
  {
    id: "struct-d",
    left: "18%",
    top: "48%",
    width: "168%",
    height: "80%",
    opacity: 0.7,
    rotateDeg: -19,
    objectPosition: "92% 48%",
    blurPx: 0,
  },
];

/** Layer 2 — ghost telemetry + varied residues; not repeated logo copies. */
const GHOST_ELEMENTS: GhostElement[] = [
  {
    id: "ghost-wire-a",
    kind: "wire",
    left: "8%",
    top: "12%",
    width: "42%",
    height: "28%",
    opacity: 0.09,
    blurPx: 5,
    rotateDeg: -6,
    objectPosition: "22% 40%",
  },
  {
    id: "ghost-archive-a",
    kind: "archive",
    left: "72%",
    top: "8%",
    width: "38%",
    height: "38%",
    opacity: 0.06,
    blurPx: 6,
    rotateDeg: 14,
    scale: 1.1,
  },
  {
    id: "ghost-telemetry-a",
    kind: "telemetry",
    left: "4%",
    top: "62%",
    width: "14%",
    height: "14%",
    opacity: 0.12,
    blurPx: 0,
  },
  {
    id: "ghost-wire-b",
    kind: "wire",
    left: "55%",
    top: "68%",
    width: "48%",
    height: "32%",
    opacity: 0.07,
    blurPx: 4,
    rotateDeg: 12,
    objectPosition: "78% 62%",
  },
  {
    id: "ghost-archive-b",
    kind: "archive",
    left: "-8%",
    top: "38%",
    width: "28%",
    height: "28%",
    opacity: 0.05,
    blurPx: 7,
    rotateDeg: -18,
    scale: 0.85,
  },
  {
    id: "ghost-wire-c",
    kind: "wire",
    left: "38%",
    top: "-6%",
    width: "36%",
    height: "24%",
    opacity: 0.08,
    blurPx: 6,
    rotateDeg: 4,
    objectPosition: "55% 28%",
  },
  {
    id: "ghost-telemetry-b",
    kind: "telemetry",
    left: "82%",
    top: "42%",
    width: "11%",
    height: "11%",
    opacity: 0.1,
    blurPx: 0,
    rotateDeg: 45,
  },
  {
    id: "ghost-archive-c",
    kind: "archive",
    left: "62%",
    top: "78%",
    width: "22%",
    height: "22%",
    opacity: 0.04,
    blurPx: 8,
    rotateDeg: -8,
    scale: 0.65,
  },
];

function HeroWire({
  objectPosition = "50% 50%",
}: {
  objectPosition?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brandbook/hero-wire.png"
      alt=""
      className="h-full w-full object-cover"
      style={{ objectPosition }}
      draggable={false}
    />
  );
}

function ArchiveGhost() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/oni_logo_black.svg"
      alt=""
      className="h-full w-full object-contain"
      style={{
        filter:
          "invert(0.42) sepia(0.06) saturate(0.15) hue-rotate(185deg) brightness(1.05)",
      }}
      draggable={false}
    />
  );
}

function TelemetryGhost() {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" aria-hidden>
      <line
        x1="20"
        y1="6"
        x2="20"
        y2="34"
        stroke="#B2B2B2"
        strokeWidth="0.6"
      />
      <line
        x1="6"
        y1="20"
        x2="34"
        y2="20"
        stroke="#B2B2B2"
        strokeWidth="0.6"
      />
    </svg>
  );
}

const NUCLEUS_OFFSET = { left: "51.5%", top: "46.5%" };

/**
 * Mobile-only hero — archive object discovered inside a field.
 * Not a responsive desktop layout; mood reference only.
 */
export function BrandbookHeroMobileNucleus() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* Layer 1 — structural orbital field */}
      {STRUCTURAL_ARCS.map((arc, i) => {
        const filter = arc.blurPx > 0 ? `blur(${arc.blurPx}px)` : undefined;
        return (
          <motion.div
            key={arc.id}
            className="pointer-events-none absolute z-[2]"
            style={{
              left: arc.left,
              top: arc.top,
              width: arc.width,
              height: arc.height,
              rotate: arc.rotateDeg,
              filter,
            }}
            initial={reduceMotion ? { opacity: arc.opacity } : { opacity: 0 }}
            animate={{ opacity: arc.opacity }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: 0.1 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden
          >
            <HeroWire objectPosition={arc.objectPosition} />
          </motion.div>
        );
      })}

      {/* Layer 2 — ghost density */}
      {GHOST_ELEMENTS.map((ghost, i) => {
        const filter = `blur(${ghost.blurPx}px)`;
        return (
          <motion.div
            key={ghost.id}
            className="pointer-events-none absolute z-[4]"
            style={{
              left: ghost.left,
              top: ghost.top,
              width: ghost.width,
              height: ghost.height ?? ghost.width,
              rotate: ghost.rotateDeg ?? 0,
              scale: ghost.scale ?? 1,
              filter,
            }}
            initial={
              reduceMotion
                ? { opacity: ghost.opacity, filter }
                : { opacity: 0, filter: `blur(${ghost.blurPx + 6}px)` }
            }
            animate={{ opacity: ghost.opacity, filter }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: 0.55 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-hidden
          >
            {ghost.kind === "wire" ? (
              <HeroWire objectPosition={ghost.objectPosition} />
            ) : null}
            {ghost.kind === "archive" ? <ArchiveGhost /> : null}
            {ghost.kind === "telemetry" ? <TelemetryGhost /> : null}
          </motion.div>
        );
      })}

      {/* Layer 3 — discovered nucleus (small, slightly off-center) */}
      <motion.div
        className="pointer-events-none absolute z-[30]"
        style={{
          left: NUCLEUS_OFFSET.left,
          top: NUCLEUS_OFFSET.top,
          transform: "translate(-50%, -50%)",
        }}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1,
          delay: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden
      >
        <svg
          viewBox="0 0 272 312.18"
          className="h-auto w-[25vw] min-w-[4.25rem] max-w-[7rem]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={heroSvgPaths.p17d3a380} fill="#070707" />
        </svg>
      </motion.div>

      {/* Layer 4 — caption, optically tied to artifact */}
      <motion.p
        className="pointer-events-none absolute z-[30] -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-[0.28em] text-[#B2B2B2]"
        style={{
          left: NUCLEUS_OFFSET.left,
          top: "58.5%",
          fontFamily: "var(--font-mono)",
        }}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 1.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-hidden
      >
        ONI(ОНИ) · BRANDBOOK · 2026
      </motion.p>
    </div>
  );
}
