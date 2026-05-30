import { ControlSurface } from "@/components/navigation";
import { BrandbookExperience } from "@/systems/brandbook/BrandbookExperience";
import { BrandbookSectionNav } from "@/systems/brandbook/BrandbookSectionNav";
import { BrandbookSectionProvider } from "@/systems/brandbook/BrandbookSectionContext";

export default function BrandbookPage() {
  return (
    <BrandbookSectionProvider>
      <div className="relative h-screen overflow-hidden bg-white text-black">
        <ControlSurface />
        <BrandbookSectionNav />
        <BrandbookExperience />
      </div>
    </BrandbookSectionProvider>
  );
}
