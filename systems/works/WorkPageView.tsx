import Link from "next/link";
import type { Work, WorkDomain } from "@/content/works/types";
import { ArchiveHeroFrame } from "@/systems/archive/ArchiveHeroFrame";
import { FadeIn, RevealUp } from "@/systems/atmosphere";
import { ONI_SILHOUETTE_FILTER } from "@/systems/spatial/silhouetteGrounding";

const DOMAIN_LABEL: Record<WorkDomain, string> = {
  spatial: "SPATIAL",
  motion: "MOTION",
  identity: "IDENTITY",
  technical: "TECHNICAL",
  editorial: "EDITORIAL",
  experimental: "EXPERIMENTAL",
};

function formatDomain(domain: WorkDomain[]): string {
  return domain.map((item) => DOMAIN_LABEL[item]).join(" · ");
}

interface WorkPageViewProps {
  work: Work;
}

export function WorkPageView({ work }: WorkPageViewProps) {
  return (
    <article className="mx-auto max-w-oni-page">
      <Link
        href="/works"
        className="mb-6 inline-block font-sans text-[9px] font-medium uppercase tracking-[0.4em] text-neutral-400 transition-colors duration-200 hover:text-black"
      >
        ← Works
      </Link>

      <RevealUp>
        <header className="mb-10 md:mb-14">
          <p className="mb-6 font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-neutral-300">
            ONI — Work
          </p>
          <h1
            id="work-title"
            className="font-bebas text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-black"
          >
            {work.title}
          </h1>
          <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-8">
            <p className="font-sans text-[10px] font-medium tabular-nums uppercase tracking-[0.28em] text-neutral-400">
              {work.year}
            </p>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-500">
              {formatDomain(work.domain)}
            </p>
          </div>
        </header>
      </RevealUp>

      <FadeIn delay={120}>
        <figure className="mb-10 md:mb-14">
          <ArchiveHeroFrame className="max-w-[47.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={work.coverSrc}
              alt=""
              className="block h-auto w-full"
              style={{ filter: ONI_SILHOUETTE_FILTER }}
            />
          </ArchiveHeroFrame>
        </figure>
      </FadeIn>

      {work.intro ? (
        <FadeIn delay={180}>
          <p className="max-w-[42rem] font-sans text-[15px] leading-[1.75] tracking-[0.01em] text-neutral-600">
            {work.intro}
          </p>
        </FadeIn>
      ) : null}
    </article>
  );
}
