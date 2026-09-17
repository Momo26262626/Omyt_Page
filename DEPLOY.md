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

## Story video line per-variant landing pages (PR 9, 2026-09-17)

`app/v/[token]/route.ts` serves a static, deterministic HTML page per
short-form video variant, keyed by its publish link token. `app/api/v/[token]/go/route.ts`
is the same page's CTA target: it records a click and 302s to the real
destination URL, forwarding `?omyt_lt=<token>`. The OMYT app (a sibling repo,
`server/studio/video-production/story-landing.ts`) builds and exports the
HTML + `data/story-landing/index.json` entries; this repo only serves what
it's given and never generates copy itself.

**Storage decision (no new vendor):** this project has no database, KV store
or log drain provisioned (same as the waitlist feature above). Recording
clicks/views durably would need one. Per the story-video-line plan's own
explicit instruction for this exact situation, that part is **stopped**
rather than adding a new vendor unprompted:
- Every page view / CTA click is always logged via `console.log`
  (`lib/story-events.ts`) — visible in Vercel's function logs, best-effort,
  not a database.
- `STORY_EVENTS_SINK_URL` (+ optional `STORY_EVENTS_SINK_TOKEN`) — if set,
  every event is also POSTed there as JSON. Point it at any HTTP endpoint you
  already control (mirrors `WAITLIST_WEBHOOK_URL` above); this is not a new
  vendor, just an optional pointer.
- `STORY_EVENTS_SINK_READ_URL` — if your sink also exposes a read/query
  endpoint, point this at it and `GET /api/v/events` will proxy real
  aggregated counts back to the desktop app. Without it, that endpoint
  honestly reports `{available:false}` rather than fabricating zero counts.
- `STORY_EVENTS_READ_TOKEN` — **required** for `/api/v/events` to serve
  anything at all (it fails closed with 503 if unset, 401 on a wrong/missing
  bearer token). The OMYT app's own `STORY_EVENTS_READ_URL`/
  `STORY_EVENTS_READ_TOKEN` (`server/studio/video-production/story-metrics.ts`)
  must match.

**Apex domain status (found 2026-09-17, unresolved — owner action needed):**
this doc has always said "the app currently answers on the apex," but as of
this PR, `curl -I https://omyt.ai` and `https://www.omyt.ai` do not serve
this repo's build at all — the page title/meta copy returned matches neither
this repo's current `app/layout.tsx` nor any commit in its git history
(`www.omyt.ai` also CNAMEs to an unrelated third-party hostname,
`custom-domains.chatgpt.site.`, that nothing in this repo or its docs
references). `app.omyt.ai` resolves straight to the Hetzner box
(`65.109.10.198`) and its Caddy redirects to `https://omyt.ai` — the reverse
of what this doc recommends. No Vercel deployment for this project could be
located (no `.vercel` directory, no discoverable `*.vercel.app` URL, no
Vercel CLI/token in this environment to query the account directly). This
means: (1) it's unverified whether this repo has ever actually been deployed
to Vercel per the steps above; (2) whatever currently serves the apex is not
this codebase. Fixing DNS/Vercel project binding is an account-level action
only the owner can complete (Vercel dashboard "Domains" + the domain
registrar) — flagged here rather than guessed at or silently worked around.
