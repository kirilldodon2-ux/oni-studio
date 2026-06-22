/**
 * Cloudflare Pages prebuild — drop public/cases/ when CDN transport is active.
 * Keeps repo assets for local dev; prod serves from R2 only.
 *
 * Requires: CF_PAGES=1 (set automatically on Pages) + NEXT_PUBLIC_CASES_MEDIA_ORIGIN
 */

import { existsSync, rmSync } from "node:fs";

const isPages = process.env.CF_PAGES === "1";
const hasCasesCdn = Boolean(process.env.NEXT_PUBLIC_CASES_MEDIA_ORIGIN?.trim());
const casesDir = "public/cases";

if (isPages && hasCasesCdn && existsSync(casesDir)) {
  rmSync(casesDir, { recursive: true, force: true });
  console.log("[prebuild] stripped public/cases — NEXT_PUBLIC_CASES_MEDIA_ORIGIN active");
}
