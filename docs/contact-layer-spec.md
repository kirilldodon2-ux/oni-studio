# Contact Layer — Specification

**Status:** ACTIVE  
**Scope:** Homepage contact section + `oni-contact-api` Cloudflare Worker

---

## Purpose

The Contact Layer is the final homepage section. It lets visitors submit a project inquiry with optional attachments. Submissions are delivered in parallel to Telegram (forum topic) and email (`hello@oni.studio`) without manual forwarding between channels.

The layer must not read as a marketing funnel: no budget, timeline, company, or lead-gen fields.

---

## Homepage composition

After Decision 001 (Capabilities removed):

```
Hero → Archive Fragment → Brand Identity → Showreel → Contact Layer
```

Contact section: `sections/ContactFooterSection/` · anchor `#contact` · `data-oni-section="contact"`.

---

## UI

| Element | Implementation |
|---------|----------------|
| Headline | Poster stack: Let's / Work / Together (`ContactFooterSection`) |
| Subline | “Tell us about your project.” |
| Form | `ProjectContactForm.tsx` |
| CTA | “Send message” (uppercase tracking, opacity hover) |
| Footer | Direct links + site nav (WORKS → `/works`) |

Typography and spacing follow existing ONI tokens (`max-w-oni-contact`, `SectionContainer` padding cadence).

---

## Form fields

| Field | Name | Required | Limits |
|-------|------|----------|--------|
| Name | `name` | yes | 1–120 chars |
| Email or Telegram | `contact` | yes | 1–200 chars |
| About your project | `project` | yes | 10–8000 chars |
| Attach files | `files` (multi) | no | see uploads |
| Honeypot | `company` (hidden) | — | must be empty |

---

## File uploads

**Allowed:** pdf, docx, pptx, jpg, jpeg, png, zip  

**Limits:**

- Max 5 files
- Max 10 MB per file
- Max 25 MB total

**Client:** compact list UI (filename + size + remove), not enterprise dropzone.  
**Server:** extension + MIME check, size check, store in R2 under `submissions/{uuid}/`.

Public links use `ATTACHMENTS_PUBLIC_BASE_URL` + object key (R2 public bucket or custom domain).

---

## Architecture

```
Browser (ProjectContactForm)
    │  POST multipart/form-data
    ▼
Cloudflare Worker (oni-contact-api)
    ├─ validate + rate limit + honeypot
    ├─ R2: store attachments (if any)
    ├─ Telegram Bot API → forum topic (parallel)
    └─ Resend API → hello@oni.studio (parallel)
```

Telegram does **not** route through email. Email does **not** route through Telegram.

---

## Worker (`workers/contact/`)

| Path | Methods |
|------|---------|
| `/` or `/submit` | `POST` (submit), `OPTIONS` (CORS preflight) |

### Bindings

| Binding | Purpose |
|---------|---------|
| `RATE_LIMIT` (KV) | Per-IP request counting |
| `ATTACHMENTS` (R2) | Uploaded files |

### Secrets (Wrangler)

| Secret | Purpose |
|--------|---------|
| `TELEGRAM_BOT_TOKEN` | Bot API |
| `TELEGRAM_CHAT_ID` | Group / supergroup ID |
| `TELEGRAM_TOPIC_ID` | Forum topic (e.g. Applications) |
| `RESEND_API_KEY` | Transactional email |
| `ATTACHMENTS_PUBLIC_BASE_URL` | Base URL for attachment links in messages |

### Vars (`wrangler.jsonc`)

| Var | Default |
|-----|---------|
| `CONTACT_EMAIL_TO` | `hello@oni.studio` |
| `CONTACT_EMAIL_FROM` | `ONI Studio <contact@oni.studio>` |
| `RATE_LIMIT_MAX` | `8` |
| `RATE_LIMIT_WINDOW_SEC` | `3600` |
| `ALLOWED_ORIGINS` | optional comma-separated extra origins |

CORS defaults: `https://oni-studio.pages.dev`, `http://localhost:3000`.

---

## Telegram message format

```
NEW PROJECT

Name:
{name}

Contact:
{contact}

Project:
{description}

Attachments:
{links or None}

Timestamp:
{ISO8601}

Ref: {submissionId}
```

`message_thread_id` set when `TELEGRAM_TOPIC_ID` is configured (forum topic).

---

## Email

Same information as Telegram: plain text + simple HTML via Resend. Subject: `ONI — New project from {name}`.

---

## Security

| Control | Detail |
|---------|--------|
| Rate limiting | KV per IP (`RATE_LIMIT_MAX` / hour) |
| Honeypot | Hidden `company` — bots get fake 200 |
| Validation | Field length, file count, MIME, size |
| CORS | Allow-list only |
| Origin | No cookies / session required |

---

## Frontend env

```bash
NEXT_PUBLIC_CONTACT_API_URL=https://oni-contact-api.<account>.workers.dev/
```

Must match a CORS-allowed origin’s target Worker URL (trailing slash optional).

---

## Error states

| Case | HTTP | User message |
|------|------|----------------|
| Validation | 400 | Specific field error |
| Rate limit | 429 | Try again later |
| Origin denied | 403 | (browser CORS failure) |
| Storage / delivery | 502 / 500 | Generic retry message |
| Misconfigured worker | 503 | Service unavailable |
| Missing `NEXT_PUBLIC_CONTACT_API_URL` | — | “Contact service is not configured.” |

---

## Success state

- HTTP 200 `{ "message": "Received" }`
- UI: “Message sent” + option to send another
- Form reset, attachments cleared

---

## Deployment checklist

1. Create R2 bucket `oni-contact-attachments` (public read or signed URL worker — current spec uses public base URL).
2. Create KV namespace for rate limiting; set id in `wrangler.jsonc`.
3. Set Worker secrets (`wrangler secret put …`).
4. `cd workers/contact && npm install && npm run deploy`
5. Set `NEXT_PUBLIC_CONTACT_API_URL` in Cloudflare Pages project env.
6. Verify Resend domain for `CONTACT_EMAIL_FROM`.
7. Add bot to Telegram group; enable topics; set topic ID for Applications.

---

## Related decisions

- **Decision 001** — Capabilities removed from production (`docs/DECISIONS.md`)
- **DEC-009** — Nav overlay after Capabilities removal
- **DEC-010** — Contact Layer in dedicated Cloudflare Worker
- **ARCHITECTURE.md** — § Contact Layer Architecture
