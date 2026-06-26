"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentScrollLock } from "@/systems/useDocumentScrollLock";

type NavItem = {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
  className: string;
  listClassName?: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  {
    id: "home",
    label: "HOME",
    href: "/",
    ariaLabel: "Go to HOME",
    className:
      "text-[clamp(3rem,9vw,6.5rem)] text-black/[0.45] md:text-[clamp(3.75rem,7vw,7rem)]",
  },
  {
    id: "archive",
    label: "ARCHIVE",
    href: "/archive",
    ariaLabel: "Go to ARCHIVE",
    className:
      "text-[clamp(4.4rem,14vw,9.25rem)] text-black/80 md:text-[clamp(5rem,8.5vw,9.25rem)]",
    listClassName: "mt-[clamp(1.25rem,3vh,1.75rem)]",
  },
  {
    id: "brandbook",
    label: "BRANDBOOK",
    href: "/brandbook",
    ariaLabel: "Go to BRANDBOOK",
    className:
      "text-[clamp(3.8rem,12vw,8rem)] text-black/80 md:text-[clamp(4.5rem,7.5vw,8rem)]",
    listClassName: "mt-[clamp(0.5rem,1.2vh,0.75rem)]",
  },
  {
    id: "cases",
    label: "CASES",
    href: "/cases",
    ariaLabel: "Go to CASES",
    className:
      "text-[clamp(3.8rem,12vw,8rem)] text-black/80 md:text-[clamp(4.5rem,7.5vw,8rem)]",
    listClassName: "mt-[clamp(0.5rem,1.2vh,0.75rem)]",
  },
  {
    id: "contact",
    label: "CONTACT",
    href: "/#contact",
    ariaLabel: "Go to CONTACT",
    className:
      "text-[clamp(3.6rem,11vw,7.5rem)] text-black/[0.55] md:text-[clamp(4.25rem,7.25vw,7.5rem)]",
    listClassName: "mt-[clamp(1.5rem,3.5vh,2rem)]",
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

function overlayFieldAnnotation(pathname: string): string {
  if (pathname === "/") return "HOME FIELD";
  if (pathname.startsWith("/brandbook")) return "BRANDBOOK OPEN";
  if (pathname.startsWith("/cases")) return "CASES OPEN";
  if (pathname === "/works") return "WORKS INDEX";
  if (pathname.startsWith("/works/")) return "WORK OPEN";
  if (pathname === "/archive") return "ARCHIVE FIELD";
  if (pathname.startsWith("/archive/")) return "ARCHIVE OPEN";
  return "ONI STUDIO";
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
  const pathname = usePathname();
  const fieldAnnotation = overlayFieldAnnotation(pathname);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchActivationRef = useRef(false);

  useDocumentScrollLock(isOpen, { blockTouchMove: true });

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
      touchActivationRef.current = false;
    }
  }, [isOpen]);

  return (
    <div
      id="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!isOpen}
      className={[
        "fixed inset-0 z-50",
        "transition-opacity",
        isOpen ? "duration-[560ms] ease-out" : "duration-[420ms] ease-in",
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
            ? "opacity-100 duration-[640ms] ease-out"
            : "opacity-0 duration-[360ms] ease-in",
        ].join(" ")}
        aria-hidden="true"
      />

      <div
        className={[
          "absolute inset-y-0 right-0 w-full overflow-hidden",
          "border-l border-black/[0.05]",
          "bg-white/[0.82] backdrop-blur-[3px]",
          "transition-[transform,opacity] will-change-transform",
          "md:w-[min(76vw,58rem)] lg:w-[min(68vw,64rem)]",
          isOpen
            ? "translate-x-0 opacity-100 duration-[760ms] ease-out"
            : "translate-x-full opacity-95 duration-[520ms] ease-in",
        ].join(" ")}
      >
        <div
          className="pointer-events-none absolute bottom-8 right-6 hidden select-none text-right text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400 md:block lg:bottom-10 lg:right-14"
          aria-hidden="true"
        >
          <span className="block">MMXXVI</span>
          <span className="mt-1 block">ONI STUDIO</span>
          <span className="mt-1 block text-neutral-300">{fieldAnnotation}</span>
        </div>

        <nav
          className="relative flex h-full flex-col justify-end px-6 pb-[clamp(3.5rem,11vh,7.5rem)] pt-[calc(var(--oni-header-h)+2rem)] md:px-12 lg:px-0 lg:pl-[clamp(4rem,9vw,9rem)] lg:pr-20"
          aria-label="Primary navigation"
        >
          <p
            className={[
              "mb-8 text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-400",
              "transition-[opacity,transform] duration-[620ms] ease-out",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            ].join(" ")}
            aria-hidden="true"
            style={{ transitionDelay: isOpen ? "180ms" : "0ms" }}
          >
            INDEX / PRIMARY FIELD
          </p>

          <ul className="flex flex-col items-start gap-0">
            {NAV_ITEMS.map(
              ({ id, label, href, ariaLabel, className, listClassName }, index) => {
                const isCurrent = isNavItemCurrent(href, pathname);
                const isHovered = activeIndex === index;

                return (
                  <li key={id} className={listClassName ?? ""}>
                    <Link
                      href={href}
                      aria-label={ariaLabel}
                      aria-current={isCurrent ? "page" : undefined}
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "touch") setActiveIndex(index);
                      }}
                      onPointerLeave={(event) => {
                        if (event.pointerType !== "touch") setActiveIndex(null);
                      }}
                      onPointerDown={(event) => {
                        touchActivationRef.current =
                          event.pointerType === "touch" && activeIndex !== index;
                        setActiveIndex(index);
                      }}
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(null)}
                      onClick={(event) => {
                        if (touchActivationRef.current) {
                          event.preventDefault();
                          touchActivationRef.current = false;
                          return;
                        }
                        if (activeIndex !== index) {
                          event.preventDefault();
                          setActiveIndex(index);
                          return;
                        }
                        onClose();
                      }}
                      tabIndex={isOpen ? 0 : -1}
                      className={[
                        "flex items-end overflow-visible font-bebas uppercase tracking-[0.035em]",
                        "transition-[opacity,transform,padding] duration-[680ms] ease-out",
                        isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                        activeIndex === index
                          ? "pb-0 pt-[clamp(0.95rem,3.2vh,3rem)]"
                          : "py-0",
                        !isCurrent && !isHovered ? "opacity-[0.38]" : "",
                        className,
                      ].join(" ")}
                      style={{
                        transitionDelay:
                          isOpen && activeIndex === null
                            ? `${260 + index * 90}ms`
                            : "0ms",
                      }}
                    >
                      <span
                        className={[
                          "block origin-bottom leading-[0.83] [transform-origin:bottom_center]",
                          "transition-transform duration-[680ms] ease-out",
                          activeIndex === index
                            ? "scale-y-[1.26]"
                            : "scale-y-100",
                        ].join(" ")}
                      >
                        {label}
                      </span>
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
