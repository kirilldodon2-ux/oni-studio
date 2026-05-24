"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import type { ArchiveObject } from "@/content/types";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import {
  getInspectHeroOccupancy,
  INSPECT_HERO_IMAGE_SIZES,
} from "./archiveInspectLayout";
import { ArchiveEditorialSequence } from "./ArchiveEditorialSequence";
import { ONI_SILHOUETTE_FILTER } from "@/systems/spatial/silhouetteGrounding";
import { ArchiveHeroFrame } from "./ArchiveHeroFrame";
import type { ObjectEditorialAsset } from "./getObjectAssets";

const TERRITORY_LABEL: Record<string, string> = {
  "spatial-identity": "Spatial Identity",
  "system-architectures": "System Architectures",
  "editorial-motion": "Editorial Motion",
  "experimental-media": "Experimental Media",
  "archive-research": "Archive Research",
  "atmospheric-fragments": "Atmospheric Fragments",
};

const NAV_ZONE = 0.33;

type Props = {
  entry: ArchiveObject;
  prev: ArchiveObject | null;
  next: ArchiveObject | null;
  index: number;
  total: number;
  heroAsset?: ObjectEditorialAsset | null;
  sequenceAssets?: ObjectEditorialAsset[];
};

export function ArchiveInspectView({
  entry,
  prev,
  next,
  index,
  total,
  heroAsset = null,
  sequenceAssets = [],
}: Props) {
  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelCooldown = useRef(false);

  const isVideo = entry.mediaType === "video" || entry.mediaType === "motion";

  const heroWidth = heroAsset?.width ?? 0;
  const heroHeight = heroAsset?.height ?? 0;
  const [aspectW, aspectH] = heroAsset
    ? [heroWidth, heroHeight]
    : (entry.mediaAspect ?? [4, 3]);

  const fallbackHeroW = aspectW * 270;
  const fallbackHeroH = aspectH * 270;

  const heroSrc = resolveArchiveMediaSrc(heroAsset?.src ?? entry.previewSrc);
  const imageWidth = heroAsset ? heroWidth : fallbackHeroW;
  const imageHeight = heroAsset ? heroHeight : fallbackHeroH;

  const heroOccupancy = getInspectHeroOccupancy(aspectW, aspectH);

  const territories = entry.territories
    .map((t) => TERRITORY_LABEL[t] ?? t)
    .join(" · ");

  const goPrev = useCallback(() => {
    if (prev) router.push(`/archive/${prev.slug}`);
  }, [prev, router]);

  const goNext = useCallback(() => {
    if (next) router.push(`/archive/${next.slug}`);
  }, [next, router]);

  useEffect(() => {
    if (prev) router.prefetch(`/archive/${prev.slug}`);
    if (next) router.prefetch(`/archive/${next.slug}`);
  }, [prev, next, router]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") router.push("/archive");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, router]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function onTouchStart(e: TouchEvent) {
      touchStartX.current = e.touches[0].clientX;
    }
    function onTouchEnd(e: TouchEvent) {
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(delta) < 48) return;
      if (delta > 0) goNext();
      else goPrev();
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [goPrev, goNext]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (wheelCooldown.current) return;
      wheelAccum.current += e.deltaX;
      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAccum.current = 0;
      }, 180);
      if (Math.abs(wheelAccum.current) > 80) {
        const dir = wheelAccum.current;
        wheelAccum.current = 0;
        wheelCooldown.current = true;
        setTimeout(() => {
          wheelCooldown.current = false;
        }, 700);
        if (dir > 0) goNext();
        else goPrev();
      }
    }
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goPrev, goNext]);

  function handleViewportClick(e: React.MouseEvent) {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const w = rect.width;
    if (x < w * NAV_ZONE) goPrev();
    else if (x > w * (1 - NAV_ZONE)) goNext();
  }

  function handleViewportMouseMove(e: React.MouseEvent) {
    const el = viewportRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    if (x < w * NAV_ZONE && prev) el.style.cursor = "w-resize";
    else if (x > w * (1 - NAV_ZONE) && next) el.style.cursor = "e-resize";
    else el.style.cursor = "";
  }

  function stopProp(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return (
    <div className="archive-inspect">
      <div
        ref={viewportRef}
        className="archive-inspect__viewport"
        onClick={handleViewportClick}
        onMouseMove={handleViewportMouseMove}
        onMouseLeave={() => {
          if (viewportRef.current) viewportRef.current.style.cursor = "";
        }}
      >
        <header
          className="archive-inspect__chrome mb-6 flex items-center justify-between"
          aria-label="Archive navigation"
          onClick={stopProp}
        >
          <Link
            href="/archive"
            className="font-sans text-[9px] font-medium uppercase tracking-[0.4em] text-neutral-400 transition-colors duration-200 hover:text-black"
          >
            ← Archive
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-sans text-[9px] font-medium tabular-nums uppercase tracking-[0.3em] text-neutral-300">
              {String(index + 1).padStart(2, "0")}&thinsp;/&thinsp;
              {String(total).padStart(2, "0")}
            </span>
            <span className="font-sans text-[9px] text-neutral-200" aria-hidden>
              |
            </span>
            {prev ? (
              <Link
                href={`/archive/${prev.slug}`}
                className="font-sans text-[9px] font-medium tracking-[0.3em] text-neutral-300 transition-colors duration-150 hover:text-neutral-700"
                aria-label={`Previous: ${prev.title}`}
              >
                ←
              </Link>
            ) : (
              <span className="select-none font-sans text-[9px] text-neutral-200" aria-hidden>
                ←
              </span>
            )}
            {next ? (
              <Link
                href={`/archive/${next.slug}`}
                className="font-sans text-[9px] font-medium tracking-[0.3em] text-neutral-300 transition-colors duration-150 hover:text-neutral-700"
                aria-label={`Next: ${next.title}`}
              >
                →
              </Link>
            ) : (
              <span className="select-none font-sans text-[9px] text-neutral-200" aria-hidden>
                →
              </span>
            )}
          </div>
        </header>

        <figure className="archive-inspect__exhibit">
          <div
            className="archive-inspect__artifact"
            style={heroOccupancy}
            onClick={stopProp}
          >
            <ArchiveHeroFrame className="w-full">
              {isVideo && !heroAsset ? (
                <video
                  src={heroSrc}
                  controls
                  autoPlay
                  muted
                  loop={entry.mediaType === "motion"}
                  playsInline
                  preload="metadata"
                  className="block h-full w-full object-contain"
                  style={{ filter: ONI_SILHOUETTE_FILTER }}
                />
              ) : (
                <Image
                  src={heroSrc}
                  alt={entry.title}
                  width={imageWidth}
                  height={imageHeight}
                  quality={100}
                  priority
                  sizes={INSPECT_HERO_IMAGE_SIZES}
                  className="block h-full w-full object-contain"
                  style={{ filter: ONI_SILHOUETTE_FILTER }}
                />
              )}
            </ArchiveHeroFrame>
          </div>

          <figcaption
            className="archive-inspect__caption mt-4 border-t border-black/[0.07] pt-4"
            onClick={stopProp}
          >
            <div className="flex items-start justify-between gap-8">
              <div>
                <p className="font-sans text-[8px] font-medium uppercase tracking-[0.44em] text-neutral-300">
                  {territories}
                  {entry.creator && (
                    <>
                      &nbsp;&nbsp;·&nbsp;&nbsp;
                      <span className="text-neutral-500">{entry.creator}</span>
                    </>
                  )}
                </p>
                <h1 className="mt-2.5 font-bebas text-[clamp(1.5rem,3.5vw,2.6rem)] uppercase leading-[0.88] tracking-[0.06em] text-black/80">
                  {entry.title}
                </h1>
                {entry.summary && (
                  <p className="mt-3 max-w-xs font-sans text-[11px] leading-[1.75] text-neutral-400">
                    {entry.summary}
                  </p>
                )}
              </div>
              <p className="shrink-0 pt-0.5 font-sans text-[9px] font-medium tabular-nums uppercase tracking-[0.32em] text-neutral-300">
                {entry.year}
              </p>
            </div>
          </figcaption>
        </figure>
      </div>

      <ArchiveEditorialSequence assets={sequenceAssets} title={entry.title} />
    </div>
  );
}
