'use client'

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

const Divider = () => (
  <div className="h-px my-8" style={{ background: 'linear-gradient(90deg,transparent,var(--b),transparent)' }} />
)

function BodyDE() {
  return (
    <>
      <Section title="1. Überblick und Geltung">
        <Block>
          <p>
            Der Schutz Ihrer Personendaten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung
            informiert Sie darüber, welche Personendaten wir im Zusammenhang mit dem Besuch dieser Website
            und der Inanspruchnahme unserer Leistungen bearbeiten, zu welchem Zweck und auf welcher
            Rechtsgrundlage dies geschieht und welche Rechte Ihnen zustehen.
          </p>
          <p>
            Die Bearbeitung von Personendaten richtet sich nach dem revidierten schweizerischen
            Bundesgesetz über den Datenschutz (revDSG, in Kraft seit 1. September 2023) sowie der
            zugehörigen Verordnung (DSV). Soweit Sie sich im Europäischen Wirtschaftsraum (EWR) befinden
            und der sachliche und räumliche Anwendungsbereich der EU-Datenschutz-Grundverordnung (DSGVO)
            eröffnet ist, bearbeiten wir Ihre Personendaten zusätzlich nach Massgabe der DSGVO.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="2. Verantwortliche Stelle">
        <Block>
          <p>Verantwortlich für die Datenbearbeitung auf dieser Website ist:</p>
          <p>
            <strong>SLIDE</strong> (Einzelunternehmen)<br />
            Akif Yaylaci<br />
            Forelstrasse 44<br />
            3072 Ostermundigen<br />
            Kanton Bern, Schweiz
          </p>
          <p>
            E-Mail: <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a><br />
            Telefon: <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
          </p>
          <p>
            Verantwortliche Stelle ist diejenige natürliche oder juristische Person, die allein oder
            gemeinsam mit anderen über Zweck und Mittel der Bearbeitung von Personendaten entscheidet.
          </p>
          <p>
            <strong>Vertreter in der EU:</strong> Wir haben keinen Vertreter nach Art. 27 DSGVO bestellt,
            da unsere Bearbeitung von Personendaten von Personen in der EU nur gelegentlich erfolgt, kein
            umfangreiches Bearbeiten besonders schützenswerter Personendaten umfasst und voraussichtlich
            kein hohes Risiko für die betroffenen Personen mit sich bringt (Art. 27 Abs. 2 lit. a DSGVO).
            Sie können sich mit allen Anliegen direkt an die oben genannte verantwortliche Stelle wenden.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="3. Begriffe und Grundsätze">
        <Block>
          <p>
            «Personendaten» sind alle Angaben, die sich auf eine bestimmte oder bestimmbare natürliche
            Person beziehen (Art. 5 lit. a DSG / Art. 4 Ziff. 1 DSGVO). «Bearbeiten» bzw. «Verarbeiten»
            bezeichnet jeden Umgang mit Personendaten, unabhängig von den angewandten Mitteln und Verfahren,
            insbesondere das Beschaffen, Speichern, Verwenden, Bekanntgeben oder Löschen.
          </p>
          <p>
            Wir bearbeiten Personendaten nach den Grundsätzen von Treu und Glauben, der Verhältnismässigkeit,
            der Zweckbindung, der Richtigkeit sowie der Datensicherheit (Art. 6 DSG / Art. 5 DSGVO).
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="4. Rechtsgrundlagen der Bearbeitung">
        <Block>
          <p>
            Nach dem DSG dürfen Personendaten rechtmässig bearbeitet werden; eine besondere Rechtfertigung
            ist nur erforderlich, wenn eine Persönlichkeitsverletzung vorliegt (Art. 30 f. DSG). Soweit die
            DSGVO anwendbar ist, stützen wir die Bearbeitung auf folgende Rechtsgrundlagen:
          </p>
          <ul>
            <li><strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO) – z.&nbsp;B. für Cookies und Webanalyse;</li>
            <li><strong>Vertragserfüllung und vorvertragliche Massnahmen</strong> (Art. 6 Abs. 1 lit. b DSGVO) – z.&nbsp;B. bei Anfragen und der Abwicklung von Aufträgen;</li>
            <li><strong>Berechtigte Interessen</strong> (Art. 6 Abs. 1 lit. f DSGVO) – z.&nbsp;B. an einer sicheren, funktionsfähigen Bereitstellung der Website;</li>
            <li><strong>Rechtliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c DSGVO) – z.&nbsp;B. gesetzliche Aufbewahrungspflichten.</li>
          </ul>
          <p>
            Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Die
            Rechtmässigkeit der bis zum Widerruf erfolgten Bearbeitung bleibt davon unberührt.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="5. Hosting (Netlify)">
        <Block title="Externes Hosting">
          <p>Diese Website wird bei einem externen Dienstleister gehostet:</p>
          <p><strong>Netlify, Inc.</strong>, 512 2nd Street, Suite 200, San Francisco, CA 94107, USA.</p>
          <p>
            Auf den Servern von Netlify werden sämtliche Daten gespeichert und verarbeitet, die beim Aufruf
            und Betrieb dieser Website anfallen (insbesondere IP-Adressen, Server-Log-Daten sowie Inhalte
            von Formulareingaben). Der Einsatz erfolgt im Interesse einer sicheren, schnellen und effizienten
            Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO) sowie zur Erfüllung
            vorvertraglicher und vertraglicher Massnahmen (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
          <p>
            Mit Netlify besteht ein Auftragsbearbeitungsvertrag (Data Processing Agreement) im Sinne von
            Art. 9 DSG / Art. 28 DSGVO, der sicherstellt, dass die Daten nur nach unseren Weisungen und unter
            Einhaltung des Datenschutzes bearbeitet werden. Zur Datenübermittlung in die USA siehe Ziffer&nbsp;12.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="6. Server-Log-Dateien">
        <Block>
          <p>
            Beim Aufruf dieser Website erhebt und speichert der Hosting-Provider automatisch Informationen in
            sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Datum und Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Diese Daten sind technisch erforderlich, um die Website korrekt auszuliefern, die Systemsicherheit
            zu gewährleisten und Missbrauch zu verhindern. Rechtsgrundlage ist unser berechtigtes Interesse
            (Art. 6 Abs. 1 lit. f DSGVO). Eine Zusammenführung dieser Daten mit anderen Datenquellen nehmen
            wir nicht vor.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="7. Cookies und Einwilligung">
        <Block>
          <p>
            Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
            gespeichert werden und keinen Schaden anrichten. Wir unterscheiden zwischen technisch notwendigen
            Cookies, die für den Betrieb der Website erforderlich sind, und optionalen Cookies (z.&nbsp;B. zur
            Webanalyse).
          </p>
          <p>
            Optionale Cookies und damit verbundene Dienste (insbesondere Google Analytics) werden
            ausschliesslich gesetzt, wenn Sie über unser Cookie-Banner Ihre ausdrückliche Einwilligung erteilt
            haben (Art. 6 Abs. 1 lit. a DSGVO). Bis zur Einwilligung werden keine optionalen Cookies geladen.
            Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die in
            Ihrem Browser gespeicherten Cookies löschen oder uns kontaktieren.
          </p>
          <p>
            Sie können Ihren Browser zudem so einstellen, dass Sie über das Setzen von Cookies informiert
            werden, Cookies nur im Einzelfall erlauben oder generell ausschliessen. Bei der Deaktivierung von
            Cookies kann die Funktionalität dieser Website eingeschränkt sein.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="8. Kontaktformular, E-Mail und Telefon">
        <Block title="Kontaktformular">
          <p>
            Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, bearbeiten wir die von Ihnen
            angegebenen Daten – namentlich Name, E-Mail-Adresse, Telefonnummer, Firma sowie die Angaben zu
            gewünschter Leistung, Budget und Nachricht – zum Zweck der Bearbeitung Ihrer Anfrage und für
            allfällige Anschlussfragen.
          </p>
          <p>
            Die technische Übermittlung und Speicherung dieser Formulardaten erfolgt über
            <strong> Netlify Forms</strong>, einen Dienst der Netlify, Inc. (USA; siehe Ziffer&nbsp;5
            und&nbsp;12). Rechtsgrundlage ist die Anbahnung bzw. Erfüllung eines Vertrags (Art. 6 Abs. 1
            lit. b DSGVO) sowie unser berechtigtes Interesse an der effizienten Bearbeitung von Anfragen
            (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
          <p>
            Zur Abwehr von Spam setzt das Formular ein verstecktes «Honeypot»-Feld ein; es werden dabei keine
            zusätzlichen personenbezogenen Daten von Ihnen erhoben.
          </p>
        </Block>
        <Block title="Anfrage per E-Mail oder Telefon">
          <p>
            Wenn Sie uns per E-Mail oder Telefon kontaktieren, werden Ihre Angaben inklusive aller daraus
            hervorgehenden Personendaten zum Zweck der Bearbeitung Ihres Anliegens gespeichert und bearbeitet.
            Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            und lit. f DSGVO.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="9. Webanalyse: Google Analytics">
        <Block>
          <p>
            Diese Website nutzt – ausschliesslich nach Ihrer Einwilligung – den Webanalysedienst
            <strong> Google Analytics 4</strong>. Anbieter ist die Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Irland («Google»). Die Muttergesellschaft Google LLC hat ihren Sitz in
            den USA.
          </p>
          <p>
            Google Analytics verwendet Cookies und ähnliche Technologien, die eine Analyse der Benutzung der
            Website ermöglichen. Die erzeugten Informationen über Ihre Benutzung dieser Website werden in der
            Regel an Server von Google übertragen und dort gespeichert. In Google Analytics 4 ist die
            IP-Anonymisierung standardmässig aktiviert: IP-Adressen werden gekürzt und nicht dauerhaft
            protokolliert; eine Übermittlung in die USA erfolgt nur in gekürzter und damit nicht unmittelbar
            identifizierender Form.
          </p>
          <p>
            Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO bzw. die Einwilligung nach DSG).
            Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Zudem können Sie die
            Erfassung durch Google Analytics über das Browser-Add-on unter{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="legal-link">
              tools.google.com/dlpage/gaoptout
            </a>{' '}
            verhindern. Zur Datenübermittlung in die USA siehe Ziffer&nbsp;12.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="10. Schriftarten (lokal eingebunden)">
        <Block>
          <p>
            Zur einheitlichen Darstellung von Schriftarten verwendet diese Website Web Fonts (u.&nbsp;a.
            «DM Sans», «IBM Plex Mono» und «Host Grotesk»). Diese Schriften werden{' '}
            <strong>lokal auf unserem bzw. dem Server des Hosters gehostet</strong> und beim Seitenaufruf
            direkt von dort geladen. Es wird dabei <strong>keine Verbindung zu Servern von Google</strong> oder
            anderen Dritten aufgebaut, und es werden zu diesem Zweck keine Personendaten (insbesondere keine
            IP-Adresse) an Dritte übermittelt.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="11. Social-Media-Profile">
        <Block>
          <p>
            Auf dieser Website finden Sie Verweise (Links) auf unsere Profile bei Instagram (Meta Platforms
            Ireland Ltd.) und TikTok (TikTok Technology Limited). Es handelt sich um einfache Verlinkungen,
            nicht um eingebettete Inhalte oder Social-Media-Plugins. Erst wenn Sie einen dieser Links aktiv
            anklicken, werden Daten an den jeweiligen Anbieter übermittelt. Für die Datenbearbeitung auf den
            verlinkten Plattformen ist der jeweilige Anbieter verantwortlich; es gelten dessen
            Datenschutzbestimmungen.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="12. Bekanntgabe und Übermittlung ins Ausland">
        <Block>
          <p>
            Im Rahmen der vorstehend genannten Dienste (insbesondere Netlify und Google) können Personendaten
            in das Ausland – namentlich in die USA – übermittelt werden. Die USA verfügen aus Sicht des
            schweizerischen Rechts über keinen generell als angemessen anerkannten Datenschutz.
          </p>
          <p>
            Wir stellen ein angemessenes Schutzniveau für solche Übermittlungen sicher (Art. 16 f. DSG /
            Art. 44 ff. DSGVO), insbesondere durch:
          </p>
          <ul>
            <li>
              das <strong>Swiss–U.S. Data Privacy Framework</strong> bzw. das EU–U.S. Data Privacy Framework,
              soweit der jeweilige Empfänger zertifiziert ist (Angemessenheitsbeschluss);
            </li>
            <li>
              andernfalls die <strong>Standardvertragsklauseln</strong> der EU-Kommission, anerkannt durch den
              Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB), ergänzt um geeignete
              zusätzliche Schutzmassnahmen.
            </li>
          </ul>
          <p>Die entsprechenden Garantien können bei der verantwortlichen Stelle angefragt werden.</p>
        </Block>
      </Section>

      <Divider />

      <Section title="13. Aufbewahrung und Löschung">
        <Block>
          <p>
            Wir bewahren Personendaten nur so lange auf, wie es für die jeweiligen Zwecke erforderlich ist oder
            gesetzliche Aufbewahrungspflichten es verlangen. Anfragen ohne nachfolgenden Vertragsabschluss
            werden grundsätzlich gelöscht, sobald sie abschliessend bearbeitet sind und keine weitere
            Kommunikation zu erwarten ist. Daten im Zusammenhang mit Verträgen und der Rechnungsstellung
            unterliegen der gesetzlichen Aufbewahrungspflicht von zehn Jahren (Art. 958f OR). Anschliessend
            werden die Daten gelöscht oder anonymisiert.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="14. Ihre Rechte">
        <Block>
          <p>Sie haben im Rahmen des anwendbaren Rechts (DSG bzw. DSGVO) insbesondere folgende Rechte:</p>
          <ul>
            <li>Recht auf <strong>Auskunft</strong> über die zu Ihnen bearbeiteten Personendaten (Art. 25 DSG / Art. 15 DSGVO);</li>
            <li>Recht auf <strong>Berichtigung</strong> unrichtiger Daten (Art. 32 DSG / Art. 16 DSGVO);</li>
            <li>Recht auf <strong>Löschung</strong> bzw. Vernichtung (Art. 32 DSG / Art. 17 DSGVO);</li>
            <li>Recht auf <strong>Einschränkung</strong> der Bearbeitung (Art. 18 DSGVO);</li>
            <li>Recht auf <strong>Datenherausgabe oder -übertragung</strong> (Art. 28 DSG / Art. 20 DSGVO);</li>
            <li>Recht auf <strong>Widerspruch</strong> gegen bestimmte Bearbeitungen (Art. 21 DSGVO);</li>
            <li>Recht auf <strong>Widerruf</strong> einer erteilten Einwilligung mit Wirkung für die Zukunft.</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die unter Ziffer&nbsp;2 genannte
            verantwortliche Stelle. Zur Wahrung des Datenschutzes können wir einen Identitätsnachweis verlangen.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="15. Beschwerderecht">
        <Block>
          <p>
            Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. In der Schweiz ist dies der
            Eidgenössische Datenschutz- und Öffentlichkeitsbeauftragte (EDÖB), Feldeggweg 1, 3003 Bern (
            <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="legal-link">edoeb.admin.ch</a>
            ). Soweit die DSGVO anwendbar ist, steht Ihnen zusätzlich ein Beschwerderecht bei der
            Datenschutzbehörde Ihres gewöhnlichen Aufenthaltsorts, Arbeitsplatzes oder des Orts der
            mutmasslichen Verletzung in der EU zu.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="16. Datensicherheit">
        <Block>
          <p>
            Wir treffen angemessene technische und organisatorische Massnahmen, um Ihre Personendaten vor
            unbefugtem Zugriff, Verlust oder Missbrauch zu schützen (Art. 8 DSG / Art. 32 DSGVO). Diese Website
            nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung, erkennbar an «https://» in der
            Adresszeile und am Schloss-Symbol Ihres Browsers. Wir weisen darauf hin, dass die Datenübertragung
            im Internet (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann; ein
            lückenloser Schutz vor dem Zugriff durch Dritte ist nicht möglich.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="17. Änderungen dieser Datenschutzerklärung">
        <Block>
          <p>
            Wir können diese Datenschutzerklärung jederzeit ohne Vorankündigung anpassen, um sie an geänderte
            Rechtslagen oder Änderungen unserer Dienste anzupassen. Massgebend ist die jeweils auf dieser
            Website veröffentlichte aktuelle Fassung.
          </p>
        </Block>
      </Section>
    </>
  )
}

