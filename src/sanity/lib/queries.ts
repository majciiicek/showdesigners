import { client } from "./client";

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
  title: string;
  type: string;
  description: string;
  image: SanityImage;
  tags: string[];
  order: number;
  hasDetail: boolean;
}

export interface SanityReferenceDetail extends SanityReference {
  detail: {
    subtitle: string;
    date: string;
    guests: string;
    venue: string;
    brief: string;
    solution: string;
    quote?: string;
    gallery: SanityImage[];
    showDesigner?: {
      name: string;
      bio: string;
      photo?: SanityImage;
    };
  };
}

// ---------------------------------------------------------------------------
// GROQ dotazy
// ---------------------------------------------------------------------------

// Výpis všech referencí (karta ve výpisu)
const revalidate = { next: { revalidate: 60 } };

export async function getAllReferences(): Promise<SanityReference[]> {
  return client.fetch(
    `*[_type == "caseStudy"] | order(order asc) {
      _id,
      slug,
      title,
      type,
      description,
      image,
      tags,
      order,
      "hasDetail": defined(detail)
    }`,
    {},
    revalidate
  );
}

// Jeden detail reference podle slugu
export async function getReferenceBySlug(slug: string): Promise<SanityReferenceDetail | null> {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      slug,
      title,
      type,
      description,
      image,
      tags,
      "hasDetail": defined(detail),
      detail {
        subtitle,
        date,
        guests,
        venue,
        brief,
        solution,
        quote,
        gallery,
        showDesigner {
          name,
          bio,
          photo
        }
      }
    }`,
    { slug },
    revalidate
  );
}

// Slugy všech referencí s detailem (pro generateStaticParams)
export async function getReferencesSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "caseStudy" && defined(detail)] { "slug": slug.current }`,
    {},
    revalidate
  );
}
