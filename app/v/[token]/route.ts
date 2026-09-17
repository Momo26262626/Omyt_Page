import { NextResponse } from "next/server";
import { isSafeStoryLandingToken, storyLandingEntry, storyLandingHtml } from "@/lib/story-landing";
import { recordStoryEvent } from "@/lib/story-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Story video line PR 9 — the public destination: `omyt.ai/v/<linkToken>`.
 * Serves the exact static HTML the OMYT app exported for this token (never
 * generated at request time — see lib/story-landing.ts), and records a
 * best-effort page-view event. A missing/invalid token is a genuine 404, not
 * a redirect to the homepage, so a dead link is diagnosable from the outside.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isSafeStoryLandingToken(token)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const [entry, html] = await Promise.all([storyLandingEntry(token), storyLandingHtml(token)]);
  if (!entry || !html) {
    return new NextResponse("Not found", { status: 404 });
  }
  await recordStoryEvent({ linkToken: token, kind: "page_view" });
  return new NextResponse(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Public marketing content, but never let a crawler index a single
      // recipient's variant page as if it were a canonical site page.
      "x-robots-tag": "noindex, nofollow",
      "cache-control": "public, max-age=60",
    },
  });
}
