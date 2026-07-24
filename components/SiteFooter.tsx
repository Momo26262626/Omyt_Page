import Link from "next/link";
import { Wordmark } from "./Wordmark";

// The app currently answers on the apex; set NEXT_PUBLIC_APP_URL to
// https://app.omyt.ai once the app moves to that subdomain.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://omyt.ai";

export function SiteFooter() {
  return (
    <footer className="footer panel">
      <div className="container">
        <a href="/#waitlist" className="footer__big" aria-label="Join the waitlist">
          JOIN_THE_LIST ↗
        </a>

        <div className="footer__mid">
          <div>
            <span style={{ display: "inline-flex", color: "var(--fg)" }}><Wordmark size={26} /></span>
            <p className="footer__tag" style={{ marginTop: 18 }}>
              The company brain — a persistent semantic world model of your business. It reads
              every signal, remembers it, and reasons over it to tell you the next move.
            </p>
            <div className="footer__path">omyt.ai / company_brain / v2</div>
          </div>

          <div className="footer__col">
            <span className="footer__h">Product</span>
            <Link href="/product">Overview</Link>
            <Link href="/product#brain">The brain</Link>
            <Link href="/product#intelligence">World model</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="footer__col">
            <span className="footer__h">Company</span>
            <Link href="/about">About</Link>
            <Link href="/about#thesis">Thesis</Link>
            <a href={APP_URL}>Sign in</a>
            <a href="/#waitlist">Join waitlist</a>
          </div>
          <div className="footer__col">
            <span className="footer__h">Contact</span>
            <a href="mailto:hello@omyt.ai">hello@omyt.ai</a>
            <Link href="/legal/imprint">Imprint</Link>
            <Link href="/legal/privacy">Privacy</Link>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} omyt</span>
          <span>persistent semantic world model</span>
        </div>
      </div>
    </footer>
  );
}
