# ONI Contact System

**Status:** ACTIVE — single source of truth for lead intake  
**Supersedes for operations:** `docs/contact-layer-spec.md` (keep as historical spec; update this file first)  
**Related decisions:** `docs/DECISIONS.md` — Decision 001, DEC-009, DEC-010  
**Architecture:** `ARCHITECTURE.md` § Contact Layer Architecture

---

## Purpose

The contact system is ONI Studio’s **project inquiry intake path**. It exists so visitors on the homepage can describe a project, attach reference files, and reach the studio without a sales funnel (no budget, timeline, company size, or CRM-style fields).

Business goals:

- Capture **qualified creative leads** in one structured message.
- Notify the team **immediately** in Telegram (forum topic for triage).
- Mirror the same payload to **email** (`hello@oni.studio`) when Resend is configured.
- Keep the **marketing site static** on Cloudflare Pages while uploads and delivery run on a **dedicated Worker**.

The homepage contact block is editorial epilogue + form, not a separate product surface.

---

## Current Architecture

End-to-end flow (as deployed in code):

```
Visitor (browser)
    │
    ▼
Homepage — ContactFooterSection
    │  ProjectContactForm.tsx
    │  POST multipart/form-data
    │  env: NEXT_PUBLIC_CONTACT_API_URL
    ▼
Cloudflare Worker — oni-contact-api
    │  workers/contact/
    ├─ CORS + origin allow-list
    ├─ Rate limit (KV, per IP)
    ├─ Honeypot + field/file validation
    ├─ R2 — submissions/{uuid}/…
    ├─ Telegram Bot API — sendMessage (HTML, forum topic)
    └─ Resend API — email (parallel, if RESEND_API_KEY set)
    ▼
Future (not implemented)
    └─ CRM / analytics / queues / signed attachment URLs
```

**Channels are parallel.** Telegram does not route through email. Email does not route through Telegram.

**Production delivery gate (current code):** Worker accepts traffic when **Telegram** is configured. Email is **optional** until `isDeliveryConfigured` is tightened for production (see `delivery.ts` TODOs).

### Homepage composition (current)

After Decision 001, `/` does **not** include Capabilities:

```
Hero → Archive Fragment → Brand Identity → Showreel → Contact Layer
```

Contact anchor: `#contact` · `data-oni-section="contact"`.

---

## Repository Structure

| Path | Responsibility |
|------|----------------|
| `sections/ContactFooterSection/index.tsx` | Section shell: poster heading (“Let’s / Work / Together”), subline, composes form + direct `mailto` / Instagram + footer nav |
| `sections/ContactFooterSection/ProjectContactForm.tsx` | Client form: validation, honeypot, file list UI, `fetch` to Worker, user-facing errors |
| `workers/contact/src/index.ts` | HTTP entry: `POST /` or `/submit`, `OPTIONS` CORS, orchestration |
| `workers/contact/src/validate.ts` | Parse `FormData`, server-side field + file rules |
| `workers/contact/src/rateLimit.ts` | Per-IP counter in KV |
| `workers/contact/src/storage.ts` | R2 upload + public URL assembly |
| `workers/contact/src/delivery.ts` | Telegram HTML template, Resend email, `isDeliveryConfigured` |
| `workers/contact/src/config.ts` | Limits, MIME map, default CORS origins |
| `workers/contact/wrangler.jsonc` | Worker name, bindings, non-secret vars |
| `workers/contact/package.json` | `wrangler deploy`, `wrangler dev` |
| `workers/contact/README.md` | Short deploy checklist (points here for full ops) |
| `docs/contact-layer-spec.md` | Earlier operational spec — fields and limits align; Telegram template in repo code is authoritative |
| `.env.example` | Local Pages env example for `NEXT_PUBLIC_CONTACT_API_URL` |
| `app/page.tsx` | Composes `ContactFooterSection` on landing |

**Not in contact path:** Next.js API routes, Archive, Brandbook, navigation systems.

---

## Cloudflare Infrastructure

### Worker

| Property | Value |
|----------|--------|
| **Worker name** | `oni-contact-api` |
| **Entry** | `workers/contact/src/index.ts` |
| **Config** | `workers/contact/wrangler.jsonc` |
| **Compatibility date** | `2026-04-01` |
| **Observability** | enabled in wrangler |

**Public URL pattern:** `https://oni-contact-api.<ACCOUNT_SUBDOMAIN>.workers.dev/`  
Replace `<ACCOUNT_SUBDOMAIN>` with your Cloudflare account workers subdomain. Custom routes are optional (not in repo).