function BodyEN() {
  return (
    <>
      <Section title="1. Overview and scope">
        <Block>
          <p>
            Protecting your personal data is important to us. This privacy policy informs you which personal
            data we process in connection with your visit to this website and the use of our services, for
            what purpose and on what legal basis this is done, and what rights you have.
          </p>
          <p>
            The processing of personal data is governed by the revised Swiss Federal Act on Data Protection
            (revFADP/revDSG, in force since 1 September 2023) and its associated ordinance (DPO). Insofar as
            you are located in the European Economic Area (EEA) and the material and territorial scope of the
            EU General Data Protection Regulation (GDPR) applies, we additionally process your personal data in
            accordance with the GDPR.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="2. Controller">
        <Block>
          <p>The controller responsible for data processing on this website is:</p>
          <p>
            <strong>SLIDE</strong> (sole proprietorship)<br />
            Akif Yaylaci<br />
            Forelstrasse 44<br />
            3072 Ostermundigen<br />
            Canton of Bern, Switzerland
          </p>
          <p>
            E-mail: <a href="mailto:info@slideagentur.ch" className="legal-link">info@slideagentur.ch</a><br />
            Phone: <a href="tel:+41783262952" className="legal-link">+41 78 326 29 52</a>
          </p>
          <p>
            The controller is the natural or legal person who, alone or jointly with others, decides on the
            purposes and means of processing personal data.
          </p>
          <p>
            <strong>EU representative:</strong> We have not appointed a representative under Art. 27 GDPR, as
            our processing of personal data of persons in the EU is only occasional, does not involve
            large-scale processing of special categories of personal data and is unlikely to result in a high
            risk to the data subjects (Art. 27(2)(a) GDPR). You may address all matters directly to the
            controller named above.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="3. Definitions and principles">
        <Block>
          <p>
            «Personal data» means any information relating to an identified or identifiable natural person
            (Art. 5 lit. a FADP / Art. 4(1) GDPR). «Processing» means any operation involving personal data,
            irrespective of the means and procedures applied, in particular the collection, storage, use,
            disclosure or deletion.
          </p>
          <p>
            We process personal data in accordance with the principles of good faith, proportionality, purpose
            limitation, accuracy and data security (Art. 6 FADP / Art. 5 GDPR).
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="4. Legal bases for processing">
        <Block>
          <p>
            Under the FADP, personal data may be processed lawfully; specific justification is only required if
            a breach of personality rights occurs (Art. 30 f. FADP). Insofar as the GDPR applies, we base
            processing on the following legal grounds:
          </p>
          <ul>
            <li><strong>Consent</strong> (Art. 6(1)(a) GDPR) – e.g. for cookies and web analytics;</li>
            <li><strong>Performance of a contract and pre-contractual measures</strong> (Art. 6(1)(b) GDPR) – e.g. for enquiries and the handling of orders;</li>
            <li><strong>Legitimate interests</strong> (Art. 6(1)(f) GDPR) – e.g. in the secure, functional provision of the website;</li>
            <li><strong>Legal obligation</strong> (Art. 6(1)(c) GDPR) – e.g. statutory retention obligations.</li>
          </ul>
          <p>
            You may withdraw any consent given at any time with effect for the future. The lawfulness of
            processing carried out until withdrawal remains unaffected.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="5. Hosting (Netlify)">
        <Block title="External hosting">
          <p>This website is hosted by an external service provider:</p>
          <p><strong>Netlify, Inc.</strong>, 512 2nd Street, Suite 200, San Francisco, CA 94107, USA.</p>
          <p>
            All data generated when accessing and operating this website is stored and processed on Netlify&apos;s
            servers (in particular IP addresses, server log data and the content of form submissions). This is
            done in the interest of a secure, fast and efficient provision of our online offering
            (Art. 6(1)(f) GDPR) and to fulfil pre-contractual and contractual measures (Art. 6(1)(b) GDPR).
          </p>
          <p>
            A data processing agreement within the meaning of Art. 9 FADP / Art. 28 GDPR is in place with
            Netlify, ensuring that data is processed only on our instructions and in compliance with data
            protection law. For data transfers to the USA, see section&nbsp;12.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="6. Server log files">
        <Block>
          <p>
            When you access this website, the hosting provider automatically collects and stores information in
            so-called server log files, which your browser transmits automatically:
          </p>
          <ul>
            <li>browser type and version</li>
            <li>operating system used</li>
            <li>referrer URL</li>
            <li>host name of the accessing computer</li>
            <li>date and time of the server request</li>
            <li>IP address</li>
          </ul>
          <p>
            This data is technically necessary to deliver the website correctly, to ensure system security and
            to prevent misuse. The legal basis is our legitimate interest (Art. 6(1)(f) GDPR). We do not merge
            this data with other data sources.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="7. Cookies and consent">
        <Block>
          <p>
            Our website uses cookies. Cookies are small text files that are stored on your device and cause no
            harm. We distinguish between technically necessary cookies, which are required to operate the
            website, and optional cookies (e.g. for web analytics).
          </p>
          <p>
            Optional cookies and associated services (in particular Google Analytics) are only set if you have
            given your express consent via our cookie banner (Art. 6(1)(a) GDPR). No optional cookies are
            loaded before consent. You may withdraw your consent at any time with effect for the future by
            deleting the cookies stored in your browser or by contacting us.
          </p>
          <p>
            You can also set your browser to inform you about the setting of cookies, to allow cookies only in
            individual cases or to exclude them in general. Disabling cookies may limit the functionality of
            this website.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="8. Contact form, e-mail and telephone">
        <Block title="Contact form">
          <p>
            If you send us an enquiry via the contact form, we process the data you provide – namely name,
            e-mail address, telephone number, company and the details on the desired service, budget and message
            – for the purpose of handling your enquiry and any follow-up questions.
          </p>
          <p>
            The technical transmission and storage of this form data is carried out via
            <strong> Netlify Forms</strong>, a service provided by Netlify, Inc. (USA; see sections&nbsp;5
            and&nbsp;12). The legal basis is the initiation or performance of a contract (Art. 6(1)(b) GDPR)
            and our legitimate interest in the efficient handling of enquiries (Art. 6(1)(f) GDPR).
          </p>
          <p>
            To prevent spam, the form uses a hidden «honeypot» field; no additional personal data is collected
            from you in the process.
          </p>
        </Block>
        <Block title="Enquiry by e-mail or telephone">
          <p>
            If you contact us by e-mail or telephone, your details, including all resulting personal data, are
            stored and processed for the purpose of handling your request. We do not pass on this data without
            your consent. The legal basis is Art. 6(1)(b) and (f) GDPR.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="9. Web analytics: Google Analytics">
        <Block>
          <p>
            This website uses – exclusively after your consent – the web analytics service
            <strong> Google Analytics 4</strong>. The provider is Google Ireland Limited, Gordon House,
            Barrow Street, Dublin 4, Ireland («Google»). The parent company Google LLC is based in the USA.
          </p>
          <p>
            Google Analytics uses cookies and similar technologies that enable an analysis of the use of the
            website. The information generated about your use of this website is generally transmitted to and
            stored on Google servers. In Google Analytics 4, IP anonymisation is enabled by default: IP
            addresses are truncated and not permanently logged; any transfer to the USA takes place only in
            truncated and therefore not directly identifying form.
          </p>
          <p>
            The legal basis is your consent (Art. 6(1)(a) GDPR or consent under the FADP). You may withdraw
            your consent at any time with effect for the future. You can also prevent collection by Google
            Analytics via the browser add-on available at{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="legal-link">
              tools.google.com/dlpage/gaoptout
            </a>. For data transfers to the USA, see section&nbsp;12.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="10. Fonts (locally hosted)">
        <Block>
          <p>
            To display fonts consistently, this website uses web fonts (including «DM Sans», «IBM Plex Mono»
            and «Host Grotesk»). These fonts are <strong>hosted locally on our server or that of the host</strong>
            {' '}and loaded directly from there when the page is accessed. <strong>No connection to Google
            servers</strong> or other third parties is established, and no personal data (in particular no IP
            address) is transmitted to third parties for this purpose.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="11. Social media profiles">
        <Block>
          <p>
            On this website you will find references (links) to our profiles on Instagram (Meta Platforms
            Ireland Ltd.) and TikTok (TikTok Technology Limited). These are simple links, not embedded content
            or social media plugins. Data is only transmitted to the respective provider once you actively click
            on one of these links. The respective provider is responsible for data processing on the linked
            platforms; their privacy policies apply.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="12. Disclosure and transfer abroad">
        <Block>
          <p>
            In connection with the services mentioned above (in particular Netlify and Google), personal data
            may be transferred abroad – in particular to the USA. From the perspective of Swiss law, the USA
            does not have data protection that is generally recognised as adequate.
          </p>
          <p>
            We ensure an adequate level of protection for such transfers (Art. 16 f. FADP / Art. 44 ff. GDPR),
            in particular through:
          </p>
          <ul>
            <li>
              the <strong>Swiss–U.S. Data Privacy Framework</strong> or the EU–U.S. Data Privacy Framework,
              insofar as the respective recipient is certified (adequacy decision);
            </li>
            <li>
              otherwise the <strong>Standard Contractual Clauses</strong> of the EU Commission, recognised by
              the Swiss Federal Data Protection and Information Commissioner (FDPIC), supplemented by appropriate
              additional protective measures.
            </li>
          </ul>
          <p>The corresponding safeguards can be requested from the controller.</p>
        </Block>
      </Section>

      <Divider />

      <Section title="13. Retention and deletion">
        <Block>
          <p>
            We retain personal data only for as long as is necessary for the respective purposes or as required
            by statutory retention obligations. Enquiries without a subsequent conclusion of a contract are
            generally deleted once they have been conclusively processed and no further communication is to be
            expected. Data relating to contracts and invoicing is subject to the statutory retention period of
            ten years (Art. 958f CO). The data is then deleted or anonymised.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="14. Your rights">
        <Block>
          <p>Within the framework of the applicable law (FADP or GDPR), you have in particular the following rights:</p>
          <ul>
            <li>right of <strong>access</strong> to the personal data processed about you (Art. 25 FADP / Art. 15 GDPR);</li>
            <li>right to <strong>rectification</strong> of inaccurate data (Art. 32 FADP / Art. 16 GDPR);</li>
            <li>right to <strong>erasure</strong> or destruction (Art. 32 FADP / Art. 17 GDPR);</li>
            <li>right to <strong>restriction</strong> of processing (Art. 18 GDPR);</li>
            <li>right to <strong>data portability or release</strong> (Art. 28 FADP / Art. 20 GDPR);</li>
            <li>right to <strong>object</strong> to certain processing (Art. 21 GDPR);</li>
            <li>right to <strong>withdraw</strong> consent given, with effect for the future.</li>
          </ul>
          <p>
            To exercise your rights, an informal message to the controller named in section&nbsp;2 is
            sufficient. To safeguard data protection, we may request proof of identity.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="15. Right to lodge a complaint">
        <Block>
          <p>
            You have the right to lodge a complaint with a supervisory authority. In Switzerland, this is the
            Federal Data Protection and Information Commissioner (FDPIC), Feldeggweg 1, 3003 Bern (
            <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="legal-link">edoeb.admin.ch</a>
            ). Insofar as the GDPR applies, you additionally have the right to lodge a complaint with the data
            protection authority of your habitual residence, place of work or the place of the alleged
            infringement in the EU.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="16. Data security">
        <Block>
          <p>
            We take appropriate technical and organisational measures to protect your personal data against
            unauthorised access, loss or misuse (Art. 8 FADP / Art. 32 GDPR). For security reasons, this website
            uses SSL/TLS encryption, recognisable by «https://» in the address bar and the lock symbol in your
            browser. We point out that data transmission over the internet (e.g. when communicating by e-mail)
            can have security gaps; complete protection against access by third parties is not possible.
          </p>
        </Block>
      </Section>

      <Divider />

      <Section title="17. Changes to this privacy policy">
        <Block>
          <p>
            We may amend this privacy policy at any time without prior notice in order to adapt it to changed
            legal situations or changes to our services. The current version published on this website applies.
          </p>
        </Block>
      </Section>
    </>
  )
}

export default function DatenschutzContent() {
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
            {en ? 'Privacy' : 'Datenschutz'}
          </h1>
          <p className="font-light leading-[1.7]" style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--t2)' }}>
            {en
              ? 'How we process and protect your personal data under the Swiss FADP and EU GDPR.'
              : 'Wie wir Ihre Personendaten nach Schweizer DSG und EU-DSGVO bearbeiten und schützen.'}
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
