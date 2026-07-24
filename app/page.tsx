import { Reveal } from "@/components/Reveal";
import { BrutalHero } from "@/components/BrutalHero";
import { Waitlist } from "@/components/Waitlist";

const TICKER = ["Learns every customer", "Scales what it learns", "Set up by hand", "Invite-only", "Local or hosted", "SaaS · Q4 2026"];

export default function Home() {
  return (
    <>
      <BrutalHero />

      {/* ── 001 · RECOGNITION — the visitor sees themselves ─────────────── */}
      <section className="panel section--tight">
        <div className="container">
          <div className="label">// 001 — the problem</div>
          <Reveal className="rise">
            <h2 className="h1 mt-s" style={{ maxWidth: "20ch" }}>
              You already understand your customers. You just can&rsquo;t{" "}
              <span className="acc">hold all of it at once</span>.
            </h2>
          </Reveal>
          <Reveal delay={80} className="rise">
            <p className="lede mt-m">
              The insight is real but it lives in your head, in a thread from March, in a call you
              half-remember, in a spreadsheet you stopped updating. One person cannot hold a
              thousand accounts in working memory, and no CRM was built to understand anything —
              only to store it. So the sharpest thing you know about a customer is the thing least
              likely to be acted on.
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

      {/* ── 002 · THE THOUGHTS — the novelty, shown ─────────────────────── */}
      <section className="panel section" id="thoughts">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 002 — what a thought looks like</div>
              <h2 className="h2 sec__h">Most software<br />stores. This<br />one thinks.</h2>
            </div>
            <p className="sec__lede lede">
              A thought is what happens when a system holds everything at once: it notices what you
              would have noticed, if you had been looking at all of it, at 4am. Each one arrives
              already attached to the thing to do about it.
            </p>
          </div>

          <div className="thoughts mt-l">
            {THOUGHTS.map((t, i) => (
              <Reveal key={t.think} className="thought" delay={i * 60}>
                <div className="thought__head">
                  <span className="thought__n">thought_{String(i + 1).padStart(2, "0")}</span>
                  <span className="thought__src">{t.src}</span>
                </div>
                <p className="thought__body">{t.think}</p>
                <div className="thought__act">
                  <span className="thought__arrow" aria-hidden>→</span>
                  <span className="thought__actlabel">acted</span>
                  <span className="thought__acttext">{t.act}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="label mt-s" style={{ color: "var(--dim2)" }}>
            // illustrative — the shape of the output, not real customer data
          </p>
        </div>
      </section>

      {/* ── 003 · WHAT YOU GET — value, concrete ────────────────────────── */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 003 — what you get</div>
              <h2 className="h2 sec__h">Depth on every<br />account. Not just<br />the ten you recall.</h2>
            </div>
            <p className="sec__lede lede">
              omyt reads what your customers actually do — and keeps reading, on all of them, at
              once. Then it acts on what it finds.
            </p>
          </div>

          <div className="rows mt-l">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.t} className="row-item" delay={i * 40}>
                <div className="row-item__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="row-item__t">{o.t}</div>
                <div className="row-item__d">{o.d}</div>
                <div className="row-item__x">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 003 · ARCHITECTURAL PROOF — the shape, not the secret ───────── */}
      <section className="panel section" id="architecture">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 004 — architecture, abridged</div>
              <h2 className="h2 sec__h">This is a<br />real system.<br />Here&rsquo;s its shape.</h2>
            </div>
            <p className="sec__lede lede">
              Six layers, each doing one job. We publish the structure because it&rsquo;s what makes
              the result possible. The implementation inside layers 02 and 04 is where the work
              actually lives, and that part stays ours.
            </p>
          </div>

          <Reveal className="stack mt-l">
            {ARCH.map((a) => (
              <div className={`stack__row ${a.held ? "is-held" : ""}`} key={a.n}>
                <div className="stack__n">{a.n}</div>
                <div className="stack__t">{a.t}</div>
                <div className="stack__d">{a.d}</div>
                <div className="stack__tag">{a.held ? "withheld" : "open"}</div>
              </div>
            ))}
          </Reveal>
          <p className="label mt-s" style={{ color: "var(--dim2)" }}>
            // no screenshots of your data, ever — each brain runs against your sources alone
          </p>
        </div>
      </section>

      {/* ── 004 · HOW IT'S DONE — the mechanism finally earns its place ─── */}
      <section className="panel panel--concrete section" id="model">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 005 — how it&rsquo;s done</div>
              <h2 className="h2 sec__h">A persistent<br />semantic<br />world model.</h2>
            </div>
            <p className="sec__lede lede">
              That phrase is the reason the understanding compounds instead of resetting. Three
              words, read literally.
            </p>
          </div>

          <Reveal className="concept mt-l">
            {CONCEPT.map((c, i) => (
              <div className="concept__cell" key={c.word}>
                <div className="concept__word">[{String(i + 1).padStart(2, "0")}] {c.word}</div>
                <div className="concept__h">{c.lead} <b>{c.emph}</b></div>
                <p className="concept__p">{c.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 005 · THE LOOP ─────────────────────────────────────────────── */}
      <section className="panel section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 006 — the loop</div>
              <h2 className="h2 sec__h">Every outcome<br />makes the next<br />call sharper.</h2>
            </div>
            <p className="sec__lede lede">
              Signals enter, become structure, drive a decision, and the result folds back in.
              Nothing is thrown away, which is why it gets better the longer it runs.
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

      {/* ── 006 · WHAT IT RUNS ─────────────────────────────────────────── */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 007 — what it runs</div>
              <h2 className="h2 sec__h">One brain.<br />Everything that<br />moves revenue.</h2>
            </div>
            <p className="sec__lede lede">
              Not separate tools stitched together — views into one model. Which is why the
              understanding and the execution finally live in the same place.
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

      {/* ── 007 · TRUST ────────────────────────────────────────────────── */}
      <section className="panel section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 008 — trust by design</div>
              <h2 className="h2 sec__h">A brain you&rsquo;d<br />actually leave<br />running.</h2>
            </div>
            <p className="sec__lede lede">Everything it can do on your behalf sits behind guardrails, and one switch.</p>
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
      <section className="panel panel--concrete section" id="waitlist">
        <div className="container">
          <div className="label label--acc">// waitlist · invite-only</div>
          <h2 className="dsp cta__h mt-s">Get on<br />the list.</h2>
          <p className="lede mt-m" style={{ maxWidth: "58ch" }}>
            We build each brain by hand, one at a time, against your own sources — so access is
            invite-only for now. Tell us what you need and we&rsquo;ll reach out when yours is ready.{" "}
            <b style={{ color: "var(--acc)", fontWeight: 600 }}>Hosted SaaS opens Q4 2026.</b>
          </p>
          <Reveal className="mt-l"><Waitlist /></Reveal>
        </div>
      </section>
    </>
  );
}

const THOUGHTS = [
  {
    src: "4 threads · renewal date · 2 historical churns",
    think: "Northwind's champion has gone quiet for nine days and their renewal lands in thirty-four. The last two accounts that went quiet at exactly this stage churned.",
    act: "Drafted a re-engagement to the economic buyer, not the champion. Queued for your approval.",
  },
  {
    src: "3 accounts · sector news · pricing-page behaviour",
    think: "Three logistics accounts all hit pricing this week. That sector just took a fuel-cost shock, which is the same pattern that preceded your two fastest deals last year.",
    act: "Built a twelve-account lookalike list in the same sector and sequenced it for Tuesday.",
  },
  {
    src: "40 replies · win/loss history",
    think: "Your last forty replies argue about integration time, not price. The positioning still leads on cost.",
    act: "Rewrote the objection block in the live sequence and flagged the positioning change for review.",
  },
];

const OUTCOMES = [
  { t: "Understand every account", d: "Not the ten you happen to remember. omyt reads the whole book continuously — what each customer does, says, ignores, and repeats — and keeps that understanding current." },
  { t: "Act on what it learns", d: "Knowledge that sits in a dashboard is worth nothing. What the model learns becomes outreach, timing, sequencing and routing that execute on their own." },
  { t: "Scale past your own hours", d: "One operator can hold a handful of relationships in real depth. The model holds all of them, and works them while you sleep." },
  { t: "Get sharper every week", d: "Won, lost, replied, ignored — every result updates the model. The understanding compounds instead of resetting, so month six is better than month one." },
];

const ARCH = [
  { n: "01", t: "Ingest", d: "Connectors, event stream, normalisation. Deals, threads, site behaviour, market data.", held: false },
  { n: "02", t: "Semantic layer", d: "Entity resolution, embedding space, relation graph. Where raw records become meaning.", held: true },
  { n: "03", t: "World model", d: "Persistent state and temporal memory — the picture that survives between sessions.", held: false },
  { n: "04", t: "Reasoning", d: "Ranks the highest-value move across the whole model, with the rationale attached.", held: true },
  { n: "05", t: "Execution", d: "Guardrailed automations: sequences, routing, follow-ups, caps and circuit breakers.", held: false },
  { n: "06", t: "Learning", d: "Outcome capture folded back into the model. The loop that makes it compound.", held: false },
];

const CONCEPT = [
  { word: "Persistent", lead: "It", emph: "remembers.", body: "Nothing resets between sessions. Every conversation, deal and result stays in the model and keeps informing the next decision." },
  { word: "Semantic", lead: "It", emph: "understands.", body: "It doesn't just hold data, it holds meaning. It knows a pricing visit, a quiet champion and a sector tailwind are related, and what that implies." },
  { word: "World model", lead: "It", emph: "reasons.", body: "One connected picture of your whole business — accounts, market, history — that omyt can think across and run forward, grounded in your world." },
];

const LOOP = [
  { t: "Ingest", d: "Deals, replies, site visits, market shifts, outcomes — every signal flows in continuously." },
  { t: "Model", d: "Signals become structure: entities, relationships and meaning connected into one living model." },
  { t: "Reason", d: "The brain weighs the whole model at once and ranks the highest-value next move." },
  { t: "Act", d: "Automations execute inside your guardrails — outreach, routing, follow-ups. No manual queue." },
  { t: "Learn", d: "Every result folds back in. The model sharpens, and the next decision is better." },
];

const FEATURES = [
  { t: "Outreach", d: "Email-first sequences that build their own lists, personalize from what the model knows, and send inside deliverability guardrails.", points: ["ICP scoring & enrichment", "Reply classification", "Daily-cap & bounce protection"] },
  { t: "Pipeline", d: "A CRM that's actually the source of truth — every touch, signal and stage held in the model.", points: ["Stage health at a glance", "Risk & next-action scoring", "No busywork entry"] },
  { t: "Automations", d: "Background work that runs itself: list-building, follow-ups, reply routing, nurture.", points: ["Always-on, in guardrails", "One emergency stop", "Self-serve, no calls"] },
  { t: "Strategy", d: "ICP, positioning, moat, risks and a 90-day plan — kept honest by your real data.", points: ["GTM bets & plays", "Freeze / unfreeze", "Approve or veto"] },
  { t: "Intelligence", d: "Micro, macro and experience signals fused into one judgment about what to do next.", points: ["Market & account signals", "Learns from outcomes", "Surfaces, never buries"] },
  { t: "The loop", d: "Outcomes feed back as new structure, so the model compounds toward your North Star.", points: ["One six-month goal", "Closed-loop learning", "Sharper over time"] },
];

const GUARDS = [
  { t: "One emergency stop", d: "A single switch halts outreach, auto-replies, transactional email and direct mail at once — instantly." },
  { t: "Deliverability guardrails", d: "Per-day send caps, suppression lists and a bounce-rate circuit breaker protect your domain automatically." },
  { t: "Self-serve by design", d: "No calls, no meetings, no calendar bookings. Positive replies route straight to a product trial." },
  { t: "You stay in control", d: "Strategy can be frozen. Every suggestion is yours to approve or veto — and both train what comes next." },
];
