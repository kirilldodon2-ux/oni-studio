import type { ArchiveTerritoryId } from "@/content/types";

const TERRITORY_LABELS: Record<ArchiveTerritoryId, string> = {
  "spatial-identity": "FIELD / 01 — SPATIAL IDENTITY",
  "system-architectures": "FIELD / 02 — SYSTEM ARCHITECTURES",
  "editorial-motion": "FIELD / 03 — EDITORIAL MOTION",
  "experimental-media": "FIELD / 04 — EXPERIMENTAL MEDIA",
  "archive-research": "FIELD / 05 — ARCHIVE RESEARCH",
  "atmospheric-fragments": "FIELD / 06 — ATMOSPHERIC FRAGMENTS",
};

export function territoryLabel(id: ArchiveTerritoryId): string {
  return TERRITORY_LABELS[id];
}
