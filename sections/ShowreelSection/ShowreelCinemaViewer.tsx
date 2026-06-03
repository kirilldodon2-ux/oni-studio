"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useDocumentScrollLock } from "@/systems/useDocumentScrollLock";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Above navigation control surface (z-40) and menu overlay (z-50). */
const CINEMA_LAYER_Z = "z-[60]";

type ShowreelCinemaViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  syncTime: number;
  onTimeSync: (time: number) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

/** Mobile (<768px): dedicated fullscreen cinema — black field, video only, audio on. */
export function ShowreelCinemaViewer({
  isOpen,
  onClose,
  src,
  syncTime,
  onTimeSync,
  returnFocusRef,
}: ShowreelCinemaViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const viewerVideoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    const t = viewerVideoRef.current?.currentTime ?? syncTime;
    onClose();
    setTimeout(() => onTimeSync(t), 0);
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
      target?.focus({ preventScroll: true });
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

  const layer = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="ONI showreel"
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 flex h-[100dvh] max-h-[100dvh] w-full flex-col bg-black",
        CINEMA_LAYER_Z,
        "touch-none overscroll-none",
        "transition-opacity duration-[700ms] ease-out motion-reduce:transition-none",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close showreel"
        className="absolute inset-0 z-0 cursor-default border-0 bg-transparent p-0"
        onClick={handleClose}
      />

      <div className="pointer-events-none relative z-[1] flex min-h-0 flex-1 items-center justify-center">
        <video
          ref={viewerVideoRef}
          src={src}
          className={[
            "max-h-full max-w-full object-contain",
            isOpen ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          playsInline
          loop
          preload="auto"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        className="fixed right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-[2] font-sans text-[9px] uppercase tracking-[0.35em] text-white/45 hover:opacity-60"
        onClick={handleClose}
      >
        CLOSE
      </button>
    </div>
  );

  if (typeof document === "undefined") return layer;

  return createPortal(layer, document.body);
}
