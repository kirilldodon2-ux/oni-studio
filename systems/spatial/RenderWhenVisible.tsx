"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { isDocumentScrollLocked, subscribeDocumentScrollLock } from "@/systems/useDocumentScrollLock";

const AMBIENT_FRAME_INTERVAL_MS = 1000 / 30;

/** Ambient canvases use demand mode; hidden scenes need no continuous frames. */
export function RenderWhenVisible() {
  const canvas = useThree((state) => state.gl.domElement);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const sync = () => {
      clearInterval(timer);
      timer = undefined;
      if (!visible || document.visibilityState !== "visible" || isDocumentScrollLocked()) return;
      invalidate();
      if (!reduced.matches) timer = setInterval(invalidate, AMBIENT_FRAME_INTERVAL_MS);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    const unsubscribe = subscribeDocumentScrollLock(sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      unsubscribe();
    };
  }, [canvas, invalidate]);

  return null;
}
