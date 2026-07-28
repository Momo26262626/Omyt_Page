"use client";

import { useEffect, useRef, useState } from "react";
import { BrainOrganism } from "./BrainOrganism";

/**
 * Brutalist-industrial hero. The product's own brain organism (BrainOrganism —
 * canvas point cloud, real anatomy) sits beside the type; the headline is heavy
 * grotesque, annotated with a mono `struct CompanyBrain {}` spec block and a
 * live scroll readout. Flat & matte — no glow, no stock image.
 *
 * The brain is pinned via CSS `position: sticky` and turns itself off the
 * scroll position it reads; this component only owns the numeric readout.
 * `scrollHeight` is cached on resize rather than read per frame, so the scroll
 * handler never forces a reflow.
 */
export function BrutalHero() {
  const [pct, setPct] = useState(0);
  const objRef = useRef<HTMLDivElement | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);

  // Scroll-dock: past the hero the organism glides into the assistant's
  // "Ask about omyt" tile (FLIP: fix the wrapper, measure the jump, correct it,
  // interpolate to the tile's measured centre) shrinking and fading so it
  // vanishes right into the tile, then hands off with a one-time peek event.
  // Desktop only; reduced-motion never docks (the organism just scrolls away).
  useEffect(() => {
    const obj = objRef.current;
    const dockEl = dockRef.current;
    if (!obj || !dockEl) return;
    const mqDesk = window.matchMedia("(min-width: 900px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let raf = 0;
    let docked = false;
    let peekFired = false;
    let base = { x: 0, y: 0 };
    let start = { cx: 0, cy: 0, w: 1 };
    // dock target = the assistant's "Ask about omyt" tile, measured once per
    // dock (it's position: fixed, so the rect is stable until a resize undocks)
    let target = { cx: 0, cy: 0, w: 150 };
    const startAt = () => window.innerHeight * 0.45;
    const endAt = () => window.innerHeight * 1.15;

    const measureTarget = () => {
      const fab = document.querySelector<HTMLElement>(".asst__fab");
      const r = fab?.getBoundingClientRect();
      if (r && r.width > 0) {
        // land on the tile's centre, shrunk to roughly tile height so the
        // organism reads as being absorbed by the tile rather than parked
        target = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: Math.max(64, r.height * 1.8) };
      } else {
        target = { cx: window.innerWidth - 120, cy: window.innerHeight - 150, w: 150 };
      }
    };

    const undock = () => {
      if (!docked) return;
      docked = false;
      obj.classList.remove("is-dock");
      dockEl.style.transform = "";
      dockEl.style.opacity = "";
    };

    const frame = () => {
      raf = 0;
      if (!mqDesk.matches || mqReduce.matches) return undock();
      const y = window.scrollY;
      if (y <= startAt()) return undock();

      if (!docked) {
        const pre = dockEl.getBoundingClientRect();
        if (pre.width === 0) return;
        obj.classList.add("is-dock");
        dockEl.style.transform = "none";
        const post = dockEl.getBoundingClientRect();
        base = { x: pre.left - post.left, y: pre.top - post.top };
        start = { cx: pre.left + pre.width / 2, cy: pre.top + pre.height / 2, w: pre.width };
        measureTarget();
        docked = true;
      }
      const p = Math.min(1, (y - startAt()) / (endAt() - startAt()));
      const t = p * p * (3 - 2 * p); // smoothstep
      const s = 1 + (target.w / start.w - 1) * t;
      const dx = base.x + (target.cx - start.cx) * t;
      const dy = base.y + (target.cy - start.cy) * t;
      dockEl.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
      // fade out over the last stretch so it disappears right into the tile
      const fade = Math.max(0, (p - 0.72) / 0.28);
      dockEl.style.opacity = String(1 - fade * fade);
      if (p >= 1 && !peekFired) {
        peekFired = true;
        window.dispatchEvent(new CustomEvent("omyt:assistant:peek"));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      undock();
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPct(Math.max(0, Math.min(100, Math.round((window.scrollY / max) * 100))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero__object" aria-hidden="true" ref={objRef}>
        <div className="hero__dockable" ref={dockRef}>
          <BrainOrganism className="hero__brain" />
        </div>
      </div>

      <div className="hero__inner container">
        {/* top: spec code block + registration meta */}
        <div className="hero__top">
          <div className="hero__spec">
            <div className="label label--acc">// company_brain.spec</div>
            <pre className="code mt-s" aria-hidden="true">
              {`struct CompanyBrain {
  `}
              <span className="k">source</span>
              {`(worth_knowing);
  `}
              <span className="k">understand</span>
              {`(each_one);
  `}
              <span className="k">act</span>
              {`(when_ready);
  `}
              <span className="k">learn</span>
              {`(from_the_outcome);
};`}
            </pre>
          </div>
          <div className="hero__meta">
            <div className="hero__brand">OMYT®</div>
            <div className="hero__scroll">EST_2026 // v2</div>
          </div>
        </div>

        {/* middle: the statement */}
        <div className="hero__mid">
          <div style={{ marginBottom: 20 }}>
            <span className="pill">
              <span className="pill__dot" /> <b>Invite-only</b> · setting up brains
            </span>
          </div>
          <div className="label">// the company brain</div>
          <h1 className="dsp hero__title stagger mt-s">
            <span className="ln" style={{ ["--i" as string]: 0 }}>
              Meet omyt.
            </span>
            <span className="ln" style={{ ["--i" as string]: 1 }}>
              The company
            </span>
            <span className="ln" style={{ ["--i" as string]: 2 }}>
              brain<span className="brk">.</span>
            </span>
          </h1>
          <p className="hero__lede">
            It holds everything your business knows — every account, campaign, thread and outcome —
            reasons across all of it continuously, and acts on what it concludes.{" "}
            <span style={{ color: "var(--bone)" }}>
              Today that means sales and marketing run themselves.
            </span>{" "}
            It doesn&rsquo;t stop there.
          </p>
        </div>

        {/* bottom: actions + instrument */}
        <div className="hero__bottom">
          <div className="hero__cta">
            <a href="#waitlist" className="btn btn--primary btn--lg">
              Request an invite <span className="arr">↗</span>
            </a>
            <a href="#model" className="btn btn--ghost btn--lg">
              Read the spec <span className="arr">↗</span>
            </a>
          </div>
          <div className="hero__proof">
            <span className="hero__proof-dot" aria-hidden />
            omyt runs omyt. We are our own first customer — this company&rsquo;s go-to-market is
            sourced, researched and written by the brain.
          </div>
          <div className="hero__scroll">
            scroll // <span className="mono">{String(pct).padStart(2, "0")}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
