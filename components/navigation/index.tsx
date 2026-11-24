"use client";

import { BookOpen, FolderClosed, House, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useBrandbookSectionOptional } from "@/systems/brandbook/BrandbookSectionContext";
import { usePunchSectionOptional } from "@/systems/cases/punch/PunchSectionContext";
import { useLocale } from "@/systems/i18n/LocaleProvider";
import { isDocumentScrollLocked, subscribeDocumentScrollLock } from "@/systems/useDocumentScrollLock";
import { LanguageSwitch } from "./LanguageSwitch";
import styles from "./dock.module.css";

const destinations = [
  { id: "home", label: "Home", href: "/", icon: House },
  { id: "projects", label: "Projects", href: "/#projects", icon: FolderClosed },
  { id: "brandbook", label: "Brandbook", href: "/brandbook", icon: BookOpen },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail },
] as const;

type Destination = typeof destinations[number]["id"];
const landingSections = [
  { id: "contact", target: "contact" },
  { id: "brandbook", target: "brandbook-preview" },
  { id: "projects", target: "projects" },
] as const;

function useCurrentDestination(pathname: string, modalOpen: boolean): Destination {
  const [landingDestination, setLandingDestination] = useState<Destination>("home");

  useEffect(() => {
    if (pathname !== "/" || modalOpen) return;
    const sections = landingSections.map(section => ({
      id: section.id,
      element: document.getElementById(section.target),
    }));
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.45;
      const current = sections.find(({ element }) => element && element.getBoundingClientRect().top <= readingLine);
      setLandingDestination(current?.id ?? "home");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname, modalOpen]);

  if (pathname === "/") return landingDestination;
  if (pathname.startsWith("/brandbook")) return "brandbook";
  return "projects";
}

const isServerModalOpen = () => false;

export function ControlSurface() {
  const { t } = useLocale();
  const pathname = usePathname();
  const brandbook = useBrandbookSectionOptional();
  const punch = usePunchSectionOptional();
  const dark = brandbook
    ? [1, 2, 3].includes(brandbook.activeSection)
    : punch ? ![4, 7].includes(punch.activeSection) : pathname.startsWith("/cases");
  const modalOpen = useSyncExternalStore(subscribeDocumentScrollLock, isDocumentScrollLocked, isServerModalOpen);
  const active = useCurrentDestination(pathname, modalOpen);

  return (
    <>
      <header data-oni-layer="chrome" className={styles.language} hidden={modalOpen}>
        <LanguageSwitch light={dark} />
      </header>
      <nav
        data-oni-layer="chrome"
        data-oni-dock
        aria-label={t("Primary navigation")}
        className={styles.dock}
        data-dark={dark || undefined}
        hidden={modalOpen}
      >
        <ul className={styles.destinations}>
          {destinations.map(({ id, label, href, icon: Icon }) => (
            <li key={id}>
              <Link
                href={href}
                prefetch={false}
                aria-label={t(label)}
                aria-current={active === id ? "location" : undefined}
                className={styles.link}
                onClick={id === "home" && pathname === "/" ? event => {
                  if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                    window.scrollTo({ top: 0, behavior: "auto" });
                  }
                } : undefined}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                <span aria-hidden="true" className={styles.label}>{t(label)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
