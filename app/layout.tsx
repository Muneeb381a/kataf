import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { site, siteUrl } from "@/lib/config";
import { JsonLd } from "@/components/ui/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Al-Kausar | Software house and Academy in Pakistan",
    template: "%s | Al-Kausar",
  },
  description:
    "Al-Kausar builds Printing ERP, Installment Manager, Doctor ERP and custom software for Pakistani businesses, and teaches design, web development, AI and marketing at Al-Kausar Computer Institute.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/logo/alkausar.png`,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: site.city },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrains.variable} ${generalSans.variable}`}>
      <body>
        <JsonLd data={orgLd} />
        {children}
        {process.env.NODE_ENV === "production" && (
          <Script defer data-domain={site.domain} src="https://plausible.io/js/script.js" />
        )}
      </body>
    </html>
  );
}
