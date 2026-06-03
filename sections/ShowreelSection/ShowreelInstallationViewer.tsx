"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useDocumentScrollLock } from "@/systems/useDocumentScrollLock";
import {
  ONI_SILHOUETTE_CONTACT,
  ONI_SILHOUETTE_LIFT,
} from "@/systems/spatial/silhouetteGrounding";

const FRAME_LEFT = "18.7%";
const FRAME_TOP = "22.0%";
const FRAME_WIDTH = "63.4%";
const FRAME_HEIGHT = "57.0%";
const FRAME_FILTER = [ONI_SILHOUETTE_CONTACT, ONI_SILHOUETTE_LIFT].join(" ");
const MEDIA_VIGNETTE =
  "radial-gradient(ellipse 88% 86% at 50% 50%, black 55%, transparent 100%)";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ShowreelInstallationViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  syncTime: number;
  onTimeSync: (time: number) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

export function ShowreelInstallationViewer({
  isOpen,
  onClose,
  src,
  syncTime,
  onTimeSync,
  returnFocusRef,
}: ShowreelInstallationViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewerVideoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    const t = viewerVideoRef.current?.currentTime ?? syncTime;
    onTimeSync(t);
    onClose();
  }, [onClose, onTimeSync, syncTime]);

  useDocumentScrollLock(isOpen, { blockTouchMove: true });

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const target = returnFocusRef.current ?? previousFocus;
      target?.focus();
    };
  }, [isOpen, handleClose, returnFocusRef]);

  useEffect(() => {
    const video = viewerVideoRef.current;
    if (!video) return;

    if (!isOpen) {
      video.pause();
      video.muted = true;
      return;
    }

    video.currentTime = syncTime;
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [isOpen, syncTime]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="ONI showreel installation"
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 z-30 flex items-center justify-center px-4 py-16",
        "transition-opacity duration-[700ms] ease-out motion-reduce:transition-none",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        className="absolute inset-0 bg-white/96 backdrop-blur-[2px]"
        aria-hidden
        onPointerDown={handleClose}
      />

      <button
        ref={closeRef}
        type="button"
        className="absolute right-5 top-20 z-[1] font-sans text-[9px] uppercase tracking-[0.35em] text-neutral-400 hover:opacity-60"
        onClick={handleClose}
      >
        CLOSE
      </button>

      <div
        className={[
          "relative z-[1] w-full max-w-[min(92vw,1100px)] transition-[opacity,transform] duration-[700ms] ease-out motion-reduce:transition-none",
          isOpen
            ? "scale-100 opacity-100 motion-reduce:scale-100"
            : "scale-[0.98] opacity-0 motion-reduce:scale-100",
        ].join(" ")}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full"
          style={{ aspectRatio: "1536 / 1024" }}
        >
          <div className="absolute inset-0">
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
                  ref={viewerVideoRef}
                  src={src}
                  className="h-full w-full object-cover"
                  playsInline
                  loop
                  preload="auto"
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
                sizes="(max-width: 640px) 92vw, 1100px"
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
