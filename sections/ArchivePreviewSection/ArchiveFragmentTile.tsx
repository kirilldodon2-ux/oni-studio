"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArchiveFragmentEntry } from "./curatedWindow";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import { useCinematicVideo } from "@/systems/useCinematicVideo";

type ArchiveFragmentTileProps = {
  entry: ArchiveFragmentEntry;
};

/** Browse-scale tile — media only on mobile; desktop hover reveals index lines. */
export function ArchiveFragmentTile({ entry }: ArchiveFragmentTileProps) {
  const [w, h] = entry.mediaAspect ?? [4, 3];
  const isCinematicVideo =
    entry.mediaType === "motion" || entry.mediaType === "video";
  const videoRef = useCinematicVideo<HTMLVideoElement>({
    rootMargin: "0px 0px 120px 0px",
    threshold: 0.12,
    activationDelay: 80,
  });
  const previewSrc = resolveArchiveMediaSrc(entry.previewSrc);

  return (
    <article className="group relative w-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <Link
        href={`/archive/${entry.slug}`}
        className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black/20"
        aria-label={`${entry.title}, ${entry.year}${entry.creator ? `, ${entry.creator}` : ""}`}
      >
        <div
          className="relative overflow-hidden bg-neutral-100 ring-1 ring-black/[0.04]"
          style={{ aspectRatio: `${w} / ${h}` }}
        >
          {isCinematicVideo ? (
            <video
              ref={videoRef}
              src={previewSrc}
              width={w * 120}
              height={h * 120}
              muted
              playsInline
              loop
              preload="none"
              className="h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-[0.88]"
            />
          ) : (
            <Image
              src={previewSrc}
              alt=""
              width={w * 120}
              height={h * 120}
              className="h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-[0.88]"
              sizes="(max-width: 1024px) 44vw, 30vw"
            />
          )}
        </div>

        {/* Desktop only — hover/focus index; mobile stays object-only (V3.4). */}
        <div
          className="pointer-events-none mt-1 hidden space-y-px opacity-0 transition-opacity duration-500 ease-out lg:block lg:group-focus-within:opacity-100 lg:group-hover:opacity-100"
          aria-hidden
        >
          <p className="font-sans text-[8px] font-semibold uppercase tracking-[0.12em] text-black/65">
            {entry.title}
          </p>
          <p className="font-sans text-[8px] font-medium tabular-nums text-neutral-400">
            {entry.year}
          </p>
          {entry.creator ? (
            <p className="font-sans text-[8px] font-medium text-neutral-300">
              {entry.creator}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
