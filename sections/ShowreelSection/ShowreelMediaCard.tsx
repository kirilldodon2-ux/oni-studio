"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import {
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
} from "@/systems/spatial/silhouetteGrounding";
import { useExportMode } from "@/systems/export";
import { useCinematicVideo } from "@/systems/useCinematicVideo";

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

/** Site-relative showreel transport path — resolved via NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN. */
const SHOWREEL_VIDEO_PATH = "/showreel/gg2.mp4";

/**
 * ShowreelMediaCard
 *
 * Unified cinematic media artifact — frame and media surface compose as one
 * spatial object:
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
 *        media-content ← showreel video (vignette pre-applied, opacity fade-in on ready)
 *      frame-layer   — z-[2], luma-matte + dual drop-shadow
 *
 *  The parallax target is `media-object`, which contains both media-well
 *  and frame-layer. Frame and media move as a single unit on parallax.
 */
export function ShowreelMediaCard() {
  const exportMode = useExportMode();
  const containerRef = useRef<HTMLDivElement>(null); // hover / mouse event target
  const mediaRef = useRef<HTMLDivElement>(null); // parallax target — whole media object
  const videoRef = useCinematicVideo<HTMLVideoElement>({
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.15,
    activationDelay: 80,
  });
  const showreelSrc = resolveArchiveMediaSrc(SHOWREEL_VIDEO_PATH);
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    if (exportMode) {
      if (media) media.style.transform = "";
      return;
    }

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    const container = containerRef.current;
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
      media.style.transform = "";
    };
  }, [exportMode]);

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
                overflow-hidden clips video to the window bounds. */}
            <div
              className="absolute aspect-video overflow-hidden"
              style={{ left: FRAME_LEFT, top: FRAME_TOP, width: FRAME_WIDTH }}
            >
              {/* Media content — vignette mask; video fades in after first frame is ready. */}
              <div
                className="absolute inset-0"
                style={{
                  maskImage: MEDIA_VIGNETTE,
                  WebkitMaskImage: MEDIA_VIGNETTE,
                }}
              >
                <video
                  ref={videoRef}
                  src={showreelSrc}
                  className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${
                    mediaReady ? "opacity-100" : "opacity-0"
                  }`}
                  muted
                  playsInline
                  loop
                  preload="none"
                  aria-label="ONI studio showreel"
                  onLoadedData={() => setMediaReady(true)}
                />
              </div>
            </div>

            {/* Frame layer — metallic PNG via luma-matte + dual silhouette shadow.
                z-[2] renders frame above media content.
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
