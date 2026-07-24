import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How omyt handles personal data on this website.",
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <section className="panel phero section">
      <div className="container">
        <div className="label label--acc">// privacy · gdpr</div>
        <h1 className="h1 mt-s" style={{ maxWidth: "16ch" }}>Privacy Policy.</h1>

        <div className="prose mt-l">
          <p className="prose__lead">
            This policy covers this website (omyt.ai) only. We collect as little as possible:
            there are <b>no cookies, no analytics, and no third-party trackers</b> on this site.
            The only personal data we ask for is what you type into the waitlist form.
          </p>

          <h2>1. Controller</h2>
          <p>
            Cedric Udegbe, omyt (sole proprietorship), Johannisplatz 3, 10117 Berlin, Germany.<br />
            Email: <a href="mailto:hello@omyt.ai">hello@omyt.ai</a>
          </p>

          <h2>2. What we collect</h2>
          <p>
            <b>Waitlist form.</b> When you request an invite we process the name, email address,
            the free-text description of what you need, your choice of local or hosted setup, and
            the time of submission. All of it is voluntary — the form is the only place we ask for
            personal data.
          </p>
          <p>
            <b>Server logs.</b> Our hosting provider records technical request data (including IP
            address, timestamp, and requested URL) for the purpose of operating and securing the
            site. These logs are short-lived and are not combined with waitlist entries.
          </p>

          <h2>3. Why, and on what legal basis</h2>
          <ul>
            <li>
              <b>To respond to your request for access</b> — Art. 6(1)(b) GDPR (steps taken at your
              request prior to entering into a contract). We use your details to contact you when a
              setup slot is available, and to scope what you need.
            </li>
            <li>
              <b>To operate and secure the website</b> — Art. 6(1)(f) GDPR (our legitimate interest
              in a functioning, non-abused site).
            </li>
          </ul>

          <h2>4. Who processes it for us</h2>
          <p>
            We use a small number of processors under Art. 28 GDPR data processing agreements:
          </p>
          <ul>
            <li><b>Vercel Inc.</b> (USA) — website hosting and server logs.</li>
            <li><b>Resend</b> (USA) — delivery of the notification email containing your submission.</li>
          </ul>
          <p>
            Both are located in the United States, so your data is transferred outside the EEA.
            These transfers are covered by the EU&ndash;US Data Privacy Framework and/or the European
            Commission&rsquo;s Standard Contractual Clauses (Art. 45/46 GDPR). We do not sell personal
            data or share it with anyone else.
          </p>

          <h2>5. How long we keep it</h2>
          <p>
            Waitlist entries are kept until your request is resolved (you are onboarded or you tell
            us you are no longer interested), and deleted at the latest 24 months after your last
            contact with us — unless a statutory retention obligation applies. Server logs are
            retained only briefly by our hosting provider for security and diagnostics.
          </p>

          <h2>6. Your rights</h2>
          <p>
            Under the GDPR you have the right to access (Art. 15), rectification (Art. 16), erasure
            (Art. 17), restriction (Art. 18), data portability (Art. 20), and to object to
            processing based on legitimate interests (Art. 21). Where processing rests on consent,
            you may withdraw it at any time with effect for the future.
          </p>
          <p>
            To exercise any of these, email <a href="mailto:hello@omyt.ai">hello@omyt.ai</a> — a
            plain email is enough, and it costs you nothing.
          </p>
          <p>
            You also have the right to complain to a supervisory authority. The one responsible for
            us is the{" "}
            <a href="https://www.datenschutz-berlin.de/" target="_blank" rel="noreferrer noopener">
              Berlin Commissioner for Data Protection and Freedom of Information
            </a>
            .
          </p>

          <h2>7. Cookies and tracking</h2>
          <p>
            This site sets no cookies and runs no analytics, advertising, or tracking scripts.
            That is why you are not seeing a cookie banner — there is nothing to consent to.
          </p>

          <h2>8. Changes</h2>
          <p>
            We will update this policy if the site starts doing something new with personal data.
            The current version always lives at this URL.
          </p>
        </div>
      </div>
    </section>
  );
}
