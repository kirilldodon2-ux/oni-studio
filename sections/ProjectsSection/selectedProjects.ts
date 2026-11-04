import { archiveObjects } from "@/content/field";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import { resolveCasesMediaSrc } from "@/content/casesMediaPaths";
import { casesRegistry } from "@/systems/cases/casesData";

export type SelectedProject = {
  id: string;
  title: string;
  year: string;
  creator?: string;
  href: string;
  src: string;
  motion: boolean;
  mediaAspect: [number, number];
};

// Provisional curation from the existing homepage field; final selection is editorial.
export type ProjectSeries = { id: string; title: string; description: string; items: SelectedProject[] };

function archiveItem(slug: string, title: string): SelectedProject {
  const entry = archiveObjects.find(object => object.slug === slug);
  if (!entry) throw new Error(`Selected project not found: ${slug}`);
  return { id: slug, title, year: String(entry.year), creator: entry.creator,
    href: `/archive/${slug}`, src: resolveArchiveMediaSrc(entry.previewSrc),
    motion: entry.mediaType === "motion" || entry.mediaType === "video",
    mediaAspect: entry.mediaAspect ?? [4, 3] };
}

export function getSelectedProjects(): ProjectSeries[] {
  const punch = casesRegistry.find((entry) => entry.id === "01");
  if (!punch?.cover) throw new Error("Selected PUNCH case must have a cover");

  return [
    {
      id: "punch",
      title: "PUNCH",
      description: "Event / Clubshow Design",
      items: [{ id: "punch", title: punch.client,
      year: punch.year,
      href: "/cases/punch",
      src: resolveCasesMediaSrc(punch.cover),
      motion: false,
      mediaAspect: [16, 9], }],
    },
    { id: "3d-motion", title: "3D / Motion", description: "Automotive renders, abstract motion and chrome studies.",
      items: [archiveItem("car-render", "Automotive"), archiveItem("alabaster-sound", "Alabaster Sound"), archiveItem("chrome-hearts", "Chrome")] },
    { id: "vertical-3d", title: "Vertical 3D Animation", description: "Short-form 3D animation and character studies.",
      items: [archiveItem("3d-psp-artifact", "PSP"), archiveItem("3d-head-artifact", "Head Study")] },
    { id: "digital-fashion", title: "Digital Fashion", description: "Fashion films, digital garments and short-form visual experiments.",
      items: [archiveItem("insta-stories-fragment", "Stories"), archiveItem("insta-reel-fragment", "Reel"), archiveItem("fashion-horror-teaser", "Fashion Horror"), archiveItem("boots-artifact", "Boots"), archiveItem("3d-streetwear-artifact", "Digital Streetwear")] },
    { id: "poster-design", title: "Poster Design", description: "Graphic and animated posters.",
      items: [archiveItem("event-4nway-case", "4NWAY"), archiveItem("poster-square", "Poster Study"), archiveItem("static-poster", "Poster Design"), archiveItem("motion-poster", "Motion Poster")] },
  ];
}
