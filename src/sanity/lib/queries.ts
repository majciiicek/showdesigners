import { client } from "./client";
import type { Locale } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// TypeScript typy pro data ze Sanity
// ---------------------------------------------------------------------------

export interface SanityImage {
  _type: "image";
  asset: { _type: "reference"; _ref: string };
}

export interface SanityReference {
  _id: string;
  slug: { current: string };
  slugEn?: { current: string };
  slugDe?: { current: string };
  title: string;
  titleEn?: string;
  titleDe?: string;
  type: string;
  description: string;
  descriptionEn?: string;
  descriptionDe?: string;
  image: SanityImage;
  tags: string[];
  order: number;
  hasDetail: boolean;
}

export interface SanityReferenceDetail extends SanityReference {
  detail: {
    subtitle: string;
    subtitleEn?: string;
    subtitleDe?: string;
    date: string;
    dateEn?: string;
    dateDe?: string;
    guests: string;
    guestsEn?: string;
    guestsDe?: string;
    venue: string;
    venueEn?: string;
    venueDe?: string;
    brief: string;
    briefEn?: string;
    briefDe?: string;
    solution: string;
    solutionEn?: string;
    solutionDe?: string;
    quote?: string;
    quoteEn?: string;
    quoteDe?: string;
    gallery: SanityImage[];
    showDesigner?: {
      name: string;
      bio: string;
      bioEn?: string;
      bioDe?: string;
      photo?: SanityImage;
    };
  };
}

// Returns the slug string for a reference in the current locale.
// Falls back to the Czech slug if the locale variant is not filled in.
export function getLocalizedSlug(ref: Pick<SanityReference, "slug" | "slugEn" | "slugDe">, locale: Locale): string {
  if (locale === "en" && ref.slugEn?.current) return ref.slugEn.current;
  if (locale === "de" && ref.slugDe?.current) return ref.slugDe.current;
  return ref.slug.current;
}

// ---------------------------------------------------------------------------
// GROQ dotazy
// ---------------------------------------------------------------------------

const revalidate = { next: { revalidate: 60 } };

const REFERENCE_FIELDS = `
  _id,
  slug,
  slugEn,
  slugDe,
  title,
  titleEn,
  titleDe,
  type,
  description,
  descriptionEn,
  descriptionDe,
  image,
  tags,
  order,
  "hasDetail": defined(detail)
`;

// Výpis všech referencí (karta ve výpisu)
export async function getAllReferences(): Promise<SanityReference[]> {
  return client.fetch(
    `*[_type == "caseStudy"] | order(order asc) { ${REFERENCE_FIELDS} }`,
    {},
    revalidate
  );
}

// Jeden detail reference podle slugu — hledá ve všech jazykových variantách
export async function getReferenceBySlug(slug: string): Promise<SanityReferenceDetail | null> {
  return client.fetch(
    `*[_type == "caseStudy" && (slug.current == $slug || slugEn.current == $slug || slugDe.current == $slug)][0] {
      ${REFERENCE_FIELDS},
      detail {
        subtitle,
        subtitleEn,
        subtitleDe,
        date,
        dateEn,
        dateDe,
        guests,
        guestsEn,
        guestsDe,
        venue,
        venueEn,
        venueDe,
        brief,
        briefEn,
        briefDe,
        solution,
        solutionEn,
        solutionDe,
        quote,
        quoteEn,
        quoteDe,
        gallery,
        showDesigner {
          name,
          bio,
          bioEn,
          bioDe,
          photo
        }
      }
    }`,
    { slug },
    revalidate
  );
}

// Slugy všech referencí s detailem (pro generateStaticParams)
// Vrátí všechny jazykové varianty, aby Next.js předgeneroval stránky pro každý slug
export async function getReferencesSlugs(): Promise<{ slug: string }[]> {
  const refs = await client.fetch<{ slug: string; slugEn?: string; slugDe?: string }[]>(
    `*[_type == "caseStudy" && defined(detail)] {
      "slug": slug.current,
      "slugEn": slugEn.current,
      "slugDe": slugDe.current
    }`,
    {},
    revalidate
  );

  const all = new Set<string>();
  for (const r of refs) {
    if (r.slug) all.add(r.slug);
    if (r.slugEn) all.add(r.slugEn);
    if (r.slugDe) all.add(r.slugDe);
  }
  return Array.from(all).map((slug) => ({ slug }));
}
