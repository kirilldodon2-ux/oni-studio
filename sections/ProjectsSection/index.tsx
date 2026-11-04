import { LocalizedText } from "@/systems/i18n/LocaleProvider";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { getProjectFolders } from "@/content/projectFolders";
import { ProjectDesk } from "@/systems/projectFolders/ProjectDesk";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectsSection() {
  const folders = getProjectFolders();
  return (
    <SectionContainer
      id="projects"
      data-oni-section="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-10 md:py-14"
    >
      <div className="mx-auto max-w-oni-page">
        <SectionLabel id="projects-heading" className="mb-6"><LocalizedText value={"PROJECTS"} /></SectionLabel>
        <ProjectDesk folders={folders} />
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
