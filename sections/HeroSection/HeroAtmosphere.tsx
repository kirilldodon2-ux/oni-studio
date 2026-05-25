"use client";

import { useEffect, useState, type RefObject } from "react";
import { AmbientField } from "@/systems/atmosphere/AmbientField";
import { useDepthField } from "@/systems/atmosphere/useDepthField";
import { useExportMode } from "@/systems/export";

/**
 * HeroAtmosphere
 *
 * Environmental field layer that activates the spatial volume around the 3D
 * hero sculpture. Faint concentric rings, dashed guide axes, cardinal ticks,
 * and two small accent marks create an infrastructural field — not decoration.
 *
 * Architecture:
 *   z-[1]   — below WebGL scene (z-[5]) and editorial text column (z-20)
 *   desktop-only (hidden lg:block) — field occupies hero artboard
 *   pointer-events-none / aria-hidden — decorative, no interaction
 *
 * Depth system: four AmbientField wrappers at different useDepthField factors
 * create subtle layer separation as the user begins to scroll. Rings at outer
 * depth move most; inner depth ring barely moves. Combined with staggered
 * animation-delay phase offsets (negative = pre-started), the rings drift
 * asynchronously — no visible loop, no periodic repetition at human scale.
 *
 * Onset: 500ms timeout → 2000ms opacity transition. The atmospheric field
 * materializes slowly after the editorial text has begun to appear.
 * Reduced-motion: onset fires immediately, no opacity transition.
 *
 * Positioning: scene occupies grid cols 5–12 (33.3 → 100% of viewport width).
 * CinematicOffset [0.34, 0.1, 0.08] shifts the sculpture's visual center to
 * approximately left:69%, top:44% of the hero artboard.
 */
export function HeroAtmosphere() {
  const exportMode = useExportMode();
  const [present, setPresent] = useState(exportMode);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (exportMode) {
      setPresent(true);
      return;
    }

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(rm);
    if (rm) {
      setPresent(true);
      return;
    }
    const id = setTimeout(() => setPresent(true), 500);
    return () => clearTimeout(id);
  }, [exportMode]);

  // Four depth planes — parallax factors create subtle Z-separation on scroll.
  // Outer moves most (reads as furthest); innermost barely moves.
  const outerRef = useDepthField(0.025);        // furthest: slow drift with scroll
  const guideRef = useDepthField(0.012);        // guide axes: barely perceptible
  const midRef   = useDepthField(0.04, true);   // inverted: apparent depth contrast
  const innerRef = useDepthField(0.018);        // closest: subtlest movement

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] hidden select-none overflow-hidden lg:block"
      aria-hidden="true"
      style={{
        opacity: present ? 1 : 0,
        transition:
          exportMode || reducedMotion
            ? undefined
            : "opacity 2000ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        willChange: exportMode ? "auto" : present ? "auto" : "opacity",
      }}
    >
      {/* ── Outer ring ─────────────────────────────────────────────────────
          Pure opacity breathing, phase 0. Furthest depth plane.
          Diameter: 580px — enveloping atmospheric halo.                   */}
      <div
        ref={outerRef as RefObject<HTMLDivElement>}
        className="absolute"
        style={{ left: "69%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <AmbientField breathe delay={0}>
          <svg
            width="580"
            height="580"
            viewBox="0 0 580 580"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="290" cy="290" r="282"
              stroke="#dfdfdf" strokeWidth="0.6" opacity="0.28"
            />
          </svg>
        </AmbientField>
      </div>

      {/* ── Guide axes ─────────────────────────────────────────────────────
          Dashed vertical + horizontal reference lines. Breathes slowly,
          phase −3200ms offset. Slowest depth plane.                       */}
      <div
        ref={guideRef as RefObject<HTMLDivElement>}
        className="absolute"
        style={{ left: "69%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <AmbientField breathe delay={-3200}>
          <svg
            width="520"
            height="520"
            viewBox="0 0 520 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="260" y1="48" x2="260" y2="472"
              stroke="#e2e2e2" strokeWidth="0.5"
              strokeDasharray="2 9" opacity="0.30"
            />
            <line
              x1="48" y1="260" x2="472" y2="260"
              stroke="#e2e2e2" strokeWidth="0.5"
              strokeDasharray="2 9" opacity="0.30"
            />
          </svg>
        </AmbientField>
      </div>

      {/* ── Middle ring ────────────────────────────────────────────────────
          Drift + breathe combined (globals.css combined rule).
          Inverted depth — moves counter to scroll; reads as a closer plane.
          Phase −5800ms: already 41% into drift cycle, 32% into breath.    */}
      <div
        ref={midRef as RefObject<HTMLDivElement>}
        className="absolute"
        style={{ left: "69%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <AmbientField drift breathe delay={-5800}>
          <svg
            width="390"
            height="390"
            viewBox="0 0 390 390"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="195" cy="195" r="188"
              stroke="#dadada" strokeWidth="0.7" opacity="0.38"
            />
          </svg>
        </AmbientField>
      </div>

      {/* ── Inner ring + cardinal ticks ────────────────────────────────────
          Drift only. Phase −9500ms: well into its cycle, asynchronous
          relative to the outer rings. Four cardinal tick marks read as
          an environmental measuring instrument.                            */}
      <div
        ref={innerRef as RefObject<HTMLDivElement>}
        className="absolute"
        style={{ left: "69%", top: "44%", transform: "translate(-50%, -50%)" }}
      >
        <AmbientField drift delay={-9500}>
          <svg
            width="245"
            height="245"
            viewBox="0 0 245 245"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="122.5" cy="122.5" r="115"
              stroke="#d4d4d4" strokeWidth="0.75" opacity="0.48"
            />
            {/* Cardinal ticks — N / S / W / E */}
            <line x1="122.5" y1="4"   x2="122.5" y2="14"  stroke="#c8c8c8" strokeWidth="0.75" opacity="0.45" />
            <line x1="122.5" y1="231" x2="122.5" y2="241" stroke="#c8c8c8" strokeWidth="0.75" opacity="0.45" />
            <line x1="4"     y1="122.5" x2="14"  y2="122.5" stroke="#c8c8c8" strokeWidth="0.75" opacity="0.45" />
            <line x1="231"   y1="122.5" x2="241" y2="122.5" stroke="#c8c8c8" strokeWidth="0.75" opacity="0.45" />
          </svg>
        </AmbientField>
      </div>

      {/* ── Environmental accent marks ─────────────────────────────────────
          Two small marks that echo the global backdrop's marker language.
          Positioned slightly off the ring center — asymmetric field notation.
          Phase offsets ensure they're never in sync with the rings.        */}
      <div
        className="absolute"
        style={{ left: "76%", top: "27%" }}
      >
        <AmbientField breathe delay={-7200}>
          <div
            style={{
              width: 5, height: 5,
              background: "#FF4A1A",
              opacity: 0.36,
            }}
          />
        </AmbientField>
      </div>

      <div
        className="absolute"
        style={{ left: "60%", top: "65%" }}
      >
        <AmbientField breathe delay={-11400}>
          <div
            style={{
              width: 3, height: 3,
              background: "#000",
              opacity: 0.20,
              borderRadius: "50%",
            }}
          />
        </AmbientField>
      </div>
    </div>
  );
}
