"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLogo } from "./NavLogo";

function showHomeAction(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/archive") ||
    pathname.startsWith("/brandbook") ||
    pathname.startsWith("/cases")
  );
}

/** Routes with dark (near-black) backgrounds — nav needs light text. */
function isDarkRoute(pathname: string): boolean {
  return pathname.startsWith("/cases");
}

/**
 * Persistent HOME action — visible on landing, archive, brandbook, and cases routes.
 * Returns to `/`. Other routes keep the identity spacer (NavLogo).
 */
export function NavHome() {
  const pathname = usePathname();

  if (!showHomeAction(pathname)) {
    return <NavLogo />;
  }

  const color = isDarkRoute(pathname) ? "text-white/70" : "text-black/60";

  return (
    <Link
      href="/"
      className={`pointer-events-auto font-sans text-[11px] font-medium uppercase tracking-[0.18em] ${color} transition-opacity duration-150 hover:opacity-60`}
      aria-label="Go to homepage"
      aria-current={pathname === "/" ? "page" : undefined}
    >
      HOME
    </Link>
  );
}
