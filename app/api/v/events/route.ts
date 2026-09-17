import { NextResponse } from "next/server";
import { readStoryEvents } from "@/lib/story-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Story video line PR 9 — "The desktop app must pull events with a
 * token-authenticated read endpoint, never exposing owner data publicly."
 *
 * Requires `Authorization: Bearer <STORY_EVENTS_READ_TOKEN>`. Without that
 * env var configured, the endpoint refuses every request (fails closed, not
 * open) rather than serving unauthenticated aggregate data. The OMYT app's
 * `server/studio/video-production/story-metrics.ts` (`importOmytSiteEvents`)
 * is the one intended caller, pointed at this URL via its own
 * `STORY_EVENTS_READ_URL`/`STORY_EVENTS_READ_TOKEN` env vars.
 */
export async function GET(req: Request) {
  const expected = process.env.STORY_EVENTS_READ_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { available: false, items: [], reason: "STORY_EVENTS_READ_TOKEN is not configured." },
      { status: 503 },
    );
  }
  const auth = req.headers.get("authorization") ?? "";
  const provided = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!provided || provided !== expected) {
    return NextResponse.json(
      { available: false, items: [], reason: "unauthorized" },
      { status: 401 },
    );
  }
  const result = await readStoryEvents();
  return NextResponse.json(result, { status: 200 });
}
