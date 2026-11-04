"use client";

import { LocalizedText } from "@/systems/i18n/LocaleProvider";

import Image from "next/image";
import Link from "next/link";
import { useCinematicVideo } from "@/systems/useCinematicVideo";
import type { SelectedProject, ProjectSeries } from "./selectedProjects";

function ProjectMedia({ item, single }: { item: SelectedProject; single: boolean }) {
  const videoRef = useCinematicVideo<HTMLVideoElement>({ threshold: 0.12 });
  const [width, height] = item.mediaAspect;
  const mediaClass = "pointer-events-none block h-auto w-auto max-w-full max-h-[var(--oni-project-media-max-h)]";
  return (
    <Link href={item.href} className="group block min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
      {item.motion ? (
        <video ref={videoRef} src={item.src} poster={`/project-previews/${item.id}.jpg`} width={width * 100} height={height * 100} muted loop playsInline preload="none" aria-hidden="true" className={mediaClass} />
      ) : (
        <Image src={item.src} alt="" width={width * 100} height={height * 100} sizes={single ? "90vw" : "(min-width: 1024px) 30vw, 45vw"} className={mediaClass} />
      )}
      <div className="mt-3 space-y-1 text-xs leading-relaxed text-neutral-600">
        <p className="text-black transition-opacity group-hover:opacity-60"><LocalizedText value={item.title} /></p>
        {item.creator ? <p>{item.creator}</p> : null}
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: ProjectSeries }) {
  return (
    <li className="py-10 md:py-14">
      <h3 className="font-display text-xl font-bold leading-snug tracking-normal md:text-2xl"><LocalizedText value={project.title} /></h3>
      <p className="mb-7 mt-3 max-w-xl text-sm leading-relaxed text-neutral-600"><LocalizedText value={project.description} /></p>
      <div className={project.items.length === 1 ? "[--oni-project-media-max-h:40rem]" : "grid grid-cols-2 items-start gap-x-5 gap-y-8 [--oni-project-media-max-h:32rem] lg:grid-cols-3 lg:gap-x-8"}>
        {project.items.map(item => <ProjectMedia key={item.id} item={item} single={project.items.length === 1} />)}
      </div>
    </li>
  );
}
