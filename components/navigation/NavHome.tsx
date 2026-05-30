"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLogo } from "./NavLogo";

function showHomeAction(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/archive") ||
    pathname.startsWith("/brandbook")
  );
}

/**
 * Persistent HOME action — visible on landing, archive, and brandbook routes.
 * Returns to `/`. Other routes keep the identity spacer (NavLogo).
 */
export function NavHome() {
  const pathname = usePathname();

  if (!showHomeAction(pathname)) {
    return <NavLogo />;
  }

  return (
    <Link
      href="/"
      className="pointer-events-auto font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-black/60 transition-opacity duration-150 hover:opacity-60"
      aria-label="Go to homepage"
      aria-current={pathname === "/" ? "page" : undefined}
    >
      HOME
    </Link>
  );
}
