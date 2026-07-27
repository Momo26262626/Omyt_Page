import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./site.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Assistant } from "@/components/Assistant";

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
    default: "omyt — the company brain",
    template: "%s · omyt",
  },
  description:
    "omyt is a company brain. It holds everything your business knows — every account, campaign, thread and outcome — reasons across all of it continuously, and acts on what it concludes. Today that means sales and marketing run themselves.",
  keywords: [
    "company brain",
    "AI business operating system",
    "semantic world model",
    "sales automation",
    "marketing automation",
    "pipeline",
    "business intelligence",
  ],
  openGraph: {
    title: "omyt — the company brain",
    description:
      "It knows everything your business knows, and acts on it. Today that means sales and marketing run themselves. It doesn't stop there.",
    url: "https://omyt.ai",
    siteName: "omyt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omyt — the company brain",
    description: "A company brain that knows everything your business knows, and acts on it.",
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
      slogan: "The company brain",
      description:
        "omyt is a company brain that holds everything a business knows, reasons across all of it continuously, and acts on what it concludes — starting with sales and marketing.",
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
        "A company brain: sourcing, understanding, outreach and marketing as one continuous loop over everything the business knows.",
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
        <Assistant />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
