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
      className="py-20 pb-28 md:py-24 md:pb-32 lg:py-28 lg:pb-36"
    >
      {/* Section heading — spatial emergence with translateY weight */}
      <div className="relative mx-auto max-w-oni-showreel pb-12 md:pb-16">
        <RevealUp>
          <SectionLabel id="showreel-heading" className="relative z-[1] mb-10 md:mb-14"><LocalizedText value={"SHOWREEL"} /></SectionLabel>
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
