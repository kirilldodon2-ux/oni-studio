"use client";

// Folder silhouette, peeks and pointer interaction adapted from German Virre (@mnzrrr).
// https://github.com/mnzrrr/portfolio @ 8a4a8f7. Used with permission; see THIRD_PARTY_NOTICES.md.
import { useEffect, useRef, type PointerEvent } from "react";
import { useLocale } from "@/systems/i18n/LocaleProvider";
import type { ProjectFolder } from "./types";
import styles from "./folders.module.css";

export function FolderCard({ folder, onOpen }: {
  folder: ProjectFolder; onOpen: (folder: ProjectFolder, opener: HTMLButtonElement) => void;
}) {
  const { t, locale } = useLocale();
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef({ id: -1, sx: 0, sy: 0, x: 0, y: 0, bx: 0, by: 0,
    armed: false, moved: false, suppressClick: false, bounds: [0, 0, 0, 0] });
  const hold = useRef<ReturnType<typeof setTimeout>>();
  const release = useRef<ReturnType<typeof setTimeout>>();
  const reset = () => {
    clearTimeout(hold.current); drag.current.id = -1; drag.current.armed = false;
    ref.current?.classList.remove(styles.dragging, styles.lifted);
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const touch = (event: TouchEvent) => { if (drag.current.armed) event.preventDefault(); };
    const resize = () => { drag.current.x = 0; drag.current.y = 0; el.style.translate = ""; reset(); };
    el.addEventListener("touchmove", touch, { passive: false });
    window.addEventListener("resize", resize);
    return () => {
      clearTimeout(hold.current); clearTimeout(release.current);
      el.removeEventListener("touchmove", touch); window.removeEventListener("resize", resize);
    };
  }, []);

  const end = (event: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (event.pointerId !== d.id) return;
    if (d.moved) {
      d.suppressClick = true;
      release.current = setTimeout(() => { d.suppressClick = false; }, 0);
    }
    reset();
  };

  return (
    <button ref={ref} type="button" className={styles.folder} data-folder-id={folder.id}
      aria-label={`${t("Open folder")}: ${t(folder.title)}`}
      onClick={(event) => { if (!drag.current.suppressClick) onOpen(folder, event.currentTarget); }}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        const d = drag.current;
        d.id = event.pointerId; d.sx = event.clientX; d.sy = event.clientY;
        d.bx = d.x; d.by = d.y; d.moved = false; d.armed = event.pointerType === "mouse";
        if (!d.armed) hold.current = setTimeout(() => {
          d.armed = true; ref.current?.classList.add(styles.lifted);
        }, 280);
      }}
      onPointerMove={(event) => {
        const d = drag.current, el = ref.current;
        if (!el || event.pointerId !== d.id) return;
        const dx = event.clientX - d.sx, dy = event.clientY - d.sy;
        if (!d.armed) { if (Math.hypot(dx, dy) > 8) reset(); return; }
        if (!d.moved) {
          if (Math.hypot(dx, dy) < 5) return;
          const area = el.closest("[data-folder-grid]")?.getBoundingClientRect();
          if (!area) return;
          const r = el.getBoundingClientRect();
          d.bounds = [area.left - r.left + d.x, area.right - r.right + d.x,
            area.top - r.top + d.y, area.bottom - r.bottom + d.y];
          d.moved = true; el.classList.add(styles.dragging); el.setPointerCapture(event.pointerId);
        }
        d.x = Math.min(d.bounds[1], Math.max(d.bounds[0], d.bx + dx));
        d.y = Math.min(d.bounds[3], Math.max(d.bounds[2], d.by + dy));
        el.style.translate = `${d.x}px ${d.y}px`;
      }}
      onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
      onContextMenu={(event) => { if (drag.current.armed) event.preventDefault(); }}>
      <span className={styles.fold} aria-hidden="true">
        <svg className={styles.back} viewBox="0 0 500 400" preserveAspectRatio="none">
          <path d="M0,22 Q0,0 22,0 H168 Q186,0 197,14 L215,38 Q224,50 242,50 H478 Q500,50 500,72 V378 Q500,400 478,400 H22 Q0,400 0,378 Z" />
          <path d="M22,1 H168 Q186,1 197,15 L215,39 Q224,51 242,51 H478" />
        </svg>
        <span className={styles.peeks}>
          {folder.items.slice(0, 3).map((item) => (
            <span className={styles.peek} key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.cover} alt="" width={480} height={360} loading="lazy" draggable={false} />
            </span>
          ))}
        </span>
        <span className={styles.front}><span className={styles.emboss} /></span>
      </span>
      <span className={styles.folderLabel}>
        <span className="font-display font-bold">{t(folder.title)}</span>
        <span className={styles.count}>{folder.items.length} {locale === "ru" ? "шт." : folder.items.length === 1 ? "item" : "items"}</span>
      </span>
    </button>
  );
}
