"use client";

import { useEffect } from "react";

type BodyStyleSnapshot = {
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  touchAction: string;
};

type LockSnapshot = {
  scrollY: number;
  htmlOverflow: string;
  body: BodyStyleSnapshot;
};

let lockCount = 0;
let touchMoveBlockCount = 0;
let snapshot: LockSnapshot | null = null;

function captureBodyStyles(body: HTMLElement): BodyStyleSnapshot {
  return {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    left: body.style.left,
    right: body.style.right,
    width: body.style.width,
    touchAction: body.style.touchAction,
  };
}

function applyDocumentScrollLock() {
  const html = document.documentElement;
  const body = document.body;

  snapshot = {
    scrollY: window.scrollY,
    htmlOverflow: html.style.overflow,
    body: captureBodyStyles(body),
  };

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${snapshot.scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.touchAction = "none";
}

function releaseDocumentScrollLock() {
  if (!snapshot) return;

  const html = document.documentElement;
  const body = document.body;
  const { scrollY, htmlOverflow, body: prev } = snapshot;

  html.style.overflow = htmlOverflow;
  body.style.overflow = prev.overflow;
  body.style.position = prev.position;
  body.style.top = prev.top;
  body.style.left = prev.left;
  body.style.right = prev.right;
  body.style.width = prev.width;
  body.style.touchAction = prev.touchAction;

  window.scrollTo(0, scrollY);
  snapshot = null;
}

function onDocumentTouchMove(e: TouchEvent) {
  e.preventDefault();
}

function installTouchMoveBlock() {
  document.addEventListener("touchmove", onDocumentTouchMove, { passive: false });
}

function removeTouchMoveBlock() {
  document.removeEventListener("touchmove", onDocumentTouchMove);
}

export type UseDocumentScrollLockOptions = {
  /** Block document touchmove while locked — iOS Safari background scroll guard. */
  blockTouchMove?: boolean;
};

/**
 * iOS-safe document scroll lock with ref counting.
 * First acquire saves scroll position and inline styles; last release restores both.
 */
export function useDocumentScrollLock(
  enabled: boolean,
  options: UseDocumentScrollLockOptions = {}
) {
  const blockTouchMove = options.blockTouchMove ?? false;

  useEffect(() => {
    if (!enabled) return;

    lockCount += 1;
    if (lockCount === 1) {
      applyDocumentScrollLock();
    }

    if (blockTouchMove) {
      touchMoveBlockCount += 1;
      if (touchMoveBlockCount === 1) {
        installTouchMoveBlock();
      }
    }

    return () => {
      if (blockTouchMove) {
        touchMoveBlockCount -= 1;
        if (touchMoveBlockCount === 0) {
          removeTouchMoveBlock();
        }
      }

      lockCount -= 1;
      if (lockCount === 0) {
        releaseDocumentScrollLock();
      }
    };
  }, [enabled, blockTouchMove]);
}
