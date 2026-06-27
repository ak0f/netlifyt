'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'

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

const Divider = () => (
  <div className="h-px my-12" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />
)

const noteBox = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.06)',
  color: 'var(--t3)',
} as const

function BodyDE() {
  return (
    <>
      <Section title="Angaben gemäss Art. 3 Abs. 1 lit. s UWG">
        <Block title="Anbieter / Inhaber">
          <p><strong>SLIDE</strong> (Einzelunternehmen)</p>
          <p>Inhaber: Akif Yaylaci</p>
          <p>Gesetzliche Vertreterin: Fadile Yaylaci</p>
          <p>Forelstrasse 44</p>
          <p>3072 Ostermundigen</p>
          <p>Kanton Bern, Schweiz</p>
          <div className="mt-4 p-4 rounded-lg text-[0.88rem] font-light leading-[1.7]" style={noteBox}>
            SLIDE wird als Einzelunternehmen von Akif Yaylaci geführt; die gesetzliche Vertretung
            erfolgt durch Fadile Yaylaci. Das Unternehmen ist derzeit nicht im Handelsregister
            eingetragen (Eintragung erst ab einem Jahresumsatz von CHF 100&apos;000.– obligatorisch,
            Art. 36 HRegV) und ist nicht mehrwertsteuerpflichtig; es wird daher keine Mehrwertsteuer
            ausgewiesen.
          </div>
        </Block>

        <Block title="Kontakt">
          <p>E-Mail: <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a></p>
          <p>Telefon: <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a></p>
        </Block>

        <Block title="Verantwortlich für den Inhalt">
          <p>Akif Yaylaci, Forelstrasse 44, 3072 Ostermundigen, Schweiz.</p>
        </Block>
      </Section>

      <Divider />

      <Section title="Haftungsausschluss">
        <Block title="Haftung für Inhalte">
          <p>
            Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte kann der Anbieter jedoch keine Gewähr übernehmen.
            Die Nutzung der abrufbaren Inhalte erfolgt auf eigene Gefahr des Nutzers. Namentlich
            gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht zwingend die
            Meinung des Anbieters wieder.
          </p>
        </Block>
        <Block title="Haftung für Links">
          <p>
            Diese Website enthält Links zu externen Webseiten Dritter, auf deren Inhalte der Anbieter
            keinen Einfluss hat. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
            Verlinkung auf mögliche Rechtsverstösse überprüft; rechtswidrige Inhalte waren zu diesem
            Zeitpunkt nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links
            umgehend entfernt.
          </p>
        </Block>
        <Block title="Urheberrecht und Nutzungsrechte">
          <p>
            Die durch den Anbieter erstellten Inhalte und Werke auf dieser Website unterliegen dem
            schweizerischen Urheberrecht (URG). Die Vervielfältigung, Bearbeitung, Verbreitung und jede
            Art der Verwertung ausserhalb der Grenzen des Urheberrechts bedürfen der vorgängigen
            schriftlichen Zustimmung des Anbieters. Downloads und Kopien dieser Seite sind nur für den
            privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="Datenschutz">
        <Block>
          <p>
            Die Bearbeitung von Personendaten richtet sich nach dem revidierten Schweizer Bundesgesetz
            über den Datenschutz (DSG) sowie – soweit anwendbar – nach der Datenschutz-Grundverordnung
            der EU (DSGVO). Einzelheiten zur Bearbeitung von Personendaten auf dieser Website finden Sie
            in unserer <Link href="/datenschutz" className="legal-link">Datenschutzerklärung</Link>.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="Streitbeilegung">
        <Block>
          <p>
            Die Europäische Kommission stellt unter{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
              ec.europa.eu/consumers/odr/
            </a>{' '}
            eine Plattform zur Online-Streitbeilegung (OS) bereit. Der Anbieter ist nicht verpflichtet
            und grundsätzlich nicht bereit, an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </Block>
      </Section>
    </>
  )
}

function BodyEN() {
  return (
    <>
      <Section title="Information pursuant to Art. 3 para. 1 lit. s UCA (UWG)">
        <Block title="Provider / Owner">
          <p><strong>SLIDE</strong> (sole proprietorship)</p>
          <p>Owner: Akif Yaylaci</p>
          <p>Legal representative: Fadile Yaylaci</p>
          <p>Forelstrasse 44</p>
          <p>3072 Ostermundigen</p>
          <p>Canton of Bern, Switzerland</p>
          <div className="mt-4 p-4 rounded-lg text-[0.88rem] font-light leading-[1.7]" style={noteBox}>
            SLIDE is operated as a sole proprietorship by Akif Yaylaci; legal representation is provided
            by Fadile Yaylaci. The business is currently not entered in the Commercial Register (entry is
            only mandatory from an annual turnover of CHF 100,000, Art. 36 HRegV) and is not liable for
            VAT; no value added tax is therefore charged.
          </div>
        </Block>

        <Block title="Contact">
          <p>E-mail: <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a></p>
          <p>Phone: <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a></p>
        </Block>

        <Block title="Responsible for content">
          <p>Akif Yaylaci, Forelstrasse 44, 3072 Ostermundigen, Switzerland.</p>
        </Block>
      </Section>

      <Divider />

      <Section title="Disclaimer">
        <Block title="Liability for content">
          <p>
            The contents of this website have been compiled with the greatest possible care. However, the
            provider accepts no liability for the accuracy, completeness or timeliness of the content. Use
            of the content available is at the user&apos;s own risk. Contributions identified by name
            reflect the opinion of the respective author and not necessarily that of the provider.
          </p>
        </Block>
        <Block title="Liability for links">
          <p>
            This website contains links to external third-party websites over whose content the provider
            has no influence. The respective provider or operator of the linked pages is always
            responsible for their content. The linked pages were checked for possible legal violations at
            the time of linking; unlawful content was not recognisable at that time. Should we become
            aware of any legal infringements, such links will be removed immediately.
          </p>
        </Block>
        <Block title="Copyright and rights of use">
          <p>
            The content and works created by the provider on this website are subject to Swiss copyright
            law (URG). Reproduction, editing, distribution and any kind of use beyond the limits of
            copyright require the prior written consent of the provider. Downloads and copies of this site
            are permitted only for private, non-commercial use.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="Data protection">
        <Block>
          <p>
            The processing of personal data is governed by the revised Swiss Federal Act on Data
            Protection (FADP/DSG) and – where applicable – by the EU General Data Protection Regulation
            (GDPR). Details on the processing of personal data on this website can be found in our{' '}
            <Link href="/datenschutz" className="legal-link">privacy policy</Link>.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="Dispute resolution">
        <Block>
          <p>
            The European Commission provides a platform for online dispute resolution (ODR) at{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
              ec.europa.eu/consumers/odr/
            </a>. The provider is not obliged and generally not willing to participate in dispute
            resolution proceedings before a consumer arbitration board.
          </p>
        </Block>
      </Section>
    </>
  )
}

export default function ImpressumContent() {
  const { lang } = useLang()
  const en = lang === 'en'

  return (
    <main>
      <section
        className="min-h-[40vh] flex items-center justify-center pt-32 pb-16 px-6"
        style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-s) 100%)' }}
      >
        <div className="text-center max-w-[800px] mx-auto">
          <h1
            className="font-sans font-light tracking-[-0.04em] leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', color: 'var(--t1)' }}
          >
            {en ? 'Legal Notice' : 'Impressum'}
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {en
              ? 'Legal information and contact details of SLIDE Agentur'
              : 'Rechtliche Informationen und Kontaktdaten der SLIDE Agentur'}
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[860px] mx-auto">
          {en ? <BodyEN /> : <BodyDE />}

          <div className="pt-8 text-center" style={{ borderTop: '1px solid var(--b)' }}>
            <p className="font-mono text-[0.82rem] tracking-[0.05em] uppercase" style={{ color: 'var(--t3)' }}>
              {en ? 'Last updated: June 2026' : 'Stand: Juni 2026'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
