import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Show design od A do Z — co děláme | Showdesigners",
  description:
    "Jak funguje show designer? Přebíráme kompletní zodpovědnost za entertainment vaší akce — dramaturgie, umělci, koordinace na místě.",
};

const eventTypes = [
  {
    title: "Korporátní akce",
    description:
      "Gala večeře, firemní večírky, team buildingy, produktové launche. Program, který odpovídá firemní kultuře a zanechá dojem.",
    image: "/images/parovaakrobacie/partnerska-akrobacie1.webp",
  },
  {
    title: "Luxusní soukromé akce",
    description:
      "Svatby, VIP narozeniny, soukromé oslavy. Každý detail choreografován pro ten správný moment.",
    image: "/images/plesovashow/plesova-show2.webp",
  },
  {
    title: "Festivaly a kulturní akce",
    description:
      "Doprovodné programy, dramaturgická spolupráce, scénografie prostoru. Víme, co drží pozornost velkého publika.",
    image: "/images/dennishow/DSC05912.webp",
  },
  {
    title: "Hotely a resorty",
    description:
      "Pravidelný nebo jednorázový entertainment pro hosty. Show, která se stane součástí zážitku pobytu. Zvládneme i doprovodný program pro konference a firemní setkání.",
    image: "/images/cyrwheel/GCAs_RedNight_Show_088.webp",
  },
];

const processSteps = [
  {
    step: "01",
    title: "První kontakt",
    body: "Ozvete se s poptávkou — typ akce, datum, atmosféra, přibližný rozpočet. Nebo si nejdřív popovídejte s naším AI asistentem — příjemný způsob, jak nám o akci říct co nejvíc, bez formulářů.",
  },
  {
    step: "02",
    title: "Návrh a příprava",
    body: "Náš kreativní tým navrhne dramaturgii, vybere umělce a doladí každý detail. Veškerá komunikace a koordinace je na nás — vy se nestaráte o nic.",
  },
  {
    step: "03",
    title: "Den akce",
    body: "Váš show designer je na místě od přípravy po závěrečné číslo. Každý vstup proběhne přesně jak bylo naplánováno.",
  },
];

export default function SluzbaPage() {
  return (
    <>
      {/* Hero — foto na pozadí */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/zavesnaakrobacie/salo-kruh1.webp"
          alt="Vzdušná akrobacie na firemní akci — Showdesigners"
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-28">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Co děláme
          </p>
          <h1
            className="font-display text-white leading-none max-w-4xl"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            <span className="text-[#C8D400]">SHOW DESIGN</span>
            <br />
            OD A DO Z.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-white/80 text-xl leading-relaxed mb-6">
              Každá akce je jiná — jiný prostor, jiné publikum, jiná energie. Proto nepracujeme se šablonou. Pracujeme s vaší vizí a navrhujeme program, který do ní přesně sedí.
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              Od první schůzky se vám věnuje náš obchodní a kreativní tým — společně navrhneme dramaturgii, vybereme umělce a doladíme každý detail. Na samotné akci pak program řídí <strong className="text-white">show designer</strong> přímo na místě.
            </p>
          </div>
        </div>
      </section>

      {/* Process — lime pozadí */}
      <section className="py-24 bg-[#C8D400] relative overflow-hidden">
        {/* Noise */}
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
            Krok za krokem
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-black leading-none mb-16">
            PRŮBĚH SPOLUPRÁCE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
            {processSteps.map((s) => (
              <div key={s.step} className="bg-[#C8D400] p-8 lg:p-10">
                <span
                  className="font-display text-black/20 leading-none block mb-6"
                  style={{ fontSize: "5rem" }}
                >
                  {s.step}
                </span>
                <h3 className="font-display text-2xl text-black mb-3">{s.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Typy akcí
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white leading-none mb-16">
            PRO KOHO PRACUJEME
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventTypes.map((et) => (
              <div
                key={et.title}
                className="group relative overflow-hidden rounded-sm bg-[#111]"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={et.image}
                  alt={et.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-display text-3xl text-white mb-2">{et.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs">{et.description}</p>
                </div>
              </div>
            ))}
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
          <div>
            <h2 className="font-display text-5xl lg:text-6xl text-black leading-none">
              CHYSTÁTE AKCI?
            </h2>
          </div>
          <p className="text-black/50 text-base">Odpovídáme do 24 hodin.</p>
          <Link
            href="/kontakt"
            className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark"
          >
            Nezávazná poptávka
          </Link>
        </div>
      </section>
    </>
  );
}
