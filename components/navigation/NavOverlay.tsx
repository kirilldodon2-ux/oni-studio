"use client";

import { LocalizedText, useLocale } from "@/systems/i18n/LocaleProvider";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentScrollLock } from "@/systems/useDocumentScrollLock";

type NavItem = {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "home",
    label: "HOME",
    href: "/",
    ariaLabel: "Go to HOME",
  },
  {
    id: "projects",
    label: "PROJECTS",
    href: "/#projects",
    ariaLabel: "Go to PROJECTS",
  },
  {
    id: "brandbook",
    label: "BRANDBOOK",
    href: "/brandbook",
    ariaLabel: "Go to BRANDBOOK",
  },
  {
    id: "contact",
    label: "CONTACT",
    href: "/#contact",
    ariaLabel: "Go to CONTACT",
  },
];

function isNavItemCurrent(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/")) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (href.startsWith("#")) return pathname === "/";
  return false;
}

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NavOverlay — right-side atmospheric navigation plane.
 *
 * Owns z-50 per the formal z-index table in ARCHITECTURE.md.
 * Always mounted; visibility controlled via opacity + pointer-events.
 * Reveal is spatial but restrained: plane translateX + opacity, typography stagger.
 * Body scroll is locked while open.
 */
export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // The fixed-body lock remains; the longer index must allow native inner scrolling.
  useDocumentScrollLock(isOpen, { blockTouchMove: false });

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(null);
    }
  }, [isOpen]);

  return (
    <div
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t("Site navigation")}
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 z-50",
        "transition-opacity",
        isOpen ? "duration-200 ease-out" : "duration-200 ease-in",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <div
        onPointerDown={onClose}
        className={[
          "absolute inset-0 bg-black/[0.055] backdrop-blur-[1.5px]",
          "transition-opacity",
          isOpen
            ? "opacity-100 duration-300 ease-out"
            : "opacity-0 duration-200 ease-in",
        ].join(" ")}
        aria-hidden="true"
      />

      <div
        className={[
          "absolute inset-y-0 right-0 w-full overflow-hidden",
          "border-l border-black/[0.05]",
          "bg-white/[0.82]",
          "transition-[transform,opacity] will-change-transform",
          "md:w-[min(76vw,58rem)] lg:w-[min(68vw,64rem)]",
          isOpen
            ? "translate-x-0 opacity-100 duration-300 ease-out"
            : "translate-x-full opacity-95 duration-200 ease-in",
        ].join(" ")}
      >
        <nav
          className="relative flex h-full touch-pan-y flex-col overflow-y-auto overscroll-y-contain px-6 pb-8 pt-[calc(var(--oni-header-h)+2rem)] md:px-12 lg:px-0 lg:pl-[clamp(4rem,9vw,9rem)] lg:pr-20"
          aria-label={t("Primary navigation")}
        >
          <ul className="my-auto flex shrink-0 flex-col items-start gap-3 md:gap-5">
            {NAV_ITEMS.map(
              ({ id, label, href }, index) => {
                const isCurrent = isNavItemCurrent(href, pathname);
                const isHovered = activeIndex === index;

                return (
                  <li key={id}>
                    <Link
                      href={href}
                      aria-label={t(label)}
                      aria-current={isCurrent ? "page" : undefined}
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "touch") setActiveIndex(index);
                      }}
                      onPointerLeave={(event) => {
                        if (event.pointerType !== "touch") setActiveIndex(null);
                      }}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(null)}
                      onClick={onClose}
                      tabIndex={isOpen ? 0 : -1}
                      className={[
                        "block py-1 font-display text-2xl font-bold uppercase leading-tight tracking-normal text-black md:text-3xl lg:text-4xl",
                        "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                        isOpen ? "translate-x-0" : "translate-x-8",
                        !isOpen ? "opacity-0" : !isCurrent && !isHovered ? "opacity-60" : "opacity-100",
                      ].join(" ")}
                      style={{
                        transitionDelay:
                          isOpen && activeIndex === null
                            ? `${60 + index * 25}ms`
                            : "0ms",
                      }}
                    >
                      <LocalizedText value={label} />
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
