import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./site.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

// Heavy industrial grotesque for the brutalist display + body.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://omyt.ai"),
  title: {
    default: "omyt — every lead found, every relationship worked",
    template: "%s · omyt",
  },
  description:
    "omyt is a company brain for sales teams and recruiters. It sources the accounts and candidates worth knowing, understands each one from every signal they give off, and works them — alongside the thousands already sitting dormant in your CRM or ATS.",
  keywords: ["company brain", "semantic world model", "AI business operating system", "founder", "outreach automation", "pipeline", "business intelligence"],
  openGraph: {
    title: "omyt — every lead found, every relationship worked",
    description:
      "Sourcing, understanding and outreach as one loop. It builds the book, then works the book — for sales teams and recruiters.",
    url: "https://omyt.ai",
    siteName: "omyt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omyt — the company brain",
    description:
      "It sources your market, understands every lead, and works them all. For sales teams and recruiters.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d15",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://omyt.ai/#org",
      name: "omyt",
      url: "https://omyt.ai",
      email: "hello@omyt.ai",
      slogan: "Every lead found, every relationship worked",
      description:
        "omyt is a company brain for sales teams and recruiters that sources new leads, understands each one, and runs the outreach — for new and dormant relationships alike.",
    },
    {
      "@type": "WebSite",
      "@id": "https://omyt.ai/#site",
      url: "https://omyt.ai",
      name: "omyt",
      publisher: { "@id": "https://omyt.ai/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "omyt",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "A company brain for sales teams and recruiters: lead sourcing, enrichment, and outreach as one continuous loop over new and existing relationships.",
      // pricing is individual and access is invite-only, so no public offer is advertised
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is static, server-rendered structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="progressbar" aria-hidden="true" />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
