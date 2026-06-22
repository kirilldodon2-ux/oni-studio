/**
 * Cases media ontology + transport — lane-specific, not archive.
 *
 * Ontology: site-relative paths under /cases/[slug]/…
 * Transport: NEXT_PUBLIC_CASES_MEDIA_ORIGIN (R2 / CDN) when set.
 *
 * Doctrine: docs/CASES_SYSTEM.md § Media delivery
 */

export const CASES_MEDIA_ROOT = "/cases";

/** Ontology path — always site-relative, stored in registries and asset maps. */
export function caseAssetPath(slug: string, ...segments: string[]): string {
  const tail = segments.join("/").replace(/^\//, "");
  return `${CASES_MEDIA_ROOT}/${slug}/${tail}`;
}

function casesMediaOrigin(): string {
  return (process.env.NEXT_PUBLIC_CASES_MEDIA_ORIGIN ?? "").replace(/\/$/, "");
}

/**
 * Transport layer — prepends NEXT_PUBLIC_CASES_MEDIA_ORIGIN when set.
 * When unset, returns the path unchanged (local dev + Pages static fallback).
 */
export function resolveCasesMediaSrc(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = casesMediaOrigin();
  if (!origin) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Ontology + transport in one call for case components. */
export function casesSrc(slug: string, ...segments: string[]): string {
  return resolveCasesMediaSrc(caseAssetPath(slug, ...segments));
}

/** Build-time origin hostname for next/image remotePatterns. */
export function casesMediaOriginHostname(): string | null {
  const origin = casesMediaOrigin();
  if (!origin) return null;
  try {
    return new URL(origin).hostname;
  } catch {
    return null;
  }
}
