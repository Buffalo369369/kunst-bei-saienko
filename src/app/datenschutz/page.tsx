import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Rechtliches
          </p>

          <h1 className="mb-16 text-5xl tracking-tight md:text-7xl">
            Datenschutz
          </h1>

          <p className="mb-16 text-neutral-500">Stand: August 2026</p>

          <div className="space-y-16 leading-8 text-neutral-700">
            <section>
              <h2 className="mb-6 text-3xl tracking-tight">1. Verantwortliche</h2>

              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>

              <div className="mt-6">
                <p>Anastasiia Saienko</p>
                <p>Bergstraße 56</p>
                <p>42651 Solingen</p>
                <p>Deutschland</p>
                <br />
                <p>E-Mail: kunst.bei.saienko@gmail.com</p>
                <p>Telefon: +49 163 4016519</p>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                2. Allgemeine Hinweise
              </h2>

              <p>
                Der Schutz Ihrer personenbezogenen Daten ist mir ein wichtiges
                Anliegen. Diese Datenschutzerklärung informiert darüber, welche
                Daten bei der Nutzung dieser Website und bei Anfragen verarbeitet
                werden.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                3. Hosting und Server-Logfiles
              </h2>

              <p>
                Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der
                Website können technisch erforderliche Informationen verarbeitet
                werden, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs,
                aufgerufene Seite, Referrer-URL sowie Angaben zu Browser,
                Betriebssystem und Gerät.
              </p>

              <p className="mt-6">
                Die Verarbeitung dient der technischen Bereitstellung, Stabilität
                und Sicherheit der Website.
              </p>

              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block underline underline-offset-4 transition hover:opacity-60"
              >
                Datenschutzhinweise von Vercel
              </a>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                4. Vercel Analytics
              </h2>

              <p>
                Auf dieser Website ist Vercel Analytics aktiviert. Der Dienst
                erfasst Nutzungsdaten wie aufgerufene Seiten, Referrer,
                Browser-, Geräte- und Standortinformationen in zusammengefasster
                Form, um die Nutzung der Website zu verstehen und zu verbessern.
              </p>

              <p className="mt-6">
                Nach Angaben von Vercel verwendet der Dienst keine Cookies für
                die Besucheranalyse. Unabhängig davon kann die Nutzung des
                Dienstes eine Verarbeitung technischer Nutzungsdaten durch Vercel
                erfordern.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                5. Vercel Speed Insights
              </h2>

              <p>
                Vercel Speed Insights ist aktiviert, um die technische Leistung
                der Website zu messen. Dabei können insbesondere Informationen
                zu aufgerufener Route, Lade- und Interaktionszeiten, Browser,
                Gerät, Betriebssystem, Netzwerktyp und Land verarbeitet werden.
              </p>

              <p className="mt-6">
                Die Messung dient der Erkennung und Verbesserung von
                Performance- und Stabilitätsproblemen.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                6. Reservierungsanfragen für Kunstwerke
              </h2>

              <p>
                Über das Reservierungsformular können Sie eine
                Reservierungsanfrage für ein Kunstwerk stellen. Dabei werden
                Vorname, Nachname, E-Mail-Adresse und die Kennung des angefragten
                Kunstwerks verarbeitet. Telefonnummer und Nachricht sind
                freiwillige Angaben.
              </p>

              <p className="mt-6">
                Die Anfrage wird serverseitig verarbeitet und in Supabase
                gespeichert. Sie dient dazu, das Kunstwerk für 24 Stunden zu
                reservieren und die anschließende persönliche Kontaktaufnahme zu
                ermöglichen. Über die Website kommt noch kein Kaufvertrag
                zustande.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                7. Vorbestellungsanfragen für „Anastasia im Wunderland“
              </h2>

              <p>
                Über das Formular für „Anastasia im Wunderland“ können Sie eine
                Vorbestellungsanfrage stellen. Dabei werden Vorname, Nachname,
                E-Mail-Adresse, Anzahl, gewünschte Übergabe- oder Versandart,
                Zahlungspräferenz und eine optionale Nachricht verarbeitet.
              </p>

              <p className="mt-6">
                Bei Versand werden zusätzlich Straße, Postleitzahl und Ort
                verarbeitet. Die Daten werden in Supabase gespeichert, damit die
                Anfrage bearbeitet und die persönliche Abstimmung zu
                Verfügbarkeit, Preis, Zahlung sowie Abholung oder Versand
                erfolgen kann. Über die Website kommt noch kein Kaufvertrag
                zustande.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">8. Supabase</h2>

              <p>
                Für die Speicherung und Verarbeitung von Reservierungs- und
                Vorbestellungsanfragen wird Supabase eingesetzt. Dort werden die
                für die jeweilige Anfrage erforderlichen Daten in persistenten
                Datenbankeinträgen gespeichert.
              </p>

              <p className="mt-6">
                Außerdem kann Supabase beim Abruf öffentlich dargestellter
                Kunstwerksdaten technisch erforderliche Verbindungsdaten
                verarbeiten. Weitere Informationen zur Datenverarbeitung durch
                Supabase stellt der Anbieter in seinen eigenen
                Datenschutzhinweisen bereit.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                9. Telegram-Benachrichtigungen
              </h2>

              <p>
                Bei einer Reservierungs- oder Vorbestellungsanfrage wird eine
                Benachrichtigung über einen Telegram-Bot an Anastasiia Saienko
                gesendet. Die Benachrichtigung kann die im jeweiligen Formular
                übermittelten Kundendaten enthalten, damit die Anfrage zeitnah
                bearbeitet werden kann.
              </p>

              <p className="mt-6">
                Telegram ist ein externer Dienst. Bitte berücksichtigen Sie dies
                insbesondere bei freiwilligen Angaben in Nachrichtenfeldern.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">10. YouTube</h2>

              <p>
                Auf der Seite „Künstlerin“ ist ein YouTube-Video eingebunden.
                Der YouTube-iframe wird nicht automatisch geladen. Erst wenn
                Sie aktiv auf „Video laden“ klicken, wird eine Verbindung zu
                YouTube bzw. Google hergestellt.
              </p>

              <p className="mt-6">
                Nach der Aktivierung können insbesondere technische
                Verbindungsdaten, IP-Adresse sowie Informationen zu Browser und
                Gerät und gegebenenfalls weitere Daten an YouTube bzw. Google
                übermittelt werden. Die Einbindung verwendet
                youtube-nocookie.com, verhindert eine Datenverarbeitung durch
                YouTube bzw. Google jedoch nicht vollständig.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                11. Schriftarten / next/font
              </h2>

              <p>
                Diese Website verwendet die über Next.js eingebundene Schriftart
                Inter. Die Schriftart wird im üblichen Next.js-
                Bereitstellungsweg selbst gehostet. Beim Besuch der Website wird
                daher normalerweise keine Anfrage des Browsers an Google zum
                Abruf der Schriftart ausgelöst.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                12. Speicherdauer
              </h2>

              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie es
                für die Bearbeitung der Anfrage, die anschließende Kommunikation
                oder die Erfüllung gesetzlicher Aufbewahrungspflichten
                erforderlich ist.
              </p>

              <p className="mt-6">
                Reservierungs- und Vorbestellungsdaten werden als persistente
                Einträge in Supabase gespeichert, bis eine Löschung aufgrund
                dieser Zwecke oder Verpflichtungen erfolgt.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                13. Rechtsgrundlagen
              </h2>

              <p>
                Die Verarbeitung von Reservierungs- und
                Vorbestellungsanfragen erfolgt in der Regel auf Grundlage von
                Art. 6 Abs. 1 lit. b DSGVO, soweit sie für vorvertragliche
                Maßnahmen erforderlich ist, die auf Ihre Anfrage hin erfolgen.
              </p>

              <p className="mt-6">
                Die technische Bereitstellung, Sicherheit und Stabilität der
                Website sowie die Analyse und Leistungsmessung erfolgen, soweit
                jeweils erforderlich und zulässig, auf Grundlage von Art. 6 Abs.
                1 lit. f DSGVO. Das berechtigte Interesse liegt in einem
                sicheren, funktionsfähigen und bedarfsgerecht weiterentwickelten
                Webauftritt.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                14. Empfänger und Drittlandübermittlung
              </h2>

              <p>
                Im Rahmen der beschriebenen Verarbeitung können externe
                Dienstleister und Dienste Daten erhalten, insbesondere Vercel
                für Hosting, Analytics und Speed Insights, Supabase für
                Datenbankverarbeitung, Telegram für Benachrichtigungen sowie
                YouTube bzw. Google für die Videoeinbindung.
              </p>

              <p className="mt-6">
                Je nach Anbieter und konkreter Verarbeitung kann eine
                Übermittlung in Drittländer, insbesondere die USA, stattfinden.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                15. SSL-/TLS-Verschlüsselung
              </h2>

              <p>
                Diese Website verwendet HTTPS. Dadurch werden Daten bei der
                Übertragung zwischen Ihrem Browser und der Website verschlüsselt
                übertragen.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                16. Rechte betroffener Personen
              </h2>

              <p>Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf:</p>

              <ul className="mt-6 ml-6 list-disc space-y-2">
                <li>Auskunft gemäß Art. 15 DSGVO,</li>
                <li>Berichtigung gemäß Art. 16 DSGVO,</li>
                <li>Löschung gemäß Art. 17 DSGVO,</li>
                <li>Einschränkung der Verarbeitung gemäß Art. 18 DSGVO,</li>
                <li>Datenübertragbarkeit gemäß Art. 20 DSGVO,</li>
                <li>Widerspruch gemäß Art. 21 DSGVO und</li>
                <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                17. Beschwerderecht
              </h2>

              <p>
                Sie haben gemäß Art. 77 DSGVO das Recht, sich bei einer
                Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Ansicht
                sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen
                die DSGVO verstößt.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                18. Änderungen dieser Datenschutzerklärung
              </h2>

              <p>
                Diese Datenschutzerklärung wird angepasst, wenn dies aufgrund
                technischer Änderungen, geänderter Verarbeitungen oder
                gesetzlicher Vorgaben erforderlich ist. Es gilt jeweils die auf
                dieser Website veröffentlichte aktuelle Fassung.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">19. Kontakt</h2>

              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an folgende
                Adresse wenden:
              </p>

              <div className="mt-6">
                <p>Anastasiia Saienko</p>
                <p>Bergstraße 56</p>
                <p>42651 Solingen</p>
                <p>Deutschland</p>
                <br />
                <p>E-Mail: kunst.bei.saienko@gmail.com</p>
                <p>Telefon: +49 163 4016519</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
