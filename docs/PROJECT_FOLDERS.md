# Project Folders

## Ownership

- `content/projectFolders.ts`: six authored folders, all 32 archive projects and
  PUNCH, readable presentation titles/descriptions and explicit gallery paths.
- Existing archive and case registries retain media paths and creator authority.
- `FolderCard.tsx`: original @mnzrrr silhouette/peek/drag behavior adapted to React.
- `ProjectDesk.tsx`: Finder and inspector, history, focus, media and window state.
- `folders.module.css`: monochrome translucent polyurethane, static grain,
  embossed original SVG mark, scoped local blur and soft object shadows.
- `public/project-previews/`: small original-video stills and image thumbnails;
  no generated substitute artwork. Originals stay in R2.
- Attribution and reviewed source revision: `THIRD_PARTY_NOTICES.md`.

## Runtime

Homepage: Hero -> Showreel -> folders -> brandbook band -> CTA/footer.
Folders are large 3-column objects on desktop, 2-column on tablet and full-width
on phones. Mouse drag starts after a small threshold; touch requires a 280ms
hold so normal page scrolling remains native. Positions reset on resize.

Click/tap opens a Finder window. Search matches title/translated title/creator;
grid/list controls work. Clicking a project opens an inspector with attribution,
video/image gallery and original-file link. PUNCH also links to its full case.
Maximize, minimize/restore, previous/next project and media controls are functional.

Only the current media element exists. Closing, switching or minimizing pauses
video and releases src. Autoplay tries sound after a user action, with muted
fallback if the browser rejects it. Errors have a retry control. No videos or
full-size archive images are loaded by the folder cards or Finder icons.

Window state is reflected in `?folder=id&project=id#projects`. Back/Forward restores
it; closing a directly opened link stays on ONI. Existing query options are kept.
The canonical remains `/`; this is not multilingual SEO or a new page per query.

The portal owns z-60. Background children are inert only while a window is open;
previous inert values and opener focus restore on close/minimize. Keyboard focus
is trapped in the top window. Escape closes one layer. Inner scroll uses the
existing document lock with blockTouchMove=false. Ambient canvases subscribe to
that lock and stop behind a modal; selected project video is not an ambient loop.

## Compatibility And QA

Menu exposes HOME, PROJECTS, BRANDBOOK, CONTACT. `/archive` is an Edge 308 redirect
to `/#projects`. Archive object detail routes, Works and full cases remain, so
published links are not broken. Sitemap contains 38 non-redirected pages.

Before publishing, verify 1440x900, 390x844, 320x568 and 844x390:
folder dragging without accidental opening, native mobile page/file-grid scroll,
search/list/grid, PUNCH, 4NWAY video and gallery, video disposal, minimize/restore,
maximized bounds, keyboard focus, browser Back, direct links and global EN/RU.
Keep original hero/showreel motion and the original social preview intact.
