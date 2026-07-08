import Link from "next/link";
import { Wordmark } from "./Wordmark";

const APP_URL = "https://app.omyt.ai";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark size={28} />
            <p className="footer__tag">
              The operating layer for go-to-market. One surface that runs your
              outreach, pipeline, automations, and strategy — and tells you where to act.
            </p>
            <span className="chip"><span className="dot dot--live" /> Always running</span>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <span className="footer__h">Product</span>
              <Link href="/product">Overview</Link>
              <Link href="/product#brain">Sales Brain</Link>
              <Link href="/product#intelligence">Intelligence layer</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div className="footer__col">
              <span className="footer__h">Company</span>
              <Link href="/about">About</Link>
              <Link href="/about#thesis">Thesis</Link>
              <a href={APP_URL}>Sign in</a>
              <a href={`${APP_URL}/sign-up`}>Start free</a>
            </div>
            <div className="footer__col">
              <span className="footer__h">Contact</span>
              <a href="mailto:hello@omyt.ai">hello@omyt.ai</a>
              <span className="muted" style={{ fontSize: 13 }}>United States</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} omyt. All rights reserved.</span>
          <span className="footer__os">A new category — the GTM operating system.</span>
        </div>
      </div>
    </footer>
  );
}
