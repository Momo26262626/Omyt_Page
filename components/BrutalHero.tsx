"use client";

import { useEffect, useState } from "react";
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
      <div className="hero__object" aria-hidden="true">
        <BrainOrganism className="hero__brain" />
      </div>

      <div className="hero__inner container">
        {/* top: spec code block + registration meta */}
        <div className="hero__top">
          <div className="hero__spec">
            <div className="label label--acc">// company_brain.spec</div>
            <pre className="code mt-s" aria-hidden="true">
{`struct CompanyBrain {
  `}<span className="k">ingest</span>{`(signals);
  `}<span className="k">model</span>{`(meaning);
  `}<span className="k">reason</span>{`(forward);
  `}<span className="k">remember</span>{`(everything);
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
            <span className="ln" style={{ ["--i" as string]: 0 }}>Persistent</span>
            <span className="ln" style={{ ["--i" as string]: 1 }}>Semantic</span>
            <span className="ln" style={{ ["--i" as string]: 2 }}>World<span className="brk">_</span>Model<span className="brk">.</span></span>
          </h1>
          <p className="hero__lede">
            omyt reads every signal your business emits — deals, conversations, market, outcomes —
            models what it means, and <span style={{ color: "var(--bone)" }}>remembers all of it</span>.
            So you always know the next move.
          </p>
        </div>

        {/* bottom: actions + instrument */}
        <div className="hero__bottom">
          <div className="hero__cta">
            <a href="#waitlist" className="btn btn--primary btn--lg">
              Join the waitlist <span className="arr">↗</span>
            </a>
            <a href="#model" className="btn btn--ghost btn--lg">
              Read the spec <span className="arr">↗</span>
            </a>
          </div>
          <div className="hero__scroll">
            scroll // <span className="mono">{String(pct).padStart(2, "0")}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
