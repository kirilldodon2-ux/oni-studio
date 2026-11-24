import { LocalizedText } from "@/systems/i18n/LocaleProvider";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { getProjectFolders } from "@/content/projectFolders";
import { archiveFieldEntries } from "@/content/field";
import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import { ProjectDesk } from "@/systems/projectFolders/ProjectDesk";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuredSlugs = ["oni-digital", "somov-lt-scream-emoji", "digibug-revuelt-core"] as const;

const featuredProjects = [
  ...featuredSlugs.map(slug => {
    const entry = archiveFieldEntries.find(item => item.slug === slug);
    if (!entry) throw new Error(`Missing featured archive project: ${slug}`);
    return {
      title: entry.title,
      href: `/archive/${slug}`,
      cover: resolveArchiveMediaSrc(entry.posterSrc ?? entry.previewSrc),
    };
  }),
  { title: "PUNCH", href: "/cases/punch", cover: "/project-previews/punch.jpg" },
];

function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-projects-heading" className="mt-14 border-t border-black/10 pt-7 md:mt-20">
      <SectionLabel id="featured-projects-heading" className="mb-5">
        <LocalizedText value="SELECTED PROJECTS" />
      </SectionLabel>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-x-6">
        {featuredProjects.map(({ title, href, cover }) => (
          <li key={href} className="min-w-0">
            <Link
              href={href}
              prefetch={false}
              className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image unoptimized src={cover} alt="" fill sizes="(max-width: 1023px) 46vw, 24vw" className="object-cover" />
              </div>
              <div className="flex min-h-11 items-center justify-between gap-2 border-b border-black/10 py-1.5">
                <span className="font-display text-sm font-semibold leading-tight tracking-normal">
                  <LocalizedText value={title} />
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden="true"
                  className="shrink-0 text-neutral-600 group-hover:text-black group-focus-visible:text-black"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectsSection() {
  const folders = getProjectFolders();
  return (
    <SectionContainer
      id="projects"
      tabIndex={-1}
      data-oni-section="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-10 md:py-14"
    >
      <div className="mx-auto max-w-oni-page">
        <SectionLabel id="projects-heading" className="mb-6"><LocalizedText value={"PROJECTS"} /></SectionLabel>
        <ProjectDesk folders={folders} />
        <FeaturedProjects />
      </div>
    </SectionContainer>
  );
}

export function BrandbookPreviewSection() {
  return <SectionContainer id="brandbook-preview" data-oni-section="brandbook-preview" className="py-4 md:py-6">
    <Link href="/brandbook" className="group mx-auto flex max-w-oni-page items-center gap-6 border-y border-black/10 py-7 md:gap-10">
      <Image src="/brandbook/hero-wire.png" alt="" width={240} height={135} sizes="(max-width:640px) 100px, 200px" className="h-auto w-24 shrink-0 md:w-48" />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-base font-bold tracking-normal transition-opacity group-hover:opacity-60 md:text-xl"><LocalizedText value={"ONI Brandbook"} /></h2>
        <p className="mt-2 text-xs leading-relaxed text-neutral-500 md:text-sm"><LocalizedText value={"Identity, type and motion."} /></p>
      </div>
      <ArrowUpRight className="shrink-0" size={22} aria-hidden="true" />
    </Link>
  </SectionContainer>;
}
