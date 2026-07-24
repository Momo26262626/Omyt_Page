"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WorldModelHero — the signature "persistent semantic world model".
 *
 * A slowly-rotating 3-D field of concept nodes, clustered into semantic
 * regions and laced together by a relation lattice. Signals stream in from
 * outside the field and *crystallize* onto nodes — the literal picture of a
 * brain that ingests the world and keeps it. Reasoning pulses trace relations
 * between clusters; an amber north-star anchors the centre.
 *
 * Everything is a pure function of time `t`, so:
 *  - resize / replay / reduced-motion / QA-freeze all come for free
 *  - `?heroT=<seconds>` renders one exact frame statically (screenshots)
 * DPR-aware, pauses when off-screen, single rich static frame under
 * prefers-reduced-motion.
 */

const APP = "https://app.omyt.ai";

// deterministic RNG so the field is identical every render
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// signal-hue palette (rgb), matched to the CSS luminance tokens
const CYAN = "86,222,236";
const SKY = "96,172,246";
const INDIGO = "138,134,247";
const VIOLET = "176,138,248";
const MAGENTA = "226,138,228";
const EMERALD = "116,232,182";
const AMBER = "247,200,120";
const LINE = "150,168,224";
const CLUSTER = [CYAN, SKY, INDIGO, VIOLET, MAGENTA, EMERALD];

const SIGNAL_INTERVAL = 0.92; // seconds between ingested signals
const SIGNAL_TRAVEL = 1.5; // seconds a signal takes to reach the field
const PULSE_INTERVAL = 1.3; // seconds between reasoning pulses

type Node = {
  x: number; y: number; z: number; // base position, radius ~1 sphere
  r: number; // size weight
  c: string; // rgb
  tw: number; // twinkle speed
  ph: number; // twinkle phase
};
type Edge = { a: number; b: number };