### KV namespace

| Binding | Wrangler id (production) | Purpose |
|---------|--------------------------|---------|
| `RATE_LIMIT` | `7dd40f193f714a2a98194f124c030083` | Per-IP submission count; key `rl:{ip}`; TTL = window |

If KV is missing, rate limiting is **skipped** (`checkRateLimit` returns allow).

### R2 bucket

| Binding | Bucket name | Purpose |
|---------|-------------|---------|
| `ATTACHMENTS` | `oni-contact-attachments` | Stores files under `submissions/{submissionId}/{index}-{sanitizedName}` |

Public links in Telegram/email require secret **`ATTACHMENTS_PUBLIC_BASE_URL`** (R2 public bucket URL or custom domain). Without bucket + base URL, submissions **with files** fail at storage.

### Environment variables (Wrangler `vars` — non-secret)

Set in `wrangler.jsonc` (override per environment in dashboard if needed):

| Variable | Default in repo | Purpose |
|----------|-----------------|---------|
| `CONTACT_EMAIL_TO` | `hello@oni.studio` | Resend recipient |
| `CONTACT_EMAIL_FROM` | `ONI Studio <contact@oni.studio>` | Resend sender (domain must be verified in Resend) |
| `RATE_LIMIT_MAX` | `8` | Max submissions per IP per window |
| `RATE_LIMIT_WINDOW_SEC` | `3600` | Window length (seconds) |
| `ALLOWED_ORIGINS` | *(optional secret/var)* | Comma-separated extra origins appended to defaults |

**Default CORS origins** (`config.ts`): `https://oni-studio.pages.dev`, `http://localhost:3000`, `http://127.0.0.1:3000`.

Add production custom domain via `ALLOWED_ORIGINS` or extend `DEFAULT_ALLOWED_ORIGINS` in code.

### Secrets (Wrangler — never commit)

```bash
cd workers/contact
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler secret put TELEGRAM_TOPIC_ID      # forum topic; omit only if group is not forum
wrangler secret put RESEND_API_KEY         # optional today; required for dual-channel production
wrangler secret put ATTACHMENTS_PUBLIC_BASE_URL
# Optional:
wrangler secret put ALLOWED_ORIGINS
```

| Secret | Required when | Purpose |
|--------|---------------|---------|
| `TELEGRAM_BOT_TOKEN` | Always (current gate) | Bot API auth |
| `TELEGRAM_CHAT_ID` | Always | Target supergroup/channel ID |
| `TELEGRAM_TOPIC_ID` | Forum groups | `message_thread_id` for Applications (or equivalent) topic |
| `RESEND_API_KEY` | Email delivery | Resend HTTP API |
| `ATTACHMENTS_PUBLIC_BASE_URL` | Any upload | Base URL prefix for R2 object keys |

List secrets: Cloudflare dashboard → Workers → `oni-contact-api` → Settings → Variables.

### Pages integration

| Concern | Where |
|---------|--------|
| Site deploy | Cloudflare Pages (Next.js / `@cloudflare/next-on-pages`) |
| Form endpoint | **Not** in Pages — browser calls Worker URL directly |
| Pages env var | `NEXT_PUBLIC_CONTACT_API_URL` = Worker URL (trailing slash optional) |

Build-time embedding: `ProjectContactForm` reads `process.env.NEXT_PUBLIC_CONTACT_API_URL` at build. Changing the URL requires **Pages rebuild/redeploy**.

**Local dev:** copy `.env.example` → `.env.local`, set Worker URL (use `wrangler dev` URL or deployed workers.dev).

---

## Telegram Integration

### Bot

- **Bot identity** is created in Telegram (@BotFather). The bot **display name/username is not stored in this repository**.
- Store only `TELEGRAM_BOT_TOKEN` as a Worker secret.
- Bot must be **added to the target group** with permission to post messages.
- For **forum topics**, the group must have topics enabled; create a topic (e.g. Applications) and use its thread ID.

### Forum topic workflow

1. User submits form on homepage.
2. Worker validates, optionally uploads to R2.
3. Worker calls `https://api.telegram.org/bot{token}/sendMessage` with:
   - `chat_id` = `TELEGRAM_CHAT_ID`
   - `message_thread_id` = `TELEGRAM_TOPIC_ID` (parsed as integer) when set
4. Team reads and replies inside that forum topic.

