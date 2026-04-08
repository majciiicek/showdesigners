import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP } from "@/lib/i18n";
import { getPageTranslations } from "@/lib/page-translations";
import { getAlternateUrls, SLUG_MAP } from "@/lib/slugs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getAlternateUrls("o-nas", locale);

  return {
    title: t.meta["o-nas"].title,
    description: t.meta["o-nas"].description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta["o-nas"].title,
      description: t.meta["o-nas"].description,
      url: alternates.canonical,
      locale: OG_LOCALE_MAP[locale],
    },
  };
}

export default async function ONasPage() {
  const locale = await getLocale();
  const pt = getPageTranslations(locale);
  const a = pt.about;
  const contactHref = `/${SLUG_MAP.kontakt[locale]}?mode=form`;

  const values = [
    { title: a.value_1_title, body: a.value_1_body },
    { title: a.value_2_title, body: a.value_2_body },
    { title: a.value_3_title, body: a.value_3_body },
    { title: a.value_4_title, body: a.value_4_body },
  ];

  const team = [
    { name: a.team_person_1_name, role: a.team_person_1_role, image: "/images/obchod/michalhalacka.webp", phone: "+420 774 297 349" },
    { name: a.team_person_2_name, role: a.team_person_2_role, image: "/images/obchod/Alžběta Gree.webp", phone: "+420 777 668 694" },
    { name: a.team_person_3_name, role: a.team_person_3_role, image: "/images/obchod/terezaadamusova.webp", phone: null },
  ];

  return (
    <>
      {/* Hero — foto na pozadí */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/plesovashow/plesova-show1.webp"
          alt="Plesová show — tým Showdesigners na místě akce"
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-32">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            {a.hero_label}
          </p>
          <h1
            className="font-display text-white leading-none max-w-4xl"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            <span className="text-[#C8D400]">{a.hero_headline_1}</span>
            <br />
            {a.hero_headline_2}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                {a.story_label}
              </p>
              <h2 className="font-display text-4xl lg:text-6xl text-white leading-none mb-8">
                {a.story_headline}
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-white/70 text-base leading-relaxed">
              <p>{a.story_body_1}</p>
              <p>{a.story_body_2}</p>
              <p>{a.story_body_3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values — lime pozadí */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-black/40 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {a.values_label}
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-black leading-none mb-16">
            {a.values_headline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
            {values.map((v) => (
              <div key={v.title} className="bg-[#C8D400] p-8 lg:p-12">
                <h3 className="font-display text-3xl text-black mb-4">{v.title}</h3>
                <p className="text-black/60 text-base leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {a.team_label}
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white leading-none mb-16">
            {a.team_headline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((person) => (
              <div key={person.name} className="flex flex-col gap-4">
                <div
                  className="relative overflow-hidden rounded-sm bg-[#111]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={400}
                    height={533}
                    className="w-full h-full object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{person.name}</p>
                  <p className="text-white/40 text-sm">{person.role}</p>
                  {person.phone && (
                    <a
                      href={`tel:${person.phone.replace(/\s/g, "")}`}
                      className="text-[#C8D400] text-sm hover:text-[#d9e600] transition-colors duration-200 mt-1 block"
                    >
                      {person.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aliatrix */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{a.aliatrix_label}</p>
            <p className="text-white/70 text-base leading-relaxed">
              {a.aliatrix_body}
            </p>
          </div>
        </div>
      </section>

      {/* CTA — lime */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <h2 className="font-display text-5xl lg:text-6xl text-black leading-none">
            {a.cta_headline}
          </h2>
          <Link
            href={contactHref}
            className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark"
          >
            {a.cta_button}
          </Link>
        </div>
      </section>
    </>
  );
}
