import type { ObjectEditorialAsset } from "./getObjectAssets";

export type AssetRole = "spread" | "plate" | "fragment" | "logo" | "vertical";

export type SurfaceKind = "spread" | "standard" | "vertical";

/** Linear sequence units — no spatial composition or alignment. */
export type EditorialUnit =
  | { type: "spread"; asset: ObjectEditorialAsset }
  | { type: "surface"; asset: ObjectEditorialAsset; kind: SurfaceKind }
  | { type: "residue"; assets: ObjectEditorialAsset[] };

export function classifyAssetRole(asset: ObjectEditorialAsset): AssetRole {
  const name = asset.filename.toLowerCase();
  const maxDim = Math.max(asset.width, asset.height);
  const area = asset.width * asset.height;

  if (/logo/.test(name)) return "logo";
  if (asset.layout === "wide") return "spread";
  if (maxDim < 520 || area < 140_000) return "fragment";
  if (asset.layout === "portrait") return "vertical";
  return "plate";
}

function isResidueRole(role: AssetRole): boolean {
  return role === "logo" || role === "fragment";
}

function surfaceKind(asset: ObjectEditorialAsset, role: AssetRole): SurfaceKind {
  if (role === "spread" || asset.layout === "wide") return "spread";
  if (role === "vertical" || asset.layout === "portrait") return "vertical";
  return "standard";
}

/**
 * Filesystem order → linear museum sequence.
 * Spreads and surfaces follow numbering; residue groups consecutive small marks.
 */
export function composeEditorialField(assets: ObjectEditorialAsset[]): EditorialUnit[] {
  const units: EditorialUnit[] = [];
  let i = 0;

  while (i < assets.length) {
    const asset = assets[i];
    const role = classifyAssetRole(asset);

    if (role === "spread") {
      units.push({ type: "spread", asset });
      i++;
      continue;
    }

    if (isResidueRole(role)) {
      const group: ObjectEditorialAsset[] = [asset];
      i++;
      while (i < assets.length && isResidueRole(classifyAssetRole(assets[i]))) {
        group.push(assets[i]);
        i++;
      }
      units.push({ type: "residue", assets: group });
      continue;
    }

    units.push({
      type: "surface",
      asset,
      kind: surfaceKind(asset, role),
    });
    i++;
  }

  return units;
}
