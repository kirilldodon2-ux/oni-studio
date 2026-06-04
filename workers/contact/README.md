# oni-contact-api

Cloudflare Worker for ONI Studio project inquiries.

## Setup

```bash
cd workers/contact
npm install
```

1. Create KV namespace: `wrangler kv namespace create RATE_LIMIT` — paste id into `wrangler.jsonc`.
2. Create R2 bucket `oni-contact-attachments` (dashboard or `wrangler r2 bucket create`).
3. Configure public access or custom domain for attachment URLs → `ATTACHMENTS_PUBLIC_BASE_URL` secret.
4. Set secrets:

```bash
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put TELEGRAM_CHAT_ID
wrangler secret put TELEGRAM_TOPIC_ID
wrangler secret put RESEND_API_KEY
wrangler secret put ATTACHMENTS_PUBLIC_BASE_URL
```

5. Deploy: `npm run deploy`

6. Add `NEXT_PUBLIC_CONTACT_API_URL` to the Pages project (same Worker URL).

See `docs/contact-layer-spec.md` for full architecture.
