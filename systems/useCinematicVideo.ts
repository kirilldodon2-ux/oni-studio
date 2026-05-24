/**
 * useCinematicVideo
 * ONI Studio — viewport-aware cinematic video playback
 *
 * Philosophy:
 * - Videos should feel alive, not aggressive
 * - Motion presence is preserved — silence is not static
 * - Safari-safe: no simultaneous decode pressure
 * - preload="none" until near viewport
 * - Graceful pause when offscreen, graceful resume when back
 */

import { useEffect, useRef, useCallback } from "react";

type CinematicVideoRegistration = {
  video: HTMLVideoElement;
  isIntersecting: boolean;
};

const registrations = new Set<CinematicVideoRegistration>();
let gestureListenersInstalled = false;
let userHasInteracted = false;

function retryPlayVisibleVideos() {
  registrations.forEach(({ video, isIntersecting }) => {
    if (!isIntersecting) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  });
}

function onFirstUserInteraction() {
  if (userHasInteracted) return;
  userHasInteracted = true;
  window.removeEventListener("click", onFirstUserInteraction, true);
  window.removeEventListener("scroll", onFirstUserInteraction, true);
  window.removeEventListener("touchstart", onFirstUserInteraction, true);
  gestureListenersInstalled = false;
  retryPlayVisibleVideos();
}

function installGestureUnlockListeners() {
  if (gestureListenersInstalled || userHasInteracted) return;
  gestureListenersInstalled = true;
  window.addEventListener("click", onFirstUserInteraction, { capture: true, passive: true });
  window.addEventListener("scroll", onFirstUserInteraction, { capture: true, passive: true });
  window.addEventListener("touchstart", onFirstUserInteraction, { capture: true, passive: true });
}

interface CinematicVideoOptions {
  /** px before viewport edge to start loading. Default: 200 */
  rootMargin?: string;
  /** 0–1 threshold to trigger play. Default: 0.15 */
  threshold?: number;
  /** ms delay before play after entering viewport. Adds editorial rhythm. Default: 80 */
  activationDelay?: number;
  /** Muted by default — required for autoplay policy */
  muted?: boolean;
  /** Loop by default */
  loop?: boolean;
}

export function useCinematicVideo<T extends HTMLVideoElement = HTMLVideoElement>(
  options: CinematicVideoOptions = {}
) {
  const {
    rootMargin = "0px 0px 200px 0px",
    threshold = 0.15,
    activationDelay = 80,
    muted = true,
    loop = true,
  } = options;

  const videoRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLoadedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const loadAndPlay = useCallback((video: T) => {
    // Set attributes before load — Safari needs this
    video.muted = muted;
    video.loop = loop;
    video.playsInline = true;

    if (!isLoadedRef.current) {
      // Trigger actual network load only when near viewport
      video.preload = "metadata";
      video.load();
      isLoadedRef.current = true;
    }

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — silently fail, atmosphere > errors
          // Browser may allow play on next user interaction
        });
      }
    };

    timerRef.current = setTimeout(attemptPlay, activationDelay);
  }, [muted, loop, activationDelay]);

  const pauseVideo = useCallback((video: T) => {
    clearTimer();
    if (!video.paused) {
      video.pause();
    }
  }, [clearTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const registration: CinematicVideoRegistration = {
      video,
      isIntersecting: false,
    };
    registrations.add(registration);
    installGestureUnlockListeners();

    // Ensure no preloading until IntersectionObserver fires
    video.preload = "none";
    video.muted = muted;
    video.loop = loop;
    video.playsInline = true;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          registration.isIntersecting = entry.isIntersecting;
          if (entry.isIntersecting) {
            loadAndPlay(video);
          } else {
            pauseVideo(video);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    observerRef.current.observe(video);

    return () => {
      registrations.delete(registration);
      clearTimer();
      observerRef.current?.disconnect();
      // Clean pause on unmount — no stale decode processes
      if (!video.paused) video.pause();
    };
  }, [rootMargin, threshold, loadAndPlay, pauseVideo, clearTimer, muted, loop]);

  return videoRef;
}
