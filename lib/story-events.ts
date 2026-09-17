/**
 * Story video line PR 9 — public-destination click/view accounting.
 *
 * omyt-site is a stock Vercel Next.js deployment: no database, no KV, no
 * managed store (see DEPLOY.md's own note that a store would be added
 * "later if you want a list" for the much simpler waitlist feature). Per the
 * story-video-line plan §1: "no new vendor or subscription" for this PR, and
 * if durable click storage truly needs one, STOP that part and ship the
 * pages with link tokens in the URL (still measurable later). That is
 * exactly what happens here:
 *
 * - Every view/click is always logged via `console.log` as a single-line
 *   JSON object. That costs nothing, needs no setup, and is visible in
 *   Vercel's own function logs (a "log drain" is a paid add-on; plain
 *   stdout capture is not) — best-effort, short-retention, not a database.
 * - If the owner later points `STORY_EVENTS_SINK_URL` at ANY HTTP endpoint
 *   they already control (their own Hetzner box, a spreadsheet webhook,
 *   anything — this file does not care what it is), every event is also
 *   POSTed there, and the read endpoint proxies GETs from the matching
 *   `STORY_EVENTS_SINK_READ_URL`. That is the same "optional webhook" shape
 *   `app/api/waitlist/route.ts` already uses for `WAITLIST_WEBHOOK_URL` —
 *   not a new vendor, just an optional pointer to infrastructure the owner
 *   already has or adds later.
 * - Until that env var exists, `readStoryEvents()` honestly reports
 *   `available:false` rather than fabricating zero counts as if they were
 *   real data.
 */

export type StoryEventKind = "page_view" | "cta_click";

export interface StoryEvent {
  linkToken: string;
  kind: StoryEventKind;
  at: string;
}

export interface StoryEventItem {
  linkToken: string;
  kind: StoryEventKind;
  count: number;
  windowEndIso: string;
}

export interface StoryEventsRead {
  available: boolean;
  items: StoryEventItem[];
  reason?: string;
}

export async function recordStoryEvent(event: Omit<StoryEvent, "at">): Promise<void> {
  const full: StoryEvent = { ...event, at: new Date().toISOString() };
  // Always logged — the one channel that costs nothing and needs no setup.
  console.log(`[story-event] ${JSON.stringify(full)}`);
  const sinkUrl = process.env.STORY_EVENTS_SINK_URL;
  if (!sinkUrl) return;
  try {
    const res = await fetch(sinkUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.STORY_EVENTS_SINK_TOKEN
          ? { authorization: `Bearer ${process.env.STORY_EVENTS_SINK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(full),
    });
    if (!res.ok) console.error("[story-event] sink POST failed", res.status, JSON.stringify(full));
  } catch (err) {
    console.error("[story-event] sink POST error", JSON.stringify(full), err);
  }
}

/**
 * Reads aggregated events back for the desktop app's token-authenticated
 * pull (`app/api/v/events/route.ts`). Proxies a configured sink's own read
 * endpoint (`STORY_EVENTS_SINK_READ_URL`, since a webhook sink and its query
 * API are not necessarily the same URL); otherwise reports `available:false`
 * honestly — see this file's header comment.
 */
export async function readStoryEvents(): Promise<StoryEventsRead> {
  const readUrl = process.env.STORY_EVENTS_SINK_READ_URL;
  if (!readUrl) {
    return {
      available: false,
      items: [],
      reason:
        "No STORY_EVENTS_SINK_READ_URL is configured — no durable click store is provisioned yet (see PR 9 Owner decisions: no new vendor was added automatically).",
    };
  }
  try {
    const res = await fetch(readUrl, {
      headers: process.env.STORY_EVENTS_SINK_TOKEN
        ? { authorization: `Bearer ${process.env.STORY_EVENTS_SINK_TOKEN}` }
        : {},
    });
    if (!res.ok)
      return {
        available: false,
        items: [],
        reason: `Sink read endpoint returned HTTP ${res.status}`,
      };
    const body = (await res.json()) as unknown;
    if (!body || typeof body !== "object" || !Array.isArray((body as { items?: unknown }).items)) {
      return {
        available: false,
        items: [],
        reason: "Sink read endpoint returned an unexpected shape.",
      };
    }
    const items = (body as { items: unknown[] }).items.flatMap((raw): StoryEventItem[] => {
      const item = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : null;
      if (
        !item ||
        typeof item.linkToken !== "string" ||
        (item.kind !== "page_view" && item.kind !== "cta_click") ||
        typeof item.count !== "number"
      )
        return [];
      return [
        {
          linkToken: item.linkToken,
          kind: item.kind,
          count: item.count,
          windowEndIso:
            typeof item.windowEndIso === "string" ? item.windowEndIso : new Date().toISOString(),
        },
      ];
    });
    return { available: true, items };
  } catch (err) {
    return {
      available: false,
      items: [],
      reason: err instanceof Error ? err.message : "Sink read endpoint could not be reached.",
    };
  }
}
