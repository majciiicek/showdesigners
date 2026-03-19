import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů — Showdesigners",
  description: "Informace o zpracování osobních údajů v souladu s GDPR (nařízení EU 2016/679).",
};

export default function ZasadyPage() {
  return (
    <section className="min-h-screen bg-black pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          GDPR
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-white leading-none mb-12">
          ZÁSADY OCHRANY
          <br />
          OSOBNÍCH ÚDAJŮ
        </h1>

        <div className="prose prose-invert prose-sm max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-white/60 [&_p]:leading-relaxed [&_ul]:text-white/60 [&_li]:leading-relaxed [&_a]:text-[#C8D400] [&_strong]:text-white">

          <h2>1. Správce osobních údajů</h2>
          <p>
            Správcem osobních údajů je společnost <strong>Aliatrix s.r.o.</strong>, provozující brand Showdesigners,
            se sídlem v České republice.<br />
            Kontakt: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>
          </p>

          <h2>2. Jaké osobní údaje zpracováváme</h2>
          <p>Zpracováváme pouze údaje, které nám sami poskytnete prostřednictvím kontaktního formuláře:</p>
          <ul>
            <li>Jméno a příjmení</li>
            <li>E-mailová adresa</li>
            <li>Telefonní číslo (nepovinné)</li>
            <li>Název firmy (nepovinné)</li>
            <li>Informace o plánované akci</li>
          </ul>

          <h2>3. Účel a právní základ zpracování</h2>
          <p>
            Osobní údaje zpracováváme za účelem <strong>vyřízení vaší poptávky a komunikace s vámi</strong>.
            Právním základem je váš souhlas (čl. 6 odst. 1 písm. a) GDPR), který udělíte zaškrtnutím políčka v formuláři.
          </p>

          <h2>4. Doba uchování údajů</h2>
          <p>
            Vaše údaje uchováváme po dobu nezbytnou pro vyřízení poptávky, nejdéle <strong>2 roky</strong> od posledního kontaktu, nebo do odvolání souhlasu.
          </p>

          <h2>5. Vaše práva</h2>
          <p>Máte právo:</p>
          <ul>
            <li><strong>Na přístup</strong> — poskytneme vám kopii vašich osobních údajů</li>
            <li><strong>Na opravu</strong> — opravíme nepřesné údaje</li>
            <li><strong>Na výmaz</strong> — vymažeme vaše údaje na žádost</li>
            <li><strong>Na přenositelnost</strong> — předáme vaše údaje ve strojově čitelném formátu</li>
            <li><strong>Na námitku</strong> — vznesete námitku proti zpracování</li>
            <li><strong>Odvolat souhlas</strong> — kdykoli, bez dopadu na zákonnost předchozího zpracování</li>
          </ul>
          <p>
            Pro uplatnění práv nás kontaktujte na{" "}
            <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>.
          </p>

          <h2>6. Cookies a analytika</h2>
          <p>
            Tento web může používat analytické cookies (např. Google Analytics) k měření návštěvnosti.
            Cookies jsou aktivovány pouze s vaším souhlasem prostřednictvím cookie banneru.
            Souhlas můžete kdykoli odvolat smazáním dat v nastavení prohlížeče.
          </p>
          <p>
            Případné třetí strany (Google Analytics, YouTube embedy) jsou zpracovateli dat
            ve smyslu GDPR a zpracování probíhá na základě vašeho souhlasu.
          </p>

          <h2>7. Zabezpečení</h2>
          <p>
            Přijímáme technická a organizační opatření k ochraně vašich osobních údajů před
            neoprávněným přístupem, ztrátou nebo zneužitím.
          </p>

          <h2>8. Stížnosti</h2>
          <p>
            Máte právo podat stížnost u dozorového úřadu — v ČR je jím <strong>Úřad pro ochranu osobních údajů</strong>{" "}
            (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>).
          </p>

          <p className="text-white/30 text-xs mt-12">
            Poslední aktualizace: březen 2026
          </p>
        </div>
      </div>
    </section>
  );
}
