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
    default: "omyt — know your customers better than anyone",
    template: "%s · omyt",
  },
  description:
    "omyt is a company brain that learns each customer from every signal they emit, then turns that understanding into outreach, timing and decisions automatically. It runs on a persistent semantic world model, so what it learns compounds instead of resetting.",
  keywords: ["company brain", "semantic world model", "AI business operating system", "founder", "outreach automation", "pipeline", "business intelligence"],
  openGraph: {
    title: "omyt — know your customers better than anyone",
    description:
      "Understand every account continuously, then act on what is learned — automatically, at a scale you could not work by hand.",
    url: "https://omyt.ai",
    siteName: "omyt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omyt — the company brain",
    description:
      "Learn every customer from every signal they emit, then scale what you learn automatically.",
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
      slogan: "Know your customers better than anyone",
      description:
        "omyt is a company brain that learns each customer continuously and turns that understanding into action, on a persistent semantic world model so the knowledge compounds.",
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
        "A company brain that learns every customer continuously and scales that understanding into outreach, pipeline, automations and strategy.",
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