Wrong or missing `TELEGRAM_TOPIC_ID` → message goes to general chat or API error (see Troubleshooting).

### Required secrets

Minimum for Worker to accept submissions (current code): `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.

Recommended production: add `TELEGRAM_TOPIC_ID`, `ATTACHMENTS_PUBLIC_BASE_URL` (if files allowed), `RESEND_API_KEY` (when dual-channel is enforced).

### Message formatting

| Property | Value |
|----------|--------|
| `parse_mode` | `HTML` |
| Max length | 4096 chars (Telegram); long projects are truncated and reformatted |
| Timezone for display | `Europe/Moscow` (`DD.MM.YYYY HH:mm`, 24h) |

**Notification preview (first line):**

- `<b>🪙 ЗАЯВКА С САЙТА</b>` — used as Telegram lockscreen / push preview text.
- No developer markers in the message body (`oni-lead-form`, UUID, `Ref`, or similar).

**Structural elements:**

- Section separators: Unicode line `⎯⎯⎯⎯⎯⎯⦿⎯⎯⎯⎯⎯⎯`
- Labels: `<b>Имя:</b>`, `<b>Связь:</b>`, `<b>Инфа о проекте:</b>`, `<b>Файлы / ТЗ / ссылки:</b>`, `<b>Дата / Время:</b>` (blank line after each label before value)
- User content: HTML-escaped (`&`, `<`, `>`)

### Blockquote behavior (project body)

- Default: `<blockquote>{escaped project}</blockquote>`
- **Expandable** when project length ≥ 280 characters **or** more than 6 newlines: `<blockquote expandable>…</blockquote>`
- If full message exceeds 4096 chars, project text is trimmed and message rebuilt once.

### Attachment rendering

- No files: plain text `None` in the files section.
- With files: one HTML link per file — `<a href="…">filename</a>` (URLs from R2 public base + object key).
- `disable_web_page_preview: 0` (previews allowed).

### Current message template (logical)

```
🪙 ЗАЯВКА С САЙТА          ← first line; bold in HTML

⎯⎯⎯⎯⎯⎯⦿⎯⎯⎯⎯⎯⎯

Имя:

{name}

Связь:

{contact}

⎯⎯⎯⎯⎯⎯⦿⎯⎯⎯⎯⎯⎯

Инфа о проекте:

[blockquote or blockquote expandable]
{project}
[/blockquote]

⎯⎯⎯⎯⎯⎯⦿⎯⎯⎯⎯⎯⎯

Файлы / ТЗ / ссылки:

{attachment links or None}

Дата / Время:

{DD.MM.YYYY HH:mm Europe/Moscow}
```

`submissionId` appears in **email only** (Resend plain text + HTML), not in Telegram.

Email (Resend) uses a separate English plain-text + HTML layout; subject: `ONI — New project from {name}`.

---

## Form Validation Rules

### Required fields

| Field | Form name | Client | Server |
|-------|-----------|--------|--------|
| Name | `name` | 1–120 chars | same |
| Email or Telegram | `contact` | 1–200 chars | same |
| About your project | `project` | 10–8000 chars | same |

### File limits

| Rule | Value |
|------|--------|
| Max files | 5 |
| Max per file | 10 MB |
| Max total | 25 MB |
| Allowed extensions | `pdf`, `docx`, `pptx`, `jpg`, `jpeg`, `png`, `zip` |

Server also checks MIME against extension map (`config.ts`); `application/octet-stream` allowed as fallback.

### Rate limiting

| Setting | Default |
|---------|---------|
| Max requests | 8 per IP |
| Window | 3600 s (1 hour) |
| Storage | KV `RATE_LIMIT` |
| Response | HTTP 429, `"Too many requests. Try again later."` |

### Honeypot

| Field | `company` (hidden, off-screen) |
|-------|--------------------------------|
| Client | If filled, not sent as error — server returns 200 `{ "message": "Received" }` without delivery |
| Server | If `company` non-empty after trim → same silent success, no Telegram/email |

### CORS

| Method | Behavior |
|--------|----------|
| `OPTIONS` | Preflight; 204 with CORS headers if origin allowed |
| `POST` | Requires `Origin` header matching allow-list |
| Allowed methods | `POST`, `OPTIONS` |
| Allowed headers | `Content-Type` |
| Denied origin | 403 `{ "error": "Origin not allowed" }` (no CORS headers on error body) |

Browser must send requests from a listed origin (Pages URL, localhost, or `ALLOWED_ORIGINS`).

---

## Deployment Procedure

### Prerequisites

- Cloudflare account with Workers, KV, R2, Pages
- Telegram bot + group (+ forum topic ID)
- Resend account + verified sending domain (for email)
- R2 bucket public access or CDN base URL for attachments

### 1. Worker infrastructure (one-time or when bindings change)

```bash
cd workers/contact
npm install
```

Create KV if id changes:

```bash
wrangler kv namespace create RATE_LIMIT
# Paste returned id into wrangler.jsonc → kv_namespaces[0].id
```

Create R2 bucket:

```bash
wrangler r2 bucket create oni-contact-attachments
```

Configure public access for attachment URLs; note base URL for secret.

### 2. Worker secrets

```bash
cd workers/contact
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler secret put TELEGRAM_TOPIC_ID
wrangler secret put ATTACHMENTS_PUBLIC_BASE_URL
wrangler secret put RESEND_API_KEY
# Production custom domain:
wrangler secret put ALLOWED_ORIGINS
# Example value: https://oni.studio,https://www.oni.studio
```

### 3. Deploy Worker

```bash
cd workers/contact
npm run deploy
# equivalent: wrangler deploy
```

Note the deployed URL from CLI output.

### 4. Pages environment variables

In Cloudflare dashboard → Pages → project → Settings → Environment variables:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_CONTACT_API_URL` | `https://oni-contact-api.<subdomain>.workers.dev` |

