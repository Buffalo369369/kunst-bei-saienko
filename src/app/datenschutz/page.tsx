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

          <h1 className="mb-16 text-5xl md:text-7xl tracking-tight">
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

                <div className="mt-4">
                  <p>E-Mail: info@kunst-bei-saienko.de</p>
                  <p>Telefon: +49 163 4016519</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                2. Erhebung personenbezogener Daten
              </h2>

              <p>
                Beim Besuch dieser Website werden automatisch technische
                Informationen (z. B. Browsertyp, Betriebssystem, Uhrzeit des
                Zugriffs und IP-Adresse) verarbeitet. Diese Daten dienen der
                technischen Bereitstellung und Sicherheit der Website.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                3. Reservierungsformular
              </h2>

              <p>
                Wenn Sie eine Reservierungsanfrage für ein Kunstwerk senden,
                werden folgende personenbezogene Daten verarbeitet:
              </p>

              <ul className="mt-6 list-disc space-y-2 pl-6">
                <li>Vorname</li>
                <li>Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>freiwillige Nachricht</li>
              </ul>

              <p className="mt-6">
                Diese Daten werden ausschließlich verwendet, um Ihre Anfrage zu
                bearbeiten und Sie bezüglich des gewünschten Kunstwerks zu
                kontaktieren.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                4. Übermittlung der Daten
              </h2>

              <p>
                Die über das Reservierungsformular übermittelten Daten werden
                verschlüsselt übertragen und über einen Telegram-Bot an die
                Betreiberin dieser Website weitergeleitet. Eine Weitergabe an
                Dritte erfolgt nicht.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                5. Hosting
              </h2>

              <p>
                Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der
                Website können technisch notwendige Server-Logfiles verarbeitet
                werden, um einen sicheren Betrieb der Website zu gewährleisten.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                6. Speicherdauer
              </h2>

              <p>
                Personenbezogene Daten werden nur so lange gespeichert, wie dies
                zur Bearbeitung Ihrer Anfrage oder aufgrund gesetzlicher
                Aufbewahrungspflichten erforderlich ist.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                7. Ihre Rechte
              </h2>

              <p>
                Sie haben jederzeit das Recht auf Auskunft über die zu Ihrer
                Person gespeicherten Daten sowie auf Berichtigung, Löschung,
                Einschränkung der Verarbeitung und Datenübertragbarkeit nach den
                gesetzlichen Bestimmungen der DSGVO.
              </p>

              <p className="mt-6">
                Außerdem haben Sie das Recht, sich bei einer zuständigen
                Datenschutzaufsichtsbehörde zu beschweren.
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-3xl tracking-tight">
                8. Kontakt
              </h2>

              <p>
                Bei Fragen zum Datenschutz können Sie sich jederzeit an folgende
                Adresse wenden:
              </p>

              <div className="mt-6">
                <p>info@kunst-bei-saienko.de</p>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}