import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "O show designérech — tým a zázemí | Showdesigners",
  description:
    "Showdesigners vznikl z potřeby klientů, kteří hledali partnera — ne dodavatele. Konzultační vrstva postavená na 15 letech zkušeností agentury Aliatrix.",
};

const values = [
  {
    title: "Konzultanti, ne dodavatelé",
    body: "Neprodáváme položky z katalogu. Navrhujeme dramaturgii celého večera a bereme za ni zodpovědnost.",
  },
  {
    title: "Osobní prověrka každého umělce",
    body: "V naší síti není nikdo, koho jsme osobně neviděli pracovat. Žádné překvapení na place.",
  },
  {
    title: "Jeden kontakt pro vše",
    body: "Váš show designer zná vás, vaši akci i všechny umělce. Komunikujete s jednou osobou — nikdy s call centrem.",
  },
  {
    title: "Kvalita nad cenou",
    body: "Pracujeme s realistickými rozpočty a hledáme nejlepší poměr kvality a ceny — ne nejlevnější variantu.",
  },
];

export default function ONasPage() {
  return (
    <>
      {/* Hero — foto na pozadí */}
      <section className="relative min-h-[80vh] lg:min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/plesovashow/IMG_6317_foto_Jiří_Balát_edit.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full pb-20 lg:pb-32">
          <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            O nás
          </p>
          <h1
            className="font-display text-white leading-none max-w-4xl"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            PARTNER,
            <br />
            NE{" "}
            <span className="text-[#C8D400]">DODAVATEL.</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                Náš příběh
              </p>
              <h2 className="font-display text-4xl lg:text-6xl text-white leading-none mb-8">
                PROČ SHOWDESIGNERS VZNIKL
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-white/70 text-base leading-relaxed">
              <p>
                Za Showdesigners stojí tým agentury <strong className="text-white">Aliatrix</strong> — visual entertainment agentury s více než 15 lety na českém a středoevropském trhu. Za tu dobu jsme viděli stovky akcí. A naučili jsme se, co funguje.
              </p>
              <p>
                Opakoval se nám jeden vzorec: klienti, kteří hledají jistotu. Ne nejnižší cenu, ale partnera, který celý entertainment vezme do rukou a odvede ho beze zbytku.
              </p>
              <p>
                Showdesigners vznikl jako odpověď na tuto potřebu. Konzultační vrstva, kde klient nekupuje jednotlivá čísla — ale svěřuje celou dramaturgii večera jednomu show designerovi, který ji přetvoří v zážitek.
              </p>
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
            Naše hodnoty
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-black leading-none mb-16">
            JAK PŘEMÝŠLÍME
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
            Tým
          </p>
          <h2 className="font-display text-5xl lg:text-7xl text-white leading-none mb-16">
            LIDÉ ZA PROJEKTEM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michal Halačka",
                role: "Founder",
                image: "/images/obchod/michalhalacka.webp",
                phone: "+420 774 297 349",
              },
              {
                name: "Alžběta Grée",
                role: "Obchodní mág",
                image: "/images/obchod/Alžběta Gree.webp",
                phone: "+420 777 668 694",
              },
              {
                name: "Tereza Adamusová",
                role: "Kreativní ředitelka",
                image: "/images/obchod/terezaadamusova.webp",
                phone: null,
              },
            ].map((person) => (
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
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Zázemí</p>
            <p className="text-white/70 text-base leading-relaxed">
              Showdesigners je samostatný brand vycházející ze zázemí agentury{" "}
              <strong className="text-white">Aliatrix</strong> — visual entertainment agentury s vlastní produkcí a 15 lety zkušeností. Sdílíme tým, sítě umělců a produkční infrastrukturu.
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
            CHCETE NÁS POZNAT?
          </h2>
          <Link
            href="/kontakt"
            className="flex-shrink-0 bg-black text-[#C8D400] font-semibold text-base px-10 py-4 rounded-sm btn-hover-dark"
          >
            Napište nám
          </Link>
        </div>
      </section>
    </>
  );
}
