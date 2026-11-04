import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/content/site";
import { archiveFieldEntries } from "@/content/field";
import { worksRegistry } from "@/content/works/field";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    "/",
    "/brandbook",
    "/works",
    "/cases",
    "/cases/punch",
    ...archiveFieldEntries.map(entry => `/archive/${entry.slug}`),
    ...worksRegistry.map(work => `/works/${work.slug}`),
  ]);
  return Array.from(paths, path => ({ url: new URL(path, SITE_ORIGIN).href }));
}
