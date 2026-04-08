import { headers } from 'next/headers'
import type { Locale } from '@/lib/i18n'

// Reads the locale set by middleware from the x-locale request header.
// Falls back to 'cs' if the header is absent (e.g. local dev without middleware).
export async function getLocale(): Promise<Locale> {
  const headersList = await headers()
  const locale = headersList.get('x-locale') as Locale
  return locale || 'cs'
}
