"use client";

import { useEffect, useRef } from "react";

/**
 * Generative hero "video" — a living signal network rendered on canvas.
 * Light Daylight Ops palette: drifting nodes, faint data-lattice connections,
 * and signal pulses travelling edge-to-edge (the loop/intelligence motif at
 * full bleed). Loops forever, ~no weight, crisp at any size, reduced-motion safe.
 */

const SKY = "56,160,230";
const VIOLET = "124,92,240";
const AMBER = "232,163,61";
const INK = "60,66,104";
const ACCENTS = [SKY, VIOLET, AMBER];

type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string };
type Pulse = { a: number; b: number; t: number; speed: number; c: string };

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = true;
    let lastSpawn = 0;

    const LINK = 168; // max connection distance

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

      const count = Math.round(Math.min(72, Math.max(28, (w * h) / 20000)));
      nodes = Array.from({ length: count }, () => {
        const accent = Math.random() < 0.34;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: accent ? 2.2 + Math.random() * 1.6 : 1.1 + Math.random() * 1.1,
          c: accent ? ACCENTS[(Math.random() * ACCENTS.length) | 0] : INK,
        };
      });
      pulses = [];
    };

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const a = (Math.random() * nodes.length) | 0;
      // pick a nearby node as the pulse destination
      let b = -1, best = LINK;
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue;
        const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
        if (d < best) { best = d; b = i; }
      }
      if (b === -1) return;
      pulses.push({ a, b, t: 0, speed: 0.6 + Math.random() * 0.8, c: ACCENTS[(Math.random() * ACCENTS.length) | 0] });
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx * dt; n.y += n.vy * dt;
        if (n.x < -20) n.x = w + 20; else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.16;
            ctx.strokeStyle = `rgba(${INK},${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.c},${n.c === INK ? 0.28 : 0.55})`;
        ctx.fill();
      }

      // pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const A = nodes[p.a], B = nodes[p.b];
        if (!A || !B) { pulses.splice(i, 1); continue; }
        p.t += (p.speed * dt) / 60;
        if (p.t >= 1) { pulses.splice(i, 1); continue; }
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        const fade = Math.sin(p.t * Math.PI); // in-out
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${p.c},${(0.5 * fade).toFixed(3)})`);
        g.addColorStop(1, `rgba(${p.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(${p.c},${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
      }
    };

    let prev = performance.now();
    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(3, (now - prev) / 16.67); // frames, clamped
      prev = now;
      if (now - lastSpawn > 520) { spawnPulse(); lastSpawn = now; }
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      draw(0); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    // pause when the hero scrolls out of view
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible && !running && !reduce) { running = true; prev = performance.now(); raf = requestAnimationFrame(loop); }
        else if (!visible) { running = false; cancelAnimationFrame(raf); }
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

  return (
    <div className="hero__bg" aria-hidden="true">
      <div className="hero__aurora" />
      <canvas ref={ref} className="hero__canvas" />
      <div className="hero__scrim" />
    </div>
  );
}
