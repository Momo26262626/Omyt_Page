import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

type Entry = {
  ts: string;
  name: string;
  email: string;
  need: string;
  mode: string;
  source: string;
};

/**
 * Invite-request capture — serverless-safe.
 * - If RESEND_API_KEY is set, emails each signup to WAITLIST_NOTIFY_TO (prod path).
 * - If WAITLIST_WEBHOOK_URL is set, also POSTs the entry there (CRM/automation hook).
 * - Also tries to append to data/waitlist.jsonl (works locally; no-op on read-only
 *   serverless filesystems — wrapped in try/catch, never fatal).
 * - Always degrades to 200 for the visitor. If NO durable channel is configured the
 *   full entry is written to console.error so it is recoverable from Vercel logs.
 *
 * Vercel env: RESEND_API_KEY (required for notifications),
 *   WAITLIST_NOTIFY_TO (default hello@omyt.ai), WAITLIST_FROM (default "omyt <hello@omyt.ai>"),
 *   WAITLIST_WEBHOOK_URL (optional).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = String(body?.name ?? "")
    .trim()
    .slice(0, 120);
  const email = String(body?.email ?? "")
    .trim()
    .slice(0, 200);
  const need = String(body?.need ?? "")
    .trim()
    .slice(0, 2000);
  const raw = String(body?.mode ?? "");
  const mode = raw === "saas" ? "saas" : raw === "local" ? "local" : "unsure";
  const rawSource = String(body?.source ?? "");
  const source = rawSource === "partners" ? "partners" : rawSource === "home" ? "home" : "unknown";

  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // Data minimisation (GDPR Art. 5(1)(c)): store only what we need to reply.
  const entry: Entry = { ts: new Date().toISOString(), name, email, need, mode, source };

  await Promise.allSettled([notifyEmail(entry), notifyWebhook(entry), appendFile(entry)]);
  console.log(`[waitlist] signup · ${entry.email} · ${entry.mode} · ${entry.source}`);

  return NextResponse.json({ ok: true });
}

async function notifyEmail(e: Entry): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // In prod this means the signup exists ONLY in this log line — keep it recoverable.
    console.error("[waitlist] RESEND_API_KEY not set — entry:", JSON.stringify(e));
    return;
  }
  const to = process.env.WAITLIST_NOTIFY_TO || "hello@omyt.ai";
  const from = process.env.WAITLIST_FROM || "omyt waitlist <hello@omyt.ai>";
  const label = e.source === "partners" ? "Design-partner application" : "Invite request";
  const text = [
    `${label} (${e.source})`,
    ``,
    `Name:  ${e.name}`,
    `Email: ${e.email}`,
    `Run:   ${e.mode}`,
    ``,
    `Need:`,
    e.need || "(none given)",
    ``,
    `— ${e.ts}`,
  ].join("\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: e.email,
        subject: `${label} · ${e.name} · ${e.mode}`,
        text,
      }),
    });
    if (!res.ok)
      console.error(
        "[waitlist] resend failed — entry:",
        res.status,
        JSON.stringify(e),
        await res.text().catch(() => ""),
      );
  } catch (err) {
    console.error("[waitlist] resend error — entry:", JSON.stringify(e), err);
  }
}

async function notifyWebhook(e: Entry): Promise<void> {
  const url = process.env.WAITLIST_WEBHOOK_URL;
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(e),
    });
    if (!res.ok) console.error("[waitlist] webhook failed", res.status, JSON.stringify(e));
  } catch (err) {
    console.error("[waitlist] webhook error — entry:", JSON.stringify(e), err);
  }
}

async function appendFile(e: Entry): Promise<void> {
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "waitlist.jsonl"), `${JSON.stringify(e)}\n`, "utf8");
  } catch {
    // read-only filesystem (serverless) — expected; notifyEmail is the prod path.
  }
}
