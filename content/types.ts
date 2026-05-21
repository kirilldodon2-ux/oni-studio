/**
 * ── Archive Object Model ──────────────────────────────────────────────────────
 *
 * Schema authority for registry entries — not discovery logic.
 * Authoring model: CONTENT_SYSTEM.md
 *
 * An archive object is the atomic unit of the browsing surface.
 *
 * Operating principles:
 *   - Layered authority: mediaAspect (spatial truth) → Frame geometry → ArchiveTile optics → inspect occupancy (see ARCHIVE_OPERATING_LOGIC.md).
 *   - Preview integrity: mediaAspect must match 00-hero intrinsic ratio when set.
 *   - Tolerant: optional fields may be omitted; false mediaAspect is never acceptable.
 *   - Scalable: supports 100–1000+ objects without per-object layout configuration.
 *   - Creator-honest: creator is only set when explicitly known — never inferred.
 *
 * Required fields: slug, title, previewSrc, territories, year.
 * Everything else is optional.
 */

/**
 * Format of the source media — determines rendering strategy.
 *
 * Derives from file extension when not explicitly set:
 *   .mp4 / .mov  →  "video"
 *   .png / .jpg / .webp / .avif  →  "image"
 *
 * "motion" is a short muted loop — same rendering path as "video" but
 * communicates intent (preview clip, not a full work).
 */
export type ArchiveMediaType = "image" | "video" | "motion";

export type ArchiveArchetype =
  | "Work"
  | "ProcessArtifact"
  | "AtmosphericFragment";

export type ArchiveTerritoryId =
  | "spatial-identity"
  | "system-architectures"
  | "editorial-motion"
  | "experimental-media"
  | "archive-research"
  | "atmospheric-fragments";

/** The canonical archive object. */
export type ArchiveObject = {
  // ── Required ──────────────────────────────────────────────────────────────
  /** URL-safe identifier — also the inspect route segment (/archive/[slug]) */
  slug: string;
  /** Display title */
  title: string;
  /** Browse representation — /archive/objects/[slug]/00-hero.[ext] (canonical hero). */
  previewSrc: string;
  /** Archive territories — primary classification, drives browsing filters */
  territories: ArchiveTerritoryId[];
  /** Year of creation or publication */
  year: number;

  // ── Media ─────────────────────────────────────────────────────────────────
  /**
   * Media format — determines tile and inspection rendering.
   * Omit for images (default). Set "video" / "motion" for moving media.
   */
  mediaType?: ArchiveMediaType;
  /**
   * Declared spatial reservation ratio [width, height] for masonry Frame geometry.
   * Must match 00-hero intrinsic ratio when set (canonical data integrity).
   * Not a CSS crop ratio. Uses ratio units, not pixels. Defaults to [4, 3] when omitted.
   */
  mediaAspect?: [number, number];

  // ── Classification ────────────────────────────────────────────────────────
  /** Archive archetype — optional editorial classification */
  archetype?: ArchiveArchetype;
  /** Freeform tags for secondary grouping or search */
  tags?: string[];

  // ── Attribution ───────────────────────────────────────────────────────────
  /**
   * Creator handle or name — shown in browse hover and inspect caption.
   * Only set when explicitly known. Never inferred from folder names alone.
   */
  creator?: string;
  /** Client or brand associated with the work */
  client?: string;

  // ── Editorial ─────────────────────────────────────────────────────────────
  /** Brief editorial note — shown in inspect view metadata */
  summary?: string;
};

/** @deprecated Use ArchiveObject */
export type ArchiveFieldEntry = ArchiveObject;
