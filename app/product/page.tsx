import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Inside omyt: how one model holds everything your business knows, reasons across it continuously, and acts — sourcing, outreach, pipeline and marketing in one loop.",
};

export default function Product() {
  return (
    <>
      {/* HERO */}
      <section className="panel phero">
        <div className="container">
          <div className="label label--acc">// the product</div>
          <h1 className="h1 phero__title mt-s">One model.<br />Your whole business,<br />thinking.</h1>
          <p className="lede phero__lede">
            omyt isn&rsquo;t a tool you check, it&rsquo;s a company brain that runs. Five systems feed
            one model of your business, one brain reasons across all of it, and one closed loop
            makes it sharper every day. Sales and marketing first.
          </p>
          <div className="phero__cta">
            <a href="/#waitlist" className="btn btn--primary btn--lg">Join the waitlist <span className="arr">↗</span></a>
            <Link href="/partners" className="btn btn--ghost btn--lg">Design partners <span className="arr">↗</span></Link>
          </div>
        </div>
      </section>

      {/* SYSTEM MAP */}
      <section className="panel section">
        <div className="container">
          <div className="label">// 001 — the systems</div>
          <div className="rows mt-l">
            {SYSTEMS.map((s, i) => (
              <Reveal key={s.t} className="row-item" delay={i * 40}>
                <div className="row-item__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="row-item__t">{s.t}</div>
                <div className="row-item__d">{s.d}</div>
                <div className="row-item__x">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRAIN (concrete) */}
      <section className="panel panel--concrete section" id="brain">
        <div className="container">
          <div className="show">
            <Reveal>
              <div className="label label--acc">// the brain</div>
              <h2 className="show__h">The layer that decides what matters.</h2>
              <p className="show__p">The brain reads the whole model — pipeline, signals, history, market — then ranks the next moves with the reasoning attached. It proposes; you decide.</p>
              <ul className="show__list">
                <li>Reasons over the entire model — CRM, signals, outcomes, macro</li>
                <li>Surfaces the one thing to fix, never a wall of charts</li>
                <li>Explains the why; interpretation, not a black box</li>
                <li>Suggestions are approved or vetoed — both teach it</li>
              </ul>
            </Reveal>
            <Reveal delay={100} className="show__media">
              <div className="term">
                <div className="term__bar"><b /> brain // decision.log</div>
                <div className="term__body">
                  <div className="trow" style={{ display: "block" }}>
                    <div className="trow__t">&ldquo;Push Acme this week.&rdquo;</div>
                    <div className="trow__s" style={{ lineHeight: 1.6, marginTop: 8 }}>3 pricing visits / 5d · champion re-engaged · macro tailwind in sector. Highest expected-value move in the model right now.</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                      <span className="stat-tag stat-tag--acc">intent ↑</span>
                      <span className="stat-tag">macro +</span>
                      <span className="stat-tag">champion</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORLD MODEL / INTELLIGENCE */}
      <section className="panel section" id="intelligence">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 002 — the world model</div>
              <h2 className="h2 sec__h">Three kinds<br />of signal, one<br />connected picture.</h2>
            </div>
            <p className="sec__lede lede">omyt fuses three signal types into one semantic model. That fusion — not another dashboard — is what lets it reason about your world instead of reciting it.</p>
          </div>
          <Reveal className="cards cols-3 grid mt-l">
            {TRIAD.map((t) => (
              <div className="card" key={t.t}>
                <div className="card__n">[{t.k}]</div>
                <div className="card__t">{t.t}</div>
                <p className="card__d">{t.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* AUTOMATIONS (concrete) */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="show show--flip">
            <Reveal className="show__media">
              <div className="term">
                <div className="term__bar"><b /> deliverability // protected</div>
                <div className="term__body">
                  <div className="trow" style={{ display: "block" }}>
                    <div className="trow__s">today&rsquo;s send budget</div>
                    <div className="trow__t" style={{ fontSize: "1.8rem", marginTop: 4 }}>42 / 50</div>
                    <div className="meter" style={{ marginTop: 10 }}><i style={{ width: "84%" }} /></div>
                  </div>
                  <div className="trow"><div><div className="trow__t">bounce rate (7d)</div><div className="trow__s">circuit breaker armed</div></div><span className="stat-tag stat-tag--acc">0.4% ok</span></div>
                  <div className="trow"><div><div className="trow__t">suppression list</div><div className="trow__s">unsubscribes + bounces</div></div><span className="stat-tag">enforced</span></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="label label--acc">// automations & outreach</div>
              <h2 className="show__h">Always-on, never reckless.</h2>
              <p className="show__p">Email-first sequences build lists, personalize, send, and route replies on their own — inside deliverability guardrails that protect your domain without you thinking about it.</p>
              <ul className="show__list">
                <li>Per-day send caps and warm-up pacing</li>
                <li>Suppression lists and a 7-day bounce circuit breaker</li>
                <li>Replies classified, routed, and folded back into the model</li>
                <li>One emergency stop halts every outbound channel</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="panel section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 003 — governance & the loop</div>
              <h2 className="h2 sec__h">It learns<br />from you — on<br />your terms.</h2>
            </div>
            <p className="sec__lede lede">The model is governed, not improvised. You hold the controls; it compounds within them.</p>
          </div>
          <Reveal className="cards cols-2 grid mt-l">
            {GOVERN.map((g, i) => (
              <div className="card" key={g.t}>
                <div className="card__n">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="card__t">{g.t}</div>
                <p className="card__d">{g.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="panel section">
        <div className="container">
          <div className="label label--acc">// your move</div>
          <h2 className="dsp cta__h mt-s">See the model.<br />Never miss<br />the move.</h2>
          <div className="cta__row">
            <p className="cta__p">Request an invite. We build brains in small waves and reach out when yours is ready.</p>
            <div className="hero__cta">
              <a href="/#waitlist" className="btn btn--acc btn--lg">Join the waitlist <span className="arr">↗</span></a>
              <Link href="/about" className="btn btn--ghost btn--lg">Why we built it <span className="arr">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const SYSTEMS = [
  { t: "Outreach", d: "Email-first sequences with list-building, enrichment, and reply handling — all feeding the model." },
  { t: "Pipeline", d: "A CRM that's the real source of truth — every touch and stage, held and scored in the model." },
  { t: "Automations", d: "Background work that runs itself inside guardrails you control." },
  { t: "Strategy", d: "ICP, positioning, moat, risks, plays, and a 90-day plan kept honest by real data." },
  { t: "Intelligence", d: "Micro, macro, and experience signals fused into one next-best-move." },
];

const TRIAD = [
  { k: "μ", t: "Micro signals", d: "Contact- and deal-level signals — engagement, intent, silence, momentum — at the resolution of a single relationship." },
  { k: "Μ", t: "Macro signals", d: "Market and industry trends, shocks, and timing windows. The conditions your accounts are buying in, not just who they are." },
  { k: "e²", t: "Experience²", d: "Interaction history compounded into judgment — what messaging, timing, and sequencing actually convert for you." },
];

const GOVERN = [
  { t: "Freeze & unfreeze", d: "Lock your strategy when it's set. When you unfreeze, the model proposes changes for review — never silent edits." },
  { t: "Approve or veto", d: "Every suggestion is granular. Accept what's right, veto what isn't — and vetoes are logged to refine what comes next." },
  { t: "Closed-loop learning", d: "Won, lost, replied, ignored — every outcome folds back into the model and orbits your North Star." },
  { t: "One North Star", d: "A single six-month goal anchors the whole engine, so every automation and play pulls in the same direction." },
];
