import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Why omyt exists: a company brain for the founder who is both the operator and the decision-maker.",
};


export default function About() {
  return (
    <>
      <section className="panel phero">
        <div className="container">
          <div className="label label--acc">// about</div>
          <h1 className="h1 phero__title mt-s">Software forgets.<br />A brain doesn&rsquo;t.</h1>
          <p className="lede phero__lede">
            Every other GTM tool stores your data in rows and makes you re-assemble the picture
            every time you open it. We think that&rsquo;s backwards. omyt keeps one persistent
            model of your business — and reasons over it, so the context is already there when
            you arrive.
          </p>
        </div>
      </section>

      {/* THESIS (concrete) */}
      <section className="panel panel--concrete section" id="thesis">
        <div className="container">
          <div className="label label--acc">// 001 — the thesis</div>
          <Reveal>
            <p className="h1 mt-s" style={{ maxWidth: "20ch", textTransform: "none", lineHeight: 1.08 }}>
              The operator and the decision-maker have become the <span className="acc">same person</span>.
              Software hasn&rsquo;t caught up. omyt is the company brain for that person.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede mt-l" style={{ maxWidth: "62ch" }}>
              When the same person sends the email, reads the reply, decides the strategy, and
              lives with the result, the cost of switching tools and re-stitching context is the
              whole job. So we collapsed the stack into one persistent semantic world model — and
              made it run on its own between the moments you show up to decide.
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
              <h2 className="h2 sec__h">Alive and<br />intelligent —<br />never noisy.</h2>
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
          <h2 className="dsp cta__h mt-s">If you run the<br />whole thing,<br />this is for you.</h2>
          <div className="cta__row">
            <p className="cta__p">Open omyt, set your North Star, and let the brain do the rest.</p>
            <div className="hero__cta">
              <a href="/#waitlist" className="btn btn--acc btn--lg">Join the waitlist <span className="arr">↗</span></a>
              <Link href="/product" className="btn btn--ghost btn--lg">See the product <span className="arr">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const PRINCIPLES = [
  { t: "Understand, don't store", d: "A row is a fact with no meaning. omyt holds relationships and implications — a model, not a spreadsheet." },
  { t: "Persistence is the product", d: "The value compounds because nothing resets. The longer the model runs, the more it knows and the sharper it gets." },
  { t: "Reasoning you can read", d: "Every call comes with its why. If you can't see how the brain reached a decision, it isn't finished." },
  { t: "A category of one", d: "We learn from the best products, then go further. The test: could you mistake this for anything else? If yes, we redesign." },
  { t: "Bold, inside guardrails", d: "The heaviest weight lands on the most important decision — and every automation stays behind controls you hold." },
];
