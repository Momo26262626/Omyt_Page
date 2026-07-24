"use client";

import { useEffect, useRef } from "react";

/* ── BrainOrganism — the real omyt brain, on the marketing surface ───────────
   The anatomy is ported verbatim from the product's own brain graphic
   (localhost4000-stack app/components/cockpit/OrganismHero.tsx + ov/Brain3D):
   a point cloud sampled on the gyrified surface of two cerebral hemispheres
   plus cerebellum, brain stem, corpus callosum and a limbic core, rendered as
   a rotating 3-D form on a 2-D canvas — no WebGL, no three.js.

   Same near-side-profile hero pose as the product (tilt 0.16, base yaw 1.30,
   focal 2.6) so the silhouette reads as the same organ: frontal lobe right,
   occipital left, cerebellum notch bottom-left.

   Marketing treatment: matte bone points, depth drives size and brightness,
   one restrained brand accent on a minority of records. Scroll drives the yaw,
   so the organ turns as you move down the page. Deterministic PRNG, hoisted
   buffers, painter's sort, DPR ≤ 2, IntersectionObserver pause, reduced-motion
   static frame. */

type Slot = { x: number; y: number; z: number; lit: boolean };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* gyrified hemisphere — folds come from the two sine bands, the bulge shapes
   the temporal lobe so the profile is unmistakably cortical */
function hemisphere(rng: () => number, side: number, count: number, out: Slot[]) {
  const A = 0.42, B = 0.5, C = 0.64;
  const offX = side * 0.19;
  for (let i = 0; i < count; i++) {
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);
    const sv = Math.sin(v);
    const nx = sv * Math.cos(u);
    const ny = Math.cos(v);
    const nz = sv * Math.sin(u);
    const ey = ny < 0 ? ny * 0.74 : ny;
    const lat = Math.max(0, nx * side);
    const low = Math.max(0, -ny);
    const front = Math.exp(-((nz - 0.25) * (nz - 0.25)) / 0.18);
    const bulge = lat * low * front;
    const g1 = Math.abs(Math.sin(6.5 * u + 2.2 * v));
    const g2 = Math.abs(Math.sin(10.5 * u - 3.1 * v + 1.7));
    const fold = 1 + 0.05 * (g1 - 0.5) + 0.034 * (g2 - 0.5) + 0.018 * Math.sin(16 * u + 5 * v);
    let x = offX + A * nx * fold * (1 + 0.3 * bulge);
    const y = B * ey * fold - 0.07 * bulge;
    const z = C * nz * fold + 0.045 * bulge;
    if (side > 0 && x < 0.04) x = 0.04 + (x - 0.04) * 0.25;
    if (side < 0 && x > -0.04) x = -0.04 + (x + 0.04) * 0.25;
    out.push({ x, y, z, lit: rng() < 0.14 });
  }
}

function cerebellum(rng: () => number, count: number, out: Slot[]) {
  const cx = 0, cy = -0.4, cz = -0.46;
  for (let i = 0; i < count; i++) {
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);
    const sv = Math.sin(v);
    const fold = 1 + 0.085 * Math.sin(19 * v) + 0.05 * Math.sin(12 * u);
    out.push({
      x: cx + 0.31 * sv * Math.cos(u) * fold,
      y: cy + 0.18 * Math.cos(v) * fold,
      z: cz + 0.23 * sv * Math.sin(u) * fold,
      lit: rng() < 0.1,
    });
  }
}

function stem(rng: () => number, count: number, out: Slot[]) {
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const r = 0.07 * (1 - t * 0.5);
    const a = rng() * Math.PI * 2;
    out.push({
      x: Math.cos(a) * r,
      y: -0.44 - t * 0.34,
      z: -0.3 + Math.sin(a) * r + t * 0.06,
      lit: false,
    });
  }
}

function corpusCallosum(rng: () => number, count: number, out: Slot[]) {
  for (let i = 0; i < count; i++) {
    const t = rng();
    const arch = Math.sin(Math.PI * Math.min(1, Math.max(0, (t - 0.05) / 0.9)));
    out.push({
      x: (rng() - 0.5) * 0.05,
      y: 0.04 + 0.2 * arch + (rng() - 0.5) * 0.035,
      z: 0.34 - 0.64 * t + (rng() - 0.5) * 0.03,
      lit: rng() < 0.3,
    });
  }
}