export function WorldModelHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stats, setStats] = useState({ nodes: 0, edges: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const freeze = (() => {
      const p = new URLSearchParams(window.location.search).get("heroT");
      return p == null ? null : Number(p);
    })();

    let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, unit = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let raf = 0;
    let running = true;
    let t0 = performance.now();
    let last = t0;

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.5;
      cy = h * 0.53;
      unit = Math.min(w, h) * 0.44;

      const rng = mulberry32(20260724);
      const count = Math.round(Math.min(200, Math.max(96, (w * h) / 11500)));

      // semantic cluster centres, distributed on a slightly flattened spheroid
      const CLUSTERS = 6;
      const centres: { x: number; y: number; z: number; c: string }[] = [];
      for (let i = 0; i < CLUSTERS; i++) {
        const u = rng();
        const v = rng();
        const theta = u * Math.PI * 2;
        const phi = Math.acos(2 * v - 1);
        const rad = 0.52 + rng() * 0.34;
        centres.push({
          x: Math.cos(theta) * Math.sin(phi) * rad,
          y: Math.cos(phi) * rad * 0.62, // flatten vertically → reads as a disk of knowledge
          z: Math.sin(theta) * Math.sin(phi) * rad,
          c: CLUSTER[i % CLUSTER.length],
        });
      }

      nodes = [];
      // north-star node at the core
      nodes.push({ x: 0, y: 0, z: 0, r: 3.4, c: AMBER, tw: 0.7, ph: 0 });
      for (let i = 1; i < count; i++) {
        const cl = centres[(rng() * CLUSTERS) | 0];
        const spread = 0.16 + rng() * 0.2;
        // gaussian-ish jitter around the cluster centre
        const g = () => (rng() + rng() + rng() - 1.5) * spread;
        nodes.push({
          x: cl.x + g(),
          y: cl.y + g() * 0.8,
          z: cl.z + g(),
          r: 0.7 + rng() * 1.5,
          c: cl.c,
          tw: 0.4 + rng() * 1.4,
          ph: rng() * Math.PI * 2,
        });
      }

      // relation lattice: connect each node to its ~3 nearest neighbours
      edges = [];
      const seen = new Set<number>();
      for (let i = 0; i < nodes.length; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dz = nodes[i].z - nodes[j].z;
          dists.push({ j, d: dx * dx + dy * dy + dz * dz });
        }
        dists.sort((p, q) => p.d - q.d);
        const k = i === 0 ? 5 : 3;
        for (let n = 0; n < k && n < dists.length; n++) {
          const j = dists[n].j;
          const key = i < j ? i * 4096 + j : j * 4096 + i;
          if (seen.has(key)) continue;
          seen.add(key);
          edges.push({ a: i, b: j });
        }
      }

      setStats({ nodes: nodes.length, edges: edges.length });
    };

    // scratch projection buffers (reused each frame)
    let px: number[] = [];
    let py: number[] = [];
    let pd: number[] = []; // depth 0..1 (0 far, 1 near)
    let pscale: number[] = [];

    const glow = (x: number, y: number, r: number, rgb: string, a: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      const breathe = 1 + Math.sin(t * 0.18) * 0.014;
      const u = unit * breathe;
      const angY = t * 0.076;
      const tilt = -0.36 + Math.sin(t * 0.11) * 0.05;
      const sy = Math.sin(angY), cyy = Math.cos(angY);
      const st = Math.sin(tilt), ctl = Math.cos(tilt);
      const fov = 2.5;

      // project all nodes
      if (px.length !== nodes.length) {
        px = new Array(nodes.length);
        py = new Array(nodes.length);
        pd = new Array(nodes.length);
        pscale = new Array(nodes.length);
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // rotate around Y
        const x = n.x * cyy + n.z * sy;
        let z = -n.x * sy + n.z * cyy;
        let y = n.y;
        // tilt around X
        const y2 = y * ctl - z * st;
        const z2 = y * st + z * ctl;
        y = y2; z = z2;
        const persp = fov / (fov + z);
        px[i] = cx + x * u * persp;
        py[i] = cy + y * u * persp;
        pd[i] = Math.max(0, Math.min(1, (z + 1) / 2)); // near→1
        pscale[i] = persp;
      }

      // per-node crystallization glow from recently-arrived signals (pure fn of t)
      const act = new Float32Array(nodes.length);
      const kNow = Math.floor(t / SIGNAL_INTERVAL);
      for (let k = kNow - 6; k <= kNow + 1; k++) {
        if (k < 0) continue;
        const r1 = mulberry32(k * 2654435761 >>> 0);
        const start = k * SIGNAL_INTERVAL + r1() * 0.4;
        const target = 1 + Math.floor(r1() * (nodes.length - 1));
        const arrive = start + SIGNAL_TRAVEL;
        if (t >= arrive) {
          const g = Math.exp(-(t - arrive) / 1.7);
          if (g > act[target]) act[target] = g;
        }
      }

      // ── relation lattice ──────────────────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1;
      for (let e = 0; e < edges.length; e++) {
        const a = edges[e].a, b = edges[e].b;
        const depth = Math.min(pd[a], pd[b]);
        const base = 0.05 + depth * 0.14;
        const boost = Math.max(act[a], act[b]) * 0.5;
        ctx.strokeStyle = `rgba(${LINE},${(base + boost).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
        ctx.stroke();
      }

      // ── nodes (additive) ──────────────────────────────────────────
      ctx.globalCompositeOperation = "lighter";
      for (let i = 1; i < nodes.length; i++) {
        const n = nodes[i];
        const d = pd[i];
        const tw = 0.82 + 0.18 * Math.sin(t * n.tw + n.ph);
        const rad = n.r * (0.55 + d * 0.9) * pscale[i];
        const a = (0.16 + d * 0.42) * tw + act[i] * 0.6;
        // soft halo
        glow(px[i], py[i], rad * 5.5, n.c, (0.05 + d * 0.08 + act[i] * 0.22));
        // crisp core
        ctx.fillStyle = `rgba(${n.c},${Math.min(1, a).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], rad, 0, Math.PI * 2);
        ctx.fill();
        // arrival ring while a signal is crystallizing
        if (act[i] > 0.55) {
          const rr = (1 - act[i]) * 26 + 3;
          ctx.strokeStyle = `rgba(${n.c},${((act[i] - 0.55) * 0.9).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(px[i], py[i], rr, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
      }

      // ── reasoning pulses travelling along relations ───────────────
      const mNow = Math.floor(t / PULSE_INTERVAL);
      for (let m = mNow - 1; m <= mNow; m++) {
        if (m < 0 || edges.length === 0) continue;
        const r2 = mulberry32((m * 40503 + 7) >>> 0);
        const start = m * PULSE_INTERVAL + r2() * 0.3;
        const dur = 1.0;
        const p = (t - start) / dur;
        if (p <= 0 || p >= 1) continue;
        const e = edges[(r2() * edges.length) | 0];
        const ease = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        const x = px[e.a] + (px[e.b] - px[e.a]) * ease;
        const y = py[e.a] + (py[e.b] - py[e.a]) * ease;
        const fade = Math.sin(p * Math.PI);
        glow(x, y, 16, VIOLET, 0.4 * fade);
        ctx.fillStyle = `rgba(${VIOLET},${(0.95 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── signals streaming in from outside the field ───────────────
      for (let k = kNow - 3; k <= kNow + 1; k++) {
        if (k < 0) continue;
        const r1 = mulberry32(k * 2654435761 >>> 0);
        const start = k * SIGNAL_INTERVAL + r1() * 0.4;
        const p = (t - start) / SIGNAL_TRAVEL;
        if (p <= 0 || p >= 1) continue;
        const target = 1 + Math.floor(r1() * (nodes.length - 1));
        const theta = r1() * Math.PI * 2;
        const ox = cx + Math.cos(theta) * u * 1.6;
        const oy = cy + Math.sin(theta) * u * 1.15;
        const tx = px[target], ty = py[target];
        const ease = p * p * (3 - 2 * p); // smoothstep
        const x = ox + (tx - ox) * ease;
        const y = oy + (ty - oy) * ease;
        const col = p > 0.7 ? nodes[target].c : CYAN;
        const fade = Math.min(1, p * 3) * Math.min(1, (1 - p) * 6 + 0.3);
        // trailing tail
        for (let s = 1; s <= 5; s++) {
          const pp = Math.max(0, p - s * 0.03);
          const e2 = pp * pp * (3 - 2 * pp);
          const txx = ox + (tx - ox) * e2;
          const tyy = oy + (ty - oy) * e2;
          ctx.fillStyle = `rgba(${col},${(0.16 * fade * (1 - s / 6)).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(txx, tyy, 2.2 - s * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
        glow(x, y, 13, col, 0.5 * fade);
        ctx.fillStyle = `rgba(${col},${(0.98 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── north-star core ───────────────────────────────────────────
      {
        const d = pd[0];
        const pulse = 0.72 + 0.28 * Math.sin(t * 1.1);
        glow(px[0], py[0], 46 * pscale[0], AMBER, 0.16 * pulse);
        glow(px[0], py[0], 15 * pscale[0], AMBER, 0.5 * pulse);
        ctx.fillStyle = `rgba(${AMBER},${(0.7 + 0.3 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px[0], py[0], 2.6 * pscale[0] + 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      if (!running) return;
      // absorb long gaps (tab hidden / rAF suspended) so the story never jumps
      if (now - last > 400) t0 += now - last;
      last = now;
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (freeze != null && !Number.isNaN(freeze)) {
      draw(freeze);
    } else if (reduce) {
      draw(6.4); // single rich static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      build();
      if (freeze != null || reduce) draw(freeze ?? 6.4);
    };
    window.addEventListener("resize", onResize);

    // pause off-screen
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries[0]?.isIntersecting;
        if (freeze != null || reduce) return;
        if (vis && !running) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (!vis && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  const relations = stats.edges > 0 ? stats.edges : 812;
  const nodeCount = stats.nodes > 0 ? stats.nodes : 184;

  return (
    <section className="wmhero">
      <div className="wmhero__fieldwrap" aria-hidden="true">
        <canvas ref={canvasRef} className="wmhero__canvas" />
      </div>
      <div className="wmhero__scrim" />

      <div className="wmhero__inner">
        <div className="wmhero__badge">
          <span className="chip"><span className="dot dot--live" /> <b>Company brain</b> · always on</span>
        </div>
        <h1 className="wmhero__title">
          The company brain that keeps a{" "}
          <span className="grad-text">persistent semantic world&nbsp;model</span>{" "}
          of your business.
        </h1>
        <p className="wmhero__lede">
          omyt reads every signal — deals, conversations, market shifts, outcomes — and
          holds them as one living model it can reason over. It doesn't just store your
          data. It <em>understands</em> it, remembers it, and tells you the next move.
        </p>
        <div className="wmhero__cta">
          <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">
            Start free <span className="arr">→</span>
          </a>
          <a href="#worldmodel" className="btn btn--ghost btn--lg">See how it thinks</a>
        </div>
        <div className="wmhero__note">
          <span><span className="tick">✓</span> Live in an afternoon</span>
          <span><span className="tick">✓</span> No sales call</span>
          <span><span className="tick">✓</span> It learns from every outcome</span>
        </div>
      </div>

      <div className="hud" aria-hidden="true">
        <span className="hud__item"><span className="hud__k">Concepts</span><span className="hud__v">{nodeCount.toLocaleString("en-US")}</span></span>
        <span className="hud__sep" />
        <span className="hud__item"><span className="hud__k">Relations</span><span className="hud__v">{relations.toLocaleString("en-US")}</span></span>
        <span className="hud__sep" />
        <span className="hud__item"><span className="hud__k">Signals</span><span className="hud__v">{Math.round(60 / SIGNAL_INTERVAL)}<span className="u">/min</span></span></span>
        <span className="hud__sep" />
        <span className="hud__item"><span className="hud__k">Model</span><span className="hud__v" style={{ color: "var(--emerald)" }}>persistent</span></span>
      </div>
    </section>
  );
}
