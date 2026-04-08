import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import AdvisorSection from "@/components/sections/AdvisorSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import StatsSection from "@/components/sections/StatsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP, DOMAIN_MAP } from "@/lib/i18n";
import { getPageTranslations } from "@/lib/page-translations";
import { getHomeAlternateUrls, SLUG_MAP } from "@/lib/slugs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getHomeAlternateUrls(locale);

  return {
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta.home.title,
      description: t.meta.home.description,
      url: DOMAIN_MAP[locale],
      siteName: "Showdesigners",
      locale: OG_LOCALE_MAP[locale],
      type: "website",
    },
  };
}

export default async function HomePage() {
  const locale = await getLocale();
  const pt = getPageTranslations(locale);
  const contactHref = `/${SLUG_MAP.kontakt[locale]}`;
  const referencesHref = `/${SLUG_MAP.reference[locale]}`;

  return (
    <>
      <HeroSection text={pt.homepage} ctaHref={contactHref} />
      <IntroSection text={pt.homepage} />
      <AdvisorSection text={pt.homepage} />
      <ProjectsSection text={pt.homepage} referencesHref={referencesHref} />
      <StatsSection text={pt.homepage} />
      <HowItWorksSection text={pt.homepage} ctaHref={contactHref} />
      <TestimonialsSection text={pt.homepage} />
      <CtaSection text={pt.homepage} ctaHref={contactHref} />
    </>
  );
}
