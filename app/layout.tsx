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
    default: "omyt — you have 8,000 relationships. you work 50.",
    template: "%s · omyt",
  },
  description:
    "omyt is a company brain for sales teams and recruiters. It holds every relationship you have ever had, watches all of them for the signal that says now, and works the ones that are ready — including the records dormant for years.",
  keywords: ["company brain", "semantic world model", "AI business operating system", "founder", "outreach automation", "pipeline", "business intelligence"],
  openGraph: {
    title: "omyt — you have 8,000 relationships. you work 50.",
    description:
      "Your CRM and ATS are full of people worth contacting today. omyt finds them, and reaches out — for sales teams and recruiters.",
    url: "https://omyt.ai",
    siteName: "omyt",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "omyt — the company brain",
    description:
      "Every relationship you have ever had, watched and worked. For sales teams and recruiters.",
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
      slogan: "Every relationship you have ever had, working",
      description:
        "omyt is a company brain for sales teams and recruiters that keeps every relationship live, watches for the moment to act, and runs the outreach.",
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
        "A company brain for sales teams and recruiters: every relationship held, watched for buying or hiring signals, and worked automatically.",
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
