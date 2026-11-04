"use client";

// Finder / work-inspector flow adapted from German Virre (@mnzrrr), with permission.
// Source revision and adaptation notes: THIRD_PARTY_NOTICES.md.
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Folder,
  Grid2X2, List, Maximize2, Minimize2, Minus, Search, X, RotateCcw } from "lucide-react";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "@/systems/i18n/LocaleProvider";
import { useDocumentScrollLock } from "@/systems/useDocumentScrollLock";
import { FolderCard } from "./FolderCard";
import type { FolderProject, ProjectFolder, ProjectMedia as Media } from "./types";
import styles from "./folders.module.css";

type View = { folder: string | null; project: string | null };
const closed: View = { folder: null, project: null };

function MediaView({ media, project }: { media: Media; project: FolderProject }) {
  const { t } = useLocale();
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const el = video.current;
    if (el) {
      // Restore the source after React Strict Mode's setup/cleanup probe.
      if (el.getAttribute("src") !== media.src) el.src = media.src;
      el.play().catch((error: DOMException) => {
        if (error.name === "NotAllowedError") { el.muted = true; el.play().catch(() => {}); }
      });
    }
    return () => { if (el) { el.pause(); el.removeAttribute("src"); el.load(); } };
  }, [attempt, media.src]);
  if (failed) return <div className={styles.mediaError} role="status">
    <p>{t("Media unavailable")}</p>
    <button type="button" className={styles.command} onClick={() => { setFailed(false); setAttempt((n) => n + 1); }}>
      <RotateCcw size={16} />{t("Retry")}
    </button>
  </div>;
  return media.kind === "video" ? (
    <video key={attempt} ref={video} src={media.src} poster={project.cover} controls autoPlay loop playsInline
      preload="metadata" aria-label={project.title} onError={() => setFailed(true)} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img key={attempt} src={media.src} alt={project.title} draggable={false} onError={() => setFailed(true)} />
  );
}

function Tool({ label, onClick, children, disabled = false, pressed }: {
  label: string; onClick: () => void; children: ReactNode; disabled?: boolean; pressed?: boolean;
}) {
  return <button type="button" title={label} aria-label={label} aria-pressed={pressed}
    onClick={onClick} disabled={disabled} className={styles.tool}>{children}</button>;
}

