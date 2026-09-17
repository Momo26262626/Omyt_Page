/**
 * Story video line PR 9 — per-variant landing pages.
 *
 * Each page's HTML and metadata are exported as static files by the OMYT app
 * (`server/studio/video-production/story-landing.ts`, a sibling repo) and
 * committed into `data/story-landing/`: one `<token>.html` per link token,
 * plus a shared `index.json` mapping token -> {destinationUrl, ...}. This
 * repo never generates that content itself — it only serves it and counts
 * visits/clicks against the token.
 */
import { promises as fs } from "node:fs";
import path from "node:path";

export interface StoryLandingIndexEntry {
  productionId: string;
  platform: string;
  destinationUrl: string | null;
  htmlHash: string;
  exportedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data", "story-landing");
/** A link token is a filename component — reject anything that isn't the
 * safe shape the exporter produces, before it ever touches the filesystem. */
const SAFE_TOKEN = /^[a-zA-Z0-9_-]{4,80}$/;

export function isSafeStoryLandingToken(token: string): boolean {
  return SAFE_TOKEN.test(token);
}

export async function storyLandingIndex(): Promise<Record<string, StoryLandingIndexEntry>> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, "index.json"), "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, StoryLandingIndexEntry>)
      : {};
  } catch {
    return {};
  }
}

export async function storyLandingEntry(token: string): Promise<StoryLandingIndexEntry | null> {
  if (!isSafeStoryLandingToken(token)) return null;
  const index = await storyLandingIndex();
  return index[token] ?? null;
}

export async function storyLandingHtml(token: string): Promise<string | null> {
  if (!isSafeStoryLandingToken(token)) return null;
  try {
    return await fs.readFile(path.join(DATA_DIR, `${token}.html`), "utf8");
  } catch {
    return null;
  }
}
