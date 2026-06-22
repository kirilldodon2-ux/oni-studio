import { casesSrc } from "@/content/casesMediaPaths";

const SLUG = "your-case-slug";

/** Resolved transport URL for a file under public/cases/[slug]/. */
export function caseSlugSrc(relativePath: string): string {
  return casesSrc(SLUG, relativePath);
}
