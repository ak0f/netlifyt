import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – SLIDE Agentur',
  description: 'Impressum und rechtliche Informationen der SLIDE Digitalagentur.',
}

function Block({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="legal-block">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <h2
        className="font-sans font-[400] tracking-[-0.03em] mb-8"
        style={{
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: 'var(--t1)',
          position: 'relative',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--b)',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function ImpressumPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="min-h-[40vh] flex items-center justify-center pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-s) 100%)' }}
      >
        <div className="text-center max-w-[800px] mx-auto">
          <h1
            className="font-sans font-light tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: 'var(--t1)' }}
          >
            Impressum
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            Rechtliche Informationen und Kontaktdaten der SLIDE Agentur
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[860px] mx-auto">

          <Section title="Angaben gemäss Art. 8 UWG">
            <Block title="Betreiber und gesetzliche Vertretung">
              <p><strong>SLIDE Agentur</strong></p>
              <p><strong>Geschäftsform:</strong> Einzelunternehmen</p>
              <p>Geschäftsführer: Akif Yaylaci</p>
              <p>Gesetzliche Vertreterin: Fadile Yaylaci</p>
              <p>Forelstrasse 44</p>
              <p>3072 Ostermundigen</p>
              <p>Bern, Schweiz</p>
              <div
                className="mt-4 p-4 rounded-lg text-[0.88rem] font-light leading-[1.7]"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--t3)' }}
              >
                SLIDE wird als Einzelunternehmen von Akif Yaylaci geführt. Die gesetzliche Vertretung erfolgt durch Fadile Yaylaci.
              </div>
            </Block>

            <Block title="Kontakt">
              <p>
                E-Mail:{' '}
                <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a>
              </p>
              <p>
                Telefon:{' '}
                <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
              </p>
            </Block>
          </Section>

          <div className="h-px my-12" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Haftungsausschluss">
            <Block title="Haftung für Inhalte">
              <p>
                Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
                Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäss
                Schweizer Recht für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir
                sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
                nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </Block>
            <Block title="Haftung für Links">
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
                wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstösse überprüft. Rechtswidrige Inhalte waren
                zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
            </Block>
            <Block title="Urheberrecht und Nutzungsrechte">
              <p>Alle Inhalte dieser Website sind urheberrechtlich geschützt. Nutzung nur mit schriftlicher Zustimmung der SLIDE Agentur.</p>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem schweizerischen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der Grenzen
                des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und
                Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </Block>
          </Section>

          <div className="h-px my-12" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Datenschutz">
            <Block title="Verarbeitung nach Schweizer Datenschutzgesetz">
              <p>Personenbezogene Daten werden gemäss schweizerischem Datenschutzgesetz (DSG) verarbeitet.</p>
              <p>
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren
                Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt
                dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
                nicht an Dritte weitergegeben.
              </p>
            </Block>
            <Block title="Sicherheitshinweis">
              <p>
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                möglich.
              </p>
            </Block>
          </Section>

          <div className="h-px my-12" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Streitbeilegung">
            <Block>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
                  ec.europa.eu/consumers/odr/
                </a>{' '}
                finden. Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </Block>
          </Section>

          <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--b)' }}>
            <p className="font-mono text-[0.82rem] tracking-[0.05em] uppercase" style={{ color: 'var(--t3)' }}>
              Stand: November 2025
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
