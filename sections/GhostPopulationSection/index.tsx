import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { AmbientField, FadeIn, RevealUp } from "@/systems/atmosphere";

const GHOST_ENTITIES = [
  {
    type: "WORK",
    title: "FIELD_02",
    meta: "2026 / spatial identity",
    position: "lg:col-start-1 lg:col-end-6",
  },
  {
    type: "WRITING",
    title: "Notes on Spatial Restraint",
    meta: "6 min / editorial study",
    position: "lg:col-start-7 lg:col-end-12 lg:mt-20",
  },
  {
    type: "CODE ARTIFACT",
    title: "SIGNAL_LAYER",
    meta: "browser field / inactive build",
    position: "lg:col-start-4 lg:col-end-9 lg:mt-8",
  },
] as const;

const GHOST_FRAGMENT = {
  type: "ATMOSPHERIC FRAGMENT",
  title: "untitled_032",
  meta: "residual field / no index",
} as const;

export function GhostPopulationSection() {
  return (
    <SectionContainer
      aria-labelledby="ghost-population-heading"
      className="py-20 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute left-[9%] top-[18%] z-[1] hidden select-none lg:block">
        <AmbientField drift breathe delay={-6800}>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-300">
            032
          </p>
        </AmbientField>
      </div>

      <div className="pointer-events-none absolute bottom-12 right-[13%] z-[1] hidden select-none md:block">
        <AmbientField breathe delay={-11200}>
          <div className="h-px w-24 bg-black/[0.08]" />
        </AmbientField>
      </div>

      <div className="relative mx-auto max-w-oni-page">
        <RevealUp>
          <SectionLabel
            id="ghost-population-heading"
            className="mb-12 md:mb-16 lg:mb-10"
          >
            FIELD NOTES
          </SectionLabel>
        </RevealUp>

        <FadeIn delay={160}>
          <div className="grid grid-cols-1 gap-14 md:gap-16 lg:grid-cols-12 lg:gap-y-10">
            {GHOST_ENTITIES.map((entity) => (
              <article
                key={entity.title}
                className={`relative border-t border-black/[0.08] pt-4 ${entity.position}`}
              >
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-oni-accent">
                  {entity.type}
                </p>
                <h3 className="mt-5 font-bebas text-[clamp(2.7rem,7vw,6.75rem)] uppercase leading-[0.86] tracking-[0.02em] text-black">
                  {entity.title}
                </h3>
                <p className="mt-4 max-w-[18rem] font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                  {entity.meta}
                </p>
              </article>
            ))}

            <aside className="relative border-t border-black/[0.06] pt-4 md:max-w-[18rem] lg:col-start-10 lg:col-end-13 lg:mt-4">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-300">
                {GHOST_FRAGMENT.type}
              </p>
              <p className="mt-5 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-500">
                {GHOST_FRAGMENT.title}
              </p>
              <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                {GHOST_FRAGMENT.meta}
              </p>
            </aside>
          </div>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
