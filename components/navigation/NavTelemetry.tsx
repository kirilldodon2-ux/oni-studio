"use client";

import { usePathname } from "next/navigation";
import {
  formatBrandbookSectionIndex,
  useBrandbookSectionOptional,
} from "@/systems/brandbook/BrandbookSectionContext";

function telemetryLane(pathname: string, brandbookSection: number | null): string {
  if (pathname === "/") return "HOME";
  if (pathname.startsWith("/works")) return "WORKS";
  if (pathname.startsWith("/archive")) return "ARCHIVE";
  if (pathname.startsWith("/brandbook")) {
    const index =
      brandbookSection !== null
        ? formatBrandbookSectionIndex(brandbookSection)
        : "01";
    return `BRAND BOOK / ${index}`;
  }
  return "MMXXVI";
}

export function NavTelemetry() {
  const pathname = usePathname();
  const brandbookCtx = useBrandbookSectionOptional();
  const lane = telemetryLane(
    pathname,
    brandbookCtx?.activeSection ?? null
  );

  return (
    <span
      className="pointer-events-none hidden select-none text-[11px] font-medium tracking-[0.22em] text-neutral-400 lg:absolute lg:left-1/2 lg:block lg:-translate-x-1/2"
      aria-hidden="true"
    >
      ONI.STUDIO / {lane}
    </span>
  );
}
