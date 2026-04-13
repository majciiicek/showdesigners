import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReferenceBySlug, getReferencesSlugs, getAllReferences, getLocalizedSlug } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import RelatedRefsScroll from "@/components/ui/RelatedRefsScroll";
import { getLocale } from "@/lib/locale";
import { getPageTranslations } from "@/lib/page-translations";
import { SLUG_MAP } from "@/lib/slugs";
import { DOMAIN_MAP, getLocalizedField, translateTag, translateType } from "@/lib/i18n";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getReferencesSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [ref, locale] = await Promise.all([getReferenceBySlug(slug), getLocale()]);
  if (!ref) return {};
  const localTitle = getLocalizedField(ref as unknown as Record<string, string | undefined>, "title", locale);
  const localDesc = getLocalizedField(ref as unknown as Record<string, string | undefined>, "description", locale);
  return {
    title: `${localTitle} — Reference Showdesigners`,
    description: localDesc,
  };
}

const typeColors: Record<string, string> = {
  "Korporátní akce": "bg-blue-700/80 text-white",
  "Soukromá akce": "bg-purple-700/80 text-white",
  "Kulturní akce": "bg-orange-700/80 text-white",
  "Hotel / resort": "bg-teal-700/80 text-white",
  "Festival": "bg-pink-700/80 text-white",
  "Family day": "bg-green-700/80 text-white",
  "Městská akce": "bg-yellow-700/80 text-white",
};

export default async function ReferenceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [ref, allReferences, locale] = await Promise.all([
    getReferenceBySlug(slug),
    getAllReferences(),
    getLocale(),
  ]);

  if (!ref || !ref.detail) notFound();

  const pt = getPageTranslations(locale);
  const r = pt.references;
  const contactHref = `/${SLUG_MAP.kontakt[locale]}`;
  const refsHref = `/${SLUG_MAP.reference[locale]}`;

  // Helper — picks the right language field, falls back to Czech
  function loc(obj: Record<string, string | undefined>, field: string) {
    return getLocalizedField(obj, field, locale);
  }

  const localTitle = loc(ref as unknown as Record<string, string | undefined>, "title");
  const localDesc  = loc(ref as unknown as Record<string, string | undefined>, "description");

  const relatedRefs = allReferences
    .filter((ref2) => ref2.slug.current !== slug && ref2.hasDetail)
    .map((ref2) => ({
      ...ref2,
      title: loc(ref2 as unknown as Record<string, string | undefined>, "title"),
    }));

  const d = ref.detail;
  const dl = d as unknown as Record<string, string | undefined>;

  // Localized detail fields
  const localSubtitle  = loc(dl, "subtitle");
  const localDate      = loc(dl, "date");
  const localGuests    = loc(dl, "guests");
  const localVenue     = loc(dl, "venue");
  const localBrief     = loc(dl, "brief");
  const localSolution  = loc(dl, "solution");
  const localQuote     = loc(dl, "quote");
  const localBio       = d.showDesigner
    ? loc(d.showDesigner as unknown as Record<string, string | undefined>, "bio")
    : undefined;
  const heroUrl = urlFor(ref.image).width(1600).format("webp").url();

  const siteUrl = DOMAIN_MAP[locale];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": r.breadcrumb_home, "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": r.breadcrumb_refs, "item": `${siteUrl}/${SLUG_MAP.reference[locale]}` },
      { "@type": "ListItem", "position": 3, "name": localTitle, "item": `${siteUrl}/${SLUG_MAP.reference[locale]}/${getLocalizedSlug(ref, locale)}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <Image
          src={heroUrl}
          alt={ref.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pt-36 lg:pt-44 pb-12 lg:pb-16">
          <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-6">
            <Link href={refsHref} className="hover:text-white/70 transition-colors">
              {r.breadcrumb_refs}
            </Link>
            <span>/</span>
            <span className="text-white/60">{localTitle}</span>
          </div>
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[ref.type] ?? "bg-black/70 text-white/70"}`}>
              {translateType(ref.type, locale)}
            </span>
          </div>
          <h1 className="font-display text-white leading-none mb-4" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}>
            {localTitle.toUpperCase()}
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-2xl">{localSubtitle}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            <div className="py-8 lg:py-10 pr-8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{r.stat_guests}</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{localGuests}</p>
            </div>
            <div className="py-8 lg:py-10 px-8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{r.stat_date}</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{localDate}</p>
            </div>
            <div className="py-8 lg:py-10 px-8 col-span-2 lg:col-span-1">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{r.stat_venue}</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{localVenue}</p>
            </div>
            <div className="py-8 lg:py-10 pl-8 col-span-2 lg:col-span-1 border-t border-white/5 lg:border-t-0">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{r.stat_program}</p>
              <div className="flex flex-wrap gap-1.5">
                {ref.tags.map((tag) => (
                  <span key={tag} className="text-[#C8D400]/70 text-xs border border-[#C8D400]/20 px-2 py-0.5 rounded-full">
                    {translateTag(tag, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brief + Solution */}
      <section className="py-16 lg:py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-4">{r.brief_label}</p>
              <p className="text-white/45 text-sm leading-relaxed">{localBrief}</p>
            </div>
            <div className="border-l-2 border-[#C8D400]/40 pl-8 lg:pl-10">
              <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4">{r.solution_label}</p>
              <p className="text-white/85 text-lg leading-relaxed">{localSolution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      {localQuote && (
        <section className="py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <span aria-hidden="true" className="absolute -top-8 left-4 font-display text-[180px] lg:text-[240px] leading-none text-white/[0.03] select-none pointer-events-none">„</span>
            <p className="font-display text-3xl lg:text-5xl text-white leading-tight max-w-4xl relative z-10">{localQuote}</p>
            <div className="mt-8 w-12 h-px bg-[#C8D400]" />
          </div>
        </section>
      )}

      {/* Gallery */}
      {d.gallery?.length > 0 && (
        <section className="py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-8">{r.gallery_label}</p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
              {d.gallery.map((img, i) => (
                <div key={i} className="relative break-inside-avoid overflow-hidden rounded-sm">
                  <Image
                    src={urlFor(img).width(900).format("webp").url()}
                    alt={`${ref.title} — foto ${i + 1}`}
                    width={800}
                    height={600}
                    className="w-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Show Designer */}
      {d.showDesigner && (
        <section className="py-16 lg:py-20 bg-[#0a0a0a] border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{r.show_designer_label}</p>
            <p className="text-white/30 text-sm mb-8">{r.show_designer_sub}</p>
            <div className="flex items-start gap-6">
              {d.showDesigner.photo ? (
                <Image
                  src={urlFor(d.showDesigner.photo).format("webp").url()}
                  alt={d.showDesigner.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0 mt-6"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-3xl text-white/30">{d.showDesigner.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="text-white font-semibold text-lg leading-none mb-1">{d.showDesigner.name}</p>
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{r.show_designer_role}</p>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">{localBio}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related references */}
      {relatedRefs.length > 0 && (
        <section className="py-16 bg-[#0d0d0d] border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-8">{r.related_label}</p>
          </div>
          <RelatedRefsScroll refs={relatedRefs} locale={locale} />
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl text-black leading-none mb-3">{r.detail_cta_headline}</h2>
            <p className="text-black/50 text-sm">{r.detail_cta_sub}</p>
          </div>
          <Link href={contactHref} className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark">
            {r.detail_cta_button}
          </Link>
        </div>
      </section>
    </>
  );
}
