import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ImpressumPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
        <div className="mx-auto max-w-3xl">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Rechtliches
          </p>

          <h1 className="mb-16 text-5xl md:text-7xl tracking-tight">
            Impressum
          </h1>

          <div className="space-y-12 text-lg leading-8 text-neutral-600">

            <section>
              <h2 className="mb-4 text-2xl text-black">
                Angaben gemäß § 5 TMG
              </h2>

              <p>
                Anastasiia Saienko
                <br />
                Bergstraße 56
                <br />
                42651 Solingen
                <br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl text-black">
                Kontakt
              </h2>

              <p>
                Telefon: +49 163 4016519
                <br />
                E-Mail: info@kunst-bei-saienko.de
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl text-black">
                Umsatzsteuer
              </h2>

              <p>
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
                (Kleinunternehmerstatus).
              </p>

              <p className="mt-4">
                Steuernummer: 128/5526/5198
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl text-black">
                Verantwortlich für den Inhalt
              </h2>

              <p>
                Anastasiia Saienko
                <br />
                Bergstraße 56
                <br />
                42651 Solingen
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl text-black">
                Online-Streitbeilegung
              </h2>

              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:
              </p>

              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block underline underline-offset-4 transition hover:opacity-60"
              >
                https://ec.europa.eu/consumers/odr
              </a>

              <p className="mt-6">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}