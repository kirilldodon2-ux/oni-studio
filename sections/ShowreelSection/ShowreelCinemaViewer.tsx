"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ShowreelCinemaViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  syncTime: number;
  onTimeSync: (time: number) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
};

/** Mobile (<768px): fullscreen cinema — black field, video only, audio on. */
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
    onTimeSync(t);
    onClose();
  }, [onClose, onTimeSync, syncTime]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
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
      document.body.style.overflow = "";
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
      aria-label="ONI showreel"
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 z-30 bg-black",
        "transition-opacity duration-[700ms] ease-out motion-reduce:transition-none",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <video
        ref={viewerVideoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-contain"
        playsInline
        loop
        preload="auto"
      />

      <button
        ref={closeRef}
        type="button"
        className="fixed right-5 top-[max(1.25rem,env(safe-area-inset-top))] z-[1] font-sans text-[9px] uppercase tracking-[0.35em] text-white/45 hover:opacity-60"
        onClick={handleClose}
      >
        CLOSE
      </button>
    </div>
  );
}
