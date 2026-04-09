import type { Metadata } from "next";
import { getLocale } from "@/lib/locale";
import { getTranslations, OG_LOCALE_MAP } from "@/lib/i18n";
import { getAlternateUrls } from "@/lib/slugs";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getTranslations(locale);
  const alternates = getAlternateUrls("zasady", locale);

  return {
    title: t.meta.zasady.title,
    description: t.meta.zasady.description,
    alternates: {
      canonical: alternates.canonical,
      languages: alternates.languages,
    },
    openGraph: {
      title: t.meta.zasady.title,
      description: t.meta.zasady.description,
      url: alternates.canonical,
      locale: OG_LOCALE_MAP[locale],
    },
  };
}

export default async function ZasadyPage() {
  const locale = await getLocale();

  return (
    <section className="min-h-screen bg-black pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="prose prose-invert prose-sm max-w-none [&_h1]:font-display [&_h1]:text-5xl [&_h1]:lg:text-7xl [&_h1]:text-white [&_h1]:leading-none [&_h1]:mb-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-white/60 [&_p]:leading-relaxed [&_ul]:text-white/60 [&_li]:leading-relaxed [&_a]:text-[#C8D400] [&_strong]:text-white">
          {locale === "en" ? <ContentEn /> : locale === "de" ? <ContentDe /> : <ContentCs />}
        </div>
      </div>
    </section>
  );
}

function ContentCs() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">GDPR</p>
      <h1>
        ZÁSADY OCHRANY
        <br />
        OSOBNÍCH ÚDAJŮ
        <span className="sr-only"> — zpracování dat a cookies podle GDPR.</span>
      </h1>

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

      <p className="text-white/30 text-xs mt-12 not-prose">Poslední aktualizace: březen 2026</p>
    </>
  );
}

function ContentEn() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">GDPR</p>
      <h1>
        PRIVACY
        <br />
        POLICY
        <span className="sr-only"> — how we handle your personal data and cookies.</span>
      </h1>

      <h2>1. Data Controller</h2>
      <p>
        The data controller is <strong>Aliatrix s.r.o.</strong>, operating the Showdesigners brand,
        registered in the Czech Republic.<br />
        Contact: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>
      </p>

      <h2>2. Personal Data We Collect</h2>
      <p>We only process data you provide voluntarily through our contact form:</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number (optional)</li>
        <li>Company name (optional)</li>
        <li>Information about your planned event</li>
      </ul>

      <h2>3. Purpose and Legal Basis</h2>
      <p>
        We process your personal data for the purpose of <strong>handling your inquiry and communicating with you</strong>.
        The legal basis is your consent (Art. 6(1)(a) GDPR), given by ticking the checkbox in the contact form.
      </p>

      <h2>4. Retention Period</h2>
      <p>
        We retain your data for as long as necessary to handle your inquiry, up to a maximum of{" "}
        <strong>2 years</strong> from the last contact, or until you withdraw your consent.
      </p>

      <h2>5. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> — receive a copy of your personal data</li>
        <li><strong>Rectification</strong> — have inaccurate data corrected</li>
        <li><strong>Erasure</strong> — have your data deleted upon request</li>
        <li><strong>Data portability</strong> — receive your data in a machine-readable format</li>
        <li><strong>Object</strong> — object to processing of your data</li>
        <li><strong>Withdraw consent</strong> — at any time, without affecting the lawfulness of prior processing</li>
      </ul>
      <p>
        To exercise your rights, contact us at{" "}
        <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>.
      </p>

      <h2>6. Cookies and Analytics</h2>
      <p>
        This website may use analytical cookies (e.g. Google Analytics) to measure traffic.
        Cookies are only activated with your consent via the cookie banner.
        You can withdraw consent at any time by clearing your browser data.
      </p>
      <p>
        Any third parties (Google Analytics, YouTube embeds) act as data processors under GDPR,
        and processing is based on your consent.
      </p>

      <h2>7. Security</h2>
      <p>
        We implement technical and organisational measures to protect your personal data
        against unauthorised access, loss or misuse.
      </p>

      <h2>8. Complaints</h2>
      <p>
        You have the right to lodge a complaint with a supervisory authority. In the Czech Republic,
        this is the <strong>Office for Personal Data Protection</strong>{" "}
        (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>).
      </p>

      <p className="text-white/30 text-xs mt-12 not-prose">Last updated: March 2026</p>
    </>
  );
}

