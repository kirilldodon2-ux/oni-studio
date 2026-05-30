import { archiveFieldEntries } from "@/content/field";
import type { ArchiveObject } from "@/content/types";

export type FragmentCoords = {
  left: string;
  top: string;
  width: string;
  zIndex: number;
  offsetX?: string;
  offsetY?: string;
  /** Emergence origin offset (px) — fog surfacing, not fly-in. */
  emergeX?: string;
  /** Start offset for upward drift (8–12px); animates to 0. */
  emergeY?: string;
};

export type ArchiveFragmentSlot = {
  slug: string;
  desktop: FragmentCoords;
  mobile: FragmentCoords;
};

/**
 * V3 field gravity curation — nine objects, six creator lanes.
 * Desktop: clipped scatter. Mobile (V3.3): uneven orbital field around ghost core.
 */
export const ARCHIVE_FRAGMENT_FIELD: readonly ArchiveFragmentSlot[] = [
  {
    slug: "alabaster-sound",
    desktop: {
      left: "31%",
      top: "20%",
      width: "34%",
      zIndex: 9,
      emergeX: "0px",
      emergeY: "10px",
    },
    mobile: {
      left: "27%",
      top: "30%",
      width: "46%",
      zIndex: 12,
      emergeX: "0px",
      emergeY: "10px",
    },
  },
  {
    slug: "bushido-zho-edit",
    desktop: {
      left: "-3%",
      top: "4%",
      width: "29%",
      zIndex: 6,
      offsetX: "-4px",
      emergeX: "-14px",
      emergeY: "11px",
    },
    mobile: {
      left: "-10%",
      top: "2%",
      width: "40%",
      zIndex: 7,
      offsetX: "6px",
      emergeX: "-12px",
      emergeY: "11px",
    },
  },
  {
    slug: "depth-map-artifacts",
    desktop: {
      left: "16%",
      top: "-2%",
      width: "27%",
      zIndex: 4,
      emergeX: "8px",
      emergeY: "10px",
    },
    mobile: {
      left: "54%",
      top: "0%",
      width: "38%",
      zIndex: 6,
      emergeX: "10px",
      emergeY: "10px",
    },
  },
  {
    slug: "gajet-store",
    desktop: {
      left: "50%",
      top: "6%",
      width: "26%",
      zIndex: 7,
      offsetY: "6px",
      emergeX: "12px",
      emergeY: "10px",
    },
    mobile: {
      left: "38%",
      top: "8%",
      width: "36%",
      zIndex: 8,
      offsetY: "-4px",
      emergeX: "8px",
      emergeY: "10px",
    },
  },
  {
    slug: "static-poster",
    desktop: {
      left: "68%",
      top: "-4%",
      width: "23%",
      zIndex: 8,
      emergeX: "16px",
      emergeY: "9px",
    },
    mobile: {
      left: "66%",
      top: "16%",
      width: "30%",
      zIndex: 9,
      emergeX: "14px",
      emergeY: "9px",
    },
  },
  {
    slug: "3d-psp-artifact",
    desktop: {
      left: "80%",
      top: "16%",
      width: "21%",
      zIndex: 5,
      emergeX: "18px",
      emergeY: "8px",
    },
    mobile: {
      left: "54%",
      top: "42%",
      width: "32%",
      zIndex: 7,
      offsetX: "-6px",
      emergeX: "12px",
      emergeY: "11px",
    },
  },
  {
    slug: "poster-square",
    desktop: {
      left: "-2%",
      top: "46%",
      width: "17%",
      zIndex: 10,
      offsetY: "4px",
      emergeX: "-10px",
      emergeY: "12px",
    },
    mobile: {
      left: "-6%",
      top: "38%",
      width: "28%",
      zIndex: 10,
      offsetY: "6px",
      emergeX: "-10px",
      emergeY: "10px",
    },
  },
  {
    slug: "converse-acw-commercial",
    desktop: {
      left: "10%",
      top: "66%",
      width: "19%",
      zIndex: 5,
      emergeX: "-6px",
      emergeY: "16px",
    },
    mobile: {
      left: "6%",
      top: "54%",
      width: "30%",
      zIndex: 6,
      emergeX: "-6px",
      emergeY: "12px",
    },
  },
  {
    slug: "event-4nway-case",
    desktop: {
      left: "58%",
      top: "62%",
      width: "30%",
      zIndex: 6,
      emergeX: "10px",
      emergeY: "12px",
    },
    mobile: {
      left: "48%",
      top: "52%",
      width: "38%",
      zIndex: 8,
      offsetY: "4px",
      emergeX: "8px",
      emergeY: "11px",
    },
  },
] as const;

export type ArchiveFragmentEntry = ArchiveObject & {
  desktop: FragmentCoords;
  mobile: FragmentCoords;
};

export function resolveArchiveFragmentField(): ArchiveFragmentEntry[] {
  return ARCHIVE_FRAGMENT_FIELD.flatMap((slot) => {
    const entry = archiveFieldEntries.find((item) => item.slug === slot.slug);
    if (!entry) return [];
    return [{ ...entry, desktop: slot.desktop, mobile: slot.mobile }];
  });
}
