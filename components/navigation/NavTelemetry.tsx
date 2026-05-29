"use client";

import { usePathname } from "next/navigation";

function telemetryLane(pathname: string): string {
  if (pathname === "/") return "HOME";
  if (pathname.startsWith("/works")) return "WORKS";
  if (pathname.startsWith("/archive")) return "ARCHIVE";
  return "MMXXVI";
}

export function NavTelemetry() {
  const pathname = usePathname();
  const lane = telemetryLane(pathname);

  return (
    <span
      className="pointer-events-none hidden select-none text-[11px] font-medium tracking-[0.22em] text-neutral-400 lg:absolute lg:left-1/2 lg:block lg:-translate-x-1/2"
      aria-hidden="true"
    >
      ONI.STUDIO / {lane}
    </span>
  );
}
