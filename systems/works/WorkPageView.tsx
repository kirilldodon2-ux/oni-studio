import { resolveArchiveMediaSrc } from "@/content/archiveObjectPaths";
import type { Work, WorkDomain } from "@/content/works/types";
import { FadeIn, RevealUp } from "@/systems/atmosphere";
import { SectionLabel } from "@/systems/layout/SectionLabel";

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
  const coverSrc = resolveArchiveMediaSrc(work.coverSrc);

  return (
    <article className="mx-auto max-w-oni-page">
      <RevealUp>
        <header className="mb-10 md:mb-14">
          <p className="mb-6 font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-neutral-300">
            ONI — Work
          </p>
          <SectionLabel id="work-title">{work.title}</SectionLabel>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt=""
            className="h-auto w-full max-w-[47.5rem] border border-black/[0.06]"
          />
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
