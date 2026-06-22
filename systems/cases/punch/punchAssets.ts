import { casesSrc } from "@/content/casesMediaPaths";

const SLUG = "punch";

/** Resolved transport URL for a file under public/cases/punch/. */
export function punchSrc(relativePath: string): string {
  return casesSrc(SLUG, relativePath);
}