Set for **Production** and **Preview** as needed.

### 5. Redeploy Pages

Trigger a new Pages deployment so the client bundle embeds the env var:

```bash
# From repo root — use your normal deploy path, e.g.:
git push
# or local:
npm run build && npx wrangler pages deploy ...
```

### 6. Telegram verification

1. Submit a test message from the homepage (no files, then with a small PNG).
2. Confirm post appears in the correct **forum topic**.
3. Check Worker logs (dashboard → Workers → `oni-contact-api` → Logs) on failure.

### 7. Production smoke test

| Step | Expect |
|------|--------|
| Open `/` → `#contact` | Form renders |
| Submit valid payload | UI: “Message sent” |
| Network tab | `POST` → 200, `{ "message": "Received" }` |
| Telegram | New HTML message in topic |
| Email (if Resend configured) | Inbox at `CONTACT_EMAIL_TO` |
| Honeypot | Fill `company` via devtools → still 200, **no** Telegram noise |
| Wrong origin | curl without allowed Origin → 403 |

---

## Troubleshooting

### “Contact service is not configured.”

| | |
|--|--|
| **Symptoms** | Client error before network request |
| **Root cause** | `NEXT_PUBLIC_CONTACT_API_URL` unset at **build** time |
| **Resolution** | Set var in Pages → redeploy site. Local: `.env.local` + restart dev server |

```tsx
// sections/ContactFooterSection/ProjectContactForm.tsx
if (!apiUrl) {
  setErrorMessage("Contact service is not configured.");
}
```

### Telegram delivery fails

| | |
|--|--|
| **Symptoms** | HTTP 502, `"Delivery failed. Please try again."`; Worker log `Telegram delivery failed: …` |
| **Root cause** | Invalid token, bot not in group, missing rights, HTML parse error, chat/topic ID wrong |
| **Resolution** | Verify secrets; test with `curl` to Bot API; check Telegram error JSON in logs; simplify test message (short project text) |

### Wrong topic ID

| | |
|--|--|
| **Symptoms** | Message in general topic, or API error `message thread not found` |
| **Root cause** | `TELEGRAM_TOPIC_ID` incorrect or group not forum-enabled |
| **Resolution** | Re-copy topic id from Telegram (forum topic link / admin tools); update `wrangler secret put TELEGRAM_TOPIC_ID` |

### Worker deploy succeeds but no messages arrive

| | |
|--|--|
| **Symptoms** | 200 from API, empty Telegram |
| **Root cause** | Honeypot filled; looking at wrong topic; different Worker env than Pages URL; delivery errors swallowed only on non-200 |
| **Resolution** | Confirm 200 body; check honeypot empty; verify `TELEGRAM_*` on **production** Worker; read real-time logs during submit |

### Missing secrets / 503

| | |
|--|--|
| **Symptoms** | HTTP 503 `{ "error": "Contact service unavailable" }` |
| **Root cause** | `isDeliveryConfigured` false — missing `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID` |
| **Resolution** | Set secrets on deployed Worker; redeploy not required after `secret put` |

### CORS issues

