import fs from "fs";
import path from "path";
import { probeImageSize } from "./probeImageSize";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

export type EditorialLayout = "wide" | "square" | "portrait";

/** Filesystem role — 00-hero is canonical browse + inspect open; registry previewSrc mirrors path */
export type ObjectAssetRole = "hero" | "sequence";

export type ObjectEditorialAsset = {
  role: ObjectAssetRole;
  src: string;
  filename: string;
  /** Numeric prefix from filename (00, 01, …) */
  order: number;
  width: number;
  height: number;
  layout: EditorialLayout;
};

export type ArchiveObjectBundle = {
  /** 00-* exhibition surface — never in sequence */
  hero: ObjectEditorialAsset | null;
  /** 01+ archival reading surfaces */
  sequence: ObjectEditorialAsset[];
};

function classifyLayout(width: number, height: number): EditorialLayout {
  const ratio = width / height;
  if (ratio >= 1.35) return "wide";
  if (ratio <= 0.82) return "portrait";
  return "square";
}

function parseOrder(filename: string): number {
  const m = filename.match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 9999;
}

function resolveRole(filename: string, order: number): ObjectAssetRole {
  if (order === 0 || /^00[-_.]/i.test(filename)) return "hero";
  return "sequence";
}

function loadAllAssets(slug: string): ObjectEditorialAsset[] {
  const dir = path.join(process.cwd(), "public", "archive", "objects", slug);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      const oa = parseOrder(a);
      const ob = parseOrder(b);
      if (oa !== ob) return oa - ob;
      return a.localeCompare(b);
    });

  const assets: ObjectEditorialAsset[] = [];

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const dims = probeImageSize(filePath);
    if (!dims || dims.width < 1 || dims.height < 1) continue;

    const order = parseOrder(filename);
    assets.push({
      role: resolveRole(filename, order),
      src: `/archive/objects/${slug}/${filename}`,
      filename,
      order,
      width: dims.width,
      height: dims.height,
      layout: classifyLayout(dims.width, dims.height),
    });
  }

  return assets;
}

/**
 * Full object filesystem bundle — hero + sequence separated.
 * Server-only.
 */
export function getArchiveObjectBundle(slug: string): ArchiveObjectBundle {
  const all = loadAllAssets(slug);
  const hero = all.find((a) => a.role === "hero") ?? null;
  const sequence = all.filter((a) => a.role === "sequence");
  return { hero, sequence };
}

/**
 * Editorial sequence assets only (01+). Hero excluded.
 * @deprecated Prefer getArchiveObjectBundle for inspect pages.
 */
export function getObjectAssets(slug: string): ObjectEditorialAsset[] {
  return getArchiveObjectBundle(slug).sequence;
}
