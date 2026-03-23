import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://showdesigners.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/studio/", "/_next/static/"] },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
