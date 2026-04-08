import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReferencesGrid from "./ReferencesGrid";
import { getAllReferences } from "@/sanity/lib/queries";
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP } from "@/lib/i18n";
import { getPageTranslations } from "@/lib/page-translations";
import { getAlternateUrls, SLUG_MAP } from "@/lib/slugs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getAlternateUrls("reference", locale);

  return {
    title: t.meta.reference.title,
    description: t.meta.reference.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta.reference.title,
      description: t.meta.reference.description,
      url: alternates.canonical,
      locale: OG_LOCALE_MAP[locale],
    },
  };
}

export default async function ReferencePage() {
  const [references, locale] = await Promise.all([getAllReferences(), getLocale()]);
  const pt = getPageTranslations(locale);
  const r = pt.references;
  const contactHref = `/${SLUG_MAP.kontakt[locale]}`;

  return (
    <>
      {/* Hero — foto pozadí */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/kvetiny/GCAs_RedNight_Show_004.webp"
          alt="Florální show na gala večeři — ukázka realizace Showdesigners"
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-28">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            {r.hero_label}
          </p>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            {r.hero_headline_1}
            <br />
            <span className="text-[#C8D400]">{r.hero_headline_2}</span>
            <span className="sr-only"> {r.hero_headline_sr_only}</span>
          </h1>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="py-16 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ReferencesGrid references={references} />
        </div>
      </section>

      {/* CTA — lime */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl text-black leading-none mb-3">
              {r.cta_headline}
            </h2>
            <p className="text-black/50 text-sm">{r.cta_sub}</p>
          </div>
          <Link
            href={contactHref}
            className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark"
          >
            {r.cta_button}
          </Link>
        </div>
      </section>
    </>
  );
}
