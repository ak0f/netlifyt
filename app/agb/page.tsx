import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AGB – SLIDE Agentur',
  description: 'Allgemeine Geschäftsbedingungen (AGB) der SLIDE Digitalagentur.',
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

export default function AGBPage() {
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
            AGB
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            Allgemeine Geschäftsbedingungen für die Inanspruchnahme von Dienstleistungen der SLIDE Agentur
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[860px] mx-auto">

          <Section title="Geltungsbereich und Definitionen">
            <Block title="Geltungsbereich">
              <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen und Referenzen, die die SLIDE Agentur (nachfolgend &ldquo;Auftragnehmer&rdquo;) für Kunden (nachfolgend &ldquo;Auftraggeber&rdquo;) erbringt. Sie bilden die Grundlage für die geschäftliche Beziehung zwischen dem Auftragnehmer und dem Auftraggeber.</p>
            </Block>
            <Block title="Abweichende Bedingungen">
              <p>Abweichende Bedingungen des Auftraggebers werden nur anerkannt, wenn sie vom Auftragnehmer schriftlich bestätigt werden. Besondere Vereinbarungen werden nur dann gültig, wenn sie mit diesen AGB schriftlich kombiniert oder einzeln bestätigt werden.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Leistungsumfang und Vergütung">
            <Block title="Leistungsbeschreibung">
              <p>Der Umfang der zu erbringenden Leistungen wird in einem separaten Angebot, Vertrag oder Briefing dokumentiert. Der Auftragnehmer erbringt die Leistungen nach bestem Wissen und Gewissen und gemäss den branchenüblichen Standards.</p>
            </Block>
            <Block title="Preise und Zahlungsbedingungen">
              <p>Die im Angebot genannten Preise sind Nettopreise zzgl. gesetzlicher Mehrwertsteuer (wo anwendbar). Eine Zahlung erfolgt innerhalb von 30 Tagen nach Rechnungsstellung. Bei Verzug wird eine Verzugszinsen von 5% pro Jahr berechnet, mindestens jedoch CHF 10.– pro Mahnung. Der Auftragnehmer behält sich das Recht vor, weitere Mahngebühren in Rechnung zu stellen.</p>
            </Block>
            <Block title="Preisanpassungen">
              <p>Der Auftragnehmer behält sich das Recht vor, Preise für Leistungen anzupassen, wenn der Umfang der vereinbarten Leistungen erheblich erweitert wird oder wenn der Auftraggeber dem Projekt nicht zur Verfügung stehende Informationen oder Materialien nicht rechtzeitig bereitstellt.</p>
            </Block>
            <Block title="Zahlungsverzug">
              <p>Der Auftragnehmer kann bei Zahlungsverzug des Auftraggebers von mehr als 30 Tagen alle ausstehenden Leistungen einstellen. Der Auftragnehmer behält sich das Recht vor, das Projekt zu unterbrechen oder zu beenden, bis die ausstehende Zahlung erfolgt ist.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Mitwirkung und Verantwortung des Auftraggebers">
            <Block title="Mitwirkungspflichten">
              <p>Der Auftraggeber verpflichtet sich, rechtzeitig alle notwendigen Informationen, Unterlagen, Inhalte und Genehmigungen zur Verfügung zu stellen, die für die Ausführung der Leistungen erforderlich sind. Verzögerungen durch fehlende Mitwirkung des Auftraggebers können zu Verzögerungen bei der Leistungserbringung führen.</p>
            </Block>
            <Block title="Verantwortung für bereitgestellte Inhalte">
              <p>Der Auftraggeber garantiert, dass alle vom Auftraggeber bereitgestellten Inhalte, Bilder, Texte und Materialien frei von Rechten Dritter sind und nicht gegen Urheber-, Marken- oder sonstige Schutzrechte verstossen. Der Auftraggeber trägt die volle Verantwortung für die Rechtmässigkeit dieser Inhalte.</p>
            </Block>
            <Block title="Feedback und Änderungswünsche">
              <p>Der Auftraggeber wird aufgefordert, sein Feedback und Änderungswünsche klar und schriftlich zu kommunizieren. Der Umfang von Überarbeitungen ist im Angebot oder Vertrag definiert. Zusätzliche Änderungen nach Abschluss der vereinbarten Überarbeitungen können in Rechnung gestellt werden.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Urheber- und Nutzungsrechte">
            <Block title="Urheberrechte am Werk">
              <p>Die vom Auftragnehmer erstellten Werke, Designs, Code und kreativen Arbeiten unterliegen dem Schutz des Urheberrechts. Der Auftraggeber erhält die nicht-exklusiven Rechte zur Nutzung der finalen Arbeiten für den vereinbarten Zweck, sofern die vereinbarte Vergütung in vollem Umfang bezahlt wurde.</p>
            </Block>
            <Block title="Nutzungsrechte">
              <p>Der Auftraggeber darf die finalen Arbeiten nur für den vereinbarten Zweck nutzen. Eine Weitergabe, Vervielfältigung oder kommerzielle Nutzung ohne ausdrückliche schriftliche Zustimmung des Auftragsnehmers ist nicht gestattet. Die Nutzungsrechte an Design-Elementen und Technologien bleiben beim Auftragnehmer.</p>
            </Block>
            <Block title="Referenzen und Portfolionutzung">
              <p>Der Auftragnehmer behält sich das Recht vor, die erbrachten Leistungen in seinem Portfolio und zu Marketingzwecken zu präsentieren, sofern keine Vertraulichkeit vereinbart wurde. Der Auftraggeber kann dem innerhalb von 10 Tagen nach Projektabschluss widersprechen.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Pflichten des Auftragsnehmers">
            <Block title="Leistungsqualität">
              <p>Der Auftragnehmer verpflichtet sich, die Leistungen mit hoher Qualität und nach branchenüblichen Standards zu erbringen. Der Auftragnehmer bemüht sich, die vereinbarten Termine einzuhalten, kann diese jedoch nicht garantieren, sofern der Auftraggeber nicht alle notwendigen Materialien rechtzeitig bereitstellt.</p>
            </Block>
            <Block title="Vertraulichkeit">
              <p>Der Auftragnehmer verpflichtet sich, vertrauliche Informationen des Auftraggebers, die dieser nicht der Öffentlichkeit bekannt machen möchte, zu schützen. Dies gilt nicht für Informationen, die bereits öffentlich bekannt sind oder an dritte Parteien übermittelt werden müssen (z.B. an Hosting-Provider).</p>
            </Block>
            <Block title="Kommunikation">
              <p>Der Auftragnehmer wird sich bemühen, bei Fragen und Anfragen zeitnah zu reagieren. Während Ferienzeiten oder Zeiten aussergewöhnlicher Auslastung kann die Reaktionszeit länger ausfallen. Eine Reaktion innerhalb von 48-72 Geschäftsstunden ist üblich.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Haftung und Gewährleistung">
            <Block title="Haftungsbeschränkung">
              <p>Die Haftung des Auftragsnehmers ist auf die tatsächlich bezahlte Vergütung für das betreffende Projekt begrenzt. Der Auftragnehmer haftet nicht für Folgeschäden, entgangene Gewinne oder sonstige indirekte Schäden, auch wenn auf die Möglichkeit solcher Schäden hingewiesen wurde.</p>
            </Block>
            <Block title="Gewährleistung und Mängelhaftung">
              <p>Der Auftragnehmer gewährleistet, dass die erbrachten Leistungen frei von Material- und Verarbeitungsmängeln sind. Mängel müssen dem Auftragnehmer innerhalb von 14 Tagen nach Abnahme der Leistung schriftlich mitgeteilt werden. Der Auftragnehmer wird diese dann kostenlos beheben.</p>
            </Block>
            <Block title="Keine Garantie für bestimmte Ergebnisse">
              <p>Der Auftragnehmer garantiert nicht für bestimmte Geschäftsergebnisse, wie z.B. Umsatzsteigerungen oder Erhöhung der Website-Besucherzahlen. Die tatsächlichen Ergebnisse hängen von vielen externen Faktoren ab, die der Auftragnehmer nicht kontrollieren kann.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Kündigung und Beendigung">
            <Block title="Kündigung durch den Auftraggeber">
              <p>Der Auftraggeber kann ein Projekt jederzeit mit schriftlicher Benachrichtigung beenden. Bei Beendigung durch den Auftraggeber ist dieser verpflichtet, für alle bereits erbrachten Leistungen zu zahlen sowie alle Materialkosten zu erstatten, die bereits angefallen sind.</p>
            </Block>
            <Block title="Kündigung durch den Auftragnehmer">
              <p>Der Auftragnehmer behält sich das Recht vor, ein Projekt zu beenden, wenn der Auftraggeber mehr als 60 Tage im Verzug mit der Zahlung ist oder wenn der Auftraggeber andere wesentliche Verpflichtungen verletzt. Eine Kündigungsfrist von 14 Tagen wird angewendet.</p>
            </Block>
            <Block title="Folgen der Beendigung">
              <p>Bei Beendigung des Vertrags wird die Bereitstellung von Support und Wartung eingestellt. Bereits bezahlte Gebühren werden nicht erstattet. Der Auftraggeber trägt alle Kosten für die Verwaltung und Speicherung von Referenzergebnissen nach Beendigung.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Datenschutz und Sicherheit">
            <Block title="Datenschutz">
              <p>
                Der Auftragnehmer behandelt die Daten des Auftraggebers gemäss den geltenden Datenschutzgesetzen. Weitere
                Informationen finden Sie in der{' '}
                <Link href="/datenschutz" className="legal-link">Datenschutzerklärung</Link>.
              </p>
            </Block>
            <Block title="Sicherheit">
              <p>Der Auftragnehmer trifft angemessene Massnahmen zum Schutz der Daten des Auftraggebers. Der Auftragnehmer übernimmt jedoch keine Garantie für absolute Sicherheit gegen Hacking oder andere Cyberangriffe.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Slegel- und Verfahrensbestimmungen">
            <Block title="Geltendes Recht">
              <p>Diese AGB und alle damit zusammenhängenden Geschäfte unterliegen dem Recht der Schweiz. Gerichtsstand ist Bern.</p>
            </Block>
            <Block title="Schlichtungsverfahren">
              <p>Bei Meinungsverschiedenheiten bemühen sich beide Parteien zunächst, eine gütliche Einigung zu erzielen. Sollte dies nicht möglich sein, können Streitigkeiten vor dem zuständigen Gericht in Bern ausgetragen werden.</p>
            </Block>
            <Block title="Teilnichtigkeit">
              <p>Sollte eine Bestimmung dieser AGB unwirksam oder nicht durchsetzbar sein, bleibt der Rest dieser AGB gültig und wirksam.</p>
            </Block>
          </Section>

          <Divider />

          <Section title="Schlussbestimmungen">
            <Block title="Gesamtes Abkommen">
              <p>Diese AGB stellen zusammen mit dem Angebot oder Vertrag das gesamte Abkommen zwischen dem Auftraggeber und dem Auftragnehmer dar. Alle vorherigen Verhandlungen, Absprachen und Vereinbarungen werden durch dieses Dokument ersetzt.</p>
            </Block>
            <Block title="Änderungen der AGB">
              <p>Der Auftragnehmer behält sich das Recht vor, diese AGB jederzeit zu ändern. Der Auftraggeber wird von wesentlichen Änderungen benachrichtigt. Die Nutzung der Leistungen des Auftragsnehmers nach einer Änderung wird als Annahme der neuen AGB betrachtet.</p>
            </Block>
            <Block title="Kontakt">
              <p>Für Fragen zu diesen AGB oder zum Datenschutz wenden Sie sich bitte an:</p>
              <p>
                <strong>SLIDE Agentur</strong><br />
                <a href="mailto:contact@akif.pw" className="legal-link">contact@akif.pw</a><br />
                <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
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
