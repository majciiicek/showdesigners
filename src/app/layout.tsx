import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import NavServer from "@/components/ui/NavServer";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import ConditionalFloatingChat from "@/components/ui/ConditionalFloatingChat";
import MotionProvider from "@/components/ui/MotionProvider";
import { getLocale } from "@/lib/locale";
import { DOMAIN_MAP } from "@/lib/i18n";
import { getPageTranslations } from "@/lib/page-translations";
import { SLUG_MAP } from "@/lib/slugs";
import "./globals.css";

// Display font — dramatic, bold condensed sans-serif for headlines
const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

// Body font — clean, readable sans-serif
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Showdesigners — Kompletní entertainment pro vaši akci",
  description:
    "Jeden partner. Kompletní program. Showdesigners zajistí celý zábavní večer vaší akce od A do Z — s osobně prověřenými umělci a 15 lety zkušeností.",
  openGraph: {
    title: "Showdesigners — Show, která se nezapomíná",
    description:
      "Jeden partner. Kompletní program. Showdesigners zajistí celý zábavní večer vaší akce od A do Z.",
    siteName: "Showdesigners",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const domain = DOMAIN_MAP[locale];
  const pt = getPageTranslations(locale);
  const privacyHref = `/${SLUG_MAP.zasady[locale]}`;

  // Organization schema — localized per domain
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Show Designers",
    url: domain,
    logo: `${domain}/logo/Show-designers_final-04.png`,
    inLanguage: locale,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+420777668694",
      availableLanguage: [
        locale === "cs" ? "Czech" : locale === "de" ? "German" : "English",
      ],
    },
  };

  return (
    <html lang={locale}>
      <head>
        {/* hreflang — reciprocal across all three domains */}
        <link rel="alternate" hrefLang="cs" href="https://showdesigners.cz" />
        <link rel="alternate" hrefLang="en" href="https://theshowdesigners.com" />
        <link rel="alternate" hrefLang="de" href="https://showdesigners.de" />
        <link rel="alternate" hrefLang="x-default" href="https://theshowdesigners.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
        <MotionProvider>
          <NavServer />
          <main>{children}</main>
          <Footer />
          <CookieBanner text={pt.ui} privacyHref={privacyHref} />
          <ConditionalFloatingChat text={pt.ui} chatText={pt.ui} locale={locale} />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
