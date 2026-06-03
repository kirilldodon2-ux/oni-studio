"use client";

import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import {
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
} from "@/systems/spatial/silhouetteGrounding";
import { useExportMode } from "@/systems/export";
import { useCinematicVideo } from "@/systems/useCinematicVideo";
import { ShowreelInstallationViewer } from "./ShowreelInstallationViewer";

// ─── Frame positioning constants ─────────────────────────────────────────────
// Mapped to showreel_frame.png (1536×1024 RGBA) transparent aperture (alpha ≤ 32).
const FRAME_LEFT = "18.7%";
const FRAME_TOP = "22.0%";
const FRAME_WIDTH = "63.4%";
const FRAME_HEIGHT = "57.0%";

// ─── Frame filter ─────────────────────────────────────────────────────────────
// Native RGBA aperture — silhouette shadows only (no luma-matte rebuild).
const FRAME_FILTER = [ONI_SILHOUETTE_CONTACT, ONI_SILHOUETTE_LIFT].join(" ");

// ─── Media-well vignette mask ─────────────────────────────────────────────────
const MEDIA_VIGNETTE =
  "radial-gradient(ellipse 88% 86% at 50% 50%, black 55%, transparent 100%)";

/** Site-relative showreel transport path — resolved via NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN. */
const SHOWREEL_VIDEO_PATH = "/showreel/gg2.mp4";

/**
 * ShowreelMediaCard — ambient artifact (State A) + installation viewer (State B).
 */
export function ShowreelMediaCard() {
  const exportMode = useExportMode();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useCinematicVideo<HTMLVideoElement>({
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.15,
    activationDelay: 80,
  });
  const showreelSrc = resolveArchiveMediaSrc(SHOWREEL_VIDEO_PATH);
  const [mediaReady, setMediaReady] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [syncTime, setSyncTime] = useState(0);

  const openViewer = useCallback(() => {
    if (exportMode) return;
    const ambient = videoRef.current;
    const t = ambient?.currentTime ?? 0;
    setSyncTime(t);
    ambient?.pause();
    setViewerOpen(true);
  }, [exportMode, videoRef]);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  const handleTimeSync = useCallback(
    (time: number) => {
      setSyncTime(time);
      const ambient = videoRef.current;
      if (!ambient) return;
      ambient.currentTime = time;
      ambient.muted = true;
      ambient.play().catch(() => {});
    },
    [videoRef]
  );

  useEffect(() => {
    const media = mediaRef.current;
    if (exportMode || viewerOpen) {
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

    const MAX_OFFSET = 5;
    const LERP = 0.065;

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
  }, [exportMode, viewerOpen]);

  useEffect(() => {
    if (viewerOpen) videoRef.current?.pause();
  }, [viewerOpen, videoRef]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openViewer}
        disabled={exportMode}
        aria-label="Open showreel installation"
        className={[
          "group relative w-full border-0 bg-transparent p-0 text-left",
          exportMode ? "cursor-default" : "cursor-pointer",
        ].join(" ")}
      >
        <div className="oni-showreel-float will-change-transform">
          <div
            ref={containerRef}
            className={`relative transition-transform duration-700 ease-out will-change-transform ${
              exportMode ? "" : "group-hover:scale-[1.012]"
            }`}
            style={{ aspectRatio: "1536 / 1024" }}
          >
            <div
              ref={mediaRef}
              className="absolute inset-0 will-change-transform"
            >
              <div
                className="absolute overflow-hidden"
                style={{
                  left: FRAME_LEFT,
                  top: FRAME_TOP,
                  width: FRAME_WIDTH,
                  height: FRAME_HEIGHT,
                }}
              >
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
      </button>

      {!exportMode && (
        <ShowreelInstallationViewer
          isOpen={viewerOpen}
          onClose={closeViewer}
          src={showreelSrc}
          syncTime={syncTime}
          onTimeSync={handleTimeSync}
          returnFocusRef={triggerRef}
        />
      )}
    </>
  );
}
