import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz – SLIDE Agentur',
  description: 'Datenschutzerklärung der SLIDE Digitalagentur. Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten.',
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
        style={{
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          color: 'var(--t1)',
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

export default function DatenschutzPage() {
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
            Datenschutz
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            Ihre Privatsphäre ist uns wichtig. Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten. Die aufgezählten
            Punkte betrifft möglicherweise nicht alle besuchenden.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[860px] mx-auto">

          <Section title="Allgemeine Hinweise">
            <Block>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie
                unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Datenerfassung auf unserer Website">
            <Block title="Wer ist verantwortlich für die Datenerfassung?">
              <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            </Block>
            <Block title="Wie erfassen wir Ihre Daten?">
              <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
              <p>Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie unsere Website betreten.</p>
            </Block>
            <Block title="Wofür nutzen wir Ihre Daten?">
              <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
            </Block>
            <Block title="Welche Rechte haben Sie bezüglich Ihrer Daten?">
              <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Hosting und Content Delivery Networks">
            <Block title="Externes Hosting">
              <p>Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.</p>
              <p>Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter.</p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Allgemeine Hinweise und Pflichtinformationen">
            <Block title="Datenschutz">
              <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
              <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
            </Block>
            <Block title="Hinweis zur verantwortlichen Stelle">
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <p>
                <strong>SLIDE Agentur</strong><br />
                Akif Yaylaci<br />
                Forelstrasse 44<br />
                3072 Ostermundigen<br />
                Bern, Schweiz
              </p>
              <p>
                E-Mail: <a href="mailto:contact@akif.pw" className="legal-link">contact@akif.pw</a><br />
                Telefon: <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
              </p>
              <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
            </Block>
            <Block title="Widerruf Ihrer Einwilligung zur Datenverarbeitung">
              <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmässigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>
            </Block>
            <Block title="Beschwerderecht bei der zuständigen Aufsichtsbehörde">
              <p>Im Falle datenschutzrechtlicher Verstösse steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist der Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB) in der Schweiz.</p>
            </Block>
            <Block title="Recht auf Datenübertragbarkeit">
              <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
            </Block>
            <Block title="SSL- bzw. TLS-Verschlüsselung">
              <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &ldquo;http://&rdquo; auf &ldquo;https://&rdquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
              <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>
            </Block>
            <Block title="Auskunft, Sperrung, Löschung">
              <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Datenerfassung auf unserer Website">
            <Block title="Cookies">
              <p>Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.</p>
              <p>Die meisten der von uns verwendeten Cookies sind so genannte &ldquo;Session-Cookies&rdquo;. Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.</p>
              <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschliessen sowie das automatische Löschen der Cookies beim Schliessen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
            </Block>
            <Block title="Server-Log-Dateien">
              <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
              <ul>
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist die Einwilligung des Nutzers, die jederzeit widerrufen werden kann.</p>
            </Block>
            <Block title="Kontaktformular">
              <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
              <p>Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschliesslich auf Grundlage Ihrer Einwilligung. Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmässigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.</p>
              <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>
            </Block>
            <Block title="Anfrage per E-Mail oder Telefon">
              <p>Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
              <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage Ihrer Kontaktanfrage. Sie können die Speicherung Ihrer Daten jederzeit durch eine formlose Mitteilung per E-Mail an uns widerrufen.</p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Analyse Tools und Werbung">
            <Block title="Google Analytics">
              <p>Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.</p>
              <p>Google Analytics verwendet so genannte &ldquo;Cookies&rdquo;. Das sind Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.</p>
              <p>Die Speicherung von Google-Analytics-Cookies erfolgt auf Grundlage Ihrer Einwilligung. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.</p>
            </Block>
            <Block title="IP-Anonymisierung">
              <p>Wir haben auf dieser Website die Funktion IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.</p>
            </Block>
          </Section>

          <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />

          <Section title="Plugins und Tools">
            <Block title="Google Web Fonts">
              <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.</p>
              <p>Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von Google Web Fonts erfolgt im Interesse einer einheitlichen und ansprechenden Darstellung unserer Online-Angebote.</p>
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
