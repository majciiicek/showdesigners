import cs from '@/i18n/cs.json'
import en from '@/i18n/en.json'
import de from '@/i18n/de.json'

export type Locale = 'cs' | 'en' | 'de'

const translations = { cs, en, de }

// Returns the full translation object for the given locale
export function getTranslations(locale: Locale) {
  return translations[locale]
}

// Detects locale from the incoming hostname
export function getLocaleFromHostname(hostname: string): Locale {
  if (hostname.includes('showdesigners.de')) return 'de'
  if (hostname.includes('theshowdesigners.com')) return 'en'
  return 'cs'
}

// Canonical domain per locale
export const DOMAIN_MAP: Record<Locale, string> = {
  cs: 'https://showdesigners.cz',
  en: 'https://theshowdesigners.com',
  de: 'https://showdesigners.de',
}

// OpenGraph locale string per locale
export const OG_LOCALE_MAP: Record<Locale, string> = {
  cs: 'cs_CZ',
  en: 'en_US',
  de: 'de_DE',
}

// Translates a Sanity reference type (stored in Czech) to the current locale.
export function translateType(type: string, locale: Locale): string {
  const dict = translations[locale].types as Record<string, string>
  return dict[type] ?? type
}

// Translates a Sanity tag (stored in Czech) to the current locale.
// Falls back to the original value if the tag is not in the dictionary.
export function translateTag(tag: string, locale: Locale): string {
  const dict = translations[locale].tags as Record<string, string>
  return dict[tag] ?? tag
}

// Returns the localized value of a Sanity document field.
// Falls back to the base CS field if no translation exists yet.
// Usage: getLocalizedField(doc, 'title', locale) → reads titleEn / titleDe / title
export function getLocalizedField(
  doc: Record<string, string | undefined>,
  field: string,
  locale: Locale
): string {
  const suffix = locale === 'en' ? 'En' : locale === 'de' ? 'De' : ''
  if (suffix && doc[`${field}${suffix}`]) return doc[`${field}${suffix}`] as string
  return (doc[field] ?? '') as string
}
