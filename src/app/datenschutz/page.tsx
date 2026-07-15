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

          <p className="mb-16 text-neutral-500">
            Stand: Juni 2026
          </p>

          <div className="space-y-16 text-neutral-700 leading-8">

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                1. Verantwortliche
              </h2>

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
                Anliegen. Ich behandle Ihre personenbezogenen Daten vertraulich
                und entsprechend den gesetzlichen Datenschutzvorschriften,
                insbesondere der Datenschutz-Grundverordnung (DSGVO), sowie
                dieser Datenschutzerklärung.
              </p>

              <p className="mt-6">
                Diese Datenschutzerklärung informiert darüber, welche
                personenbezogenen Daten beim Besuch dieser Website verarbeitet
                werden und zu welchem Zweck dies geschieht.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                3. Zugriff auf die Website
              </h2>

              <p>
                Beim Besuch dieser Website werden automatisch technische
                Informationen verarbeitet.
              </p>

              <div className="mt-6 ml-6">
                <ul className="list-disc space-y-2">
                  <li>IP-Adresse</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Browsertyp und Browserversion</li>
                  <li>Betriebssystem</li>
                  <li>aufgerufene Seiten</li>
                  <li>Referrer-URL</li>
                </ul>
              </div>

              <p className="mt-6">
                Diese Daten dienen ausschließlich der technischen
                Bereitstellung, Stabilität und Sicherheit der Website.
              </p>

              <p className="mt-6">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                4. Hosting
              </h2>

              <p>
                Diese Website wird bei <strong>Vercel Inc.</strong> gehostet.
              </p>

              <p className="mt-6">
                Beim Aufruf der Website verarbeitet Vercel technisch notwendige
                Server-Logfiles, um den sicheren Betrieb der Website zu
                gewährleisten.
              </p>

              <p className="mt-6">
                Weitere Informationen finden Sie unter:
              </p>

              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                className="underline"
              >
                https://vercel.com/legal/privacy-policy
              </a>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                5. Reservierungsformular
              </h2>

              <p>
                Über das Reservierungsformular können Sie eine unverbindliche
                Anfrage zu einem Kunstwerk stellen.
              </p>

              <p className="mt-6">
                Dabei werden folgende Daten verarbeitet:
              </p>

              <div className="mt-6 ml-6">
                <ul className="list-disc space-y-2">
                  <li>Vorname</li>
                  <li>Nachname</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>Nachricht (freiwillig)</li>
                </ul>
              </div>

              <p className="mt-6">
                Diese Daten werden ausschließlich verwendet, um Ihre Anfrage zu
                bearbeiten und mit Ihnen Kontakt aufzunehmen.
              </p>

              <p className="mt-6">
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                6. Übermittlung der Daten
              </h2>

              <p>
                Die über das Reservierungsformular eingegebenen Daten werden
                verschlüsselt übertragen.
              </p>

              <p className="mt-6">
                Zur Benachrichtigung der Betreiberin werden diese Daten
                automatisiert über einen Telegram-Bot an ein geschütztes
                Telegram-Konto übermittelt.
              </p>

              <p className="mt-6">
                Eine Weitergabe Ihrer personenbezogenen Daten an sonstige Dritte
                erfolgt nicht.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                7. Speicherdauer
              </h2>

              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies
                zur Bearbeitung Ihrer Anfrage erforderlich ist oder gesetzliche
                Aufbewahrungspflichten bestehen.
              </p>

              <p className="mt-6">
                Nach Wegfall des Verarbeitungszwecks werden die Daten gelöscht.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                8. SSL-/TLS-Verschlüsselung
              </h2>

              <p>
                Diese Website verwendet eine SSL-/TLS-Verschlüsselung (HTTPS).
              </p>

              <p className="mt-6">
                Dadurch werden sämtliche Daten verschlüsselt zwischen Ihrem
                Browser und dem Server übertragen.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                9. Ihre Rechte
              </h2>

              <p>
                Sie haben jederzeit das Recht auf:
              </p>

              <div className="mt-6 ml-6">
                <ul className="list-disc space-y-2">
                  <li>Auskunft gemäß Art. 15 DSGVO</li>
                  <li>Berichtigung gemäß Art. 16 DSGVO</li>
                  <li>Löschung gemäß Art. 17 DSGVO</li>
                  <li>Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
                  <li>Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
                  <li>Widerspruch gemäß Art. 21 DSGVO</li>
                </ul>
              </div>

              <p className="mt-6">
                Außerdem haben Sie das Recht, sich bei einer zuständigen
                Datenschutzaufsichtsbehörde zu beschweren.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                10. Kontakt
              </h2>

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

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                11. Änderungen dieser Datenschutzerklärung
              </h2>

              <p>
                Ich behalte mir vor, diese Datenschutzerklärung anzupassen, wenn
                dies aufgrund technischer Änderungen oder gesetzlicher Vorgaben
                erforderlich wird.
              </p>

              <p className="mt-6">
                Es gilt jeweils die auf dieser Website veröffentlichte aktuelle
                Version.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}