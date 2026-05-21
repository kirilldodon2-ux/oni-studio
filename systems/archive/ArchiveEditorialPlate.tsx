"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { ObjectEditorialAsset } from "./getObjectAssets";

export type PlateVariant = "spread" | "surface" | "vertical" | "residue";

type Props = {
  asset: ObjectEditorialAsset;
  variant: PlateVariant;
  className?: string;
};

function ResidueMark({ asset }: { asset: ObjectEditorialAsset }) {
  const maxDim = Math.max(asset.width, asset.height);
  const w = Math.min(Math.round(maxDim * 0.34), 40);

  return (
    <span
      className="inline-block shrink-0 opacity-[0.42]"
      style={{ width: w, aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        src={asset.src}
        alt=""
        width={asset.width}
        height={asset.height}
        className="h-full w-full object-contain"
        sizes="40px"
      />
    </span>
  );
}

/**
 * Archival surface — full resolution, centered, click to inspect.
 * Residue marks are inline annotations without exhibit treatment.
 */
export function ArchiveEditorialPlate({ asset, variant, className = "" }: Props) {
  const [zoomOpen, setZoomOpen] = useState(false);
  const label = String(asset.order).padStart(2, "0");

  const closeZoom = useCallback(() => setZoomOpen(false), []);

  useEffect(() => {
    if (!zoomOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeZoom();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen, closeZoom]);

  if (variant === "residue") {
    return <ResidueMark asset={asset} />;
  }

  const sizes =
    variant === "spread"
      ? "(max-width: 768px) 100vw, 42rem"
      : variant === "vertical"
        ? "(max-width: 768px) 100vw, 28rem"
        : "(max-width: 768px) 100vw, 42rem";

  const widthCap =
    variant === "vertical"
      ? "mx-auto w-full max-w-[min(100%,20rem)]"
      : "w-full";

  return (
    <>
      <figure className={`${widthCap} ${className}`.trim()}>
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="group block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
          aria-label={`Inspect plate ${label}`}
        >
          <span
            className="mb-2 block font-sans text-[7px] font-medium tabular-nums uppercase tracking-[0.4em] text-neutral-300/70"
            aria-hidden
          >
            {label}
          </span>
          <div
            className="w-full overflow-hidden bg-white"
            style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
          >
            <Image
              src={asset.src}
              alt=""
              width={asset.width}
              height={asset.height}
              quality={92}
              className="block h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-[0.94]"
              sizes={sizes}
            />
          </div>
        </button>
      </figure>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/96 px-4 py-16 backdrop-blur-[2px]"
          role="dialog"
          aria-modal
          aria-label={`Plate ${label}`}
          onClick={closeZoom}
        >
          <button
            type="button"
            className="absolute right-5 top-20 font-sans text-[9px] uppercase tracking-[0.35em] text-neutral-400 hover:text-black"
            onClick={closeZoom}
          >
            Close
          </button>
          <div
            className="max-h-[85svh] max-w-[min(100%,56rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.src}
              alt=""
              width={asset.width}
              height={asset.height}
              className="max-h-[85svh] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
