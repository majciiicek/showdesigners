import type { Metadata } from 'next'
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP } from "@/lib/i18n";
import { getAlternateUrls } from "@/lib/slugs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getAlternateUrls("impressum", locale);

  return {
    title: t.meta.impressum.title,
    description: t.meta.impressum.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta.impressum.title,
      description: t.meta.impressum.description,
      url: alternates.canonical,
      locale: OG_LOCALE_MAP[locale],
    },
  };
}

// Impressum — legally required for the German domain (§ 5 TMG)
export default async function ImpressumPage() {
  const locale = await getLocale();

  return (
    <section className="min-h-screen bg-black pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="prose prose-invert prose-sm max-w-none [&_h1]:font-display [&_h1]:text-5xl [&_h1]:lg:text-7xl [&_h1]:text-white [&_h1]:leading-none [&_h1]:mb-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-white/60 [&_p]:leading-relaxed [&_a]:text-[#C8D400] [&_strong]:text-white">
          {locale === "en" ? <ContentEn /> : locale === "de" ? <ContentDe /> : <ContentCs />}
        </div>
      </div>
    </section>
  );
}

function ContentCs() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">Právní informace</p>
      <h1>IMPRESSUM</h1>

      <h2>Provozovatel webu</h2>
      <p>
        <strong>Aliatrix s.r.o.</strong><br />
        Brand: Showdesigners<br />
        Zdarila 817/8<br />
        140 00 Praha<br />
        Česká republika
      </p>

      <h2>Kontakt</h2>
      <p>
        E-mail: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a><br />
        Tel: <a href="tel:+420774297349">+420 774 297 349</a>
      </p>

      <h2>Odpovědná osoba za obsah</h2>
      <p>
        Mgr. Michal Halačka<br />
        Zdarila 817/8<br />
        140 00 Praha<br />
        Česká republika
      </p>

      <p className="text-white/30 text-xs mt-12 not-prose">Poslední aktualizace: březen 2026</p>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">Legal notice</p>
      <h1>IMPRESSUM</h1>

      <h2>Website Operator</h2>
      <p>
        <strong>Aliatrix s.r.o.</strong><br />
        Brand: Showdesigners<br />
        Zdarila 817/8<br />
        140 00 Prague<br />
        Czech Republic
      </p>

      <h2>Contact</h2>
      <p>
        Email: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a><br />
        Phone: <a href="tel:+420774297349">+420 774 297 349</a>
      </p>

      <h2>Person responsible for content</h2>
      <p>
        Mgr. Michal Halačka<br />
        Zdarila 817/8<br />
        140 00 Prague<br />
        Czech Republic
      </p>

      <p className="text-white/30 text-xs mt-12 not-prose">Last updated: March 2026</p>
    </>
  );
}

function ContentDe() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">Pflichtangaben gemäß § 5 TMG</p>
      <h1>IMPRESSUM</h1>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        <strong>Aliatrix s.r.o.</strong><br />
        Brand: Showdesigners<br />
        Zdarila 817/8<br />
        140 00 Praha<br />
        Tschechische Republik
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a><br />
        Telefon: <a href="tel:+420774297349">+420 774 297 349</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Mgr. Michal Halačka<br />
        Zdarila 817/8<br />
        140 00 Praha<br />
        Tschechische Republik
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        .<br />
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
        nach den allgemeinen Gesetzen verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
        der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
        Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <p className="text-white/30 text-xs mt-12 not-prose">Letzte Aktualisierung: März 2026</p>
    </>
  );
}
