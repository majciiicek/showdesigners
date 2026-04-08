import csPages from '@/i18n/pages-cs.json'
import enPages from '@/i18n/pages-en.json'
import dePages from '@/i18n/pages-de.json'
import type { Locale } from '@/lib/i18n'

const pageTranslations = { cs: csPages, en: enPages, de: dePages }

// Returns the full page-level translation object for the given locale.
// Used by server components to pass text props to client section components.
export function getPageTranslations(locale: Locale) {
  return pageTranslations[locale]
}
