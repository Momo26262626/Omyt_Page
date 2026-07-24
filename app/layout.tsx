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
    default: "omyt — the company brain with a persistent semantic world model",
    template: "%s · omyt",
  },
  description:
    "omyt is a company brain. It reads every signal from your business — deals, conversations, market, outcomes — and keeps them as one persistent semantic world model it can reason over, so you always know the next move.",
  keywords: ["company brain", "semantic world model", "AI business operating system", "founder", "outreach automation", "pipeline", "business intelligence"],
  openGraph: {
    title: "omyt — the company brain with a persistent semantic world model",
    description:
      "One living model of your whole business — reading every signal, remembering it, and reasoning over it to tell you the next move.",
    url: "https://omyt.ai",
    siteName: "omyt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omyt — the company brain",
    description:
      "A persistent semantic world model of your business that reads every signal and tells you the next move.",
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
      slogan: "The company brain — a persistent semantic world model",
      description:
        "omyt is a company brain that keeps a persistent semantic world model of your business — reading every signal, remembering it, and reasoning over it to surface the next move.",
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
        "A company brain that keeps a persistent semantic world model of your business — unifying outreach, pipeline, automations, and strategy under one model that reasons across every signal.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
