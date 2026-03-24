import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import CookieBanner from "@/components/ui/CookieBanner";
import "./globals.css";

// Deferred — loads after hydration, not needed for initial render
const FloatingChat = dynamic(() => import("@/components/ui/FloatingChat"), { ssr: false });

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
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <FloatingChat />
      </body>
    </html>
  );
}
