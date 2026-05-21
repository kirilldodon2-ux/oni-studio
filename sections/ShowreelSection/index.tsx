import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { AmbientField, FadeIn, RevealUp } from "@/systems/atmosphere";
import { ShowreelMediaCard } from "./ShowreelMediaCard";

export function ShowreelSection() {
  return (
    <SectionContainer
      id="showreel"
      aria-labelledby="showreel-heading"
      className="py-20 pb-28 md:py-24 md:pb-32 lg:py-28 lg:pb-36"
    >
      {/* Section-local atmospheric mark — desktop only, top-right gutter.
          A single dot continues the environmental mark thread from WorkSection.
          Deliberately more minimal than the WorkSection cross — spatial descent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-14 z-[1] hidden select-none lg:block"
        style={{ top: "2.25rem" }}
      >
        <AmbientField breathe delay={-9400}>
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#000",
              opacity: 0.15,
            }}
          />
        </AmbientField>
      </div>

      {/* Section heading — spatial emergence with translateY weight */}
      <div className="relative mx-auto max-w-oni-showreel pb-12 md:pb-16">
        <RevealUp>
          <SectionLabel id="showreel-heading" className="relative z-[1] mb-10 md:mb-14">
            SHOWREEL
          </SectionLabel>
        </RevealUp>

        {/* Media card — flat opacity emergence 200ms after heading */}
        <FadeIn delay={200}>
          <div className="mx-auto max-w-[880px]">
            <ShowreelMediaCard />
          </div>
        </FadeIn>
      </div>

      {/* Editorial year annotation — absolute position owned by the FadeIn wrapper so the
          SectionContainer remains the positioning context (not the content div above).
          Soft opacity emergence 80ms after scroll trigger. */}
      <FadeIn
        delay={80}
        className="pointer-events-none absolute bottom-10 left-6 z-[1] md:bottom-12 md:left-10 lg:left-14"
      >
        <p className="font-bebas text-5xl tracking-[0.08em] text-neutral-300 md:text-6xl lg:text-7xl">
          2026
        </p>
      </FadeIn>
    </SectionContainer>
  );
}
