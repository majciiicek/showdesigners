import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getLocaleFromHostname, DOMAIN_MAP } from '@/lib/i18n'

// Domain-aware robots.txt — each domain points to its own sitemap
export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const locale = getLocaleFromHostname(hostname)

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/api/'],
    },
    sitemap: `${DOMAIN_MAP[locale]}/sitemap.xml`,
  }
}
