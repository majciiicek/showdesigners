import type { Metadata } from "next";
import KontaktClient from "./KontaktClient";

export const metadata: Metadata = {
  title: "Poptávka show designera — Kontakt | Showdesigners",
  description:
    "Poptejte show designera pro vaši akci — korporátní večírek, gala nebo soukromá oslava. Ozve se vám do 24 hodin.",
  openGraph: {
    title: "Poptávka show designera — Kontakt | Showdesigners",
    description: "Poptejte show designera pro vaši akci — korporátní večírek, gala nebo soukromá oslava. Ozve se vám do 24 hodin.",
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
