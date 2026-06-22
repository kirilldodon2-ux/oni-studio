"use client";

import { usePathname } from "next/navigation";
import {
  formatBrandbookSectionIndex,
  useBrandbookSectionOptional,
} from "@/systems/brandbook/BrandbookSectionContext";
import {
  formatCasesSectionIndex,
  useCasesSectionOptional,
} from "@/systems/cases/CasesSectionContext";

function telemetryLane(
  pathname: string,
  brandbookSection: number | null,
  casesSection: number | null
): string {
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
  if (pathname.startsWith("/cases")) {
    const index =
      casesSection !== null ? formatCasesSectionIndex(casesSection) : "01";
    return `CASES / ${index}`;
  }
  return "MMXXVI";
}

export function NavTelemetry() {
  const pathname = usePathname();
  const brandbookCtx = useBrandbookSectionOptional();
  const casesCtx = useCasesSectionOptional();
  const lane = telemetryLane(
    pathname,
    brandbookCtx?.activeSection ?? null,
    casesCtx?.activeSection ?? null
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
