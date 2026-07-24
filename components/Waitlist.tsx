"use client";

import { type FormEvent, useState } from "react";

type Mode = "local" | "saas" | "unsure";
type Status = "idle" | "sending" | "done" | "err";

const MODES: { id: Mode; t: string; d: string }[] = [
  { id: "local", t: "Local setup", d: "On your own infrastructure. Available now, invite-only." },
  { id: "saas", t: "Hosted SaaS", d: "Fully managed by omyt. Coming Q4 2026." },
];

export function Waitlist() {
  const [mode, setMode] = useState<Mode>("local");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          need: data.get("need"),
          mode,
        }),
      });
      const json = await res.json().catch(() => ({ ok: false }));
      setStatus(res.ok && json.ok ? "done" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "done") {
    return (
      <div className="wl wl--done">
        <div className="label label--acc">// you&rsquo;re on the list</div>
        <h3 className="wl__doneh">We&rsquo;ll reach out<br />once your brain is ready.</h3>
        <p className="wl__donep">
          We set up each brain by hand, so invites go out in small waves. You&rsquo;ll get an email
          from <b>hello@omyt.ai</b> — keep an eye out.
        </p>
      </div>
    );
  }

  return (
    <form className="wl" onSubmit={onSubmit} noValidate>
      <div className="wl__grid">
        <label className="wl__field">
          <span className="wl__lab">// name</span>
          <input className="wl__input" name="name" type="text" autoComplete="name" required maxLength={120} placeholder="Ada Lovelace" />
        </label>
        <label className="wl__field">
          <span className="wl__lab">// email</span>
          <input className="wl__input" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="ada@company.com" />
        </label>
      </div>

      <label className="wl__field">
        <span className="wl__lab">// what do you need a brain for?</span>
        <textarea className="wl__input wl__area" name="need" rows={3} maxLength={2000} placeholder="What you're building, what you'd point the brain at, and the outcome you're chasing." />
      </label>

      <fieldset className="wl__modes">
        <span className="wl__lab">// how do you want to run it?</span>
        <div className="wl__modegrid">
          {MODES.map((m) => (
            <button
              type="button"
              key={m.id}
              className={`wl__mode ${mode === m.id ? "is-on" : ""}`}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
            >
              <span className="wl__modetick" aria-hidden>{mode === m.id ? "◆" : "◇"}</span>
              <span className="wl__modet">{m.t}</span>
              <span className="wl__moded">{m.d}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="wl__foot">
        <button className="btn btn--acc btn--lg wl__submit" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request an invite"} <span className="arr">↗</span>
        </button>
        <p className="wl__note">
          {status === "err" ? (
            "Something went wrong — email hello@omyt.ai and we'll add you."
          ) : (
            <>
              We only use your details to contact you about access. No spam, ever. See our{" "}
              <a href="/legal/privacy" className="wl__link">privacy policy</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
