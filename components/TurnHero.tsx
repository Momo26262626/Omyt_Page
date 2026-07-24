"use client";

import { useEffect, useRef } from "react";
import { Mark } from "@/components/Wordmark";

/**
 * "Turn product into money" hero — a story told by tiny computers.
 *
 * Beats: one computer sits alone → screen powers on → an outreach email is
 * typed by hand → the machine duplicates (1→2→4→…→hundreds) → the swarm
 * twists into a slow vortex → every unit is pulled into the omyt wordmark,
 * landing as the dots that spell it → the dot-logo snaps to the real brand.
 *
 * The whole choreography is a pure function of time t (seeded RNG), so
 * resize, replay and the ?heroT=<seconds> QA freeze all fall out for free.
 * Same conventions as HeroBackground: dpr ≤ 2, reduced-motion = final frame,
 * IntersectionObserver pause (with t0 re-anchoring so the story doesn't skip).
 */

const APP = "https://app.omyt.ai";

/* Daylight palette (rgb triplets, matching --ov tokens like HeroBackground) */
const INK = "60,66,104";
const SKY = "56,160,230";
const VIOLET = "124,92,240";
const AMBER = "232,163,61";
const INDIGO = "104,112,238";
const BODY_FILL = "rgb(244,244,241)";
const BODY_EDGE = `rgba(${INK},0.52)`;
const SCREEN_DARK = "rgb(35,39,66)";

const EMAIL_LINES = [
  "to: sarah@acme.co",
  "subject: step-2 drop-off",
  "",
  "signups stall at 2 — found",
  "why. worth 15 min?",
];
/* line 3 gets a "fuond" → backspace → "found" typo for the human touch */

const DOT_R = 6.5;

type TypeEvent = { t: number; txt: string };

type Unit = {
  hero: boolean;
  birth: number; // mitosis spawn time
  ox: number; oy: number; osize: number; // spawn origin (parent at birth)
  sx: number; sy: number; size: number; // scatter slot
  arc: number; // perpendicular arc amp for the spawn flight
  variant: number; // sprite variant index
  spinPh: number; spinSp: number; wob: number;
  phi0: number; r0: number; // vortex polar (ellipse-normalized)
  vstart: number; // when this unit joins the vortex
  dep: number; // vortex departure → logo
  tx: number; ty: number; dotC: string; // logo landing point + color
  orbiter: boolean; // survives the snap, orbits the brand forever
  orbIdx: number; // evenly spreads the orbiters around the brand
};

function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let z = Math.imul(s ^ (s >>> 15), 1 | s);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, t: number) => {
  const u = clamp01((t - a) / (b - a));
  return u * u * (3 - 2 * u);
};
const lerp = (a: number, b: number, u: number) => a + (b - a) * u;
const easeOutCubic = (u: number) => 1 - (1 - u) ** 3;
const easeInCubic = (u: number) => u * u * u;

/* screen power-on flicker envelope, 0→1 over 0.8s */
const FLICKER: [number, number][] = [
  [0, 0], [0.1, 0.75], [0.18, 0.1], [0.3, 0.95], [0.42, 0.5], [0.56, 1], [1, 1],
];
function flickerEnv(u: number) {
  if (u <= 0) return 0;
  if (u >= 1) return 1;
  for (let i = 1; i < FLICKER.length; i++) {
    if (u <= FLICKER[i][0]) {
      const [a, va] = FLICKER[i - 1];
      const [b, vb] = FLICKER[i];
      return lerp(va, vb, (u - a) / (b - a));
    }
  }
  return 1;
}

/* Build the char-by-char typing schedule (with the typo) once. */
function buildTyping(rnd: () => number, start: number): { events: TypeEvent[]; end: number } {
  const events: TypeEvent[] = [];
  let t = start;
  let txt = "";
  const push = () => events.push({ t, txt });
  const typeChar = (c: string, slow = 0) => {
    t += 0.02 + rnd() * 0.016 + slow;
    txt += c;
    push();
  };
  const backspace = () => {
    t += 0.042;
    txt = txt.slice(0, -1);
    push();
  };
  EMAIL_LINES.forEach((line, li) => {
    if (li > 0) {
      t += li === 2 ? 0.26 : 0.17; // beat before each new line
      txt += "\n";
      push();
    }
    if (li === 3) {
      // "signups stall at 2 — fuond" … fix → "found"
      const pre = "signups stall at 2 — ";
      for (const c of pre) typeChar(c, c === " " ? 0.01 : 0);
      for (const c of "fuond") typeChar(c);
      t += 0.3; // notice the typo
      for (let i = 0; i < 4; i++) backspace();
      for (const c of "ound") typeChar(c);
      return;
    }
    for (const c of line) typeChar(c, c === " " ? 0.012 : 0);
  });
  return { events, end: t };
}