/* the limbic core — where the decision lands */
function core(rng: () => number, count: number, out: Slot[]) {
  for (let i = 0; i < count; i++) {
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);
    const rr = 0.15 * Math.cbrt(rng());
    const sv = Math.sin(v);
    out.push({
      x: rr * sv * Math.cos(u) * 1.3,
      y: -0.02 + rr * Math.cos(v) * 0.8,
      z: 0.02 + rr * sv * Math.sin(u),
      lit: true,
    });
  }
}

function buildSlots(dense: boolean): Slot[] {
  const rng = mulberry32(0x0c0ffee);
  const out: Slot[] = [];
  // density is what makes the silhouette read as an organ rather than a haze
  const h = dense ? 2100 : 1250;
  hemisphere(rng, -1, h, out);
  hemisphere(rng, +1, h, out);
  cerebellum(rng, dense ? 620 : 380, out);
  stem(rng, 64, out);
  corpusCallosum(rng, 140, out);
  core(rng, 150, out);
  return out;
}

/* pose — matches the product's hero exactly */
const TILT = 0.16;
const BASE_ANGLE = 1.3;
const FOCAL = 2.6;

export function BrainOrganism({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const dense = window.innerWidth > 900;
    const slots = buildSlots(dense);
    const n = slots.length;

    // hoisted scratch buffers — no per-frame allocation
    const sx = new Float32Array(n);
    const sy = new Float32Array(n);
    const sd = new Float32Array(n);
    const ss = new Float32Array(n);
    const order = new Uint16Array(n);
    for (let i = 0; i < n; i++) order[i] = i;
    const orderArr = Array.from(order);

    let w = 0, h = 0, dpr = 1, R = 0, cx = 0, cy = 0;
    let raf = 0;
    let running = true;
    let scrollN = 0; // 0..1 progress through the first viewport
    let phase = 0;
    let last = performance.now();

    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.46;
      cx = w * 0.5;
      cy = h * 0.5;
    };

    const draw = (angle: number, t: number) => {
      ctx.clearRect(0, 0, w, h);
      const ca = Math.cos(angle), sa = Math.sin(angle);

      for (let i = 0; i < n; i++) {
        const p = slots[i];
        const rx = p.x * ca + p.z * sa;
        const rz0 = -p.x * sa + p.z * ca;
        const ry = p.y * cosT - rz0 * sinT;
        const rz = p.y * sinT + rz0 * cosT;
        const s = FOCAL / (FOCAL - rz);
        sx[i] = cx + rx * R * s;
        sy[i] = cy - ry * R * s;
        sd[i] = (rz + 1) / 2; // 0 far .. 1 near
        ss[i] = s;
      }

      // painter's sort — far first so near points sit on top
      orderArr.sort((a, b) => sd[a] - sd[b]);

      const breath = 0.94 + 0.06 * Math.sin(t * 0.6);

      for (let k = 0; k < n; k++) {
        const i = orderArr[k];
        const d = sd[i];
        // depth fog: far points recede into the void
        const fog = 0.26 + d * d * 0.74;
        const r = (0.62 + d * 1.15) * ss[i];
        if (slots[i].lit) {
          // the accent minority — records the brain is holding
          ctx.fillStyle = `rgba(104,206,232,${(fog * 0.98 * breath).toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(214,219,228,${(fog * 0.8).toFixed(3)})`;
        }
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      phase += dt * 0.055;
      // scroll turns the organ; idle drift keeps it alive
      const angle = BASE_ANGLE + Math.sin(phase) * 0.16 + scrollN * 1.15;
      draw(angle, phase * 6);
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const vh = window.innerHeight || 1;
      scrollN = Math.max(0, Math.min(1.4, window.scrollY / vh));
    };

    resize();
    onScroll();
    if (reduce) {
      draw(BASE_ANGLE, 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(BASE_ANGLE, 0);
    });
    ro.observe(canvas);
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        if (reduce) return;
        const vis = entries[0]?.isIntersecting ?? false;
        if (vis && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (!vis && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
