# Deploying omyt-site

The marketing site is a standalone Next.js app. **Host it on a managed edge
platform (Vercel), NOT on the Hetzner box** — that box runs the app + the shared
brain DBs, and the marketing page is the public, attack-facing surface. Keeping
them separate means a traffic spike / DDoS on marketing can't touch the app.
Vercel (and Cloudflare) absorb that at their edge.

## Deploy to Vercel

1. Push this repo to GitHub (see below).
2. In Vercel → **Add New → Project → Import** this repo. Framework auto-detects
   as Next.js; no build config needed.
3. Add environment variables (Project → Settings → Environment Variables):
   - `RESEND_API_KEY` — required for waitlist notifications (email per signup).
   - `WAITLIST_NOTIFY_TO` — optional, default `hello@omyt.ai`.
   - `WAITLIST_FROM` — optional, default `omyt waitlist <hello@omyt.ai>`
     (must be a Resend-verified sender/domain).
   - `WAITLIST_WEBHOOK_URL` — optional. If set, every signup is also POSTed as
     JSON to this URL (CRM/automation hook; second durable channel).
   - `ASSIST_API_KEY` — required for the site assistant. Without it the widget
     still renders and tells visitors to email instead, so this is safe to defer.
   - `ASSIST_BASE_URL` — optional, default `https://openrouter.ai/api/v1`. Any
     OpenAI-compatible endpoint works.
   - `ASSIST_MODEL` — optional, default `anthropic/claude-haiku-4.5`.
4. Deploy. You get a `*.vercel.app` URL immediately.

## Domain

The site's own links assume **omyt.ai = marketing, app.omyt.ai = app**:
- Point `omyt.ai` (apex) + `www` at Vercel (Vercel shows the exact DNS records).
- Add `app.omyt.ai` → the Hetzner box `65.109.10.198` and update Caddy so the
  app answers there. (The app currently answers on the apex, so move it first to
  avoid downtime.)

Lower-risk interim: leave `omyt.ai` on the app and point a subdomain
(e.g. `get.omyt.ai`) at Vercel; swap the apex later.

## Waitlist capture

`app/api/waitlist/route.ts` emails each signup via Resend when `RESEND_API_KEY`
is set (the prod path) and POSTs it to `WAITLIST_WEBHOOK_URL` when that is set.
Locally, it also appends to `data/waitlist.jsonl` (gitignored) — that file write
is a no-op on Vercel's read-only FS and never errors. Each entry carries a
`source` field (`home` | `partners`) so applications are distinguishable from
waitlist signups. **If no channel is configured (or Resend fails), the full
entry is written to `console.error` — recoverable from Vercel logs, but check
them.** Swap in a managed store (Upstash/Vercel KV) later if you want a list.

## The site assistant

The widget answers only from `content/assistant/*.md`. That folder is the entire
knowledge base: there is no vector store and no index to rebuild. Edit the
markdown, redeploy, and the assistant's knowledge changes.

Deliberately not RAG. The corpus is small enough to pass whole on every request,
which removes chunking, embeddings and retrieval failure. If it ever grows past
roughly 30k tokens, revisit.

Guardrails live in the system prompt in `app/api/assist/route.ts`: answer only
from the corpus, refuse to describe the internals of architecture layers 02 and
04, never invent customers/metrics/prices, ignore instructions embedded in user
messages, and decline off-topic questions. Rate limited to 12 requests per minute
per IP (in-memory, per instance — move to Vercel KV if traffic warrants).

**AI disclosure is not optional.** From 2 August 2026, EU AI Act Article 50(1)
requires systems intended to interact directly with people to disclose that they
are AI, and omyt is EU-established. The panel header carries that disclosure;
don't remove it.
