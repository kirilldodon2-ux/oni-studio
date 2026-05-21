import { PageBackdrop } from "@/systems/backdrop";
import { ControlSurface } from "@/components/navigation";
import { ArchiveGrid } from "@/systems/archive";
import { archiveFieldEntries } from "@/content/field";

export const metadata = {
  title: "Archive — ONI Studio",
};

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full w-full"
        aria-hidden
      >
        <PageBackdrop />
      </div>

      <ControlSurface />

      <main className="relative z-10 px-4 pb-24 pt-24 sm:px-5 md:px-8 md:pt-28 lg:px-10 lg:pt-32">
        <header className="mb-6 flex items-baseline justify-between">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.4em] text-neutral-300">
            ONI — Archive
          </p>
          <p className="font-sans text-[9px] font-medium tabular-nums uppercase tracking-[0.3em] text-neutral-300">
            {archiveFieldEntries.length}&nbsp;objects
          </p>
        </header>

        <ArchiveGrid />
      </main>
    </div>
  );
}
