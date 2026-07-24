import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/**
 * Waitlist capture. Appends each signup to data/waitlist.jsonl and logs it.
 * Degrades safely (still 200 for the visitor if the write fails).
 * OWNER: wire this to email/CRM (Resend, etc.) for production notifications.
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

  const entry = {
    ts: new Date().toISOString(),
    name,
    email,
    need,
    mode,
    ua: req.headers.get("user-agent") ?? "",
  };

  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "waitlist.jsonl"), `${JSON.stringify(entry)}\n`, "utf8");
  } catch (err) {
    // Never lose the signal silently — surface it in the server log.
    console.error("[waitlist] persist failed", err, entry);
  }
  console.log(`[waitlist] signup · ${entry.email} · ${entry.mode}`);

  return NextResponse.json({ ok: true });
}
