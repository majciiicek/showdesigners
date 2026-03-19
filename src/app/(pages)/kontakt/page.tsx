import type { Metadata } from "next";
import KontaktClient from "./KontaktClient";

export const metadata: Metadata = {
  title: "Kontakt — Showdesigners",
  description:
    "Poptejte show pro vaši akci. Váš show designer se ozve do 24 hodin.",
  openGraph: {
    title: "Kontakt — Showdesigners",
    description: "Poptejte show pro vaši akci. Váš show designer se ozve do 24 hodin.",
  },
};

export default function KontaktPage() {
  return <KontaktClient />;
}