| | |
|--|--|
| **Symptoms** | Browser blocked request; no response body; console CORS error |
| **Root cause** | Site origin not in allow-list |
| **Resolution** | Add production URL to `ALLOWED_ORIGINS` or `DEFAULT_ALLOWED_ORIGINS`; ensure Pages uses HTTPS origin that matches exactly |

### Attachment failures

| | |
|--|--|
| **Symptoms** | 500 `"Attachment storage is not configured."` or storage error message |
| **Root cause** | R2 binding missing, or `ATTACHMENTS_PUBLIC_BASE_URL` unset, or bucket permissions |
| **Resolution** | Verify `wrangler.jsonc` R2 binding; set public base URL secret; test PUT in dashboard |

### Rate limit false positives

| | |
|--|--|
| **Symptoms** | 429 during testing |
| **Root cause** | Shared IP (office/VPN) hit `RATE_LIMIT_MAX` |
| **Resolution** | Wait for TTL; raise limit in vars temporarily; delete KV key `rl:{ip}` in dashboard |

### Email not sent (Telegram works)

| | |
|--|--|
| **Symptoms** | Telegram only |
| **Root cause** | `RESEND_API_KEY` absent — **current code allows Telegram-only** |
| **Resolution** | Set `RESEND_API_KEY`; verify domain; plan production change to require both channels (`delivery.ts` TODO) |

---

## Future Improvements

### P0 — Production hardening

- Enforce **dual-channel delivery**: `isDeliveryConfigured` = Telegram **and** Resend (`delivery.ts` TODO).
- **Resend production**: verified domain for `contact@oni.studio` (or chosen from-address).
- Add **production origin(s)** to CORS (`oni.studio` etc.).
- Document live Worker URL and topic name in team runbook (outside repo if sensitive).
- Align `docs/contact-layer-spec.md` Telegram section with HTML template or archive spec.

### P1 — Reliability

- **Queues** (Cloudflare Queue) for delivery retries after R2 upload succeeds.
- Dead-letter logging / alert on repeated `deliverSubmission` failures.
- Idempotency key header to prevent duplicate sends on client retry.
- Health check route `GET /health` (read-only, no secrets).

### P2 — Security

- **Cloudflare Turnstile** on form + Worker verification.
- **Signed R2 URLs** instead of public bucket + `ATTACHMENTS_PUBLIC_BASE_URL`.
- Stricter file content sniffing (magic bytes).
- Per-email rate limit in addition to IP.

### P3 — Integrations

- **CRM** webhook (Notion, HubSpot, custom) post-delivery.
- **Analytics** event on successful submit (privacy-preserving).
- **Lead tagging** from project text keywords or hidden UTM fields (if ever approved).
- Slack mirror optional channel.

---

## Change Log

| Date / milestone | Event |
|------------------|--------|
| **Decision 001** | Capabilities removed from homepage; contact remains final section; `#work` nav removed |
| **DEC-009** | Overlay nav: HOME · ARCHIVE · BRANDBOOK · CONTACT |
| **DEC-010** | Contact intake moved to standalone Worker `oni-contact-api`; Pages stays static |
| **Contact Layer implementation** | `ContactFooterSection` + `ProjectContactForm`; Worker validate/storage/delivery |
| **Cloudflare deployment** | KV `RATE_LIMIT`, R2 `oni-contact-attachments`, wrangler bindings in repo |
| **Telegram integration** | HTML `parse_mode`, forum `message_thread_id`, expandable blockquotes, Moscow timestamp |
| **Telegram notification header** | First line `🪙 ЗАЯВКА С САЙТА`; removed `oni-lead-form` and dev-facing header labels |
| **Dual-channel (partial)** | Resend parallel when key present; Telegram-only gate until production TODO cleared |
| **This document** | `docs/CONTACT_SYSTEM_MASTER.md` established as operational SSOT |

---

## Quick reference

| Item | Value |
|------|--------|
| Worker name | `oni-contact-api` |
| Pages env | `NEXT_PUBLIC_CONTACT_API_URL` |
| Worker secrets | `TELEGRAM_*`, `RESEND_API_KEY`, `ATTACHMENTS_PUBLIC_BASE_URL`, optional `ALLOWED_ORIGINS` |
| Email to | `hello@oni.studio` |
| Honeypot field | `company` |
| Submit paths | `POST /`, `POST /submit` |

**Operator rule:** Change behavior in `workers/contact/` and redeploy Worker; change form UI in `ProjectContactForm.tsx` and redeploy Pages; never commit secrets.
