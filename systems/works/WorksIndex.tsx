import Link from "next/link";
import type { Work, WorkDomain } from "@/content/works/types";
import { worksRegistry } from "@/content/works/field";

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

function WorkIndexRow({ work }: { work: Work }) {
  return (
    <li className="border-t border-black/[0.08]">
      <Link
        href={`/works/${work.slug}`}
        className="group flex flex-col gap-3 py-8 transition-opacity hover:opacity-60 md:flex-row md:items-baseline md:justify-between md:gap-10 md:py-10"
      >
        <h2 className="font-bebas text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-black">
          {work.title}
        </h2>
        <div className="flex shrink-0 flex-col gap-1 md:items-end">
          <p className="font-sans text-[10px] font-medium tabular-nums uppercase tracking-[0.28em] text-neutral-400">
            {work.year}
          </p>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-500">
            {formatDomain(work.domain)}
          </p>
        </div>
      </Link>
    </li>
  );
}

export function WorksIndex() {
  return (
    <ul className="border-b border-black/[0.08]">
      {worksRegistry.map((work) => (
        <WorkIndexRow key={work.slug} work={work} />
      ))}
    </ul>
  );
}
