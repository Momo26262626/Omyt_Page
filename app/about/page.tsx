import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why omyt exists: every business already knows what it needs to know, but no system holds all of it. omyt is the company brain that does.",
};

export default function About() {
  return (
    <>
      <section className="panel phero">
        <div className="container">
          <div className="label label--acc">// about</div>
          <h1 className="h1 phero__title mt-s">
            Software forgets.
            <br />A brain doesn&rsquo;t.
          </h1>
          <p className="lede phero__lede">
            Every tool your business runs holds a slice of the truth and forgets the rest. So the
            picture only exists when a person sits down and reassembles it — which happens rarely,
            slowly, and never at 4am. omyt keeps that picture permanently, and acts on it.
          </p>
        </div>
      </section>

      {/* THESIS (concrete) */}
      <section className="panel panel--concrete section" id="thesis">
        <div className="container">
          <div className="label label--acc">// 001 — the thesis</div>
          <Reveal>
            <p
              className="h1 mt-s"
              style={{ maxWidth: "20ch", textTransform: "none", lineHeight: 1.08 }}
            >
              Your business already knows everything it needs to know. It just{" "}
              <span className="acc">can&rsquo;t hold it in one place</span>.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede mt-l" style={{ maxWidth: "62ch" }}>
              The reason a deal stalls is usually sitting in a thread nobody reread. The reason a
              campaign underperforms is usually in the sales replies nobody sent to marketing. The
              knowledge exists; the connection doesn&rsquo;t. So we built one model that holds all
              of it at once and reasons across it continuously, then wired it to the systems that
              act. Sales and marketing first, because that is where the cost of forgetting is
              easiest to measure.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-l" style={{ maxWidth: "62ch" }}>
              And we hold ourselves to it: <b style={{ color: "var(--acc)" }}>omyt runs omyt</b>.
              We are our own first customer and our own first design partner — the go-to-market
              behind this site is sourced, researched and written by the brain, with a human
              releasing every send.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="panel section">
        <div className="container">
          <div className="label">// 002 — what we believe</div>
          <div className="rows mt-l">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} className="row-item" delay={i * 40}>
                <div className="row-item__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="row-item__t">{p.t}</div>
                <div className="row-item__d">{p.d}</div>
                <div className="row-item__x">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STANCE (concrete) */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 003 — our stance</div>
              <h2 className="h2 sec__h">
                Alive and
                <br />
                intelligent —<br />
                never noisy.
              </h2>
            </div>
            <p className="sec__lede lede">
              omyt should feel like a mind that&rsquo;s always running — a step ahead, never
              performing. A model that breathes, automations actually doing something, the right
              thing surfaced at the right moment. We&rsquo;d rather earn trust with depth than win
              attention with noise.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="panel section">
        <div className="container">
          <div className="label label--acc">// your move</div>
          <h2 className="dsp cta__h mt-s">
            Give your
            <br />
            company
            <br />a brain.
          </h2>
          <div className="cta__row">
            <p className="cta__p">
              We&rsquo;re building it with a small number of design partners before the hosted
              version opens in Q4 2026.
            </p>
            <div className="hero__cta">
              <Link href="/partners" className="btn btn--acc btn--lg">
                Become a design partner <span className="arr">↗</span>
              </Link>
              <Link href="/product" className="btn btn--ghost btn--lg">
                See the product <span className="arr">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const PRINCIPLES = [
  {
    t: "Understand, don't store",
    d: "A row is a fact with no meaning. omyt holds relationships and implications — a model, not a spreadsheet.",
  },
  {
    t: "Persistence is the product",
    d: "The value compounds because nothing resets. The longer the model runs, the more it knows and the sharper it gets.",
  },
  {
    t: "Reasoning you can read",
    d: "Every call comes with its why. If you can't see how the brain reached a decision, it isn't finished.",
  },
  {
    t: "A category of one",
    d: "We learn from the best products, then go further. The test: could you mistake this for anything else? If yes, we redesign.",
  },
  {
    t: "Bold, inside guardrails",
    d: "The heaviest weight lands on the most important decision — and every automation stays behind controls you hold.",
  },
];
