import { ControlSurface } from "@/components/navigation";
import { CasesExperience } from "@/systems/cases/CasesExperience";
import { CasesSectionNav } from "@/systems/cases/CasesSectionNav";
import { CasesSectionProvider } from "@/systems/cases/CasesSectionContext";

export default function CasesPage() {
  return (
    <CasesSectionProvider>
      <div className="relative h-screen overflow-hidden bg-[#070707] text-white">
        <ControlSurface />
        <CasesSectionNav />
        <CasesExperience />
      </div>
    </CasesSectionProvider>
  );
}
