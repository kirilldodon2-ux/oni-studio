import type { Work } from "./types";

export const worksRegistry: Work[] = [
  {
    slug: "system-architectures",
    title: "SYSTEM ARCHITECTURES",
    year: 2026,
    territories: ["system-architectures", "spatial-identity"],
    domain: ["technical", "spatial"],
    coverSrc: "/works/system-architectures/00-cover.svg",
    intro:
      "Automation platforms and editorial infrastructure — studio systems authored as resolved output, not supporting material.",
  },
];

export function getWorkBySlug(slug: string): Work | undefined {
  return worksRegistry.find((work) => work.slug === slug);
}
