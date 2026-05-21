import { PageBackdrop } from "@/systems/backdrop";
import { ContinuityField } from "@/systems/atmosphere";
import { ControlSurface } from "@/components/navigation";
import { HeroSection } from "@/sections/HeroSection";
import { WorkSection } from "@/sections/WorkSection";
import { ShowreelSection } from "@/sections/ShowreelSection";
import { ContactFooterSection } from "@/sections/ContactFooterSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      {/* Ambient backdrop — deepest layer, page-spanning SVG geometry (z-0) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
        aria-hidden
      >
        <PageBackdrop />
      </div>

      {/* Spatial continuity field — atmospheric marks in transition zones (z-[5]) */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] min-h-full w-full"
        aria-hidden
      >
        <ContinuityField />
      </div>

      <ControlSurface />
      <HeroSection />
      <WorkSection />
      <ShowreelSection />
      <ContactFooterSection />
    </div>
  );
}
