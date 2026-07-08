import Link from "next/link";
import { Send, Columns3, Workflow, Compass, Sparkles, Repeat, OctagonX, ShieldCheck, MousePointerClick, SlidersHorizontal } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";

const APP = "https://app.omyt.ai";

export default function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="hero hero--video">
        <HeroBackground />
        <div className="container hero__center">
          <span className="chip"><span className="dot dot--live" /> Always running · Sales OS</span>
          <h1 className="display hero__title">
            The operating layer<br />for <span className="grad-text">go-to-market</span>.
          </h1>
          <p className="lede hero__lede">
            omyt runs your outreach, pipeline, automations, and strategy on one
            surface — then tells you exactly where to act. Open it, know your move,
            act from there.
          </p>
          <div className="hero__cta">
            <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
            <Link href="/product" className="btn btn--ghost btn--lg">See how it works</Link>
          </div>
          <div className="hero__note">
            <span><span className="tick">✓</span> No credit card</span>
            <span><span className="tick">✓</span> Self-serve — no demo calls</span>
            <span><span className="tick">✓</span> Live in minutes</span>
          </div>
        </div>
      </section>

      {/* ── POSITIONING STRIP ──────────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container center">
          <p className="eyebrow no-rule" style={{ justifyContent: "center" }}>Not a CRM wrapper · Not analytics · Not a copilot bolted on</p>
          <p className="h3 measure" style={{ marginInline: "auto", marginTop: 14, color: "var(--ink-2)", fontWeight: 600 }}>
            It's the place a founder runs the whole business — a new category, built for the operator who is also the decision-maker.
          </p>
        </div>
      </section>

      {/* ── STAT BAND ──────────────────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <Reveal className="stats">
            <div className="stat"><div className="stat__n"><CountUp to={5} suffix="" /> <span className="u">systems</span></div><div className="stat__l">Outreach, pipeline, automations, strategy, intelligence — one surface</div></div>
            <div className="stat"><div className="stat__n"><CountUp to={1} /> <span className="u">brain</span></div><div className="stat__l">Reads everything, surfaces what to fix next</div></div>
            <div className="stat"><div className="stat__n"><CountUp to={24} suffix="/7" /></div><div className="stat__l">Automations that run while you sleep</div></div>
            <div className="stat"><div className="stat__n"><CountUp to={0} /> <span className="u">busywork</span></div><div className="stat__l">The loop closes itself and learns from every outcome</div></div>
          </Reveal>
        </div>
      </section>

      {/* ── ONE SURFACE, FIVE SYSTEMS ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">One surface, five systems</span>
            <h2 className="h2">Everything that moves revenue, in one place.</h2>
            <p className="lede measure">
              Most stacks scatter GTM across ten tools that don't talk. omyt unifies
              them so the data — and the decisions — live together.
            </p>
          </Reveal>

          <div className="grid cols-3 mt-l">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <div className="tile feat">
                  <div className="feat__ico" aria-hidden><f.Icon size={21} strokeWidth={1.75} /></div>
                  <h3 className="h3">{f.t}</h3>
                  <p>{f.d}</p>
                  <ul className="feat__list">{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE LAYER ─────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="intelligence">
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">The intelligence layer</span>
            <h2 className="h2">Three kinds of data, one judgment.</h2>
            <p className="lede measure">The differentiator isn't more dashboards. It's that omyt fuses signals most tools never connect — and reasons across them.</p>
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

      {/* ── SHOWCASE: BRAIN ────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="brain">
        <div className="container">
          <div className="showrow">
            <Reveal className="showrow__copy">
              <span className="eyebrow eyebrow--accent">Sales Brain</span>
              <h3>It reads your whole operation and tells you the next move.</h3>
              <p>The Brain scans pipeline, signals, and outcomes — then surfaces the one thing to fix, with the reasoning behind it. You stay the decision-maker; it removes the staring-at-dashboards tax.</p>
              <ul className="feat__list mt-s">
                <li>Ranks what's at risk and what's ready to push</li>
                <li>Explains why — never a black box</li>
                <li>Proposes plays you approve or veto; it learns from both</li>
              </ul>
            </Reveal>
            <Reveal className="showrow__media" delay={120}>
              <div className="tile panel">
                <div className="panel__bar"><span className="panel__dot" style={{ background: "var(--red)" }} /><span className="panel__dot" style={{ background: "var(--amber)" }} /><span className="panel__dot" style={{ background: "var(--emerald)" }} /><span className="panel__title">Brain · priorities</span></div>
                <div className="row"><div className="row__l"><div className="row__av" style={{ background: "var(--grad-warm)" }}>!</div><div><div className="row__name">Northwind — renewal at risk</div><div className="row__sub">No reply in 9 days · champion went quiet</div></div></div><span className="tag tag--amber">act now</span></div>
                <div className="row"><div className="row__l"><div className="row__av" style={{ background: "var(--grad-intel)" }}>↑</div><div><div className="row__name">Acme — buying signal detected</div><div className="row__sub">Visited pricing 3× · expand sequence</div></div></div><span className="tag tag--sky">ready</span></div>
                <div className="row" style={{ marginBottom: 0 }}><div className="row__l"><div className="row__av" style={{ background: "var(--grad-ink)" }}>✓</div><div><div className="row__name">Q3 outreach list refreshed</div><div className="row__sub">214 net-new ICP accounts scored</div></div></div><span className="tag tag--emerald">done</span></div>
              </div>
            </Reveal>
          </div>

          {/* ── SHOWCASE: AUTOMATIONS ────────────────────────────────── */}
          <div className="showrow showrow--flip">
            <Reveal className="showrow__media">
              <div className="tile panel">
                <div className="panel__bar"><span className="panel__dot" /><span className="panel__dot" /><span className="panel__dot" /><span className="panel__title">Automations · running</span></div>
                <div className="row"><div className="row__l"><div className="row__av" style={{ background: "var(--grad-intel)" }}>✉</div><div><div className="row__name">Cold email — Wave 4</div><div className="row__sub">42 sent today · 6 replies</div></div></div><span className="chip" style={{ height: 26 }}><span className="dot dot--live" /> live</span></div>
                <div style={{ padding: "4px 2px 12px" }}><div className="bar"><i style={{ width: "84%" }} /></div><div className="row__sub" style={{ marginTop: 7 }}>Daily send budget · 42 / 50 · deliverability healthy</div></div>
                <div className="row" style={{ marginBottom: 0 }}><div className="row__l"><div className="row__av" style={{ background: "var(--grad-warm)" }}>↺</div><div><div className="row__name">Reply → trial nurture</div><div className="row__sub">Auto-routing positive replies to signup</div></div></div><span className="tag tag--violet">auto</span></div>
              </div>
            </Reveal>
            <Reveal className="showrow__copy" delay={120}>
              <span className="eyebrow eyebrow--accent">Automations</span>
              <h3>Work that actually runs — not another to-do list.</h3>
              <p>Outreach sequences, list-building, reply routing, follow-ups. They execute on their own, inside guardrails you control, and route every positive reply straight toward a self-serve signup. No calls. No meetings. No manual queue.</p>
              <ul className="feat__list mt-s">
                <li>Email-first sequences with built-in deliverability limits</li>
                <li>One emergency stop halts every outbound channel at once</li>
                <li>Self-serve funnel — replies become trials, not calendar invites</li>
              </ul>
            </Reveal>
          </div>

          {/* ── SHOWCASE: OUTCOMES LOOP ──────────────────────────────── */}
          <div className="showrow">
            <Reveal className="showrow__copy">
              <span className="eyebrow eyebrow--accent">The loop</span>
              <h3>Every outcome feeds back as a sharper next move.</h3>
              <p>Won, lost, replied, ignored — omyt records what happened and folds it into the next decision. Your North Star goal sits at the center; everything orbits toward it and compounds over time.</p>
              <ul className="feat__list mt-s">
                <li>One six-month goal anchors the whole system</li>
                <li>Approvals and vetoes train future suggestions</li>
                <li>The engine gets more right the longer it runs</li>
              </ul>
            </Reveal>
            <Reveal className="showrow__media" delay={120}>
              <div className="tile panel">
                <div className="panel__bar"><span className="panel__dot" /><span className="panel__dot" /><span className="panel__dot" /><span className="panel__title">Outcomes · North Star</span></div>
                <div style={{ padding: "6px 4px 4px" }}>
                  <div className="row__sub">Progress to 6-month goal</div>
                  <div className="stat__n" style={{ fontSize: "2.2rem", marginTop: 6 }}><CountUp to={68} suffix="%" /></div>
                  <div className="bar" style={{ marginTop: 12 }}><i style={{ width: "68%", background: "var(--grad-warm)" }} /></div>
                </div>
                <div className="grid cols-2" style={{ marginTop: 14, gap: 8 }}>
                  <div className="row" style={{ margin: 0, display: "block" }}><div className="row__sub">Pipeline created</div><div className="row__name" style={{ fontSize: 16 }}>+$184k</div></div>
                  <div className="row" style={{ margin: 0, display: "block" }}><div className="row__sub">Reply → trial</div><div className="row__name" style={{ fontSize: 16 }}>23%</div></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="sec-head sec-head--center">
            <span className="eyebrow eyebrow--accent" style={{ justifyContent: "center" }}>How it works</span>
            <h2 className="h2">Live in an afternoon. Compounding from day one.</h2>
          </Reveal>
          <Reveal className="steps mt-l">
            {STEPS.map((s, i) => (
              <div className="step" key={s.t}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── GUARDRAILS ─────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">Trust by design</span>
            <h2 className="h2">Bold doesn't mean reckless.</h2>
            <p className="lede measure">Automation you'd actually leave running. Every outbound path sits behind guardrails — and one switch.</p>
          </Reveal>
          <div className="grid cols-2 mt-l">
            {GUARDS.map((g, i) => (
              <Reveal key={g.t} delay={i * 60}>
                <div className="guard"><span className="guard__ic" aria-hidden><g.Icon size={18} strokeWidth={1.9} /></span><div><b>{g.t}</b><p>{g.d}</p></div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="ctaband">
            <span className="eyebrow eyebrow--accent" style={{ justifyContent: "center" }}>Your move</span>
            <h2 className="h2" style={{ marginTop: 14 }}>Open omyt. Know exactly where to act.</h2>
            <p>The operating layer for the founder who runs the whole thing. Start free — you'll be live before your coffee's cold.</p>
            <div className="ctaband__cta">
              <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
              <Link href="/pricing" className="btn btn--ghost btn--lg">See pricing</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const FEATURES = [
  { Icon: Send, t: "Outreach", d: "Email-first sequences that build their own lists, personalize, and send inside deliverability guardrails.", points: ["ICP scoring & enrichment", "Reply classification", "Daily-cap & bounce protection"] },
  { Icon: Columns3, t: "Pipeline", d: "A CRM that's actually the source of truth — every touch, signal, and stage in one ledger.", points: ["Stage health at a glance", "Risk & next-action scoring", "No busywork data entry"] },
  { Icon: Workflow, t: "Automations", d: "Background work that runs itself: list-building, follow-ups, reply routing, nurture.", points: ["Always-on, inside guardrails", "One emergency stop", "Self-serve, no calls"] },
  { Icon: Compass, t: "Strategy", d: "ICP, positioning, moat, risks, and a 90-day plan — kept honest by your real data.", points: ["GTM bets & plays", "Freeze / unfreeze governance", "Approve or veto, granularly"] },
  { Icon: Sparkles, t: "Intelligence", d: "Micro, macro, and experience data fused into one judgment about what to do next.", points: ["Market & account signals", "Learns from every outcome", "Surfaces, never buries"] },
  { Icon: Repeat, t: "The loop", d: "Outcomes feed back as new signals, so the system compounds toward your North Star.", points: ["One six-month goal", "Closed-loop learning", "Gets sharper over time"] },
];

const TRIAD = [
  { k: "μ", t: "Micro data", d: "Contact- and deal-level signals — who's engaging, who's gone quiet, who's showing intent right now." },
  { k: "Μ", t: "Macro data", d: "Market and industry trends, shocks, and timing — the weather your accounts are operating in." },
  { k: "e²", t: "Experience²", d: "Behavioral and interaction history that turns raw activity into judgment about what actually works." },
];

const STEPS = [
  { t: "Connect & set your North Star", d: "Drop in your context and name the one six-month goal. omyt builds your strategy spine and scores your ICP." },
  { t: "Turn on the engine", d: "Approve the first plays. Outreach, list-building, and follow-ups start running inside your guardrails." },
  { t: "Act from the surface", d: "Open omyt, read the Brain's priorities, push where it points. Every outcome makes the next call sharper." },
];

const GUARDS = [
  { Icon: OctagonX, t: "One emergency stop", d: "A single switch halts outreach, auto-replies, transactional email, and direct mail at once — instantly." },
  { Icon: ShieldCheck, t: "Deliverability guardrails", d: "Per-day send caps, suppression lists, and a bounce-rate circuit breaker protect your domain automatically." },
  { Icon: MousePointerClick, t: "Self-serve by design", d: "No calls, no meetings, no calendar bookings. Positive replies route straight to a product trial." },
  { Icon: SlidersHorizontal, t: "You stay in control", d: "Strategy can be frozen. Every AI suggestion is yours to approve or veto — and both train what comes next." },
];
