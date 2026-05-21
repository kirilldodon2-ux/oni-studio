"use client";

import { ArchiveEditorialPlate } from "./ArchiveEditorialPlate";
import { composeEditorialField, type EditorialUnit } from "./composeEditorialField";
import type { ObjectEditorialAsset } from "./getObjectAssets";

/** Single reading column — aligned with inspect hero */
const READ_AXIS = "mx-auto w-full max-w-2xl";

type Props = {
  assets: ObjectEditorialAsset[];
  title: string;
};

function SequenceSurface({
  asset,
  variant,
}: {
  asset: ObjectEditorialAsset;
  variant: "spread" | "surface" | "vertical";
}) {
  const plateVariant =
    variant === "spread" ? "spread" : variant === "vertical" ? "vertical" : "surface";

  return (
    <div className={`${READ_AXIS} py-9 md:py-11`}>
      <ArchiveEditorialPlate asset={asset} variant={plateVariant} />
    </div>
  );
}

function SequenceResidue({ assets }: { assets: ObjectEditorialAsset[] }) {
  return (
    <div className={`${READ_AXIS} py-5 md:py-6`}>
      <div
        className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        role="group"
        aria-label="Archival residue"
      >
        {assets.map((asset) => (
          <ArchiveEditorialPlate key={asset.src} asset={asset} variant="residue" />
        ))}
      </div>
    </div>
  );
}

function renderUnit(unit: EditorialUnit, key: string) {
  switch (unit.type) {
    case "spread":
      return <SequenceSurface key={key} asset={unit.asset} variant="spread" />;
    case "surface":
      return (
        <SequenceSurface
          key={key}
          asset={unit.asset}
          variant={unit.kind === "vertical" ? "vertical" : "surface"}
        />
      );
    case "residue":
      return <SequenceResidue key={key} assets={unit.assets} />;
    default:
      return null;
  }
}

/**
 * Restrained editorial sequence — central axis, filesystem order, inspectable surfaces.
 */
export function ArchiveEditorialSequence({ assets, title }: Props) {
  if (assets.length === 0) return null;

  const units = composeEditorialField(assets);

  return (
    <section
      className="mt-16 border-t border-black/[0.05] pt-12 md:mt-20 md:pt-14"
      aria-label={`${title} — archive sequence`}
      onClick={(e) => e.stopPropagation()}
    >
      <p
        className={`${READ_AXIS} mb-10 font-sans text-[7px] font-medium tabular-nums uppercase tracking-[0.44em] text-neutral-300/80 md:mb-12`}
      >
        {assets.length} plates
      </p>

      <div className="relative">{units.map((unit, idx) => renderUnit(unit, `${unit.type}-${idx}`))}</div>
    </section>
  );
}
