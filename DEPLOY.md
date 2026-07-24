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
is set (the prod path). Locally, it also appends to `data/waitlist.jsonl`
(gitignored) — that file write is a no-op on Vercel's read-only FS and never
errors. Swap in a managed store (Upstash/Vercel KV) later if you want a list.
