import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import { SITE_ORIGIN, SITE_PREVIEW } from "@/content/site";
import { archiveFieldEntries } from "@/content/field";
import { ControlSurface } from "@/components/navigation";
import { ArchiveInspectView } from "@/systems/archive";
import { getArchiveObjectBundle } from "@/systems/archive/getObjectAssets";

export function generateStaticParams() {
  return archiveFieldEntries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = archiveFieldEntries.find((e) => e.slug === params.slug);
  if (!entry) return {};
  const title = `${entry.title} — ONI Archive`;
  const canonical = `/archive/${entry.slug}`;
  const description = entry.summary;
  const still = entry.posterSrc ?? (/\.(avif|gif|jpe?g|png|webp)$/i.test(entry.previewSrc) ? entry.previewSrc : undefined);
  const image = still ? { url: resolveArchiveMediaSrc(still), alt: entry.title } : SITE_PREVIEW;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: "ONI Studio",
      url: new URL(canonical, SITE_ORIGIN),
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function ArchiveObjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const index = archiveFieldEntries.findIndex((e) => e.slug === params.slug);
  if (index === -1) notFound();

  const entry = archiveFieldEntries[index];
  const prev = archiveFieldEntries[index - 1] ?? null;
  const next = archiveFieldEntries[index + 1] ?? null;
  const { hero, sequence } = getArchiveObjectBundle(params.slug);

  return (
    <div className="relative min-h-screen bg-white text-black">
      <ControlSurface />

      <main className="px-5 pb-[max(5rem,var(--oni-dock-floor))] pt-24 sm:px-8 md:pb-28 md:pt-28 lg:px-12 lg:pt-32">
        <ArchiveInspectView
          entry={entry}
          prev={prev}
          next={next}
          index={index}
          total={archiveFieldEntries.length}
          heroAsset={hero}
          sequenceAssets={sequence}
        />
      </main>
    </div>
  );
}
