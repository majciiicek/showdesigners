import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum — Show Designers',
  description: 'Impressum — Pflichtangaben gemäß § 5 TMG und § 55 Abs. 2 RStV.',
  robots: { index: false },
}

// Impressum — legally required for German-domain websites (§ 5 TMG)
export default function ImpressumPage() {
  return (
    <section className="min-h-screen bg-black pt-40 pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-[#C8D400] text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          Rechtliches
        </p>
        <h1 className="font-display text-5xl lg:text-7xl text-white leading-none mb-12">
          IMPRESSUM
        </h1>

        <div className="prose prose-invert prose-sm max-w-none [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-white/60 [&_p]:leading-relaxed [&_a]:text-[#C8D400]">

          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Aliatrix, s.r.o.<br />
            Zdarila 817/8<br />
            140 00 Praha<br />
            Tschechische Republik
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon:{' '}
            <a href="tel:+420774297349">+420 774 297 349</a>
            <br />
            E-Mail:{' '}
            <a href="mailto:halacka@showdesigners.cz">halacka@showdesigners.cz</a>
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Mgr. Michal Halačka<br />
            Zdarila 817/8<br />
            140 00 Praha<br />
            Tschechische Republik
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

        </div>
      </div>
    </section>
  )
}
