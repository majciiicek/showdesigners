import { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getLocaleFromHostname, DOMAIN_MAP } from '@/lib/i18n'
import { SLUG_MAP } from '@/lib/slugs'
import { getReferenceSlugsForLocale } from '@/sanity/lib/queries'

const PAGE_CONFIG = [
  { key: null,        priority: 1.0, changeFreq: 'monthly'  as const },
  { key: 'sluzba',    priority: 0.8, changeFreq: 'monthly'  as const },
  { key: 'o-nas',     priority: 0.7, changeFreq: 'monthly'  as const },
  { key: 'reference', priority: 0.8, changeFreq: 'weekly'   as const },
  { key: 'kontakt',   priority: 0.9, changeFreq: 'yearly'   as const },
  { key: 'zasady',    priority: 0.3, changeFreq: 'yearly'   as const },
  { key: 'impressum', priority: 0.3, changeFreq: 'yearly'   as const },
]

// Domain-aware sitemap — each domain gets its own sitemap with localized slugs
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const hostname = headersList.get('host') || ''
  const locale = getLocaleFromHostname(hostname)
  const domain = DOMAIN_MAP[locale]

  const staticPages: MetadataRoute.Sitemap = PAGE_CONFIG.map(({ key, priority, changeFreq }) => ({
    url: key ? `${domain}/${SLUG_MAP[key][locale]}` : domain,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }))

  // Reference detail pages — locale-specific slugs from Sanity
  const referenceSlugs = await getReferenceSlugsForLocale(locale)
  const referenceSlug = SLUG_MAP.reference[locale]
  const referencePages: MetadataRoute.Sitemap = referenceSlugs.map((slug) => ({
    url: `${domain}/${referenceSlug}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...referencePages]
}
