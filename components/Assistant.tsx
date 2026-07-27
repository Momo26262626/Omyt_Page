"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

/**
 * Site assistant — docks bottom-right, answers only from content/assistant.
 *
 * Discloses that it is AI in the panel header. That is not decoration: from
 * 2 August 2026 the EU AI Act Art. 50(1) requires systems intended to interact
 * directly with people to disclose it, and omyt is an EU-established provider.
 */

type Msg = { id: string; role: "user" | "assistant"; content: string };

let seq = 0;
const nextId = () => `m${++seq}`;

const OPENERS = [
  "What does omyt actually do?",
  "How is this different from a CRM?",
  "What's a design partner?",
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // The hero fires this once its organism has docked bottom-right; show the
  // input bar (with the AI disclosure) once per session, never again after.
  useEffect(() => {
    const onPeek = () => {
      try {
        if (sessionStorage.getItem("omyt-peeked")) return;
        sessionStorage.setItem("omyt-peeked", "1");
      } catch {
        // storage unavailable — still peek, just without the once-per-session guard
      }
      setPeek(true);
    };
    window.addEventListener("omyt:assistant:peek", onPeek);
    return () => window.removeEventListener("omyt:assistant:peek", onPeek);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every new token
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPeek(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setErr(null);
    const next: Msg[] = [...msgs, { id: nextId(), role: "user", content: q }];
    setMsgs(next);
    setBusy(true);

    try {
      const res = await fetch("/api/assist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => null);
        setErr(j?.error ?? "Assistant is unavailable right now.");
        setBusy(false);
        return;
      }

      setMsgs((m) => [...m, { id: nextId(), role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, { stream: true });
        setMsgs((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }
    } catch {
      setErr("Connection dropped. Try again, or email hello@omyt.ai.");
    } finally {
      setBusy(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPeek(false);
    setOpen(true);
    const el = inputRef.current;
    if (!el) return;
    const v = el.value;
    el.value = "";
    ask(v);
  }

  return (
    <>
      <button
        type="button"
        className={`asst__fab ${open ? "is-open" : ""}`}
        onClick={() => {
          setPeek(false);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Close the assistant" : "Ask about omyt"}
      >
        {open ? (
          <span aria-hidden>✕</span>
        ) : (
          <>
            <span className="asst__fab-dot" aria-hidden />
            Ask about omyt
          </>
        )}
      </button>

      <div
        className={`asst ${open ? "is-open" : ""}${peek && !open ? " is-peek" : ""}`}
        role="dialog"
        aria-label="Ask about omyt"
      >
        <div className="asst__head">
          <div className="asst__title">// ask_omyt</div>
          <div className="asst__note">
            AI assistant. It answers from published material about omyt, and says so when it
            doesn&rsquo;t know.
          </div>
        </div>

        <div className="asst__log" ref={logRef}>
          {msgs.length === 0 && (
            <div className="asst__empty">
              <p>Ask anything about how omyt works.</p>
              <div className="asst__openers">
                {OPENERS.map((o) => (
                  <button type="button" key={o} className="asst__opener" onClick={() => ask(o)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}

          {msgs.map((m) => (
            <div key={m.id} className={`asst__msg asst__msg--${m.role}`}>
              <span className="asst__who">{m.role === "user" ? "you" : "omyt"}</span>
              <div className="asst__body">{m.content || (busy ? "…" : "")}</div>
            </div>
          ))}

          {err && <div className="asst__err">{err}</div>}
        </div>

        <form className="asst__form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className="asst__input"
            placeholder={busy ? "Thinking…" : "Ask a question"}
            disabled={busy}
            maxLength={1500}
            aria-label="Your question"
            onFocus={() => {
              if (peek && !open) {
                setPeek(false);
                setOpen(true);
              }
            }}
          />
          <button type="submit" className="asst__send" disabled={busy} aria-label="Send">
            ↗
          </button>
        </form>
      </div>
    </>
  );
}
