import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Waitlist } from "@/components/Waitlist";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Individual pricing, scoped to your setup. Invite-only while we build brains by hand — run it locally now, or join the waitlist for hosted SaaS (Q4 2026).",
};

export default function Pricing() {
  return (
    <>
      <section className="panel phero">
        <div className="container">
          <div className="label label--acc">// pricing</div>
          <h1 className="h1 phero__title mt-s">Individual.<br />By design.</h1>
          <p className="lede phero__lede">
            Every brain is set up by hand and scoped to your business, so pricing is individual —
            no seat tiers, no self-checkout. It&rsquo;s invite-only for now. Pick how you want to run
            it, and we&rsquo;ll take it from there.
          </p>
        </div>
      </section>

      {/* PATHS */}
      <section className="panel section--tight">
        <div className="container">
          <Reveal className="paths">
            <div className="path">
              <span className="path__tag"><span className="pill__dot" /> Available now · invite-only</span>
              <div className="path__t">Local setup</div>
              <p className="path__d">We stand your brain up on your own infrastructure and wire it into your stack. The fastest way in today — and your data never leaves your walls.</p>
              <ul className="path__list">
                <li>Runs on your machines / private cloud</li>
                <li>Hands-on setup &amp; onboarding</li>
                <li>Your data stays yours, end to end</li>
                <li>Priority access while SaaS is in build</li>
              </ul>
              <div className="path__price">Individual · scoped to your setup</div>
            </div>
            <div className="path">
              <span className="path__tag path__tag--soon">Coming Q4 2026</span>
              <div className="path__t">Hosted SaaS</div>
              <p className="path__d">Fully managed by omyt — sign in and your brain is already running. In active build now; join the waitlist to get early access the moment it opens.</p>
              <ul className="path__list">
                <li>Zero infrastructure to run</li>
                <li>Managed updates &amp; compute</li>
                <li>Early-access invites go out first</li>
                <li>Launching Q4 2026</li>
              </ul>
              <div className="path__price">Individual · announced at launch</div>
            </div>
          </Reveal>
          <p className="label" style={{ marginTop: 20, display: "flex", justifyContent: "center", textAlign: "center" }}>
            // not sure which? tell us in the waitlist — we&rsquo;ll recommend a path · quoted without VAT (small business, § 19 UStG)
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="panel panel--concrete section" id="waitlist">
        <div className="container">
          <div className="label label--acc">// request an invite</div>
          <h2 className="h1 mt-s" style={{ maxWidth: "18ch" }}>Get in line for a brain.</h2>
          <Reveal className="mt-l"><Waitlist /></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="panel section">
        <div className="container">
          <div className="label label--acc">// questions</div>
          <h2 className="h2 mt-s" style={{ marginBottom: 14 }}>The short answers.</h2>
          <div className="faq">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} className="faq__item" delay={i * 30}>
                <div className="faq__n">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="faq__q">{f.q}</div>
                  <div className="faq__a">{f.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="panel section">
        <div className="container">
          <div className="label label--acc">// your move</div>
          <h2 className="dsp cta__h mt-s">Join the<br />waitlist.</h2>
          <div className="cta__row">
            <p className="cta__p">Tell us what you need. We build brains in small waves and reach out when yours is ready.</p>
            <div className="hero__cta">
              <a href="#waitlist" className="btn btn--acc btn--lg">Request an invite <span className="arr">↗</span></a>
              <Link href="/product" className="btn btn--ghost btn--lg">Explore the product <span className="arr">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const FAQ = [
  { q: "Why is it invite-only?", a: "Because every brain is set up by hand and scoped to your business — we read your world, wire in your sources, and tune the model with you. We do that in small waves so each setup is right. Join the waitlist and we'll reach out when we have capacity for yours." },
  { q: "How is it priced?", a: "Individually. There are no seat tiers or self-checkout — pricing is scoped to your setup, your sources, and how you want to run it. We'll walk you through it when we reach out." },
  { q: "What's the difference between local and hosted?", a: "Local setup runs on your own infrastructure — your data never leaves your walls, and it's the fastest way in today. Hosted SaaS is fully managed by omyt (nothing to run yourself) and is launching Q4 2026. Not sure which fits? Say so in the waitlist and we'll recommend one." },
  { q: "When does the SaaS version launch?", a: "Q4 2026. It's in active build now. Everyone on the waitlist gets early-access invites before it opens publicly." },
  { q: "Is there a sales call?", a: "Only if you want one. omyt is self-serve by design once you're set up — for you and for the prospects your automations reach. The waitlist is just a form; we reach out by email when your brain is ready." },
];
