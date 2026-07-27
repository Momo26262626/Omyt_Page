import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Provider identification according to § 5 DDG.",
  robots: { index: true, follow: true },
};

export default function Imprint() {
  return (
    <section className="panel phero section">
      <div className="container">
        <div className="label label--acc">// imprint · § 5 DDG</div>
        <h1 className="h1 mt-s" style={{ maxWidth: "14ch" }}>
          Imprint.
        </h1>

        <div className="prose mt-l">
          <h2>Provider</h2>
          <p>
            Cedric Udegbe
            <br />
            omyt (sole proprietorship)
            <br />
            Johannisplatz 3<br />
            10117 Berlin
            <br />
            Germany
          </p>

          <h2>Contact</h2>
          <p>
            Email: <a href="mailto:hello@omyt.ai">hello@omyt.ai</a>
          </p>

          <h2>Responsible for content</h2>
          <p>Cedric Udegbe, address as above.</p>

          <h2>VAT</h2>
          <p>
            Under the small business regulation (Section 19 of the German VAT Act, UStG), no VAT is
            charged and no VAT identification number is held.
          </p>

          <h2>Online dispute resolution</h2>
          <p>
            The European Commission provides a platform for online dispute resolution:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer noopener">
              ec.europa.eu/consumers/odr
            </a>
            . We are neither obliged nor willing to participate in dispute resolution proceedings
            before a consumer arbitration board.
          </p>
        </div>
      </div>
    </section>
  );
}
