import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { AmbientField, FadeIn, RevealUp } from "@/systems/atmosphere";
import { SystemArtifact } from "./SystemArtifact";

/**
 * Territory field data — source order = mobile reading sequence.
 *
 * Mobile: territories stack in descending scale order (dominant → ghost),
 * producing a clean editorial flow without visual collisions.
 *
 * Desktop: lg:order-N restores the spatial composition without touching
 * source order. Grid auto-placement processes items in order-N sequence,
 * producing three asymmetric rows:
 *
 *   Row 1 — IDENTITY (cols 1–8)  |  MOTION (cols 9–12)
 *   Row 2 — IMAGE (cols 1–5)     |  SPATIAL (cols 7–11)
 *   Row 3 — DIGITAL (cols 3–7)   |  SYSTEMS (cols 10–12)
 *
 * titleSize clamp: min is the mobile-native scale, vw preferred climbs to
 * desktop weight, max caps the large-screen ceiling. This keeps hierarchy
 * legible on 375px without the mobile minimum being a collapsed desktop value.
 *
 * Ghost-tier (SYSTEMS) uses responsive color utilities:
 * mobile reads neutral-400/500 for legibility; desktop recedes to neutral-300/400.
 */
const TERRITORIES = [
  {
    id: "spatial-identity",
    field: "FIELD / 01",
    name: "IDENTITY",
    disciplines: "logos / systems / brand worlds",
    titleSize: "clamp(3rem,11vw,10.5rem)",
    position: "lg:order-1 lg:col-start-1 lg:col-end-9",
    borderColor: "border-black/[0.14]",
    labelColor: "text-oni-accent",
    titleColor: "text-black",
    disciplineColor: "text-neutral-400",
  },
  {
    id: "editorial-motion",
    field: "FIELD / 03",
    name: "IMAGE",
    disciplines: "posters / campaigns / visual language",
    titleSize: "clamp(2.1rem,5.5vw,5.5rem)",
    position: "lg:order-3 lg:col-start-1 lg:col-end-6 lg:mt-14",
    borderColor: "border-black/[0.09]",
    labelColor: "text-oni-accent",
    titleColor: "text-black",
    disciplineColor: "text-neutral-400",
  },
  {
    id: "archive-research",
    field: "FIELD / 05",
    name: "DIGITAL",
    disciplines: "web / interactive / experiences",
    titleSize: "clamp(1.7rem,4.5vw,4.5rem)",
    position: "lg:order-4 lg:col-start-3 lg:col-end-8 lg:mt-12",
    borderColor: "border-black/[0.09]",
    labelColor: "text-oni-accent",
    titleColor: "text-black",
    disciplineColor: "text-neutral-400",
  },
  {
    id: "system-architectures",
    field: "FIELD / 02",
    name: "MOTION",
    disciplines: "animation / kinetics / sequences",
    titleSize: "clamp(1.35rem,3vw,3rem)",
    position: "lg:order-2 lg:col-start-9 lg:col-end-13 lg:mt-16",
    borderColor: "border-black/[0.09]",
    labelColor: "text-oni-accent",
    titleColor: "text-black",
    disciplineColor: "text-neutral-400",
  },
  {
    id: "experimental-media",
    field: "FIELD / 04",
    name: "SPATIAL",
    disciplines: "3D / environments / objects",
    titleSize: "clamp(1.2rem,2.5vw,2.5rem)",
    position: "lg:order-5 lg:col-start-7 lg:col-end-12 lg:mt-32",
    borderColor: "border-black/[0.06]",
    labelColor: "text-neutral-400",
    titleColor: "text-neutral-700",
    disciplineColor: "text-neutral-400",
  },
  {
    id: "atmospheric-fragments",
    field: "FIELD / 06",
    name: "SYSTEMS",
    disciplines: "pipelines / generative / R&D",
    titleSize: "clamp(0.9rem,1.8vw,1.6rem)",
    position: "lg:order-6 lg:col-start-10 lg:col-end-13 lg:mt-4",
    borderColor: "border-black/[0.04]",
    // Desktop recedes to near-invisible; mobile holds neutral-400/500 for legibility.
    labelColor: "text-neutral-400 lg:text-neutral-300",
    titleColor: "text-neutral-500 lg:text-neutral-400",
    disciplineColor: "text-neutral-400 lg:text-neutral-300",
  },
];

export function CapabilitiesSection() {
  return (
    <SectionContainer
      id="work"
      data-oni-section="work"
      aria-labelledby="capabilities-heading"
      className="py-20 md:py-24 lg:py-[clamp(5.5rem,10vh,8rem)]"
    >
      {/* Atmospheric cross mark — top-right, echoes backdrop vocabulary */}
      <div
        aria-hidden="true"
        data-oni-layer="decorative"
        className="pointer-events-none absolute right-14 z-[1] hidden select-none lg:block"
        style={{ top: "2rem" }}
      >
        <AmbientField breathe delay={-5200}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="11" y1="3" x2="11" y2="19"
              stroke="#cfcfcf" strokeWidth="0.65" opacity="0.44"
            />
            <line
              x1="3" y1="11" x2="19" y2="11"
              stroke="#cfcfcf" strokeWidth="0.65" opacity="0.44"
            />
          </svg>
        </AmbientField>
      </div>

      {/* Field annotation — ambient coordinate mark, bottom-left. Desktop only. */}
      <div
        aria-hidden="true"
        data-oni-layer="decorative"
        className="pointer-events-none absolute left-[7%] bottom-[12%] z-[1] hidden select-none lg:block"
      >
        <AmbientField breathe delay={-9400}>
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-neutral-200">
            territory / six
          </p>
        </AmbientField>
      </div>

      <div className="mx-auto max-w-oni-page">
        <RevealUp>
          <SectionLabel id="capabilities-heading" className="mb-10 md:mb-14 lg:mb-12">
            CAPABILITIES
          </SectionLabel>
        </RevealUp>

        <FadeIn delay={150}>
          {/*
            Mobile/tablet: single column, gap-16 (4rem) uniform rhythm.
            Desktop: 12-col grid, gap-x-4 column separation, no row gap —
            vertical rhythm comes entirely from lg:mt-* offsets per territory.
          */}
          <div className="grid grid-cols-1 gap-16 md:gap-20 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0">
            {TERRITORIES.map((territory) => (
              <article
                key={territory.id}
                className={`relative border-t pt-4 ${territory.borderColor} ${territory.position}`}
              >
                <p
                  className={`font-sans text-[10px] font-semibold uppercase tracking-[0.26em] ${territory.labelColor}`}
                >
                  {territory.field}
                </p>

                <h3
                  className={`mt-5 font-bebas uppercase leading-[0.86] tracking-[0.02em] ${territory.titleColor}`}
                  style={{ fontSize: territory.titleSize }}
                >
                  {territory.name}
                </h3>

                <p
                  className={`mt-4 font-sans text-[11px] font-medium uppercase tracking-[0.16em] ${territory.disciplineColor}`}
                >
                  {territory.disciplines}
                </p>

                {territory.id === "system-architectures" && <SystemArtifact />}
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