function ContentDe() {
  return (
    <>
      <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6 not-prose">DSGVO</p>
      <h1>
        DATENSCHUTZ­
        <br />
        ERKLÄRUNG
        <span className="sr-only"> — wie wir Ihre personenbezogenen Daten und Cookies verarbeiten.</span>
      </h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO ist <strong>Aliatrix s.r.o.</strong>, die das Brand Showdesigners betreibt,
        mit Sitz in der Tschechischen Republik.<br />
        Kontakt: <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>
      </p>

      <h2>2. Erhobene personenbezogene Daten</h2>
      <p>Wir verarbeiten ausschließlich Daten, die Sie uns freiwillig über unser Kontaktformular mitteilen:</p>
      <ul>
        <li>Vor- und Nachname</li>
        <li>E-Mail-Adresse</li>
        <li>Telefonnummer (optional)</li>
        <li>Unternehmensname (optional)</li>
        <li>Angaben zur geplanten Veranstaltung</li>
      </ul>

      <h2>3. Zweck und Rechtsgrundlage</h2>
      <p>
        Wir verarbeiten Ihre Daten zum Zweck der <strong>Bearbeitung Ihrer Anfrage und der Kommunikation mit Ihnen</strong>.
        Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch Ankreuzen des Kontrollkästchens im Formular erteilen.
      </p>

      <h2>4. Speicherdauer</h2>
      <p>
        Ihre Daten werden so lange gespeichert, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist,
        maximal <strong>2 Jahre</strong> ab dem letzten Kontakt oder bis zum Widerruf Ihrer Einwilligung.
      </p>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li><strong>Auskunft</strong> — eine Kopie Ihrer personenbezogenen Daten zu erhalten</li>
        <li><strong>Berichtigung</strong> — Korrektur unrichtiger Daten</li>
        <li><strong>Löschung</strong> — Löschung Ihrer Daten auf Anfrage</li>
        <li><strong>Datenübertragbarkeit</strong> — Ihre Daten in maschinenlesbarem Format zu erhalten</li>
        <li><strong>Widerspruch</strong> — Widerspruch gegen die Verarbeitung Ihrer Daten</li>
        <li><strong>Widerruf der Einwilligung</strong> — jederzeit, ohne Auswirkung auf die Rechtmäßigkeit der bisherigen Verarbeitung</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an{" "}
        <a href="mailto:booking@showdesigners.cz">booking@showdesigners.cz</a>.
      </p>

      <h2>6. Cookies und Analyse</h2>
      <p>
        Diese Website kann Analyse-Cookies (z. B. Google Analytics) zur Messung des Datenverkehrs verwenden.
        Cookies werden nur mit Ihrer Einwilligung über das Cookie-Banner aktiviert.
        Sie können Ihre Einwilligung jederzeit durch Löschen der Browserdaten widerrufen.
      </p>
      <p>
        Drittanbieter (Google Analytics, YouTube-Einbettungen) handeln als Auftragsverarbeiter im Sinne der DSGVO,
        und die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung.
      </p>

      <h2>7. Datensicherheit</h2>
      <p>
        Wir ergreifen technische und organisatorische Maßnahmen zum Schutz Ihrer personenbezogenen Daten
        vor unbefugtem Zugriff, Verlust oder Missbrauch.
      </p>

      <h2>8. Beschwerden</h2>
      <p>
        Sie haben das Recht, eine Beschwerde bei einer Aufsichtsbehörde einzureichen.
        In der Tschechischen Republik ist dies das <strong>Amt für den Schutz personenbezogener Daten</strong>{" "}
        (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">www.uoou.cz</a>).
        In Deutschland können Sie sich auch an den zuständigen Landesdatenschutzbeauftragten wenden.
      </p>

      <p className="text-white/30 text-xs mt-12 not-prose">Letzte Aktualisierung: März 2026</p>
    </>
  );
}
