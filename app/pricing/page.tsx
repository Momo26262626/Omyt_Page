import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, self-serve pricing for the founder running their own GTM. Start free, scale when the engine pays for itself.",
};

const APP = "https://app.omyt.ai";

export default function Pricing() {
  return (
    <>
      <section className="hero section--tight">
        <div className="container center" style={{ maxWidth: 760, marginInline: "auto" }}>
          <Reveal>
            <span className="eyebrow eyebrow--accent" style={{ justifyContent: "center" }}>Pricing</span>
            <h1 className="h1" style={{ marginTop: 16 }}>Priced for one operator running the whole thing.</h1>
            <p className="lede" style={{ marginTop: 16, maxWidth: "50ch", marginInline: "auto" }}>
              Start free. Upgrade when the engine is creating more pipeline than it costs.
              No seats to buy, no demo to sit through.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="price-grid">
            {TIERS.map((t) => (
              <div key={t.name} className={`tile price ${t.featured ? "price--feat" : ""}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="price__name">{t.name}</span>
                  {t.featured && <span className="price__badge">Most popular</span>}
                </div>
                <div className="price__amt"><b>{t.price}</b><span>{t.unit}</span></div>
                <p className="price__desc">{t.desc}</p>
                <ul className="price__list">{t.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href={`${APP}/sign-up`} className={`btn ${t.featured ? "btn--primary" : "btn--ghost"}`} style={{ width: "100%" }}>
                  {t.cta} {t.featured && <span className="arr">→</span>}
                </a>
              </div>
            ))}
          </Reveal>
          <p className="center muted" style={{ marginTop: 18, fontSize: 13 }}>
            Prices in USD. All plans are self-serve and US-only at launch.
          </p>
        </div>
      </section>

      {/* COMPARISON STRIP */}
      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="tile tile__pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {VALUE.map((v) => (
              <div key={v.t}>
                <div className="kicker__n">{v.k}</div>
                <div className="kicker__t" style={{ marginTop: 8 }}>{v.t}</div>
                <div className="kicker__d">{v.d}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal className="sec-head" style={{ marginBottom: 8 }}>
            <span className="eyebrow eyebrow--accent">Questions</span>
            <h2 className="h2">The short answers.</h2>
          </Reveal>
          <div className="faq mt-s">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} className="faq__item" delay={i * 40}>
                <div className="faq__q">{f.q}</div>
                <div className="faq__a">{f.a}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="ctaband">
            <h2 className="h2">Start free. Pay when it's working.</h2>
            <p>No credit card to begin. The engine is running — and earning — before you decide.</p>
            <div className="ctaband__cta">
              <a href={`${APP}/sign-up`} className="btn btn--primary btn--lg">Start free <span className="arr">→</span></a>
              <Link href="/product" className="btn btn--ghost btn--lg">Explore the product</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const TIERS = [
  {
    name: "Solo",
    price: "$0",
    unit: "/mo",
    desc: "Everything you need to set your North Star and run your first sequences.",
    cta: "Start free",
    featured: false,
    features: ["The full dashboard & Sales Brain", "CRM + pipeline", "Up to 25 outreach sends / day", "Strategy spine & 90-day plan", "Self-serve, no calls"],
  },
  {
    name: "Operator",
    price: "$79",
    unit: "/mo",
    desc: "The always-on engine: automations running inside guardrails, intelligence fused.",
    cta: "Start free",
    featured: true,
    features: ["Everything in Solo", "Always-on automations", "Higher daily send limits & warm-up", "Full intelligence layer (micro · macro · e²)", "Deliverability guardrails & emergency stop", "Reply classification & nurture routing"],
  },
  {
    name: "Scale",
    price: "$199",
    unit: "/mo",
    desc: "For the operator pushing volume — more throughput, deeper macro, priority compute.",
    cta: "Start free",
    featured: false,
    features: ["Everything in Operator", "Maximum send throughput", "Deep macro analysis & shock alerts", "Direct-mail channel", "Priority model compute", "Early access to new automations"],
  },
];

const VALUE = [
  { k: "No seats", t: "One operator, one price", d: "Built for the founder who is the team. No per-seat math." },
  { k: "No demo", t: "Self-serve from minute one", d: "Sign up and you're live. There's nothing to book." },
  { k: "No lock-in", t: "Your data is yours", d: "Export anytime. The loop works for you, not the other way around." },
];

const FAQ = [
  { q: "Is there really no sales call?", a: "Correct. omyt is a self-serve product end to end — for you and for the prospects your automations reach. You sign up and start; positive replies in your campaigns route to a signup, never a calendar invite." },
  { q: "What happens on the free plan?", a: "You get the full dashboard, the Sales Brain, CRM, and your strategy spine, with a conservative daily send limit. It's enough to set your North Star and run real sequences before you pay anything." },
  { q: "How do the deliverability guardrails work?", a: "Every plan enforces per-day send caps, a suppression list for anyone who unsubscribes or bounces, and a 7-day bounce-rate circuit breaker that pauses sending if your domain health dips. You can also hit one emergency stop to halt all outbound instantly." },
  { q: "Who is omyt for?", a: "A solo founder or CEO running their own go-to-market. You're the operator and the decision-maker in one — omyt is the surface where those two jobs meet." },
  { q: "Can I change plans later?", a: "Anytime, in both directions. Start on Solo, move to Operator when the automations are paying for themselves, scale up or down as your volume changes." },
];
