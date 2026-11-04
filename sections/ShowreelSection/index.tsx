import { LocalizedText } from "@/systems/i18n/LocaleProvider";
import { SectionContainer } from "@/systems/layout/SectionContainer";
import { SectionLabel } from "@/systems/layout/SectionLabel";
import { FadeIn, RevealUp } from "@/systems/atmosphere";
import { ShowreelMediaCard } from "./ShowreelMediaCard";

export function ShowreelSection() {
  return (
    <SectionContainer
      id="showreel"
      data-oni-section="showreel"
      aria-labelledby="showreel-heading"
      className="py-8 md:py-10 lg:py-12"
    >
      {/* Section heading — spatial emergence with translateY weight */}
      <div className="relative mx-auto max-w-oni-showreel">
        <RevealUp>
          <SectionLabel id="showreel-heading" className="relative z-[1] mb-5 md:mb-6"><LocalizedText value={"SHOWREEL"} /></SectionLabel>
        </RevealUp>

        {/* Media card — flat opacity emergence 200ms after heading */}
        <FadeIn delay={200}>
          <div className="mx-auto max-w-[880px]">
            <ShowreelMediaCard />
          </div>
        </FadeIn>
      </div>

    </SectionContainer>
  );
}
