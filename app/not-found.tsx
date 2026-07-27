import Link from "next/link";

// Custom 404 — keeps dead URLs (old /pricing, /sign-up bookmarks, typos) inside
// the site's own design instead of Next's default white page.
export default function NotFound() {
  return (
    <section className="panel section" style={{ minHeight: "72svh" }}>
      <div className="container">
        <div className="label label--acc">// 404 — not_in_the_model</div>
        <h1 className="dsp cta__h mt-s">
          This page
          <br />
          doesn&rsquo;t exist.
        </h1>
        <p className="lede mt-m" style={{ maxWidth: "52ch" }}>
          Nothing at this address — it may have moved when the site was rebuilt. Everything that
          matters is one step away.
        </p>
        <div className="hero__cta" style={{ marginTop: 34 }}>
          <Link href="/" className="btn btn--primary btn--lg">
            Back to the brain <span className="arr">↗</span>
          </Link>
          <Link href="/partners" className="btn btn--ghost btn--lg">
            Design partners <span className="arr">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
