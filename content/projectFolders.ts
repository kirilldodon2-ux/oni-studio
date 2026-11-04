import { archiveObjects } from "./field";
import { resolveArchiveMediaSrc } from "./archiveObjectPaths";
import { resolveCasesMediaSrc } from "./casesMediaPaths";
import { casesRegistry } from "@/systems/cases/casesData";
import { archiveDescriptionsRu } from "@/systems/i18n/archiveDescriptions";
import type { FolderProject, ProjectFolder } from "@/systems/projectFolders/types";

// Authored gallery associations; no filesystem access in the homepage Edge route.
const galleries: Record<string, string[]> = {
  "event-4nway-case": ["01-event-cover.png"],
  "apple-fashion-commercial": ["01-photo.png"],
  "converse-acw-commercial": ["01-photo.png", "02-photo.png", "03-photo.png"],
  "depth-map-artifacts": ["01-photo.png", "02-photo.png", "03-photo.png", "04-photo.png"],
  "headphones-card": ["01-photo.png", "02-photo.png", "03-photo.png", "04-photo.png"],
};

const descriptions: Record<string, string> = {
  "3d-head-artifact": "A monochrome 3D character study in form and movement.",
  "alabaster-sound": "A 3D motion study of light, form and reflective surfaces.",
  "car-render": "An automotive render exploring paint, lighting and reflections.",
  "chrome-hearts": "Chrome surfaces and high-contrast lighting in a short 3D animation.",
  "boots-artifact": "A digital footwear study in monochrome.",
  "3d-hoodie-artifact": "A vertical garment animation and digital hoodie simulation.",
  "3d-psp-artifact": "A 3D animation featuring a portable gaming console.",
  "3d-streetwear-artifact": "A digital streetwear silhouette in motion.",
  "apple-fashion-commercial": "A visual experiment combining fashion and consumer technology.",
  "converse-acw-commercial": "Footwear, concrete and architectural compositions.",
  "corp-landing": "A corporate website study with modular product presentation.",
  "depth-map-artifacts": "Visual experiments with depth maps and spatial perception.",
  "event-teaser-zxc": "A motion teaser and visual materials for an event.",
  "fashion-horror-teaser": "A fashion teaser with horror-inspired atmosphere and cinematic editing.",
  "gajet-store": "A product-focused motion piece for an electronics store.",
  "hard-guys-party-teaser": "A party teaser combining video editing and typography.",
  "insta-reel-fragment": "A short vertical film exploring digital fashion and motion.",
  "insta-stories-fragment": "A visual experiment in the social story format.",
  "pixel-game-teaser": "A short game teaser with pixel graphics.",
  "random-fashion-shot": "A fashion study of figures, framing and reflective surfaces.",
  "y2k-artifact": "A motion experiment with Y2K-inspired visuals.",
  "event-4nway-case": "Poster artwork and motion for the 4NWAY club show.",
  "bushido-zho-edit": "A music-video editing and motion experiment.",
  "3d-bear": "A 3D character animation study.",
  "poster-square": "A square-format graphic poster.",
  "headphones-card": "A product presentation and graphic card study.",
  "beautiful-banner": "A wide-format digital banner composition.",
  "motion-poster": "An animated poster combining graphics and typography.",
  "static-poster": "A graphic poster with monochrome collage and typography.",
  "old-cosmos": "A widescreen motion study with a cosmic atmosphere.",
  "tf2-noir-spy": "A noir-inspired character study from Team Fortress 2.",
  "3d-rap-studio-vid": "A 3D animation set in a recording studio.",
};

function project(slug: string, title: string): FolderProject {
  const entry = archiveObjects.find((item) => item.slug === slug);
  if (!entry) throw new Error(`Folder project not found: ${slug}`);
  const video = entry.mediaType === "motion" || entry.mediaType === "video";
  const src = resolveArchiveMediaSrc(entry.previewSrc);
  return {
    id: slug, title, year: String(entry.year), creator: entry.creator,
    description: descriptions[slug] ?? entry.summary ?? "", descriptionRu: archiveDescriptionsRu[slug],
    cover: `/project-previews/${slug}.jpg`,
    media: [
      { src, kind: video ? "video" : "image" },
      ...(galleries[slug] ?? []).map((file) => ({
        src: resolveArchiveMediaSrc(`/archive/objects/${slug}/${file}`), kind: "image" as const,
      })),
    ],
  };
}

export function getProjectFolders(): ProjectFolder[] {
  const punch = casesRegistry.find((entry) => entry.id === "01");
  if (!punch?.cover) throw new Error("PUNCH cover is required");
  const punchCover = resolveCasesMediaSrc(punch.cover);
  const folders: ProjectFolder[] = [
    { id: "3d-motion", title: "3D / Motion", items: [
      project("car-render", "Automotive"), project("alabaster-sound", "Alabaster Sound"),
      project("chrome-hearts", "Chrome Hearts"), project("3d-psp-artifact", "PSP"),
      project("3d-head-artifact", "Head Study"), project("gajet-store", "Gajet Store"),
      project("3d-bear", "3D Bear"), project("old-cosmos", "Old Cosmos"),
      project("tf2-noir-spy", "TF2 Noir"), project("3d-rap-studio-vid", "Rap Studio"),
    ] },
    { id: "digital-fashion", title: "Digital Fashion", items: [
      project("boots-artifact", "Boots"), project("3d-streetwear-artifact", "Digital Streetwear"),
      project("fashion-horror-teaser", "Fashion Horror"), project("insta-stories-fragment", "Stories"),
      project("insta-reel-fragment", "Reel"), project("3d-hoodie-artifact", "Digital Hoodie"),
      project("apple-fashion-commercial", "Apple Fashion"), project("converse-acw-commercial", "Converse / ACW"),
      project("random-fashion-shot", "Fashion Study"),
    ] },
    { id: "events", title: "Events", items: [
      { id: "punch", title: "PUNCH", year: punch.year, creator: "ONI Studio",
        description: "Event / Clubshow Design", cover: "/project-previews/punch.jpg",
        media: [{ src: punchCover, kind: "image" }], caseHref: "/cases/punch" },
      project("event-4nway-case", "4NWAY"), project("event-teaser-zxc", "Event Teaser"),
      project("hard-guys-party-teaser", "Hard Guys"), project("bushido-zho-edit", "Bushido Zho"),
    ] },
    { id: "graphic-design", title: "Graphic Design", items: [
      project("poster-square", "Poster Study"), project("static-poster", "Poster Design"),
      project("motion-poster", "Motion Poster"), project("headphones-card", "Headphones"),
      project("beautiful-banner", "Digital Banner"),
    ] },
    { id: "web", title: "Web", items: [project("corp-landing", "Corporate Website")] },
    { id: "experiments", title: "Experiments", items: [
      project("depth-map-artifacts", "Depth Studies"), project("pixel-game-teaser", "Pixel Game"),
      project("y2k-artifact", "Y2K"),
    ] },
  ];
  const ids = folders.flatMap((folder) => folder.items.map((item) => item.id));
  if (new Set(ids).size !== ids.length || archiveObjects.some((entry) => !ids.includes(entry.slug))) {
    throw new Error("Folder curation must cover every archive project exactly once");
  }
  return folders;
}
