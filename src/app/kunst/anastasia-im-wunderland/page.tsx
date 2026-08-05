import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import BookPreorderForm from "@/components/BookPreorderForm";
import Navbar from "@/components/Navbar";
import WonderlandQuotes from "@/components/WonderlandQuotes";

const bookCoverSrc = "/images/project-5.jpg";

export default function AnastasiaImWunderlandPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] text-black">
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:px-8 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24 lg:px-10 lg:py-28">
          <div className="mx-auto w-full max-w-md">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 shadow-xl">
              <Image
                src={bookCoverSrc}
                alt="Platzhalter für das Buchcover von Anastasia im Wunderland"
                fill
                priority
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 60vw, 36vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-2xl space-y-7 lg:space-y-9">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Buchprojekt
            </p>

            <h1 className="text-[clamp(3.4rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
              Anastasia
              <br />
              im Wunderland
            </h1>

            <p className="max-w-xl text-[clamp(1.2rem,2.5vw,1.5rem)] leading-8 text-neutral-600">
              Eine Geschichte über Neuanfang, Identität, Kunst und den Mut,
              den eigenen Weg zu gehen.
            </p>

            <p className="max-w-xl leading-8 text-neutral-600">
              Zwischen vertrauten Erinnerungen und einer neuen Welt entfaltet
              sich eine persönliche Reise voller Fragen, Farben und leiser
              Entdeckungen. Dieses Buch lädt dazu ein, den eigenen Blick auf
              Veränderung neu zu öffnen.
            </p>

            <a
              href="#vorbestellung"
              className="inline-flex bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Vorbestellen
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-24 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-20 lg:px-10">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Die Geschichte
            </p>

            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] leading-tight tracking-tight">
              Über das Buch
            </h2>

            <div className="mt-8 max-w-3xl space-y-5 text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
              <p>
                „Anastasia im Wunderland“ erzählt von einem Neuanfang und dem
                Versuch, in einer fremden Welt einen eigenen Platz zu finden.
                Es ist eine Geschichte über Identität, Migration und die kleinen
                Entscheidungen, die uns langsam verwandeln.
              </p>

              <p>
                Kunst wird dabei zu einer Sprache, die verbindet: mit
                Erinnerungen, mit neuen Begegnungen und mit dem Mut, die eigene
                Kreativität ernst zu nehmen. Ein persönliches Buch über das
                Weitergehen, ohne sich selbst zu verlieren.
              </p>
            </div>
          </div>

          <Image
            src="/images/anastasia-book-in-hands.jpg"
            alt="Anastasia hält ein Exemplar von „Anastasia im Wunderland“ in den Händen"
            width={2642}
            height={3522}
            sizes="(max-width: 767px) calc(100vw - 3rem), 32rem"
            className="mt-12 h-auto w-full md:mt-16 md:max-w-lg lg:mt-0 lg:justify-self-end"
          />
        </section>

        <WonderlandQuotes />

        <section className="mx-auto max-w-4xl px-6 py-14 md:px-8 md:py-24">
          <div className="border-y border-black/10 py-10 md:py-14">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Buchpräsentation
            </p>

            <h2 className="mt-5 text-[clamp(2.3rem,5vw,3.5rem)] tracking-tight">
              09.10.2026 · 16:30 Uhr
              <br />
              Stadtbibliothek Solingen
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-neutral-600">
              Persönliche Begegnung, Buchvorstellung und ein kleiner
              exklusiver Bonus für Vorbesteller, die ihr Exemplar vor Ort
              abholen.
            </p>
          </div>
        </section>

        <section id="vorbestellung" className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-24 lg:px-10">
          <div className="bg-black px-6 py-12 text-white sm:px-10 md:px-16 md:py-16">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Erste Auflage
            </p>

            <h2 className="mt-5 text-[clamp(2.3rem,5vw,3.8rem)] leading-tight tracking-tight">
              Vorbestellung: „Anastasia im Wunderland“
            </h2>

            <p className="mt-6 max-w-xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-white/70">
              Sichere dir dein Exemplar der ersten Auflage!
            </p>

            <BookPreorderForm />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 pt-6 pb-16 text-center md:px-8 md:pb-24">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Kunst bei Saienko
          </p>

          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.5rem)] tracking-tight">
            Danke, dass du diese Reise begleitest.
          </h2>

          <Link
            href="/kunst"
            className="mt-10 inline-flex border border-black px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
          >
            Zurück zu den Kunstprojekten
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
