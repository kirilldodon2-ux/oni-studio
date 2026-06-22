import { ControlSurface } from "@/components/navigation";
import { PunchExperience } from "@/systems/cases/punch/PunchExperience";
import { PunchSectionNav } from "@/systems/cases/punch/PunchSectionNav";
import { PunchSectionProvider } from "@/systems/cases/punch/PunchSectionContext";

/**
 * /cases/punch — full PUNCH NEVER SLEEP brand identity case study.
 * Scroll-snap, 7 sections, dot navigation, glitch + grunge animations.
 */
export default function PunchCasePage() {
  return (
    <PunchSectionProvider>
      <div className="relative h-screen overflow-hidden bg-[#06040c] text-white">
        {/* Dark gradient behind nav controls — ensures readability */}
        <div
          className="pointer-events-none fixed left-0 right-0 top-0 z-[25]"
          style={{
            height: "6rem",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <ControlSurface />
        <PunchSectionNav />
        <PunchExperience />
      </div>
    </PunchSectionProvider>
  );
}
