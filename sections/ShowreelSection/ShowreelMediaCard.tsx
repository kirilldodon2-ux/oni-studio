"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import {
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
} from "@/systems/spatial/silhouetteGrounding";

// ─── Frame positioning constants ─────────────────────────────────────────────
// These map to the metallic frame PNG's inner window (1024×682 source image).
// Adjust FRAME_LEFT / FRAME_TOP / FRAME_WIDTH if the frame asset is replaced.
// Inner window measured at ≈ 8 % L/R margin, ≈ 14 % from top, ≈ 84 % wide.
const FRAME_LEFT = "8.2%";
const FRAME_TOP = "13.8%";
const FRAME_WIDTH = "83.6%";

// ─── Frame filter ─────────────────────────────────────────────────────────────
// CSS filter chain applied to the frame layer:
//   1. url(#oni-luma-matte) — SVG filter: contrast-boost → luma-matte → alpha-sharpen
//   2. drop-shadow contact  — tight, restrained spatial grounding
//   3. drop-shadow halo     — wide, near-invisible atmospheric lift
//
// Both shadows trace the visible PNG silhouette (post-matte output is used as
// drop-shadow input, so the transparent background is excluded from shadow).
const FRAME_FILTER = [
  "url(#oni-luma-matte)",
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
].join(" ");

// ─── Media-well vignette mask ─────────────────────────────────────────────────
// Radial soft-edge mask pre-applied to the media-content layer.
// Has zero visual effect while the layer is empty.
// When future video/still is inserted into that layer, its edges will dissolve
// softly into the frame rather than cutting hard at the window boundary.
const MEDIA_VIGNETTE =
  "radial-gradient(ellipse 88% 86% at 50% 50%, black 55%, transparent 100%)";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="ml-0.5 h-6 w-6 text-white"
      aria-hidden
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

/**
 * ShowreelMediaCard
 *
 * Unified cinematic media artifact — frame, media surface, and play control
 * compose as one spatial object:
 *
 *  Compositing model (SVG filter `#oni-luma-matte`):
 *    Step 1 — feColorMatrix matrix: contrast boost (1.2×, pivot 0.5)
 *             sharpens metallic mid-tones, elevates specular highlights,
 *             deepens recessed areas before matte is extracted
 *    Step 2 — feColorMatrix luminanceToAlpha: extracts luma from the
 *             contrast-enhanced image as alpha
 *    Step 3 — feComponentTransfer feFuncA gamma (√): sharpens the alpha
 *             falloff curve — pushes mid-dark metallic zones toward opacity,
 *             eliminates fog/haze from semi-transparent metallic areas
 *    Step 4 — feComposite in=boosted operator=in: composites the
 *             contrast-boosted source colors through the sharpened alpha mask
 *    CSS drop-shadow chained after matte traces visible silhouette, not bbox.
 *
 *  Media stack (unified spatial unit):
 *    float div       — CSS keyframe ±7px Y (md+, reduced-motion safe)
 *    card div        — CSS transition scale ×1.012 (hover)
 *    media-object    — JS rAF parallax ±5px X/Y (fine pointer)
 *      media-well    — absolute, inset to frame window, overflow-hidden
 *        media-content ← dedicated layer for future video/still (vignette pre-applied)
 *        play button ← z-[1], above media-content, unmasked
 *      frame-layer   — z-[2], luma-matte + dual drop-shadow
 *
 *  The parallax target is `media-object`, which contains both media-well
 *  and frame-layer. Frame and play control move as a single unit on parallax.
 */
