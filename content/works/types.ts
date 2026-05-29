import type { ArchiveTerritoryId } from "@/content/types";

export type WorkDomain =
  | "spatial"
  | "motion"
  | "identity"
  | "technical"
  | "editorial"
  | "experimental";

/** Works registry entry — parallel to archive objects, not a filter of them. */
export type Work = {
  slug: string;
  title: string;
  year: number;
  territories: ArchiveTerritoryId[];
  domain: WorkDomain[];
  /** Site-relative cover path — served from public/works/ via Pages static assets (no archive R2 transport). */
  coverSrc: string;
  intro?: string;
};
