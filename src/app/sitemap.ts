import { MetadataRoute } from "next";
import { getReferencesSlugs } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://showdesigners.cz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const referenceSlugs = await getReferencesSlugs();

  const referenceUrls: MetadataRoute.Sitemap = referenceSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/reference/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/sluzba`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/o-nas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/reference`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.9 },
    { url: `${BASE_URL}/zasady`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...referenceUrls,
  ];
}
