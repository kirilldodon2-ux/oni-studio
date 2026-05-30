import { PageBackdrop } from "@/systems/backdrop";
import { ContinuityField } from "@/systems/atmosphere";
import { ControlSurface } from "@/components/navigation";
import { ExportModeProvider, isExportMode } from "@/systems/export";
import { HeroSection } from "@/sections/HeroSection";
import { CapabilitiesSection } from "@/sections/CapabilitiesSection";
import { ArchivePreviewSection } from "@/sections/ArchivePreviewSection";
import { BrandIdentitySection } from "@/sections/BrandIdentitySection";
import { ShowreelSection } from "@/sections/ShowreelSection";
import { ContactFooterSection } from "@/sections/ContactFooterSection";

/** Required for `@cloudflare/next-on-pages` while `/` uses `searchParams` (dynamic ƒ). */
export const runtime = "edge";

type HomePageProps = {
  searchParams?: { export?: string | string[] };
};

export default function Home({ searchParams }: HomePageProps) {
  const exportMode = isExportMode(searchParams ?? {});

  return (
    <ExportModeProvider initialExportMode={exportMode}>
      <div
        className="relative min-h-screen bg-white text-black"
        data-oni-page="landing"
        data-oni-export={exportMode ? "1" : undefined}
      >
        {/* Ambient backdrop — deepest layer, page-spanning SVG geometry (z-0) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
          data-oni-layer="decorative"
          aria-hidden
        >
          <PageBackdrop />
        </div>

        {/* Spatial continuity field — atmospheric marks in transition zones (z-[5]) */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] min-h-full w-full"
          data-oni-layer="decorative"
          aria-hidden
        >
          <ContinuityField />
        </div>

        <ControlSurface />
        <HeroSection exportMode={exportMode} />
        <CapabilitiesSection />
        <ArchivePreviewSection />
        <BrandIdentitySection />
        <ShowreelSection />
        <ContactFooterSection />
      </div>
    </ExportModeProvider>
  );
}
