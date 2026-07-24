"use client";

import { useEffect, useRef, useState } from "react";
import { BlueprintBrain } from "./BlueprintBrain";

/**
 * Brutalist-industrial hero. A bespoke technical line-drawing of a brain
 * (BlueprintBrain — pure SVG, annotated like a spec sheet) sits beside the type
 * with a subtle scroll-parallax; the headline is heavy grotesque, annotated
 * with a mono `struct CompanyBrain {}` spec block and a live scroll readout.
 * Flat & matte — no glow, no stock image.
 */
export function BrutalHero() {
  const objRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0);
        if (!reduce && objRef.current && y < window.innerHeight * 1.5) {
          objRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero">
      <div className="hero__object" ref={objRef} aria-hidden="true">
        <BlueprintBrain />
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
          <h1 className="dsp hero__title mt-s">
            <span className="ln">Persistent</span>
            <span className="ln">Semantic</span>
            <span className="ln">World<span className="brk">_</span>Model<span className="brk">.</span></span>
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
