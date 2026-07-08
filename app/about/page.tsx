import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Why omyt exists: a new category for the founder who is both the operator and the decision-maker.",
};

const APP = "https://app.omyt.ai";

export default function About() {
  return (
    <>
      <section className="hero section--tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal>
            <span className="eyebrow eyebrow--accent">About</span>
            <h1 className="h1" style={{ marginTop: 18 }}>Built for the founder who is the whole team.</h1>
            <p className="lede" style={{ marginTop: 18, maxWidth: "56ch" }}>
              Every other GTM tool assumes a department: an SDR to send, an AE to
              close, a RevOps person to wire it together, a manager to read the
              dashboards. omyt assumes one person doing all of it — and builds the
              surface that makes that possible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THESIS */}
      <section className="section" id="thesis">
        <div className="container" style={{ maxWidth: 920 }}>
          <Reveal>
            <span className="eyebrow eyebrow--accent">The thesis</span>
            <p className="lead-quote mt-s">
              The operator and the decision-maker have become the <em>same person</em>.
              Software hasn't caught up. omyt is the operating layer for that person —
              not a CRM, not analytics, not a copilot bolted onto someone else's tool.
              <em> Its own category.</em>
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-l">
            <p className="lede measure" style={{ color: "var(--ink-2)" }}>
              When the same person sends the email, reads the reply, decides the
              strategy, and lives with the result, the cost of switching tools and
              re-stitching context is the whole job. So we collapsed the stack into
              one surface with one brain — and made it run on its own between the
              moments you show up to decide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="sec-head">
            <span className="eyebrow eyebrow--accent">What we believe</span>
            <h2 className="h2">Five principles, no compromises.</h2>
          </Reveal>
          <Reveal className="principles mt-l">
            {PRINCIPLES.map((p, i) => (
              <div className="principle" key={p.t}>
                <div className="principle__n">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h3">{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ANTI-REFERENCE / STANCE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <Reveal className="tile tile__pad">
            <span className="eyebrow eyebrow--accent">Our stance</span>
            <h2 className="h2" style={{ marginTop: 14 }}>Bold, alive, and intelligent — never loud.</h2>
            <p className="lede" style={{ marginTop: 16, color: "var(--ink-2)" }}>
              omyt should feel like a co-pilot that's always running — a step ahead,
              never performing. Data that breathes, automations that are actually
              doing something, the right thing surfaced at the right moment. We'd
              rather earn trust with restraint than win attention with noise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="ctaband">
            <h2 className="h2">If you run the whole thing, this is for you.</h2>
            <p>Open omyt, set your North Star, and let the operating layer do the rest.</p>
            <div className="ctaband__cta">
              <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
              <Link href="/product" className="btn btn--ghost btn--lg">See the product</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const PRINCIPLES = [
  { t: "Scan, don't read", d: "Every surface communicates its status in under two seconds. If you have to parse it, it has failed." },
  { t: "Alive means moving, not distracting", d: "Motion is data communication, not decoration. A live pulse, a count-up, a closing loop — anything that doesn't inform gets cut." },
  { t: "One surface, one job", d: "omyt is not a portal to other dashboards. It's the place decisions get made — everything else steps back." },
  { t: "A category of one", d: "We learn from the best products, then go further. The test: could you mistake this for anything else? If yes, we redesign." },
  { t: "Restraint earns trust", d: "Bold isn't loud. The heaviest visual weight lands on the most important decision, and automation stays inside guardrails you control." },
];
