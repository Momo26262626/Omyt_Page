import { NextResponse } from "next/server";
import { isSafeStoryLandingToken, storyLandingEntry } from "@/lib/story-landing";
import { recordStoryEvent } from "@/lib/story-events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Story video line PR 9 — the CTA click endpoint every `/v/<token>` page
 * links to (`server/studio/video-production/story-landing.ts` builds the
 * page's `ctaHref` as this exact relative path — `html-landing.ts`'s
 * deterministic format refuses an absolute external `ctaHref` by design, so
 * routing through this same-origin redirect is what makes the click
 * countable at all before the visitor leaves omyt.ai).
 *
 * Records a best-effort "cta_click" event (see lib/story-events.ts for what
 * "recorded" means today) and 302s to the production's real destination URL,
 * forwarding the link token as a query parameter so any system that DOES
 * have durable storage downstream (e.g. the product's own signup capture)
 * can still attribute the visit even though this repo cannot count it
 * durably yet.
 */
export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isSafeStoryLandingToken(token)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const entry = await storyLandingEntry(token);
  if (!entry || !entry.destinationUrl) {
    return new NextResponse("Not found", { status: 404 });
  }
  let destination: URL;
  try {
    destination = new URL(entry.destinationUrl);
    if (destination.protocol !== "https:") throw new Error("non-https destination");
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
  destination.searchParams.set("omyt_lt", token);
  await recordStoryEvent({ linkToken: token, kind: "cta_click" });
  return NextResponse.redirect(destination.toString(), { status: 302 });
}
