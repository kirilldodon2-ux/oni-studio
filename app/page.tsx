import { ControlSurface } from "@/components/navigation";
import type { Metadata } from "next";
import { PageBackdrop } from "@/systems/backdrop";
import { ContinuityField } from "@/systems/atmosphere";
import { ExportModeProvider, isExportMode } from "@/systems/export";
import { HeroSection } from "@/sections/HeroSection";
import { ProjectsSection, BrandbookPreviewSection } from "@/sections/ProjectsSection";
import { ShowreelSection } from "@/sections/ShowreelSection";
import { ContactFooterSection } from "@/sections/ContactFooterSection";

/** Required for `@cloudflare/next-on-pages` while `/` uses `searchParams` (dynamic ƒ). */
export const runtime = "edge";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
        <div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full" data-oni-layer="decorative" aria-hidden>
          <PageBackdrop />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[5] min-h-full w-full" data-oni-layer="decorative" aria-hidden>
          <ContinuityField />
        </div>
        <ControlSurface />
        <HeroSection exportMode={exportMode} />
        <ShowreelSection />
        <ProjectsSection />
        <BrandbookPreviewSection />
        <ContactFooterSection />
      </div>
    </ExportModeProvider>
  );
}
