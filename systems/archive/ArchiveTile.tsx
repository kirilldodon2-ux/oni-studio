"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArchiveObject } from "@/content/types";
import { useCinematicVideo } from "@/systems/useCinematicVideo";

const TERRITORY_SHORT: Record<string, string> = {
  "spatial-identity": "Spatial Identity",
  "system-architectures": "System Architectures",
  "editorial-motion": "Editorial Motion",
  "experimental-media": "Experimental Media",
  "archive-research": "Archive Research",
  "atmospheric-fragments": "Atmospheric Fragments",
};

type ArchiveTileProps = {
  entry: ArchiveObject;
};

/** Browse optical presentation inside masonry Frame. Geometry from entry.mediaAspect. */
export function ArchiveTile({ entry }: ArchiveTileProps) {
  const [w, h] = entry.mediaAspect ?? [4, 3];
  const territory = TERRITORY_SHORT[entry.territories[0]] ?? entry.territories[0];
  const isCinematicVideo =
    entry.mediaType === "motion" || entry.mediaType === "video";
  const videoRef = useCinematicVideo<HTMLVideoElement>({
    rootMargin: "0px 0px 200px 0px",
    threshold: 0.15,
    activationDelay: 80,
  });

  return (
    <Link
      href={`/archive/${entry.slug}`}
      className="group relative block overflow-hidden rounded-[2px] bg-neutral-100 sm:rounded-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black/25"
      aria-label={`${entry.title} — ${territory}, ${entry.year}`}
    >
      <div className="relative">
        {isCinematicVideo ? (
          <video
            ref={videoRef}
            src={entry.previewSrc}
            width={w * 200}
            height={h * 200}
            muted
            playsInline
            loop
            preload="none"
            className="h-auto w-full transition-opacity duration-500 ease-out group-hover:opacity-[0.90]"
          />
        ) : (
          <Image
            src={entry.previewSrc}
            alt=""
            width={w * 200}
            height={h * 200}
            className="h-auto w-full transition-[filter,opacity] duration-500 ease-out group-hover:brightness-[1.04] group-hover:opacity-[0.90]"
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 46vw, 30vw"
          />
        )}

        {/* Metadata overlay — opacity only, inside frame bounds */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 bg-white/[0.94] px-3 pb-3 pt-2.5 opacity-0 transition-opacity duration-250 ease-out group-hover:opacity-100"
          aria-hidden
        >
          <p className="truncate font-sans text-[7px] font-medium uppercase tracking-[0.42em] text-neutral-400">
            {territory}
            {entry.creator && (
              <span className="text-neutral-300">&nbsp;&nbsp;{entry.creator}</span>
            )}
            &nbsp;&nbsp;{entry.year}
          </p>
          <p className="mt-0.5 truncate font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-black/80">
            {entry.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
