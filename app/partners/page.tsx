import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Waitlist } from "@/components/Waitlist";

export const metadata: Metadata = {
  alternates: { canonical: "/partners" },
  title: "Design partners",
  description:
    "We're taking a small number of design partners. Each brain is built by hand against your own systems, you get a direct line to the people building it, and the hosted product lands Q4 2026.",
};

export default function Partners() {
  return (
    <>
      <section className="panel phero">
        <div className="container">
          <div className="label label--acc">// design partners</div>
          <h1 className="h1 phero__title mt-s">
            We&rsquo;re taking a<br />
            handful of design
            <br />
            partners.
          </h1>
          <p className="lede phero__lede">
            Not a launch. Not a free trial. We build each brain by hand, against your own systems,
            with you in the room — because the only way to learn what this product needs to be is to
            run it on real businesses. We&rsquo;re our own first design partner: omyt&rsquo;s
            go-to-market already runs on the brain. A small number, deliberately. The hosted
            version follows in Q4 2026.
          </p>
          <div className="phero__cta">
            <a href="#waitlist" className="btn btn--primary btn--lg">
              Apply <span className="arr">↗</span>
            </a>
            <Link href="/product" className="btn btn--ghost btn--lg">
              See the product <span className="arr">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="panel panel--concrete section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 001 — what you get</div>
              <h2 className="h2 sec__h">
                A brain built
                <br />
                for your business.
                <br />
                Not a template.
              </h2>
            </div>
            <p className="sec__lede lede">
              Design partners get the thing itself, built with them, plus the access that comes from
              being early.
            </p>
          </div>
          <Reveal className="cards cols-2 grid mt-l">
            {GET.map((g, i) => (
              <div className="card" key={g.t}>
                <div className="card__n">[{String(i + 1).padStart(2, "0")}]</div>
                <div className="card__t">{g.t}</div>
                <p className="card__d">{g.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WHAT WE ASK */}
      <section className="panel section">
        <div className="container">
          <div className="sec">
            <div>
              <div className="sec__index">// 002 — what we ask</div>
              <h2 className="h2 sec__h">
                Honest feedback,
                <br />
                on a real
                <br />
                business.
              </h2>
            </div>
            <p className="sec__lede lede">
              We are not looking for polite enthusiasm. We are looking for people who will tell us
              exactly where it falls short.
            </p>
          </div>
          <div className="rows mt-l">
            {ASK.map((a, i) => (
              <Reveal key={a.t} className="row-item" delay={i * 40}>
                <div className="row-item__n">{String(i + 1).padStart(2, "0")}</div>
                <div className="row-item__t">{a.t}</div>
                <div className="row-item__d">{a.d}</div>
                <div className="row-item__x">↗</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section className="panel panel--concrete section" id="waitlist">
        <div className="container">
          <div className="label label--acc">// apply</div>
          <h2 className="h1 mt-s" style={{ maxWidth: "18ch" }}>
            Tell us what you&rsquo;d point it at.
          </h2>
          <p className="lede mt-m" style={{ maxWidth: "56ch" }}>
            We reply to everyone. If the fit is wrong we&rsquo;ll say so plainly rather than leave
            you on a list.
          </p>
          <Reveal className="mt-l">
            <Waitlist source="partners" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="panel section">
        <div className="container">
          <div className="label label--acc">// questions</div>
          <h2 className="h2 mt-s" style={{ marginBottom: 14 }}>
            The short answers.
          </h2>
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
    </>
  );
}

const GET = [
  {
    t: "Built with you, by hand",
    d: "We wire the brain into your actual CRM, inbox, calendar and campaigns, and tune it against how your business really works. Not a self-serve setup wizard.",
  },
  {
    t: "A direct line",
    d: "You talk to the people writing the code, not a support queue. When something is wrong you tell us and it changes.",
  },
  {
    t: "Early access to the hosted product",
    d: "When the SaaS opens in Q4 2026 you are already on it, already configured, with founding-partner terms.",
  },
  {
    t: "Your data stays yours",
    d: "It runs against your own systems. We take no copies, and nothing about your business trains anything shared.",
  },
];

const ASK = [
  {
    t: "A real business, running now",
    d: "You are doing sales and marketing at enough volume that the brain has something to reason about. This does not work on a blank slate.",
  },
  {
    t: "A regular conversation",
    d: "A short call every couple of weeks while we build. That feedback loop is the entire point of the program, and the reason the number is small.",
  },
  {
    t: "Tell us when it's wrong",
    d: "The failure mode we fear is polite. We want the thing you would say to a co-founder, not the thing you would say to a vendor.",
  },
  {
    t: "Let us reference you, if it works",
    d: "Only once it actually works, and only with your sign-off. If it doesn't work you owe us nothing and we'll say so first.",
  },
];

const FAQ = [
  {
    q: "What does it cost?",
    a: "It depends on what you point it at, so we quote it per partner rather than publishing a number that would be wrong for most people. We'll be straight with you on the first call, and the implementation credits against the hosted product when it launches.",
  },
  {
    q: "Why so few partners?",
    a: "Because each brain is built by hand and we sit in the feedback loop for every one of them. Taking more would mean doing all of them badly, and we'd stop learning anything generalizable.",
  },
  {
    q: "What happens in Q4 2026?",
    a: "The hosted version opens. Design partners move onto it with their configuration intact and keep founding-partner terms. Nobody is left stranded on a bespoke install.",
  },
  {
    q: "Does it run on our infrastructure?",
    a: "Yes. During the design-partner program it runs against your own systems, which is also why your data never leaves them. The hosted option arrives with the SaaS.",
  },
  {
    q: "What if it doesn't work for us?",
    a: "Then we tell you, ideally before you've spent anything. We would rather turn down a bad fit than carry an unhappy partner through a program built on honest feedback.",
  },
];