export function ProjectDesk({ folders }: { folders: ProjectFolder[] }) {
  const { locale, t } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>(closed);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [list, setList] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const session = useRef(`oni-${Math.random().toString(36).slice(2)}`);
  const opener = useRef<HTMLElement | null>(null);
  const lastProject = useRef<string | null>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const finder = useRef<HTMLDivElement>(null);
  const inspector = useRef<HTMLDivElement>(null);
  const inspectorContent = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const folder = folders.find((item) => item.id === view.folder);
  const project = folder?.items.find((item) => item.id === view.project);
  const modalOpen = Boolean(folder) && !minimized;

  useDocumentScrollLock(modalOpen, { blockTouchMove: false });

  useEffect(() => {
    setMounted(true);
    const readLocation = () => {
      const url = new URL(location.href);
      const f = folders.find((item) => item.id === url.searchParams.get("folder"));
      const p = f?.items.find((item) => item.id === url.searchParams.get("project"));
      if (f && !opener.current) opener.current = document.querySelector<HTMLElement>(`[data-folder-id="${f.id}"]`);
      setView(f ? { folder: f.id, project: p?.id ?? null } : closed);
      setMinimized(false);
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
  }, [folders]);

  const navigate = useCallback((next: View, replace = false) => {
    const url = new URL(location.href);
    for (const key of ["folder", "project"] as const) {
      if (next[key]) url.searchParams.set(key, next[key]!); else url.searchParams.delete(key);
    }
    url.hash = "projects";
    const previous = history.state?.oniDesk;
    const canBack = !replace || (previous?.session === session.current && previous.canBack === true);
    const state = { ...history.state, oniDesk: { session: session.current, project: Boolean(next.project), canBack } };
    if (replace) history.replaceState(state, "", url); else history.pushState(state, "", url);
    setView(next); setMinimized(false);
  }, []);

  const closeTop = useCallback(() => {
    if (document.fullscreenElement) return;
    const own = history.state?.oniDesk;
    if (own?.session === session.current && own.canBack && own.project === Boolean(project)) history.back();
    else navigate(project ? { folder: folder!.id, project: null } : closed, true);
  }, [folder, project, navigate]);

  useEffect(() => { setMediaIndex(0); setExpanded(false); }, [view.project]);
  useEffect(() => { setQuery(""); setExpanded(false); }, [view.folder]);
  useEffect(() => { inspectorContent.current?.scrollTo({ top: 0 }); }, [view.project, mediaIndex, expanded]);

  useEffect(() => {
    if (!modalOpen || !mounted) return;
    const siblings = Array.from(document.body.children).filter((el): el is HTMLElement =>
      el instanceof HTMLElement && el !== desktop.current && !["SCRIPT", "STYLE"].includes(el.tagName));
    const previous = siblings.map((el) => el.inert);
    siblings.forEach((el) => { el.inert = true; });
    return () => {
      siblings.forEach((el, index) => { el.inert = previous[index]; });
      opener.current?.focus({ preventScroll: true });
    };
  }, [modalOpen, mounted]);

  useEffect(() => {
    if (finder.current) finder.current.inert = Boolean(project);
    if (!modalOpen) return;
    const win = project ? inspector.current : finder.current;
    const selected = !project && lastProject.current
      ? win?.querySelector<HTMLButtonElement>(`[data-project-id="${lastProject.current}"]`) : null;
    (selected ?? win?.querySelector<HTMLButtonElement>("button"))?.focus({ preventScroll: true });
  }, [view.folder, view.project, modalOpen, project]);

  const moveMedia = useCallback((step: number) => {
    if (project) setMediaIndex((index) => (index + step + project.media.length) % project.media.length);
  }, [project]);

  useEffect(() => {
    if (!modalOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.fullscreenElement) { event.preventDefault(); event.stopPropagation(); closeTop(); }
      if (event.key === "Tab") {
        const win = project ? inspector.current : finder.current;
        const controls = Array.from(win?.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], input, video[controls]") ?? [])
          .filter((el) => el.offsetParent !== null);
        if (!controls.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (!win?.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last)) {
          event.preventDefault(); first.focus();
        } else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      }
      const target = event.target as HTMLElement;
      if (project && project.media.length > 1 && !target.closest("input, video")) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault(); event.stopPropagation(); moveMedia(event.key === "ArrowRight" ? 1 : -1);
        }
      }
    };
    window.addEventListener("keydown", keydown, true);
    return () => window.removeEventListener("keydown", keydown, true);
  }, [modalOpen, project, closeTop, moveMedia]);

  const openProject = (item: FolderProject) => {
    lastProject.current = item.id;
    navigate({ folder: folder!.id, project: item.id });
  };
  const projectIndex = folder?.items.findIndex((item) => item.id === project?.id) ?? -1;
  const moveProject = (step: number) => {
    const next = folder?.items[projectIndex + step];
    if (next) { lastProject.current = next.id; navigate({ folder: folder!.id, project: next.id }, true); }
  };
  const matches = folder?.items.filter((item) =>
    `${item.title} ${t(item.title)} ${item.creator ?? ""}`.toLowerCase().includes(query.toLowerCase())) ?? [];
  const media = project?.media[mediaIndex] ?? project?.media[0];
  const description = project && locale === "ru" ? project.descriptionRu ?? t(project.description) : project?.description;

  const titlebar = (title: string, close: () => void) => <div className={styles.titlebar}>
    <div className={styles.windowControls}>
      <Tool label={t("Close")} onClick={close}><X size={12} /></Tool>
      <Tool label={t("Minimize")} onClick={() => setMinimized(true)}><Minus size={12} /></Tool>
      <Tool label={t(expanded ? "Restore size" : "Maximize")} onClick={() => setExpanded((value) => !value)}>
        {expanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
      </Tool>
    </div>
    <span className={styles.windowTitle}>{title}</span>
    <Folder size={15} aria-hidden="true" />
  </div>;

  return <>
    <div className={styles.folders} data-folder-grid>
      {folders.map((item) => <FolderCard key={item.id} folder={item} onOpen={(f, el) => {
        opener.current = el; lastProject.current = null; navigate({ folder: f.id, project: null });
      }} />)}
    </div>
    {mounted && folder && createPortal(
      <div ref={desktop} className={`${styles.desktop} ${minimized ? styles.minimized : ""}`} data-project-desk
        onClick={(event) => { if (event.target === event.currentTarget && !minimized) closeTop(); }}>
        {minimized ? <button className={styles.restore} onClick={() => setMinimized(false)} type="button" title={t("Restore window")}
          aria-label={`${t("Restore window")}: ${t(folder.title)}`}>
          <Folder size={19} /><span>{t(folder.title)}</span><Maximize2 size={14} />
        </button> : <>
          <div ref={finder} className={`${styles.window} ${styles.finder} ${project ? styles.behind : ""} ${expanded && !project ? styles.expanded : ""}`}
            role="dialog" aria-modal={!project || undefined} aria-hidden={Boolean(project)} aria-label={t(folder.title)}>
            {titlebar(t(folder.title), closeTop)}
            <div className={styles.toolbar}>
              <div className={styles.breadcrumb}><Folder size={17} /><span>{t(folder.title)}</span>
                <span className={styles.count}>{folder.items.length}</span></div>
              <div className={styles.viewModes} role="group" aria-label={t("View")}>
                <Tool label={t("Grid view")} onClick={() => setList(false)} pressed={!list}><Grid2X2 size={16} /></Tool>
                <Tool label={t("List view")} onClick={() => setList(true)} pressed={list}><List size={17} /></Tool>
              </div>
              <label className={styles.search}><Search size={15} aria-hidden="true" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search")}
                  aria-label={t("Search projects")} type="search" /></label>
            </div>
            <div className={`${styles.files} ${list ? styles.list : ""}`}>
              {matches.map((item) => <button key={item.id} type="button" className={styles.file}
                data-project-id={item.id} onClick={() => openProject(item)}>
                <span className={styles.fileImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.cover} alt="" loading="lazy" draggable={false} width={240} height={180} />
                </span>
                <span className={styles.fileTitle}>{t(item.title)}</span>
                {list && <><span className={styles.fileCreator}>{item.creator}</span><span className={styles.fileYear}>{item.year}</span></>}
              </button>)}
              {!matches.length && <p className={styles.empty}>{t("Nothing found")}</p>}
            </div>
            <div className={styles.statusbar}>{matches.length} / {folder.items.length}<span>ONI</span></div>
          </div>
          {project && media && <div ref={inspector} className={`${styles.window} ${styles.inspector} ${expanded ? styles.expanded : ""}`}
            role="dialog" aria-modal="true" aria-label={t(project.title)}>
            {titlebar(t(project.title), closeTop)}
            <div className={styles.toolbar}>
              <Tool label={t("Back to folder")} onClick={closeTop}><ArrowLeft size={18} /></Tool>
              <span className={styles.location}>{t(folder.title)}<span>/</span>{t(project.title)}</span>
              <div className={styles.projectNavigation}>
                <Tool label={t("Previous project")} onClick={() => moveProject(-1)} disabled={projectIndex === 0}><ChevronLeft size={18} /></Tool>
                <Tool label={t("Next project")} onClick={() => moveProject(1)} disabled={projectIndex === folder.items.length - 1}><ChevronRight size={18} /></Tool>
              </div>
            </div>
            <div ref={inspectorContent} className={styles.inspectorContent}>
              <div className={styles.preview}>
                <div className={styles.mediaStage}
                  onTouchStart={(event) => { if (media.kind === "image") touchX.current = event.touches[0].clientX; }}
                  onTouchEnd={(event) => {
                    if (touchX.current === null) return;
                    const delta = event.changedTouches[0].clientX - touchX.current; touchX.current = null;
                    if (Math.abs(delta) > 48) moveMedia(delta < 0 ? 1 : -1);
                  }}>
                  <MediaView key={media.src} media={media} project={project} />
                </div>
                <div className={styles.mediaToolbar}>
                  {project.media.length > 1 && <div className={styles.mediaNavigation}>
                    <Tool label={t("Previous image")} onClick={() => moveMedia(-1)}><ArrowLeft size={16} /></Tool>
                    <span>{mediaIndex + 1} / {project.media.length}</span>
                    <Tool label={t("Next image")} onClick={() => moveMedia(1)}><ArrowRight size={16} /></Tool>
                  </div>}
                  <a className={styles.tool} href={media.src} target="_blank" rel="noopener noreferrer"
                    title={t("Open original")} aria-label={t("Open original")}><ArrowUpRight size={17} /></a>
                </div>
              </div>
              <aside className={styles.details}>
                <h3 className="font-display font-bold">{t(project.title)}</h3>
                {description && <p className={styles.description}>{description}</p>}
                <dl>
                  {project.creator && <div><dt>{t("Created by")}</dt><dd>{project.creator}</dd></div>}
                  <div><dt>{t("Year")}</dt><dd>{project.year}</dd></div>
                  <div><dt>{t("Folder")}</dt><dd>{t(folder.title)}</dd></div>
                </dl>
                {project.caseHref && <a className={styles.caseLink} href={project.caseHref}>
                  {t("View full case")}<ArrowUpRight size={16} /></a>}
              </aside>
            </div>
          </div>}
        </>}
      </div>, document.body)}
  </>;
}
