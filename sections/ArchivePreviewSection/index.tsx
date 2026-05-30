import Link from "next/link";
import { archiveFieldEntries } from "@/content/field";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { AmbientField, FadeIn, RevealUp } from "@/systems/atmosphere";
import { ArchiveFragmentField } from "./ArchiveFragmentField";
import { resolveArchiveFragmentField } from "./curatedWindow";

export function ArchivePreviewSection() {
  const fieldEntries = resolveArchiveFragmentField();
  const remainder = archiveFieldEntries.length - fieldEntries.length;

  return (
    <SectionContainer
      id="archive"
      data-oni-section="archive-preview"
      aria-labelledby="archive-preview-heading"
      className="py-14 md:py-16 lg:py-[clamp(3.5rem,7vh,6rem)]"
    >
      <div
        aria-hidden="true"
        data-oni-layer="decorative"
        className="pointer-events-none absolute right-14 top-8 z-[1] hidden select-none lg:block"
      >
        <AmbientField breathe delay={-7300}>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-neutral-200">
            residual index
          </p>
        </AmbientField>
      </div>

      <div className="relative mx-auto max-w-oni-page">
        <RevealUp>
          <div className="mb-5 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between lg:mb-6">
            <SectionLabel id="archive-preview-heading">ARCHIVE FRAGMENT</SectionLabel>
            <p className="font-sans text-[9px] font-medium tabular-nums uppercase tracking-[0.3em] text-neutral-300 md:pb-1">
              fragment / {fieldEntries.length}&nbsp;&nbsp;·&nbsp;&nbsp;field index /{" "}
              {archiveFieldEntries.length}
            </p>
          </div>
        </RevealUp>

        <FadeIn delay={80}>
          <div className="relative">
            <ArchiveFragmentField entries={fieldEntries} remainder={remainder} />

            <div className="mt-5 flex flex-col gap-2 border-t border-black/[0.05] pt-3 sm:flex-row sm:items-center sm:justify-between md:mt-6">
              <p className="font-sans text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-300">
                cropped field · continuation in archive
              </p>
              <Link
                href="/archive"
                className="inline-flex w-fit items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-oni-accent transition-opacity duration-150 hover:opacity-70"
              >
                <span aria-hidden className="text-base font-light leading-none">
                  →
                </span>
                Enter archive field
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
