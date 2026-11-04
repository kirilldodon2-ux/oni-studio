# Language And Icons

## Language

- English is the server-rendered default, regardless of browser language.
- The global header offers EN/RU on every page. `LocaleProvider` persists a
  deliberate choice under `oni.locale`; it survives route changes and reloads.
  Switching still works when localStorage is unavailable.
- `LocalizedText` renders explicit React translations from `messages.ts`.
  There is no DOM replacement, automatic translation API, or routing rewrite.
- Brandbook English prose is translated from its original Russian copy.
  Designed bilingual headings, font specimens, proper names, handles and text
  baked into project artwork retain their authored form.
- Archive Russian descriptions are concise editorial descriptions stored by
  stable slug in `archiveDescriptions.ts`. Original English registry copy stays.
- `<html lang>` follows the selected reading language after hydration.

## Search Scope

Published URLs, sitemap and canonical metadata remain English-first. The client
language preference is not a second indexed site and does not add hreflang.
Separately indexed Russian pages need a later `/ru/...` route/metadata rollout;
do not advertise that as already complete.

## Icons

- `public/icon.svg` reuses the original mark from `public/logo/oni_logo_black.svg`,
  with a dark-tab color override. The source logo is not edited.
- PNG sizes in `public/icons/` are exports of the same mark on white, not new art.
- `public/favicon.ico` and `public/apple-icon.png` are the browser and touch variants.
- Root metadata links the static files explicitly. Do not move them into `app/`:
  the production next-on-pages adapter rejects generated icon routes as non-edge.
- The large social preview remains the user-supplied image in `public/social/`.
