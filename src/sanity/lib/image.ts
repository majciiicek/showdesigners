import createImageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6i1t4r1j",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
});

// Pomocná funkce — vrací URL obrázku ve WebP formátu
// Použití: urlFor(image).width(800).format("webp").url()
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
