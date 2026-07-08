import type { Metadata } from "next";
import Link from "next/link";
import { Snowflake, GitPullRequestArrow, Repeat, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

export const metadata: Metadata = {
  title: "Product",
  description:
    "Inside omyt: the Sales Brain, the intelligence layer, always-on automations, and the closed loop that learns from every outcome.",
};

const APP = "https://app.omyt.ai";

export default function Product() {
  return (
    <>
      {/* HERO */}
      <section className="hero section--tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow eyebrow--accent">The product</span>
            <h1 className="h1" style={{ marginTop: 18 }}>One surface. Your whole go-to-market, thinking.</h1>
            <p className="lede" style={{ marginTop: 18, maxWidth: "56ch" }}>
              omyt isn't a tool you check — it's a system that runs. Underneath the
              calm surface, five systems share one brain and one closed loop that
              gets sharper every day.
            </p>
            <div className="hero__cta">
              <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
              <Link href="/pricing" className="btn btn--ghost btn--lg">See pricing</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SYSTEM MAP */}
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="kicker-grid">
            {SYSTEMS.map((s, i) => (
              <div className="kicker" key={s.t}>
                <div className="kicker__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="kicker__t">{s.t}</div>
                <div className="kicker__d">{s.d}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BRAIN */}
      <section className="section" id="brain">
        <div className="container">
          <div className="showrow">
            <Reveal className="showrow__copy">
              <span className="eyebrow eyebrow--accent">Sales Brain</span>
              <h2 className="h2" style={{ marginTop: 14 }}>The layer that decides what matters.</h2>
              <p className="lede" style={{ marginTop: 16 }}>
                The Brain reads your pipeline, signals, and history, then ranks the
                next moves — with the reasoning attached. It proposes; you decide.
              </p>
              <ul className="feat__list mt-s">
                <li>Reads every databank — CRM, signals, outcomes, macro</li>
                <li>Surfaces the one thing to fix, never a wall of charts</li>
                <li>Explains the why; it's interpretation, not a black box</li>
                <li>Suggestions are approved or vetoed — both teach it</li>
              </ul>
            </Reveal>
            <Reveal className="showrow__media" delay={120}>
              <div className="tile panel">
                <div className="panel__bar"><span className="panel__dot" style={{ background: "var(--red)" }} /><span className="panel__dot" style={{ background: "var(--amber)" }} /><span className="panel__dot" style={{ background: "var(--emerald)" }} /><span className="panel__title">Brain · reasoning</span></div>
                <div className="row" style={{ display: "block" }}>
                  <div className="row__name">“Push Acme this week.”</div>
                  <div className="row__sub" style={{ marginTop: 6, lineHeight: 1.5 }}>3 pricing visits in 5 days, champion re-engaged, macro tailwind in their sector. Highest expected-value move on the board.</div>
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}><span className="tag tag--sky">intent ↑</span><span className="tag tag--violet">macro +</span><span className="tag tag--emerald">champion</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE */}
      <section className="section" style={{ paddingTop: 0 }} id="intelligence">
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">The intelligence layer</span>
            <h2 className="h2">The data most tools never connect.</h2>
            <p className="lede measure">omyt fuses three signal types into one judgment. That fusion — not another dashboard — is the differentiator.</p>
          </Reveal>
          <div className="triad mt-l">
            {TRIAD.map((t, i) => (
              <Reveal key={t.t} delay={i * 80}>
                <div className="tile feat">
                  <div className="feat__ico" aria-hidden>{t.k}</div>
                  <h3 className="h3">{t.t}</h3>
                  <p>{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATIONS + DELIVERABILITY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="showrow showrow--flip">
            <Reveal className="showrow__media">
              <div className="tile panel">
                <div className="panel__bar"><span className="panel__dot" /><span className="panel__dot" /><span className="panel__dot" /><span className="panel__title">Deliverability · protected</span></div>
                <div style={{ padding: "4px 2px 6px" }}>
                  <div className="row__sub">Today's send budget</div>
                  <div className="stat__n" style={{ fontSize: "2rem", marginTop: 4 }}><CountUp to={42} />/50</div>
                  <div className="bar" style={{ marginTop: 12 }}><i style={{ width: "84%" }} /></div>
                </div>
                <div className="grid cols-2" style={{ marginTop: 12, gap: 8 }}>
                  <div className="row" style={{ margin: 0, display: "block" }}><div className="row__sub">Bounce rate (7d)</div><div className="row__name" style={{ fontSize: 15, color: "var(--emerald-deep)" }}>0.4% · healthy</div></div>
                  <div className="row" style={{ margin: 0, display: "block" }}><div className="row__sub">Suppression list</div><div className="row__name" style={{ fontSize: 15 }}>Enforced</div></div>
                </div>
              </div>
            </Reveal>
            <Reveal className="showrow__copy" delay={120}>
              <span className="eyebrow eyebrow--accent">Automations & outreach</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Always-on, never reckless.</h2>
              <p className="lede" style={{ marginTop: 16 }}>
                Email-first sequences build lists, personalize, send, and route
                replies on their own — inside deliverability guardrails that protect
                your domain without you thinking about it.
              </p>
              <ul className="feat__list mt-s">
                <li>Per-day send caps and warm-up pacing</li>
                <li>Suppression lists and a 7-day bounce circuit breaker</li>
                <li>Replies classified and routed to a self-serve signup</li>
                <li>One emergency stop halts every outbound channel</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GOVERNANCE / LOOP */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">Governance & the loop</span>
            <h2 className="h2">It learns from you — on your terms.</h2>
            <p className="lede measure">Strategy is governed, not improvised. You hold the controls; the system compounds within them.</p>
          </Reveal>
          <div className="grid cols-2 mt-l">
            {GOVERN.map((g, i) => (
              <Reveal key={g.t} delay={i * 60}>
                <div className="tile feat" style={{ flexDirection: "row", gap: 16 }}>
                  <div className="feat__ico" aria-hidden style={{ flex: "none" }}><g.Icon size={21} strokeWidth={1.75} /></div>
                  <div><h3 className="h3">{g.t}</h3><p style={{ marginTop: 6 }}>{g.d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="ctaband">
            <h2 className="h2">See the surface. Then never miss the move.</h2>
            <p>Start free and let the engine run. The Brain will have your first priorities ready in minutes.</p>
            <div className="ctaband__cta">
              <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
              <Link href="/about" className="btn btn--ghost btn--lg">Why we built it</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const SYSTEMS = [
  { t: "Outreach", d: "Email-first sequences with list-building, enrichment, and reply handling." },
  { t: "Pipeline", d: "A CRM that's the real source of truth — every touch and stage, scored." },
  { t: "Automations", d: "Background work that runs itself inside guardrails you control." },
  { t: "Strategy", d: "ICP, positioning, moat, risks, plays, and a 90-day plan kept honest." },
  { t: "Intelligence", d: "Micro, macro, and experience data fused into one next-best-move." },
];

const TRIAD = [
  { k: "μ", t: "Micro data", d: "Contact- and deal-level signals — engagement, intent, silence, momentum — at the resolution of a single relationship." },
  { k: "Μ", t: "Macro data", d: "Market and industry trends, shocks, and timing windows. The conditions your accounts are buying in, not just who they are." },
  { k: "e²", t: "Experience²", d: "Interaction history compounded into judgment — what messaging, timing, and sequencing actually convert for you." },
];

const GOVERN = [
  { Icon: Snowflake, t: "Freeze & unfreeze", d: "Lock your strategy when it's set. When you unfreeze, the system proposes changes for review — never silent edits." },
  { Icon: GitPullRequestArrow, t: "Approve or veto", d: "Every suggestion is granular. Accept what's right, veto what isn't — and vetoes are logged to refine what comes next." },
  { Icon: Repeat, t: "Closed-loop learning", d: "Won, lost, replied, ignored — every outcome folds back into the next decision and orbits your North Star." },
  { Icon: Star, t: "One North Star", d: "A single six-month goal anchors the whole engine, so every automation and play pulls in the same direction." },
];
