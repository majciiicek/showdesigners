import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReferenceBySlug, getReferencesSlugs, getAllReferences } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getReferencesSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ref = await getReferenceBySlug(slug);
  if (!ref) return {};
  return {
    title: `${ref.title} — Reference Showdesigners`,
    description: ref.description,
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
  const [ref, allReferences] = await Promise.all([
    getReferenceBySlug(slug),
    getAllReferences(),
  ]);

  if (!ref || !ref.detail) notFound();

  // Pick up to 3 other references for internal linking
  const relatedRefs = allReferences.filter((r) => r.slug.current !== slug).slice(0, 3);

  const d = ref.detail;
  const heroUrl = urlFor(ref.image).width(1920).height(900).format("webp").url();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://showdesigners.cz";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Showdesigners", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Reference", "item": `${siteUrl}/reference` },
      { "@type": "ListItem", "position": 3, "name": ref.title, "item": `${siteUrl}/reference/${slug}` },
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
            <Link href="/reference" className="hover:text-white/70 transition-colors">Reference</Link>
            <span>/</span>
            <span className="text-white/60">{ref.title}</span>
          </div>
          <div className="flex flex-wrap items-end gap-4 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[ref.type] ?? "bg-black/70 text-white/70"}`}>
              {ref.type}
            </span>
          </div>
          <h1 className="font-display text-white leading-none mb-4" style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}>
            {ref.title.toUpperCase()}
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-2xl">{d.subtitle}</p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#0a0a0a] border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            <div className="py-8 lg:py-10 pr-8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Hosté</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{d.guests}</p>
            </div>
            <div className="py-8 lg:py-10 px-8">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Datum</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{d.date}</p>
            </div>
            <div className="py-8 lg:py-10 px-8 col-span-2 lg:col-span-1">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-2">Místo</p>
              <p className="font-display text-3xl lg:text-4xl text-white leading-none">{d.venue}</p>
            </div>
            <div className="py-8 lg:py-10 pl-8 col-span-2 lg:col-span-1 border-t border-white/5 lg:border-t-0">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Program</p>
              <div className="flex flex-wrap gap-1.5">
                {ref.tags.map((tag) => (
                  <span key={tag} className="text-[#C8D400]/70 text-xs border border-[#C8D400]/20 px-2 py-0.5 rounded-full">
                    {tag}
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
              <p className="text-white/30 text-xs font-semibold tracking-[0.2em] uppercase mb-4">Zadání</p>
              <p className="text-white/45 text-sm leading-relaxed">{d.brief}</p>
            </div>
            <div className="border-l-2 border-[#C8D400]/40 pl-8 lg:pl-10">
              <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Naše řešení</p>
              <p className="text-white/85 text-lg leading-relaxed">{d.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      {d.quote && (
        <section className="py-20 lg:py-28 bg-[#0a0a0a] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <span aria-hidden="true" className="absolute -top-8 left-4 font-display text-[180px] lg:text-[240px] leading-none text-white/[0.03] select-none pointer-events-none">„</span>
            <p className="font-display text-3xl lg:text-5xl text-white leading-tight max-w-4xl relative z-10">{d.quote}</p>
            <div className="mt-8 w-12 h-px bg-[#C8D400]" />
          </div>
        </section>
      )}

      {/* Gallery */}
      {d.gallery?.length > 0 && (
        <section className="py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-8">Fotografie z akce</p>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
              {d.gallery.map((img, i) => (
                <div key={i} className="relative break-inside-avoid overflow-hidden rounded-sm">
                  <Image
                    src={urlFor(img).width(800).format("webp").url()}
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
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Show designer na místě</p>
            <p className="text-white/30 text-sm mb-8">Každá akce má přiděleného show designera — poprvé se potkáte po podpisu, a od té chvíle je to váš člověk na místě.</p>
            <div className="flex items-start gap-6">
              {d.showDesigner.photo ? (
                <Image
                  src={urlFor(d.showDesigner.photo).width(160).height(160).format("webp").url()}
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
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Show Designer</p>
                <p className="text-white/50 text-sm leading-relaxed max-w-lg">{d.showDesigner.bio}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related references — internal linking */}
      {relatedRefs.length > 0 && (
        <section className="py-16 bg-[#0d0d0d] border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-8">Další realizace</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedRefs.map((r) => (
                <Link
                  key={r._id}
                  href={`/reference/${r.slug.current}`}
                  className="group block bg-black/40 border border-white/5 rounded-sm p-6 hover:border-[#C8D400]/30 transition-colors duration-200"
                >
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-2">{r.type}</p>
                  <p className="font-display text-xl text-white group-hover:text-[#C8D400] transition-colors duration-200 leading-tight">{r.title.toUpperCase()}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px" }} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-5xl lg:text-6xl text-black leading-none mb-3">VAŠE AKCE MŮŽE BÝT DALŠÍ.</h2>
            <p className="text-black/50 text-sm">Připravíme program přesně pro vás.</p>
          </div>
          <Link href="/kontakt" className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark">
            Nezávazná poptávka
          </Link>
        </div>
      </section>
    </>
  );
}
