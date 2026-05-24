/**
 * Deterministic archive object paths — no runtime discovery.
 *
 * Canonical hero (00-hero.*) owns browse representation, masonry preview,
 * and inspect opening artifact. Extension is explicit at registry time.
 *
 * Authoring doctrine: CONTENT_SYSTEM.md
 */

export const CANONICAL_HERO_PREFIX = "00-hero";

/** Allowed canonical hero extensions — author picks one per object folder. */
export type CanonicalHeroExt =
  | ".png"
  | ".jpg"
  | ".jpeg"
  | ".webp"
  | ".avif"
  | ".mp4"
  | ".mov";

const HERO_EXT_FALLBACK: readonly CanonicalHeroExt[] = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
];

/**
 * Browse / registry preview path for an object slug.
 * Pattern: /archive/objects/[slug]/00-hero[ext]
 */
export function canonicalPreviewSrc(
  slug: string,
  ext: CanonicalHeroExt = ".png",
): string {
  return `/archive/objects/${slug}/${CANONICAL_HERO_PREFIX}${ext}`;
}

/**
 * Ordered extension fallback for documentation and optional server-side use.
 * Not used at browse runtime — registry must declare the correct ext.
 */
export function canonicalPreviewSrcWithFallback(
  slug: string,
  preferredExt?: CanonicalHeroExt,
): string {
  return canonicalPreviewSrc(slug, preferredExt ?? HERO_EXT_FALLBACK[0]);
}

function archiveMediaOrigin(): string {
  return (process.env.NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN ?? "").replace(/\/$/, "");
}

/**
 * Transport layer — prepends NEXT_PUBLIC_ARCHIVE_MEDIA_ORIGIN when set.
 * Ontology paths from canonicalPreviewSrc() stay site-relative in the registry.
 */
export function resolveArchiveMediaSrc(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = archiveMediaOrigin();
  if (!origin) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
