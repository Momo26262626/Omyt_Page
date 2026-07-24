import { Reveal } from "@/components/Reveal";
import { BrutalHero } from "@/components/BrutalHero";
import { Waitlist } from "@/components/Waitlist";

const TICKER = ["Persistent memory", "Semantic model", "Reasons forward", "Set up by hand", "Invite-only", "Local or hosted", "SaaS · Q4 2026"];

export default function Home() {
  return (
    <>
      <BrutalHero />

      {/* ── MANIFESTO ──────────────────────────────────────────────────── */}
      <section className="panel section--tight">
        <div className="container">
          <div className="label">// 001 — positioning</div>
          <Reveal>
            <h2 className="h1 mt-s" style={{ maxWidth: "18ch" }}>
              Not a CRM. Not a dashboard.<br />
              A <span className="acc">world model</span> of your company.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede mt-m">
              Most software stores rows and forgets the meaning. omyt keeps one connected,
              persistent model of your business — and reasons across all of it at once.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────────────────── */}
      <div className="panel ticker" aria-hidden="true">
        <div className="ticker__rail">
          <div className="ticker__track">
            {["a", "b"].flatMap((grp) =>
              TICKER.map((w) => (
                <span key={`${grp}-${w}`}>{w}<span className="ticker__sep" style={{ marginLeft: 44 }}>»</span></span>
              )),
            )}
          </div>
        </div>
      </div>

      {/* ── THE MODEL (concrete flip) ──────────────────────────────────── */}
      <section className="panel panel--concrete section" id="model">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 002 — the idea</div>
              <h2 className="h2 sec__h">Three words<br />that change<br />what software does.</h2>
            </div>
            <p className="sec__lede lede">
              &ldquo;Persistent semantic world model&rdquo; isn&rsquo;t jargon — it&rsquo;s
              three promises. Read them literally.
            </p>
          </div>

          <Reveal className="cards cols-3 grid mt-l">
            {CONCEPT.map((c, i) => (
              <div className="card" key={c.word}>
                <div className="card__n">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="card__t">{c.word}</div>
                <p className="card__d">{c.body}</p>
                <div className="card__list"><li>{c.tag}</li></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── THE LOOP ───────────────────────────────────────────────────── */}
      <section className="panel section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 003 — how it thinks</div>
              <h2 className="h2 sec__h">One loop,<br />running while<br />you sleep.</h2>
            </div>
            <p className="sec__lede lede">
              Every signal enters the model, becomes structure, and sharpens the next
              decision. Nothing is thrown away.
            </p>
          </div>

          <div className="rows mt-l">
            {LOOP.map((s, i) => (
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

      {/* ── CAPABILITIES (concrete flip) ───────────────────────────────── */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 004 — what the model runs</div>
              <h2 className="h2 sec__h">One brain.<br />Everything that<br />moves revenue.</h2>
            </div>
            <p className="sec__lede lede">
              Not separate tools stitched together — views into a single model. Which is why
              the data, and the decisions, finally live in one head.
            </p>
          </div>

          <Reveal className="cards cols-3 grid mt-l">
            {FEATURES.map((f, i) => (
              <div className="card" key={f.t}>
                <div className="card__n">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="card__t">{f.t}</div>
                <p className="card__d">{f.d}</p>
                <ul className="card__list">{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── SHOWCASE ───────────────────────────────────────────────────── */}
      <section className="panel section">
        <div className="container">
          <div className="show">
            <Reveal>
              <div className="label label--acc">// reasoning, not reporting</div>
              <h3 className="show__h">It reads the whole model and tells you the one thing to do next.</h3>
              <p className="show__p">Because every signal lives in the same model, the brain weighs them together — intent, silence, macro, history — and surfaces the highest-value move, with the reasoning attached.</p>
              <ul className="show__list">
                <li>Ranks what&rsquo;s at risk and what&rsquo;s ready to push</li>
                <li>Explains the why — never a black box</li>
                <li>Proposes plays you approve or veto; learns from both</li>
              </ul>
            </Reveal>
            <Reveal delay={100} className="show__media">
              <div className="term">
                <div className="term__bar"><b /> brain // reasoning.log</div>
                <div className="term__body">
                  <div className="trow"><div><div className="trow__t">Northwind — renewal at risk</div><div className="trow__s">no reply / 9d · champion quiet</div></div><span className="stat-tag stat-tag--acc">act now</span></div>
                  <div className="trow"><div><div className="trow__t">Acme — buying signal</div><div className="trow__s">pricing ×3 · expand sequence</div></div><span className="stat-tag">ready</span></div>
                  <div className="trow"><div><div className="trow__t">Q3 ICP list refreshed</div><div className="trow__s">214 accounts scored &amp; modelled</div></div><span className="stat-tag">done</span></div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="show show--flip">
            <Reveal className="show__media">
              <div className="term">
                <div className="term__bar"><b /> automations // running</div>
                <div className="term__body">
                  <div className="trow"><div><div className="trow__t">Cold email — Wave 4</div><div className="trow__s">42 sent · 6 replies</div></div><span className="stat-tag stat-tag--acc">live</span></div>
                  <div style={{ padding: "10px 0 4px" }}>
                    <div className="meter"><i style={{ width: "84%" }} /></div>
                    <div className="trow__s">daily budget · 42 / 50 · deliverability healthy</div>
                  </div>
                  <div className="trow"><div><div className="trow__t">Reply → trial nurture</div><div className="trow__s">routing positive replies to signup</div></div><span className="stat-tag">auto</span></div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="label label--acc">// work that runs itself</div>
              <h3 className="show__h">The model doesn&rsquo;t just advise. It acts.</h3>
              <p className="show__p">Outreach, list-building, reply routing, follow-ups — they execute on their own, inside guardrails you control, and route every positive reply toward a self-serve signup. No calls. No queue.</p>
              <ul className="show__list">
                <li>Email-first sequences with deliverability limits</li>
                <li>One emergency stop halts every channel at once</li>
                <li>Replies become trials, not calendar invites</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GUARDRAILS (concrete flip) ─────────────────────────────────── */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 005 — trust by design</div>
              <h2 className="h2 sec__h">A brain you&rsquo;d<br />actually leave<br />running.</h2>
            </div>
            <p className="sec__lede lede">Every outbound path sits behind guardrails — and one switch. Bold doesn&rsquo;t mean reckless.</p>
          </div>
          <Reveal className="cards cols-2 grid mt-l">
            {GUARDS.map((g, i) => (
              <div className="card" key={g.t}>
                <div className="card__n">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="card__t">{g.t}</div>
                <p className="card__d">{g.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── WAITLIST ───────────────────────────────────────────────────── */}
      <section className="panel section" id="waitlist">
        <div className="container">
          <div className="label label--acc">// waitlist · invite-only</div>
          <h2 className="dsp cta__h mt-s">Get on<br />the list.</h2>
          <p className="lede mt-m" style={{ maxWidth: "58ch" }}>
            We build each brain by hand, one at a time — so access is invite-only for now.
            Tell us what you need and we&rsquo;ll reach out when yours is ready.{" "}
            <b style={{ color: "var(--acc)", fontWeight: 600 }}>Hosted SaaS opens Q4 2026.</b>
          </p>
          <Reveal className="mt-l"><Waitlist /></Reveal>
        </div>
      </section>
    </>
  );
}

const CONCEPT = [
  { word: "Persistent", tag: "memory that compounds", body: "Nothing resets between sessions. Every conversation, deal, and result stays in the model and keeps informing the next decision." },
  { word: "Semantic", tag: "meaning, not fields", body: "It doesn't just hold data — it holds meaning. It knows a pricing visit, a quiet champion, and a sector tailwind are related, and what that implies." },
  { word: "World model", tag: "reasons + simulates", body: "One connected picture of your whole business — accounts, market, history — that omyt can think across and run forward, grounded in your world." },
];

const LOOP = [
  { t: "Ingest", d: "Deals, replies, site visits, market shifts, outcomes — every signal flows in continuously." },
  { t: "Model", d: "Signals become structure: entities, relationships, and meaning connected into one living model." },
  { t: "Reason", d: "The brain weighs the whole model at once and ranks the highest-value next move." },
  { t: "Act", d: "Automations execute inside your guardrails — outreach, routing, follow-ups. No manual queue." },
  { t: "Learn", d: "Every result folds back in. The model sharpens, and the next decision is better." },
];

const FEATURES = [
  { t: "Outreach", d: "Email-first sequences that build their own lists, personalize, and send inside deliverability guardrails.", points: ["ICP scoring & enrichment", "Reply classification", "Daily-cap & bounce protection"] },
  { t: "Pipeline", d: "A CRM that's actually the source of truth — every touch, signal, and stage held in the model.", points: ["Stage health at a glance", "Risk & next-action scoring", "No busywork entry"] },
  { t: "Automations", d: "Background work that runs itself: list-building, follow-ups, reply routing, nurture.", points: ["Always-on, in guardrails", "One emergency stop", "Self-serve, no calls"] },
  { t: "Strategy", d: "ICP, positioning, moat, risks, and a 90-day plan — kept honest by your real data.", points: ["GTM bets & plays", "Freeze / unfreeze", "Approve or veto"] },
  { t: "Intelligence", d: "Micro, macro, and experience data fused into one judgment about what to do next.", points: ["Market & account signals", "Learns from outcomes", "Surfaces, never buries"] },
  { t: "The loop", d: "Outcomes feed back as new structure, so the model compounds toward your North Star.", points: ["One six-month goal", "Closed-loop learning", "Sharper over time"] },
];

const GUARDS = [
  { t: "One emergency stop", d: "A single switch halts outreach, auto-replies, transactional email, and direct mail at once — instantly." },
  { t: "Deliverability guardrails", d: "Per-day send caps, suppression lists, and a bounce-rate circuit breaker protect your domain automatically." },
  { t: "Self-serve by design", d: "No calls, no meetings, no calendar bookings. Positive replies route straight to a product trial." },
  { t: "You stay in control", d: "Strategy can be frozen. Every suggestion is yours to approve or veto — and both train what comes next." },
];
