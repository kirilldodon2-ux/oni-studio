import { LocalizedText } from "@/systems/i18n/LocaleProvider";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { ProjectCard } from "./ProjectCard";
import { getSelectedProjects } from "./selectedProjects";
import Image from "next/image";
import Link from "next/link";

export function ProjectsSection() {
  const projects = getSelectedProjects();
  return (
    <SectionContainer
      id="projects"
      data-oni-section="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-14 md:py-20"
    >
      <div className="mx-auto max-w-oni-page">
        <SectionLabel id="projects-heading" className="mb-8"><LocalizedText value={"SELECTED PROJECTS"} /></SectionLabel>
        <ul>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ul>
        <Link href="/brandbook" className="group mt-12 flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center">
          <Image src="/brandbook/hero-wire.png" alt="" width={280} height={158} sizes="280px" className="h-auto w-56 max-w-full" />
          <div>
            <h3 className="font-display text-lg font-bold tracking-normal transition-opacity group-hover:opacity-60"><LocalizedText value={"ONI Brandbook"} /></h3>
            <p className="mt-2 text-sm text-neutral-600"><LocalizedText value={"Identity, type and motion."} /></p>
          </div>
        </Link>
      </div>
    </SectionContainer>
  );
}