/* One retro computer, vector-drawn in a 100×122 local space centered on 0,0. */
function drawMac(
  ctx: CanvasRenderingContext2D,
  sizeH: number,
  screen: { glow: number; color: string; micro?: number[][] | null },
  screenText?: { events: TypeEvent[]; t: number; mono: string } | null,
) {
  const s = sizeH / 122;
  ctx.save();
  ctx.scale(s, s);

  // halo behind the body when the screen is lit
  if (screen.glow > 0.02) {
    const halo = ctx.createRadialGradient(0, -18, 4, 0, -18, 96);
    halo.addColorStop(0, `rgba(${screen.color},${(0.2 * screen.glow).toFixed(3)})`);
    halo.addColorStop(1, `rgba(${screen.color},0)`);
    ctx.fillStyle = halo;
    ctx.fillRect(-100, -118, 200, 220);
  }

  // body
  ctx.beginPath();
  ctx.roundRect(-50, -61, 100, 122, 14);
  ctx.fillStyle = BODY_FILL;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = BODY_EDGE;
  ctx.stroke();

  // bezel + screen
  ctx.beginPath();
  ctx.roundRect(-38, -49, 76, 62, 7);
  ctx.fillStyle = "rgb(233,233,229)";
  ctx.fill();
  ctx.strokeStyle = `rgba(${INK},0.3)`;
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(-33, -44, 66, 52, 4.5);
  ctx.fillStyle = SCREEN_DARK;
  ctx.fill();

  if (screen.glow > 0.02) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(-33, -44, 66, 52, 4.5);
    ctx.clip();
    const g = ctx.createRadialGradient(0, -18, 2, 0, -18, 52);
    g.addColorStop(0, `rgba(${screen.color},${(0.34 * screen.glow).toFixed(3)})`);
    g.addColorStop(1, `rgba(${screen.color},${(0.05 * screen.glow).toFixed(3)})`);
    ctx.fillStyle = g;
    ctx.fillRect(-33, -44, 66, 52);

    if (screenText) {
      // live-typed email (hero only) — find the current snapshot
      const { events, t, mono } = screenText;
      let lo = 0, hi = events.length - 1, idx = -1;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (events[mid].t <= t) { idx = mid; lo = mid + 1; } else hi = mid - 1;
      }
      const txt = idx >= 0 ? events[idx].txt : "";
      const lines = txt.split("\n");
      ctx.font = `500 4.25px ${mono}`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(168,196,255,0.95)";
      const lh = 6.4;
      lines.forEach((ln, i) => {
        ctx.fillText(ln, -30, -39.5 + i * lh);
      });
      // block cursor, 530ms blink
      if (Math.floor(t / 0.53) % 2 === 0 || (idx >= 0 && t - events[idx].t < 0.1)) {
        const last = lines[lines.length - 1] ?? "";
        const cw = ctx.measureText(last).width;
        ctx.fillStyle = "rgba(168,196,255,0.85)";
        ctx.fillRect(-30 + cw + 0.6, -40 + (lines.length - 1) * lh, 2.4, 5);
      }
    } else if (screen.micro) {
      // micro "email" bars for swarm-size screens
      ctx.globalAlpha = 0.85 * screen.glow;
      ctx.fillStyle = `rgba(${screen.color},0.9)`;
      for (const [mx, my, mw] of screen.micro) ctx.fillRect(-29 + mx, -39 + my, mw, 2.6);
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  // chin: floppy slot + badge dot
  ctx.fillStyle = `rgba(${INK},0.28)`;
  ctx.beginPath();
  ctx.roundRect(2, 27, 34, 4.6, 2.3);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-30, 29.5, 2.1, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${INK},0.2)`;
  ctx.fill();

  ctx.restore();
}

export function TurnHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const replayRef = useRef<HTMLButtonElement | null>(null);
  const restartRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const copy = copyRef.current;
    const brand = brandRef.current;
    const replayBtn = replayRef.current;
    if (!canvas || !copy || !brand || !replayBtn) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const frozenT = Number.parseFloat(
      new URLSearchParams(window.location.search).get("heroT") ?? "",
    );
    const frozen = Number.isFinite(frozenT);

    const bodyStyle = getComputedStyle(document.body);
    const rootStyle = getComputedStyle(document.documentElement);
    const pick = (v: string, fb: string) =>
      (bodyStyle.getPropertyValue(v) || rootStyle.getPropertyValue(v)).trim() || fb;
    const MONO = pick("--font-mono-jb", "ui-monospace, SFMono-Regular, monospace");
    const SANS = pick("--font-onest", "system-ui, sans-serif");

    let w = 0, h = 0, dpr = 1;
    let raf = 0;
    let running = true;
    let disposed = false;
    let t0 = performance.now();
    let lastNow = t0;

    /* timeline anchors — SPLIT onward derived from the typing schedule */
    const rndType = mulberry32(7);
    const T_ON = 0.9;
    const T_TYPE = 1.7;
    const typing = buildTyping(rndType, T_TYPE);
    const T_SPLIT = typing.end + 0.45;
    const T_VORTEX = T_SPLIT + 1.85;
    const T_CONV = T_VORTEX + 1.6;
    const CONV_STAGGER = 0.9;
    const CONV_FLIGHT = 0.7;
    const T_SNAP = T_CONV + CONV_STAGGER + CONV_FLIGHT - 0.25;
    const T_IDLE = T_SNAP + 0.7;

    /* scene state rebuilt on resize */
    let units: Unit[] = [];
    let drawOrder: number[] = [];
    let sprites: HTMLCanvasElement[] = [];
    const SPRITE_H = 96;
    let heroX = 0, heroY = 0, heroH = 300;
    let cx = 0, cyS = 0, ellX = 1, ellY = 1, rMax = 1;
    let brandCX = 0, brandCY = 0, brandScale = 1;
    let shadowY = 0;

    const bakeSprites = () => {
      const rnd = mulberry32(41);
      const colors = ["", INDIGO, SKY, VIOLET]; // 0 = screen off
      sprites = colors.map((color, vi) => {
        const c = document.createElement("canvas");
        const pad = 1.5; // room for the halo
        c.width = Math.round(SPRITE_H * 0.82 * pad * 2);
        c.height = Math.round(SPRITE_H * pad * 2);
        const sc = c.getContext("2d");
        if (!sc) return c;
        sc.setTransform(2, 0, 0, 2, c.width / 2, c.height / 2);
        const micro =
          vi === 0
            ? null
            : Array.from({ length: 4 + ((rnd() * 3) | 0) }, (_, i) => [
                rnd() * 6,
                i * 7 + rnd() * 2,
                14 + rnd() * 38,
              ]);
        drawMac(sc, SPRITE_H, { glow: vi === 0 ? 0 : 1, color, micro });
        return c;
      });
    };

    /* Rasterize the wordmark (same geometry as Wordmark.tsx, ×2 from its
       32-unit viewBox) and sample lit pixels → landing dots with colors. */
    const sampleLogo = (): { pts: { x: number; y: number; c: string }[] } => {
      const SS = 2; // supersample
      const mark = 64;
      const gap = mark * 0.35;
      const fontPx = mark * 0.74;
      const meas = document.createElement("canvas");
      const mctx = meas.getContext("2d");
      if (!mctx) return { pts: [] };
      mctx.font = `800 ${fontPx}px ${SANS}`;
      const textW = mctx.measureText("omyt").width * 0.955; // ≈ -0.045em tracking
      const totalW = mark + gap + textW;
      const c = document.createElement("canvas");
      c.width = Math.ceil((totalW + 8) * SS);
      c.height = Math.ceil((mark + 16) * SS);
      const g = c.getContext("2d", { willReadFrequently: true });
      if (!g) return { pts: [] };
      g.setTransform(SS, 0, 0, SS, 4 * SS, 8 * SS);
      const grad = g.createLinearGradient(8, 8, 56, 56);
      grad.addColorStop(0, `rgb(${SKY})`);
      grad.addColorStop(1, `rgb(${VIOLET})`);
      // orbit ring
      g.beginPath();
      g.arc(32, 32, 23, 0, Math.PI * 2);
      g.strokeStyle = grad;
      g.lineWidth = 3.6;
      g.globalAlpha = 0.5;
      g.stroke();
      g.globalAlpha = 1;
      // nucleus
      g.beginPath();
      g.roundRect(19, 19, 26, 26, 8.8);
      g.fillStyle = grad;
      g.fill();
      // north-star satellite
      g.beginPath();
      g.arc(52, 15, 6, 0, Math.PI * 2);
      g.fillStyle = `rgb(${AMBER})`;
      g.fill();
      // wordmark text
      g.font = `800 ${fontPx}px ${SANS}`;
      if ("letterSpacing" in g) (g as CanvasRenderingContext2D).letterSpacing = "-0.045em";
      g.textBaseline = "middle";
      g.fillStyle = `rgb(${INK})`;
      g.fillText("omyt", mark + gap, 34);

      const img = g.getImageData(0, 0, c.width, c.height).data;
      const step = 5 * SS;
      const raw: { x: number; y: number; c: string }[] = [];
      for (let py = 0; py < c.height; py += step) {
        for (let px = 0; px < c.width; px += step) {
          const i = (py * c.width + px) * 4;
          const a = img[i + 3];
          if (a > 90) {
            raw.push({
              x: (px / SS - 4 - totalW / 2) / 1, // centered logical coords
              y: (py / SS - 8 - mark / 2) / 1,
              c: `rgba(${img[i]},${img[i + 1]},${img[i + 2]},0.95)`,
            });
          }
        }
      }
      return { pts: raw };
    };

    const build = () => {
      const panel = canvas.parentElement;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const copyBottom = copy.getBoundingClientRect().bottom - rect.top;
      const stageH = Math.max(240, h - copyBottom);
      heroH = Math.min(340, Math.max(220, Math.min(stageH * 0.52, w * 0.4)));
      heroX = w / 2;
      heroY = copyBottom + stageH * 0.52;
      shadowY = heroY + heroH * 0.56;
      cx = w / 2;
      cyS = copyBottom + stageH * 0.5;
      ellX = Math.min(w * 0.42, 640);
      ellY = Math.min(stageH * 0.42, 320);
      rMax = 1;

      const logoH = Math.min(88, Math.max(54, h * 0.125));
      brandScale = logoH / 64;
      brandCX = cx;
      brandCY = copyBottom + stageH * 0.46;
      brand.style.left = `${brandCX}px`;
      brand.style.top = `${brandCY}px`;
      brand.style.transform = `translate(-50%, -50%) scale(${brandScale})`;

      /* units + choreography (fully seeded → identical on every rebuild) */
      const rnd = mulberry32(1337);
      const N = Math.max(90, Math.min(250, Math.round((w * stageH) / 3800)));
      const GOLD = Math.PI * (3 - Math.sqrt(5));

      const { pts } = sampleLogo();
      // thin the samples to ≤ N, keep coverage even
      const keep = Math.min(pts.length, N);
      const targets = Array.from({ length: keep }, (_, i) => pts[Math.floor((i * pts.length) / keep)]);

      const genOf = (i: number) => (i === 0 ? 0 : Math.min(7, Math.floor(Math.log2(i + 1))));
      const shuffle = (arr: number[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = (rnd() * (i + 1)) | 0;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      const depOrder = shuffle(Array.from({ length: N }, (_, i) => i));

      // scatter slots: jittered phyllotaxis on the stage ellipse, then shuffled
      // so each mitosis generation fans across the whole panel (not center-out)
      const slots = Array.from({ length: N }, (_, i) => {
        const rr = Math.sqrt((i + 0.6) / N);
        const th = i * GOLD;
        return {
          x: Math.min(w - 34, Math.max(34, cx + rr * Math.cos(th) * ellX + (rnd() - 0.5) * 26)),
          y: Math.min(h - 40, Math.max(copyBottom + 14, cyS + rr * Math.sin(th) * ellY + (rnd() - 0.5) * 22)),
        };
      });
      const slotOf = shuffle(Array.from({ length: N }, (_, i) => i));

      units = [];
      for (let i = 0; i < N; i++) {
        const gen = genOf(i);
        const birth = i === 0 ? T_SPLIT : T_SPLIT + gen * 0.22 + rnd() * 0.1;
        const sx = slots[slotOf[i]].x;
        const sy = slots[slotOf[i]].y;
        const size = 24 + rnd() * 20;
        const nx = (sx - cx) / ellX;
        const ny = (sy - cyS) / ellY;
        const tp = targets[i % targets.length];
        const depIdx = depOrder[i];
        units.push({
          hero: i === 0,
          birth,
          ox: 0, oy: 0, osize: 0, // parent-dependent, filled below
          sx, sy, size,
          arc: (rnd() < 0.5 ? -1 : 1) * (16 + rnd() * 30),
          variant: 1 + ((rnd() * 3) | 0),
          spinPh: rnd() * Math.PI * 2,
          spinSp: 2.4 + rnd() * 2.2,
          wob: 0.08 + rnd() * 0.1,
          phi0: Math.atan2(ny, nx),
          r0: Math.max(0.06, Math.hypot(nx, ny)),
          vstart: 0, // filled below
          dep: T_CONV + (depIdx / N) * CONV_STAGGER,
          tx: brandCX + tp.x * brandScale,
          ty: brandCY + tp.y * brandScale,
          dotC: tp.c,
          orbiter: false,
          orbIdx: -1,
        });
      }
      // three units survive as brand orbiters, spread evenly
      [0.2, 0.55, 0.86].forEach((k, oi) => {
        const u = units[Math.floor(N * k)];
        u.orbiter = true;
        u.orbIdx = oi;
      });

      // spawn origins: parent's deterministic position at child's birth
      const FLIGHT = 0.62;
      for (let i = 0; i < N; i++) {
        const u = units[i];
        u.vstart = Math.max(T_VORTEX, u.birth + FLIGHT);
        if (i === 0) {
          u.ox = heroX; u.oy = heroY; u.osize = heroH;
          continue;
        }
        const parent = units[((i - 1) / 2) | 0]; // binary-tree parenting
        const pu = clamp01((u.birth - parent.birth) / FLIGHT);
        const pe = easeOutCubic(pu);
        u.ox = lerp(parent.hero ? heroX : parent.ox, parent.sx, pe);
        u.oy = lerp(parent.hero ? heroY : parent.oy, parent.sy, pe);
        u.osize = Math.max(u.size * 0.4, lerp(parent.hero ? heroH : parent.osize, parent.size, pe) * 0.55);
      }
      drawOrder = Array.from({ length: N }, (_, i) => i)
        .filter((i) => i !== 0)
        .sort((a, b) => units[a].size - units[b].size);
    };

    /* vortex angular travel: ω ramps in over 0.9s then holds at ΩMAX */
    const OMEGA_MAX = 1.15;
    const omegaInt = (t: number) => {
      if (t <= T_VORTEX) return 0;
      const s = (t - T_VORTEX) / 0.9;
      if (s <= 1) return OMEGA_MAX * 0.9 * (s * s * s - 0.5 * s * s * s * s);
      return OMEGA_MAX * (0.45 + (t - T_VORTEX - 0.9));
    };

    type US = {
      x: number; y: number; size: number;
      flip: number; rot: number; alpha: number;
      glow: number; dot: number; // dot = 0 computer … 1 pure dot
    };

    const vortexPos = (u: Unit, t: number) => {
      const speedF = 1 + 0.5 * (1 - Math.min(1, u.r0 / rMax));
      const th = u.phi0 + speedF * (omegaInt(t) - omegaInt(u.vstart));
      const r = u.r0 * (1 - 0.09 * Math.min(2.4, Math.max(0, t - u.vstart)));
      return { x: cx + r * Math.cos(th) * ellX, y: cyS + r * Math.sin(th) * ellY };
    };

    const unitState = (u: Unit, i: number, t: number): US | null => {
      const FLIGHT = 0.62;
      const spinRamp = smooth(u.vstart, u.vstart + 0.7, t) * (1 - smooth(u.dep, u.dep + 0.3, t));
      const spinCos = Math.cos(u.spinPh + t * u.spinSp);
      const flip = lerp(1, spinCos, spinRamp);
      const rot = u.wob * Math.sin(t * 1.7 + u.spinPh) * spinRamp;

      if (t < u.birth) {
        if (!u.hero) return null;
        return { x: heroX, y: heroY, size: heroH, flip: 1, rot: 0, alpha: 1, glow: 0, dot: 0 };
      }
      if (t < u.dep) {
        let x: number, y: number, size: number, alpha = 1, glow = 1;
        if (t < u.birth + FLIGHT) {
          const fu = clamp01((t - u.birth) / FLIGHT);
          const fe = easeOutCubic(fu);
          x = lerp(u.ox, u.sx, fe);
          y = lerp(u.oy, u.sy, fe);
          // arc perpendicular to the travel direction
          const dx = u.sx - u.ox, dy = u.sy - u.oy;
          const dl = Math.hypot(dx, dy) || 1;
          const bump = Math.sin(Math.PI * fu) * u.arc;
          x += (-dy / dl) * bump;
          y += (dx / dl) * bump;
          size = lerp(u.osize, u.size, fe);
          alpha = u.hero ? 1 : Math.min(1, fu * 5);
          glow = u.hero ? 1 : smooth(0.55, 0.85, fu);
        } else if (t < u.vstart) {
          x = u.sx;
          y = u.sy + 1.4 * Math.sin(t * 2 + i);
          size = u.size;
        } else {
          const p = vortexPos(u, t);
          const settle = 1 - smooth(u.vstart, u.vstart + 0.5, t);
          x = p.x;
          y = p.y + 1.4 * Math.sin(t * 2 + i) * settle;
          size = u.size;
        }
        return { x, y, size, flip, rot, alpha, glow, dot: 0 };
      }
      // departure → logo dot
      const cu = clamp01((t - u.dep) / CONV_FLIGHT);
      const ce = easeInCubic(cu);
      const from = t < u.vstart + 0.01 ? { x: u.sx, y: u.sy } : vortexPos(u, u.dep);
      const x = lerp(from.x, u.tx, ce);
      const y = lerp(from.y, u.ty, ce);
      const dot = smooth(0.55, 0.9, cu);
      let size = lerp(u.size, DOT_R * 2, ce);
      let alpha = 1;

      if (cu >= 1) {
        if (u.orbiter && t > T_SNAP) {
          // fly out to a slow ellipse around the brand
          const ou = clamp01((t - T_SNAP) / 0.9);
          const oe = smooth(0, 1, ou);
          const orx = Math.min(86 * brandScale + 120, w / 2 - 28);
          const ory = 42 * brandScale + 58;
          const ang = 0.7 + u.orbIdx * 2.09 + 0.16 * Math.max(0, t - T_SNAP);
          const px = brandCX + Math.cos(ang) * orx;
          const py = brandCY + Math.sin(ang) * ory;
          return {
            x: lerp(u.tx, px, oe),
            y: lerp(u.ty, py, oe),
            size: lerp(DOT_R * 2, 21, oe),
            flip: lerp(1, Math.cos(u.spinPh + t * 0.8), oe),
            rot: 0,
            alpha: 1,
            glow: 1,
            dot: 1 - oe,
          };
        }
        // landed dot: twinkle, then dissolve at the snap
        const tw = 0.82 + 0.18 * Math.sin(t * 3 + i * 1.7);
        const su = clamp01((t - T_SNAP) / 0.6);
        alpha = tw * (1 - su);
        size = DOT_R * 2 * (1 - 0.5 * su);
        if (alpha <= 0.004) return null;
        return { x: u.tx, y: u.ty, size, flip: 1, rot: 0, alpha, glow: 0, dot: 1 };
      }
      return { x, y, size, flip, rot, alpha, glow: 1 - dot, dot };
    };

    const drawUnit = (u: Unit, st: US, t: number) => {
      ctx.save();
      ctx.globalAlpha = st.alpha;
      ctx.translate(st.x, st.y);
      if (st.dot < 1) {
        ctx.save();
        ctx.rotate(st.rot);
        const fx = Math.max(0.08, Math.abs(st.flip)) * Math.sign(st.flip || 1);
        ctx.scale(fx, 1);
        // dim while edge-on so the tumble reads as 3D, not a stray line
        ctx.globalAlpha = st.alpha * (1 - st.dot) * (0.4 + 0.6 * Math.min(1, Math.abs(st.flip) * 1.6));
        if (u.hero && st.size > 90) {
          const env = flickerEnv((t - T_ON) / 0.8);
          drawMac(ctx, st.size, { glow: env, color: INDIGO }, {
            events: typing.events,
            t,
            mono: MONO,
          });
        } else {
          const spr = sprites[st.glow > 0.4 ? u.variant : 0];
          if (spr) {
            const sh = st.size * 1.5 * 1.18; // sprite pad factor
            ctx.drawImage(spr, -sh * 0.41, -sh / 2, sh * 0.82, sh);
          }
        }
        ctx.restore();
      }
      if (st.dot > 0.01) {
        ctx.globalAlpha = st.alpha * st.dot;
        ctx.fillStyle = u.dotC;
        ctx.beginPath();
        ctx.arc(0, 0, (st.size / 2) * (0.9 + 0.1 * st.dot), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // camera: gentle push toward the hero screen while the email is typed
      const camIn = smooth(T_ON + 0.4, T_TYPE + 1.4, t);
      const camOut = 1 - smooth(T_SPLIT - 0.2, T_SPLIT + 1.0, t);
      const k = 1 + 0.055 * camIn * camOut;
      ctx.save();
      if (k !== 1) {
        const fy = heroY - heroH * 0.15;
        ctx.translate(heroX, fy);
        ctx.scale(k, k);
        ctx.translate(-heroX, -fy);
      }

      // ground shadow under the lone computer, gone once the swarm exists
      const shAlpha = 0.1 * (1 - smooth(T_SPLIT, T_SPLIT + 0.9, t));
      if (shAlpha > 0.003) {
        ctx.beginPath();
        ctx.ellipse(heroX, shadowY, heroH * 0.42, heroH * 0.07, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${INK},${shAlpha.toFixed(3)})`;
        ctx.fill();
      }

      for (const i of drawOrder) {
        const st = unitState(units[i], i, t);
        if (st) drawUnit(units[i], st, t);
      }
      const heroSt = units[0] ? unitState(units[0], 0, t) : null;
      if (heroSt) drawUnit(units[0], heroSt, t);

      ctx.restore();

      // DOM overlays (idempotent class toggles)
      brand.classList.toggle("is-on", t > T_SNAP + 0.05);
      replayBtn.classList.toggle("is-on", t > T_IDLE + 0.9);
    };

    const loop = (now: number) => {
      if (!running || disposed) return;
      // if we were paused (tab hidden / scrolled away), don't skip the story
      if (now - lastNow > 400) t0 += now - lastNow;
      lastNow = now;
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      bakeSprites();
      build();
      if (frozen) {
        draw(frozenT);
        return;
      }
      if (reduce) {
        draw(T_IDLE + 4.2); // final composition, brand on, static
        return;
      }
      t0 = performance.now();
      lastNow = t0;
      raf = requestAnimationFrame(loop);
    };

    restartRef.current = () => {
      if (reduce || frozen) return;
      brand.classList.remove("is-on");
      replayBtn.classList.remove("is-on");
      t0 = performance.now();
      lastNow = t0;
      if (!running) { running = true; raf = requestAnimationFrame(loop); }
    };

    // fonts affect both the typed email and the sampled wordmark
    let started = false;
    const kick = () => {
      if (started || disposed) return;
      started = true;
      start();
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(kick);
      window.setTimeout(kick, 900); // belt & braces if fonts hang
    } else kick();

    const onResize = () => {
      if (!started) return;
      build();
      if (reduce) draw(T_IDLE + 4.2);
      else if (frozen) draw(frozenT);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible && !running && !reduce && !frozen && started) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      restartRef.current = null;
    };
  }, []);

  return (
    <section className="turnhero" aria-label="omyt — turn product into money">
      <div className="turnhero__panel">
        <div ref={copyRef} className="turnhero__copy">
          <h1 className="display turnhero__title">
            Turn product
            <br />
            into <span className="grad-text">money</span>
          </h1>
          <div className="turnhero__cta">
            <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">
              Get started <span className="arr">→</span>
            </a>
          </div>
          <div className="turnhero__note">
            <span><span className="tick">✓</span> No credit card</span>
            <span><span className="tick">✓</span> Self-serve</span>
            <span><span className="tick">✓</span> Live in minutes</span>
          </div>
        </div>
        <div className="turnhero__stagewrap" aria-hidden="true">
          <canvas ref={canvasRef} className="turnhero__canvas" />
        </div>
        <div ref={brandRef} className="turnhero__brand" aria-hidden="true">
          <Mark size={64} />
          <span className="turnhero__brandword">omyt</span>
        </div>
        <button
          ref={replayRef}
          type="button"
          className="turnhero__replay"
          onClick={() => restartRef.current?.()}
        >
          ↺ replay
        </button>
      </div>
    </section>
  );
}
