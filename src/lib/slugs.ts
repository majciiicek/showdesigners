import type { Locale } from '@/lib/i18n'
import { DOMAIN_MAP } from '@/lib/i18n'

type SlugMap = Record<string, Record<Locale, string>>

// Maps internal page keys to their localized URL slugs per locale.
// EN and DE slugs are confirmed by the project owner.
export const SLUG_MAP: SlugMap = {
  'o-nas':     { cs: 'o-nas',     en: 'about',      de: 'ueber-uns'  },
  'sluzba':    { cs: 'sluzba',    en: 'services',   de: 'leistungen' },
  'reference': { cs: 'reference', en: 'references', de: 'referenzen' },
  'kontakt':   { cs: 'kontakt',   en: 'contact',    de: 'kontakt'    },
  'zasady':    { cs: 'zasady',    en: 'privacy',    de: 'datenschutz'},
  'impressum': { cs: 'impressum', en: 'impressum',  de: 'impressum'  },
}

// Returns the canonical URL and hreflang alternates for a given page and locale.
export function getAlternateUrls(pageKey: string, locale: Locale) {
  const slugs = SLUG_MAP[pageKey]
  if (!slugs) return {}

  return {
    canonical: `${DOMAIN_MAP[locale]}/${slugs[locale]}`,
    languages: {
      cs:          `${DOMAIN_MAP.cs}/${slugs.cs}`,
      en:          `${DOMAIN_MAP.en}/${slugs.en}`,
      de:          `${DOMAIN_MAP.de}/${slugs.de}`,
      'x-default': `${DOMAIN_MAP.en}/${slugs.en}`,
    },
  }
}

// Returns the canonical URL and hreflang alternates for the homepage.
export function getHomeAlternateUrls(locale: Locale) {
  return {
    canonical: DOMAIN_MAP[locale],
    languages: {
      cs:          DOMAIN_MAP.cs,
      en:          DOMAIN_MAP.en,
      de:          DOMAIN_MAP.de,
      'x-default': DOMAIN_MAP.en,
    },
  }
}