export function ShowreelMediaCard() {
  const containerRef = useRef<HTMLDivElement>(null); // hover / mouse event target
  const mediaRef = useRef<HTMLDivElement>(null); // parallax target — whole media object

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    const MAX_OFFSET = 5; // px — restrained spatial depth cue
    const LERP = 0.065; // interpolation factor — physically calm

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      tx =
        ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAX_OFFSET;
      ty =
        ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAX_OFFSET;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      media.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`;
      rafId = requestAnimationFrame(tick);
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseleave", onLeave, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    /* Layer 1 — hover detection context */
    <div className="group relative w-full">
      {/* SVG filter definition: enhanced luminance-matte for metallic rendering.
          Inline placement ensures the filter ID resolves in this document tree.
          width/height 0 + overflow-hidden produces zero layout footprint. */}
      <svg
        aria-hidden
        className="absolute h-0 w-0 overflow-hidden"
        focusable="false"
      >
        <defs>
          <filter
            id="oni-luma-matte"
            colorInterpolationFilters="sRGB"
            x="-2%"
            y="-2%"
            width="104%"
            height="104%"
          >
            {/* Step 1 — contrast boost: pivot at 0.5, amplitude 1.2.
                Sharpens metallic mid-tones, elevates specular highlights,
                deepens recessed areas before the matte is extracted. */}
            <feColorMatrix
              type="matrix"
              values="1.2 0 0 0 -0.10  0 1.2 0 0 -0.10  0 0 1.2 0 -0.10  0 0 0 1 0"
              result="boosted"
            />
            {/* Step 2 — luminance → alpha: black → α=0, silver → α≈0.8, white → α=1 */}
            <feColorMatrix
              type="luminanceToAlpha"
              in="boosted"
              result="luma"
            />
            {/* Step 3 — alpha gamma (√): pushes mid-dark zones toward opacity.
                Without correction, luma 0.4 → α=0.4 → foggy 0.76 on white.
                With √: luma 0.4 → α=0.63 → defined 0.63 on white. */}
            <feComponentTransfer in="luma" result="luma-sharp">
              <feFuncA type="gamma" amplitude="1" exponent="0.5" offset="0" />
            </feComponentTransfer>
            {/* Step 4 — composite contrast-boosted colors through sharpened alpha */}
            <feComposite in="boosted" in2="luma-sharp" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* Layer 2 — float animation (CSS keyframe, md+, reduced-motion safe) */}
      <div className="oni-showreel-float will-change-transform">
        {/* Layer 3 — hover scale (transition, isolated from float animation) */}
        <div
          ref={containerRef}
          className="relative transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.012]"
          style={{ aspectRatio: "1024 / 682" }}
        >
          {/* Layer 4 — unified media object (parallax target).
              Contains both media-well and frame-layer so all elements
              of the spatial unit move together on parallax. */}
          <div
            ref={mediaRef}
            className="absolute inset-0 will-change-transform"
          >
            {/* Media well: inset to frame's inner window.
                overflow-hidden clips future video to the window bounds.
                Siblings: media-content (masked, for video) + play control (unmasked). */}
            <div
              className="absolute aspect-video overflow-hidden"
              style={{ left: FRAME_LEFT, top: FRAME_TOP, width: FRAME_WIDTH }}
            >
              {/* Media content layer — reserved for future video or still frame.
                  Vignette mask pre-applied: edges dissolve softly into the frame
                  rather than hard-cutting at the window boundary.
                  Currently empty — zero visual effect until content is inserted. */}
              <div
                className="absolute inset-0"
                style={{
                  maskImage: MEDIA_VIGNETTE,
                  WebkitMaskImage: MEDIA_VIGNETTE,
                }}
                aria-hidden
              />

              {/* Play control — z-[1] places it above future media content, unmasked. */}
              <button
                type="button"
                className="absolute inset-0 z-[1] flex cursor-pointer items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oni-accent focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                aria-label="Play showreel video"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-oni-accent ring-1 ring-white/20 transition-transform duration-500 ease-out hover:scale-[1.06] active:scale-[0.96] md:h-[3.75rem] md:w-[3.75rem]">
                  <PlayIcon />
                </span>
              </button>
            </div>

            {/* Frame layer — metallic PNG via luma-matte + dual silhouette shadow.
                z-[2] renders frame above media content.
                Frame's transparent inner window lets play control show through.
                Drop-shadows follow visible PNG silhouette via post-matte chain. */}
            <div
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{ filter: FRAME_FILTER }}
              aria-hidden
            >
              <Image
                src="/frames/showreel_frame.png"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1100px) 80vw, 880px"
                className="object-fill select-none"
                draggable={false}
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
