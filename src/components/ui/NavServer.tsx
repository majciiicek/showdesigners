import { getLocale } from "@/lib/locale";
import { getTranslations } from "@/lib/i18n";
import { SLUG_MAP } from "@/lib/slugs";
import Nav from "./Nav";

// Server component that resolves locale and passes localized links to the client Nav
export default async function NavServer() {
  const locale = await getLocale();
  const t = getTranslations(locale);

  const links = [
    { href: `/${SLUG_MAP.sluzba[locale]}`,    label: t.nav.sluzba    },
    { href: `/${SLUG_MAP["o-nas"][locale]}`,  label: t.nav["o-nas"]  },
    { href: `/${SLUG_MAP.reference[locale]}`, label: t.nav.reference },
    { href: `/${SLUG_MAP.kontakt[locale]}`,   label: t.nav.kontakt   },
  ];

  return (
    <Nav
      links={links}
      ctaLabel={t.nav.cta}
      ctaHref={`/${SLUG_MAP.kontakt[locale]}`}
    />
  );
}
