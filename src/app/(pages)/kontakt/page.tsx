import type { Metadata } from "next";
import { Suspense } from "react";
import KontaktClient from "./KontaktClient";
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP } from "@/lib/i18n";
import { getAlternateUrls, SLUG_MAP } from "@/lib/slugs";
import { getPageTranslations } from "@/lib/page-translations";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getAlternateUrls("kontakt", locale);

  return {
    title: t.meta.kontakt.title,
    description: t.meta.kontakt.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta.kontakt.title,
      description: t.meta.kontakt.description,
      url: alternates.canonical,
      locale: OG_LOCALE_MAP[locale],
    },
  };
}

export default async function KontaktPage() {
  const locale = await getLocale();
  const pt = getPageTranslations(locale);
  const privacyHref = `/${SLUG_MAP.zasady[locale]}`;

  return (
    <Suspense>
      <KontaktClient
        text={pt.contact}
        formText={pt.contact}
        chatText={pt.ui}
        privacyHref={privacyHref}
        locale={locale}
      />
    </Suspense>
  );
}
