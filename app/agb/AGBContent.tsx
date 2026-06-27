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
    <div className="mb-16">
      <h2
        className="font-sans font-[400] tracking-[-0.03em] mb-6"
        style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--t1)', paddingBottom: '1rem', borderBottom: '1px solid var(--b)' }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

const Divider = () => (
  <div className="h-px my-10" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />
)

const infoBox = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
} as const

function BodyDE() {
  return (
    <>
      <Section title="1. Geltungsbereich und Definitionen">
        <Block title="1.1 Geltungsbereich">
          <p>
            Diese Allgemeinen Geschäftsbedingungen (nachfolgend «AGB») gelten für sämtliche Verträge,
            Leistungen und Angebote von SLIDE, Einzelunternehmen, Inhaber Akif Yaylaci, Forelstrasse 44,
            3072 Ostermundigen (nachfolgend «Auftragnehmer»), gegenüber seinen Kundinnen und Kunden
            (nachfolgend «Auftraggeber»). Sie gelten sowohl gegenüber Unternehmen als auch gegenüber
            Konsumentinnen und Konsumenten.
          </p>
        </Block>
        <Block title="1.2 Vorrang und abweichende Bedingungen">
          <p>
            Abweichende, entgegenstehende oder ergänzende Geschäftsbedingungen des Auftraggebers werden nicht
            Vertragsbestandteil, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich
            zu. Individuelle Vereinbarungen im Einzelfall gehen diesen AGB vor.
          </p>
        </Block>
        <Block title="1.3 Leistungen">
          <p>
            Der Auftragnehmer erbringt Dienstleistungen in den Bereichen Webentwicklung, Social-Media-
            Management, E-Mail-Marketing sowie damit verbundene IT- und Beratungsleistungen. Der konkrete
            Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="2. Vertragsschluss">
        <Block title="2.1 Angebot und Annahme">
          <p>
            Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als
            verbindlich bezeichnet sind. Der Vertrag kommt nach den Regeln des Schweizerischen
            Obligationenrechts (Art. 1 ff. OR) durch übereinstimmende gegenseitige Willensäusserung zustande,
            in der Regel durch die schriftliche oder elektronische Auftragsbestätigung des Auftragnehmers oder
            durch Beginn der Leistungserbringung.
          </p>
        </Block>
        <Block title="2.2 Form">
          <p>
            Bestellungen, Auftragsbestätigungen und wesentliche Vereinbarungen erfolgen in Textform
            (insbesondere per E-Mail). Mündliche Nebenabreden bedürfen zu ihrer Gültigkeit der schriftlichen
            oder elektronischen Bestätigung.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="3. Vergütung und Zahlungsbedingungen">
        <Block title="3.1 Preise">
          <p>
            Massgebend sind die im Angebot genannten Preise in Schweizer Franken (CHF). Der Auftragnehmer ist
            nicht mehrwertsteuerpflichtig; es wird <strong>keine Mehrwertsteuer ausgewiesen oder in Rechnung
            gestellt</strong>.
          </p>
        </Block>
        <Block title="3.2 Zahlungsplan">
          <p>
            Soweit nichts anderes vereinbart ist, gilt folgender Zahlungsplan: <strong>40&nbsp;% der
            vereinbarten Vergütung</strong> sind als Anzahlung mit der Auftragsbestätigung bzw. vor Beginn der
            Arbeiten zur Zahlung fällig; die <strong>restlichen 60&nbsp;%</strong> werden mit Fertigstellung
            bzw. Lieferung des Projekts fällig. Bei wiederkehrenden Leistungen (z.&nbsp;B. Social-Media-
            Management) erfolgt die Abrechnung periodisch gemäss Vereinbarung.
          </p>
        </Block>
        <Block title="3.3 Zahlungsfrist und Verzug">
          <p>
            Rechnungen sind innert <strong>30 Tagen</strong> ab Rechnungsdatum ohne Abzug zu bezahlen. Bleibt
            die Zahlung aus, gerät der Auftraggeber nach Ablauf der Zahlungsfrist bzw. nach Mahnung in Verzug.
            Ab Verzugseintritt schuldet der Auftraggeber einen <strong>Verzugszins von 5&nbsp;% pro Jahr
            (Art. 104 Abs. 1 OR)</strong>. Die Geltendmachung eines weitergehenden Schadens sowie angemessener
            Mahnspesen bleibt vorbehalten.
          </p>
        </Block>
        <Block title="3.4 Leistungszurückbehaltung">
          <p>
            Bei Zahlungsverzug ist der Auftragnehmer berechtigt, weitere Leistungen bis zur vollständigen
            Begleichung der ausstehenden Beträge zurückzubehalten bzw. einzustellen. Eine Übertragung von
            Nutzungsrechten (Ziffer&nbsp;6) erfolgt erst nach vollständiger Bezahlung.
          </p>
        </Block>
        <Block title="3.5 Mehraufwand und Preisanpassung">
          <p>
            Wird der vereinbarte Leistungsumfang auf Wunsch des Auftraggebers erweitert oder verzögert sich die
            Leistungserbringung aufgrund fehlender Mitwirkung, ist der Auftragnehmer berechtigt, den Mehraufwand
            nach Aufwand zu vereinbarten oder branchenüblichen Ansätzen zusätzlich zu verrechnen.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="4. Mitwirkung des Auftraggebers">
        <Block title="4.1 Mitwirkungspflichten">
          <p>
            Der Auftraggeber stellt dem Auftragnehmer rechtzeitig und unentgeltlich alle für die
            Leistungserbringung erforderlichen Informationen, Unterlagen, Inhalte, Zugänge und Freigaben zur
            Verfügung. Verzögerungen, die auf fehlende oder verspätete Mitwirkung zurückzuführen sind, gehen
            nicht zulasten des Auftragnehmers und können vereinbarte Termine entsprechend verschieben.
          </p>
        </Block>
        <Block title="4.2 Verantwortung für gelieferte Inhalte">
          <p>
            Der Auftraggeber sichert zu, dass die von ihm bereitgestellten Inhalte (Texte, Bilder, Logos, Daten
            usw.) frei von Rechten Dritter sind bzw. dass er über die erforderlichen Nutzungsrechte verfügt und
            nicht gegen Urheber-, Marken-, Persönlichkeits- oder sonstige Rechte verstossen. Der Auftraggeber
            stellt den Auftragnehmer von diesbezüglichen Ansprüchen Dritter frei.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="5. Termine, Abnahme und Mängel">
        <Block title="5.1 Termine">
          <p>
            Termin- und Lieferangaben sind unverbindlich, sofern sie nicht ausdrücklich als verbindlich
            vereinbart wurden. Verbindliche Termine setzen die rechtzeitige Mitwirkung des Auftraggebers voraus.
          </p>
        </Block>
        <Block title="5.2 Abnahme und Mängelrüge">
          <p>
            Der Auftraggeber prüft die erbrachten Leistungen nach Lieferung und teilt allfällige Mängel innert
            <strong> 14 Tagen</strong> schriftlich mit. Erfolgt innert dieser Frist keine Rüge, gilt die
            Leistung als genehmigt. Berechtigte und rechtzeitig gerügte Mängel behebt der Auftragnehmer im
            Rahmen der Nacherfüllung unentgeltlich. Gegenüber Konsumentinnen und Konsumenten bleiben die
            zwingenden Gewährleistungsrechte des OR vorbehalten.
          </p>
        </Block>
        <Block title="5.3 Keine Erfolgsgarantie">
          <p>
            Der Auftragnehmer schuldet eine fach- und sorgfaltsgerechte Leistungserbringung, jedoch keinen
            bestimmten wirtschaftlichen Erfolg (z.&nbsp;B. bestimmte Umsätze, Reichweiten oder Besucherzahlen),
            da dieser von zahlreichen, nicht beeinflussbaren Faktoren abhängt.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="6. Urheber- und Nutzungsrechte">
        <Block title="6.1 Rechteübertragung">
          <p>
            Die vom Auftragnehmer geschaffenen Werke (Designs, Code, Konzepte, kreative Arbeiten) unterliegen
            dem schweizerischen Urheberrecht (URG). Nach vollständiger Bezahlung der vereinbarten Vergütung
            erhält der Auftraggeber die für den vertraglich vorausgesetzten Zweck erforderlichen, nicht
            ausschliesslichen Nutzungsrechte am gelieferten Endprodukt.
          </p>
        </Block>
        <Block title="6.2 Vorbehaltene Rechte">
          <p>
            Eine über den vereinbarten Zweck hinausgehende Nutzung, Weitergabe, Bearbeitung oder
            Weiterveräusserung bedarf der vorgängigen schriftlichen Zustimmung des Auftragnehmers. Rechte an
            Entwürfen, Zwischenständen, eingesetzten Werkzeugen, Bibliotheken und wiederverwendbaren Komponenten
            verbleiben beim Auftragnehmer.
          </p>
        </Block>
        <Block title="6.3 Referenznutzung">
          <p>
            Der Auftragnehmer ist berechtigt, die erbrachten Leistungen unter Nennung des Auftraggebers zu
            Referenz- und Marketingzwecken (z.&nbsp;B. im Portfolio und auf Social Media) zu nennen und
            darzustellen, sofern keine Vertraulichkeit vereinbart wurde. Der Auftraggeber kann dieser Nutzung
            jederzeit mit Wirkung für die Zukunft schriftlich widersprechen.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="7. Vertraulichkeit und Datenschutz">
        <Block title="7.1 Vertraulichkeit">
          <p>
            Beide Parteien behandeln vertrauliche Informationen der jeweils anderen Partei vertraulich und
            verwenden sie nur im Rahmen des Vertragszwecks. Ausgenommen sind Informationen, die öffentlich
            bekannt sind oder die aufgrund gesetzlicher oder vertraglicher Pflichten an Dritte (z.&nbsp;B.
            Hosting-Provider) weitergegeben werden müssen.
          </p>
        </Block>
        <Block title="7.2 Datenschutz">
          <p>
            Der Auftragnehmer bearbeitet Personendaten nach Massgabe des anwendbaren Datenschutzrechts.
            Einzelheiten finden sich in der{' '}
            <Link href="/datenschutz" className="legal-link">Datenschutzerklärung</Link>. Soweit der
            Auftragnehmer im Auftrag des Auftraggebers Personendaten bearbeitet, schliessen die Parteien bei
            Bedarf eine separate Vereinbarung zur Auftragsbearbeitung ab.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="8. Beizug Dritter">
        <Block>
          <p>
            Der Auftragnehmer ist berechtigt, zur Erfüllung seiner Leistungen Dritte (z.&nbsp;B.
            Hosting-Anbieter, Freelancer, Software-Dienste) beizuziehen. Er bleibt für die ordnungsgemässe
            Vertragserfüllung verantwortlich, sofern nichts anderes vereinbart ist.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="9. Haftung">
        <Block title="9.1 Haftungsgrundsatz und -beschränkung">
          <p>
            Der Auftragnehmer haftet für Schäden, die er durch Verletzung seiner vertraglichen Pflichten
            verursacht. Soweit gesetzlich zulässig, ist die Haftung auf den unmittelbaren Schaden und der Höhe
            nach auf die für das betreffende Projekt tatsächlich bezahlte Vergütung beschränkt. Die Haftung für
            leichte Fahrlässigkeit von Hilfspersonen sowie für indirekte Schäden, Folgeschäden, entgangenen
            Gewinn und Datenverlust wird – soweit gesetzlich zulässig – wegbedungen.
          </p>
        </Block>
        <Block title="9.2 Zwingende Schranken (Art. 100 OR)">
          <p>
            Eine Wegbedingung der Haftung für rechtswidrige Absicht und grobe Fahrlässigkeit ist nach
            <strong> Art. 100 Abs. 1 OR</strong> ausgeschlossen und gilt nicht. Ebenso unberührt bleiben die
            zwingende Haftung für Personenschäden sowie zwingende Haftungsbestimmungen zugunsten von
            Konsumentinnen und Konsumenten.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="10. Vertragsdauer und Beendigung">
        <Block title="10.1 Kündigung durch den Auftraggeber">
          <p>
            Der Auftraggeber kann den Auftrag schriftlich beenden. In diesem Fall sind die bis zur Beendigung
            erbrachten Leistungen sowie bereits angefallene Auslagen und Drittkosten zu vergüten. Die zwingenden
            Bestimmungen des Auftragsrechts, insbesondere das jederzeitige Widerrufsrecht nach Art. 404 OR,
            bleiben vorbehalten.
          </p>
        </Block>
        <Block title="10.2 Kündigung durch den Auftragnehmer">
          <p>
            Der Auftragnehmer kann den Vertrag aus wichtigem Grund beenden, insbesondere bei Zahlungsverzug von
            mehr als 30 Tagen trotz Mahnung oder bei schwerwiegender Verletzung von Mitwirkungspflichten.
          </p>
        </Block>
        <Block title="10.3 Folgen der Beendigung">
          <p>
            Mit Beendigung enden laufende Support- und Wartungsleistungen. Bereits geschuldete Vergütungen
            bleiben geschuldet; bereits erbrachte und abgerechnete Leistungen werden nicht zurückerstattet.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="11. Konsumentinnen und Konsumenten">
        <Block title="11.1 Vorrang zwingender Bestimmungen">
          <p>
            Gegenüber Konsumentinnen und Konsumenten gelten diese AGB nur insoweit, als sie zwingenden
            Bestimmungen des Konsumentenschutzes nicht widersprechen; solche zwingenden Bestimmungen gehen vor.
            Im schweizerischen Recht besteht ein gesetzliches Widerrufsrecht nur in den vom Gesetz vorgesehenen
            Fällen (vgl. Art. 40a ff. OR). Für Online-Streitigkeiten von Verbrauchern aus der EU steht die
            Plattform der EU-Kommission unter{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
              ec.europa.eu/consumers/odr/
            </a>{' '}
            zur Verfügung.
          </p>
        </Block>
        <Block title="11.2 Widerrufsrecht für Verbraucher in der EU">
          <p>
            Verbraucherinnen und Verbrauchern mit gewöhnlichem Aufenthalt in der EU, mit denen ein Vertrag im
            Fernabsatz geschlossen wird, steht nach Massgabe der Richtlinie 2011/83/EU grundsätzlich das
            folgende Widerrufsrecht zu:
          </p>
          <div className="mt-2 p-5 rounded-lg font-light leading-[1.75]" style={infoBox}>
            <p style={{ fontWeight: 500 }}>Widerrufsbelehrung</p>
            <p>
              <strong>Widerrufsrecht.</strong> Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von
              Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des
              Vertragsabschlusses.
            </p>
            <p>
              Um Ihr Widerrufsrecht auszuüben, müssen Sie uns – SLIDE, Akif Yaylaci, Forelstrasse 44,
              3072 Ostermundigen, Schweiz, E-Mail{' '}
              <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a>, Telefon{' '}
              <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a> – mittels einer eindeutigen
              Erklärung (z.&nbsp;B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss,
              diesen Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende
              Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. Zur Wahrung der
              Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor
              Ablauf der Widerrufsfrist absenden.
            </p>
            <p>
              <strong>Folgen des Widerrufs.</strong> Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
              Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab
              dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Haben
              Sie verlangt, dass die Dienstleistung bereits während der Widerrufsfrist beginnen soll, so haben
              Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zum Widerruf bereits
              erbrachten Leistungen entspricht.
            </p>
          </div>
        </Block>
        <Block title="11.3 Vorzeitiges Erlöschen und Ausschluss des Widerrufsrechts">
          <p>
            Das Widerrufsrecht erlischt bei Dienstleistungsverträgen vorzeitig, wenn wir die Dienstleistung
            vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem Sie dazu Ihre
            ausdrückliche Zustimmung gegeben und gleichzeitig bestätigt haben, dass Sie Ihr Widerrufsrecht bei
            vollständiger Vertragserfüllung verlieren.
          </p>
          <p>
            Das Widerrufsrecht besteht zudem nicht bei Verträgen über Waren oder Leistungen, die nach
            Kundenspezifikation angefertigt werden oder eindeutig auf die persönlichen Bedürfnisse zugeschnitten
            sind (Art. 16 lit. c der Richtlinie 2011/83/EU). Da die Leistungen des Auftragnehmers (z.&nbsp;B.
            individuell entwickelte Websites, massgeschneiderte Konzepte und Inhalte) regelmässig nach
            Kundenspezifikation erstellt werden, ist das Widerrufsrecht in diesen Fällen ausgeschlossen.
          </p>
        </Block>
        <Block title="11.4 Muster-Widerrufsformular">
          <p>
            (Wenn Sie den Vertrag widerrufen wollen, füllen Sie bitte dieses Formular aus und senden Sie es
            zurück.)
          </p>
          <div className="mt-2 p-5 rounded-lg font-mono text-[0.85rem] leading-[1.9]" style={{ ...infoBox, color: 'var(--t2)' }}>
            <p>An: SLIDE, Akif Yaylaci, Forelstrasse 44, 3072 Ostermundigen, Schweiz, info@slideagentur.ch</p>
            <p>— Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung: ______________________________</p>
            <p>— Bestellt am (*) / abgeschlossen am (*): ______________</p>
            <p>— Name des/der Verbraucher(s): ______________________________</p>
            <p>— Anschrift des/der Verbraucher(s): ______________________________</p>
            <p>— Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ______________</p>
            <p>— Datum: ______________</p>
            <p>(*) Unzutreffendes streichen.</p>
          </div>
        </Block>
      </Section>

      <Divider />

      <Section title="12. Anwendbares Recht und Gerichtsstand">
        <Block title="12.1 Anwendbares Recht">
          <p>
            Es gilt ausschliesslich schweizerisches Recht unter Ausschluss der Kollisionsnormen des
            internationalen Privatrechts sowie unter Ausschluss des Übereinkommens der Vereinten Nationen über
            Verträge über den internationalen Warenkauf (CISG / Wiener Kaufrecht).
          </p>
        </Block>
        <Block title="12.2 Gerichtsstand">
          <p>
            Ausschliesslicher Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dem
            Vertragsverhältnis ist <strong>Bern (Schweiz)</strong>. Zwingende Gerichtsstände, insbesondere der
            Konsumentengerichtsstand nach der Schweizerischen Zivilprozessordnung (Art. 32 ZPO), bleiben
            vorbehalten.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="13. Schlussbestimmungen">
        <Block title="13.1 Salvatorische Klausel">
          <p>
            Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam oder undurchsetzbar sein,
            bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt. Anstelle der unwirksamen Bestimmung
            gilt eine Regelung, die dem wirtschaftlichen Zweck am nächsten kommt.
          </p>
        </Block>
        <Block title="13.2 Änderungen">
          <p>
            Der Auftragnehmer kann diese AGB jederzeit anpassen. Für bestehende Verträge gilt die im Zeitpunkt
            des Vertragsschlusses gültige Fassung, sofern Änderungen nicht ausdrücklich vereinbart werden.
          </p>
        </Block>
        <Block title="13.3 Kontakt">
          <p>Für Fragen zu diesen AGB:</p>
          <p>
            <strong>SLIDE</strong> – Akif Yaylaci<br />
            Forelstrasse 44, 3072 Ostermundigen<br />
            <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a><br />
            <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
          </p>
        </Block>
      </Section>
    </>
  )
}

function BodyEN() {
  return (
    <>
      <Section title="1. Scope and definitions">
        <Block title="1.1 Scope">
          <p>
            These General Terms and Conditions (hereinafter «GTC») apply to all contracts, services and offers
            of SLIDE, sole proprietorship, owner Akif Yaylaci, Forelstrasse 44, 3072 Ostermundigen (hereinafter
            «Contractor»), towards its customers (hereinafter «Client»). They apply both to businesses and to
            consumers.
          </p>
        </Block>
        <Block title="1.2 Precedence and deviating conditions">
          <p>
            Deviating, conflicting or supplementary terms and conditions of the Client do not become part of the
            contract unless the Contractor expressly agrees to their validity in writing. Individual agreements
            made in a specific case take precedence over these GTC.
          </p>
        </Block>
        <Block title="1.3 Services">
          <p>
            The Contractor provides services in the areas of web development, social media management, e-mail
            marketing and related IT and consulting services. The specific scope of services results from the
            respective offer or order confirmation.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="2. Conclusion of contract">
        <Block title="2.1 Offer and acceptance">
          <p>
            Offers of the Contractor are subject to change and non-binding unless expressly designated as
            binding. The contract is concluded under the rules of the Swiss Code of Obligations (Art. 1 ff. CO)
            by mutual concurring declarations of intent, as a rule by the Contractor&apos;s written or electronic
            order confirmation or by the start of performance.
          </p>
        </Block>
        <Block title="2.2 Form">
          <p>
            Orders, order confirmations and material agreements are made in text form (in particular by e-mail).
            Verbal side agreements require written or electronic confirmation to be valid.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="3. Remuneration and payment terms">
        <Block title="3.1 Prices">
          <p>
            The prices stated in the offer in Swiss francs (CHF) are decisive. The Contractor is not liable for
            VAT; <strong>no value added tax is shown or invoiced</strong>.
          </p>
        </Block>
        <Block title="3.2 Payment schedule">
          <p>
            Unless otherwise agreed, the following payment schedule applies: <strong>40% of the agreed
            remuneration</strong> is due as a down payment upon order confirmation or before work begins; the
            <strong> remaining 60%</strong> falls due upon completion or delivery of the project. For recurring
            services (e.g. social media management), billing is carried out periodically as agreed.
          </p>
        </Block>
        <Block title="3.3 Payment period and default">
          <p>
            Invoices are payable within <strong>30 days</strong> of the invoice date without deduction. If
            payment is not made, the Client falls into default after expiry of the payment period or after a
            reminder. From the onset of default, the Client owes <strong>default interest of 5% per annum
            (Art. 104 para. 1 CO)</strong>. The assertion of further damages and reasonable reminder fees
            remains reserved.
          </p>
        </Block>
        <Block title="3.4 Retention of performance">
          <p>
            In the event of default in payment, the Contractor is entitled to withhold or suspend further
            services until the outstanding amounts have been settled in full. A transfer of rights of use
            (section&nbsp;6) only takes place after full payment.
          </p>
        </Block>
        <Block title="3.5 Additional effort and price adjustment">
          <p>
            If the agreed scope of services is extended at the Client&apos;s request, or if performance is delayed
            due to a lack of cooperation, the Contractor is entitled to additionally charge the extra effort at
            agreed or industry-standard rates.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="4. Client&apos;s cooperation">
        <Block title="4.1 Duties to cooperate">
          <p>
            The Client shall provide the Contractor in good time and free of charge with all information,
            documents, content, access and approvals required for the provision of services. Delays attributable
            to missing or late cooperation are not at the Contractor&apos;s expense and may postpone agreed deadlines
            accordingly.
          </p>
        </Block>
        <Block title="4.2 Responsibility for supplied content">
          <p>
            The Client warrants that the content it provides (texts, images, logos, data, etc.) is free of
            third-party rights, or that it holds the necessary rights of use, and does not infringe copyright,
            trademark, personality or other rights. The Client indemnifies the Contractor against third-party
            claims in this respect.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="5. Deadlines, acceptance and defects">
        <Block title="5.1 Deadlines">
          <p>
            Deadline and delivery information is non-binding unless expressly agreed as binding. Binding
            deadlines require the timely cooperation of the Client.
          </p>
        </Block>
        <Block title="5.2 Acceptance and notice of defects">
          <p>
            The Client shall inspect the services rendered after delivery and notify any defects in writing
            within <strong>14 days</strong>. If no notice is given within this period, the service is deemed
            approved. The Contractor shall remedy justified and duly notified defects free of charge within the
            scope of subsequent performance. Towards consumers, the mandatory warranty rights of the CO remain
            reserved.
          </p>
        </Block>
        <Block title="5.3 No guarantee of specific results">
          <p>
            The Contractor owes professional and diligent performance, but no specific economic success (e.g.
            specific sales, reach or visitor numbers), as this depends on numerous factors beyond its control.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="6. Copyright and rights of use">
        <Block title="6.1 Transfer of rights">
          <p>
            The works created by the Contractor (designs, code, concepts, creative work) are subject to Swiss
            copyright law (URG). After full payment of the agreed remuneration, the Client receives the
            non-exclusive rights of use to the delivered end product required for the contractually intended
            purpose.
          </p>
        </Block>
        <Block title="6.2 Reserved rights">
          <p>
            Any use, transfer, modification or resale beyond the agreed purpose requires the prior written
            consent of the Contractor. Rights to drafts, intermediate stages, tools used, libraries and reusable
            components remain with the Contractor.
          </p>
        </Block>
        <Block title="6.3 Use as reference">
          <p>
            The Contractor is entitled to name and present the services rendered, naming the Client, for
            reference and marketing purposes (e.g. in the portfolio and on social media), provided no
            confidentiality has been agreed. The Client may object to this use at any time with effect for the
            future in writing.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="7. Confidentiality and data protection">
        <Block title="7.1 Confidentiality">
          <p>
            Both parties shall treat confidential information of the other party as confidential and use it only
            within the scope of the contractual purpose. Excepted is information that is publicly known or that
            must be disclosed to third parties (e.g. hosting providers) due to legal or contractual obligations.
          </p>
        </Block>
        <Block title="7.2 Data protection">
          <p>
            The Contractor processes personal data in accordance with applicable data protection law. Details
            can be found in the <Link href="/datenschutz" className="legal-link">privacy policy</Link>. Insofar as
            the Contractor processes personal data on behalf of the Client, the parties shall conclude a separate
            data processing agreement where necessary.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="8. Involvement of third parties">
        <Block>
          <p>
            The Contractor is entitled to involve third parties (e.g. hosting providers, freelancers, software
            services) in the performance of its services. It remains responsible for the proper performance of
            the contract unless otherwise agreed.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="9. Liability">
        <Block title="9.1 Principle and limitation of liability">
          <p>
            The Contractor is liable for damage caused by breaching its contractual obligations. To the extent
            permitted by law, liability is limited to direct damage and, in amount, to the remuneration actually
            paid for the relevant project. Liability for slight negligence of auxiliary persons and for indirect
            damage, consequential damage, lost profit and data loss is excluded to the extent permitted by law.
          </p>
        </Block>
        <Block title="9.2 Mandatory limits (Art. 100 CO)">
          <p>
            An exclusion of liability for unlawful intent and gross negligence is prohibited under
            <strong> Art. 100 para. 1 CO</strong> and does not apply. Likewise, mandatory liability for personal
            injury and mandatory liability provisions in favour of consumers remain unaffected.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="10. Term and termination">
        <Block title="10.1 Termination by the Client">
          <p>
            The Client may terminate the engagement in writing. In this case, the services rendered up to
            termination as well as expenses and third-party costs already incurred must be remunerated. The
            mandatory provisions of mandate law, in particular the right of revocation at any time under
            Art. 404 CO, remain reserved.
          </p>
        </Block>
        <Block title="10.2 Termination by the Contractor">
          <p>
            The Contractor may terminate the contract for good cause, in particular in the event of default in
            payment of more than 30 days despite a reminder, or in the event of a serious breach of duties to
            cooperate.
          </p>
        </Block>
        <Block title="10.3 Consequences of termination">
          <p>
            Upon termination, ongoing support and maintenance services end. Remuneration already owed remains
            payable; services already rendered and invoiced are not refunded.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="11. Consumers">
        <Block title="11.1 Precedence of mandatory provisions">
          <p>
            Towards consumers, these GTC apply only insofar as they do not conflict with mandatory consumer
            protection provisions; such mandatory provisions take precedence. Under Swiss law, a statutory right
            of withdrawal exists only in the cases provided for by law (cf. Art. 40a ff. CO). For online
            disputes of consumers from the EU, the platform of the EU Commission is available at{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="legal-link">
              ec.europa.eu/consumers/odr/
            </a>.
          </p>
        </Block>
        <Block title="11.2 Right of withdrawal for consumers in the EU">
          <p>
            Consumers with their habitual residence in the EU with whom a contract is concluded by distance
            means are generally entitled to the following right of withdrawal in accordance with Directive
            2011/83/EU:
          </p>
          <div className="mt-2 p-5 rounded-lg font-light leading-[1.75]" style={infoBox}>
            <p style={{ fontWeight: 500 }}>Withdrawal instructions</p>
            <p>
              <strong>Right of withdrawal.</strong> You have the right to withdraw from this contract within
              fourteen days without giving any reason. The withdrawal period is fourteen days from the day of
              the conclusion of the contract.
            </p>
            <p>
              To exercise your right of withdrawal, you must inform us – SLIDE, Akif Yaylaci, Forelstrasse 44,
              3072 Ostermundigen, Switzerland, e-mail{' '}
              <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a>, phone{' '}
              <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a> – of your decision to
              withdraw from this contract by means of a clear statement (e.g. a letter sent by post or an
              e-mail). You may use the model withdrawal form below, but this is not mandatory. To meet the
              withdrawal deadline, it is sufficient that you send your communication concerning the exercise of
              the right of withdrawal before the withdrawal period expires.
            </p>
            <p>
              <strong>Consequences of withdrawal.</strong> If you withdraw from this contract, we shall reimburse
              all payments received from you without undue delay and at the latest within fourteen days from the
              day on which we receive notification of your withdrawal. If you have requested that the service
              begin during the withdrawal period, you shall pay us a reasonable amount corresponding to the
              proportion of the services already provided up to the time of withdrawal.
            </p>
          </div>
        </Block>
        <Block title="11.3 Early expiry and exclusion of the right of withdrawal">
          <p>
            For service contracts, the right of withdrawal expires early if we have fully performed the service
            and only began performance after you gave your express consent and simultaneously confirmed your
            acknowledgement that you would lose your right of withdrawal upon full performance of the contract.
          </p>
          <p>
            The right of withdrawal further does not exist for contracts on goods or services made to the
            customer&apos;s specifications or clearly tailored to personal needs (Art. 16 lit. c of Directive
            2011/83/EU). Since the Contractor&apos;s services (e.g. individually developed websites, bespoke concepts
            and content) are regularly produced to customer specifications, the right of withdrawal is excluded
            in these cases.
          </p>
        </Block>
        <Block title="11.4 Model withdrawal form">
          <p>(If you wish to withdraw from the contract, please complete this form and return it.)</p>
          <div className="mt-2 p-5 rounded-lg font-mono text-[0.85rem] leading-[1.9]" style={{ ...infoBox, color: 'var(--t2)' }}>
            <p>To: SLIDE, Akif Yaylaci, Forelstrasse 44, 3072 Ostermundigen, Switzerland, info@slideagentur.ch</p>
            <p>— I/we (*) hereby withdraw from the contract concluded by me/us (*) for the provision of the following service: ______________________________</p>
            <p>— Ordered on (*) / concluded on (*): ______________</p>
            <p>— Name of consumer(s): ______________________________</p>
            <p>— Address of consumer(s): ______________________________</p>
            <p>— Signature of consumer(s) (only for notification on paper): ______________</p>
            <p>— Date: ______________</p>
            <p>(*) Delete as appropriate.</p>
          </div>
        </Block>
      </Section>

      <Divider />

      <Section title="12. Applicable law and place of jurisdiction">
        <Block title="12.1 Applicable law">
          <p>
            Swiss law applies exclusively, excluding the conflict-of-law rules of private international law and
            excluding the United Nations Convention on Contracts for the International Sale of Goods (CISG /
            Vienna Sales Convention).
          </p>
        </Block>
        <Block title="12.2 Place of jurisdiction">
          <p>
            The exclusive place of jurisdiction for all disputes arising from or in connection with the
            contractual relationship is <strong>Bern (Switzerland)</strong>. Mandatory places of jurisdiction,
            in particular the consumer forum under the Swiss Civil Procedure Code (Art. 32 CPC), remain reserved.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="13. Final provisions">
        <Block title="13.1 Severability">
          <p>
            Should individual provisions of these GTC be wholly or partially invalid or unenforceable, the
            validity of the remaining provisions remains unaffected. In place of the invalid provision, a
            provision that comes closest to the economic purpose shall apply.
          </p>
        </Block>
        <Block title="13.2 Amendments">
          <p>
            The Contractor may amend these GTC at any time. For existing contracts, the version valid at the time
            of conclusion of the contract applies, unless amendments are expressly agreed.
          </p>
        </Block>
        <Block title="13.3 Contact">
          <p>For questions about these GTC:</p>
          <p>
            <strong>SLIDE</strong> – Akif Yaylaci<br />
            Forelstrasse 44, 3072 Ostermundigen<br />
            <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a><br />
            <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
          </p>
        </Block>
      </Section>
    </>
  )
}

export default function AGBContent() {
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
            {en ? 'Terms' : 'AGB'}
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {en
              ? 'General Terms and Conditions for the services of SLIDE Agentur'
              : 'Allgemeine Geschäftsbedingungen für die Leistungen der SLIDE Agentur'}
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
