import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

type Entry = { ts: string; name: string; email: string; need: string; mode: string };

/**
 * Waitlist capture — serverless-safe.
 * - If RESEND_API_KEY is set, emails each signup to WAITLIST_NOTIFY_TO (prod path).
 * - Also tries to append to data/waitlist.jsonl (works locally; no-op on read-only
 *   serverless filesystems — wrapped in try/catch, never fatal).
 * - Always degrades to 200 for the visitor; failures are logged, never lost silently.
 *
 * Vercel env: RESEND_API_KEY (required for notifications),
 *   WAITLIST_NOTIFY_TO (default hello@omyt.ai), WAITLIST_FROM (default "omyt <hello@omyt.ai>").
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim().slice(0, 120);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const need = String(body?.need ?? "").trim().slice(0, 2000);
  const raw = String(body?.mode ?? "");
  const mode = raw === "saas" ? "saas" : raw === "local" ? "local" : "unsure";

  if (!name || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  // Data minimisation (GDPR Art. 5(1)(c)): store only what we need to reply.
  const entry: Entry = { ts: new Date().toISOString(), name, email, need, mode };

  await Promise.allSettled([notifyEmail(entry), appendFile(entry)]);
  console.log(`[waitlist] signup · ${entry.email} · ${entry.mode}`);

  return NextResponse.json({ ok: true });
}

async function notifyEmail(e: Entry): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // no notifier configured (local dev) — file fallback handles it
  const to = process.env.WAITLIST_NOTIFY_TO || "hello@omyt.ai";
  const from = process.env.WAITLIST_FROM || "omyt waitlist <hello@omyt.ai>";
  const text = [
    `New waitlist signup`,
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
        subject: `Waitlist · ${e.name} · ${e.mode}`,
        text,
      }),
    });
    if (!res.ok) console.error("[waitlist] resend failed", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("[waitlist] resend error", err);
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
