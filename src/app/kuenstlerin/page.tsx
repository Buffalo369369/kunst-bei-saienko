import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KuenstlerinPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] text-black">
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="overflow-hidden bg-neutral-200">
              <img
                src="/images/artist.jpg"
                alt="Anastasiia Saienko"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>

            <div className="space-y-8">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Über die Künstlerin
              </p>

              <h1 className="text-5xl leading-[0.92] tracking-tight sm:text-6xl xl:text-7xl">
                Anastasiia
                <br />
                Saienko
              </h1>

              <p className="max-w-xl text-lg leading-8 text-neutral-600">
                Kunst bedeutet für mich nicht nur Farben auf einer Leinwand.
                Sie ist eine Sprache, mit der Gefühle sichtbar werden und
                Geschichten erzählt werden können.
              </p>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Meine Geschichte
              </p>

              <h2 className="mb-8 text-4xl leading-tight tracking-tight md:text-5xl">
                Wie alles begann
              </h2>

              <div className="space-y-6 text-lg leading-8 text-neutral-600">
                <p>
                  Hier kannst du später deine persönliche Geschichte erzählen.
                  Wie du zur Kunst gekommen bist, was dich geprägt hat und
                  warum Kreativität ein wichtiger Teil deines Lebens geworden
                  ist.
                </p>

                <p>
                  Besucher interessieren sich nicht nur für ein Kunstwerk,
                  sondern auch für die Person dahinter. Genau deshalb darf diese
                  Seite persönlicher sein als alle anderen Bereiche deiner
                  Website.
                </p>

                <p>
                  Du kannst hier beliebig viel Text ergänzen. Das Layout wächst
                  automatisch mit.
                </p>
              </div>
            </div>

            <div className="overflow-hidden bg-neutral-200">
              <img
                src="/images/project-666.jpg"
                alt="Studio"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* VIDEO */}
        <section className="mx-auto max-w-5xl px-6 py-10 md:px-8">
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Atelier
            </p>

            <h2 className="text-4xl tracking-tight md:text-5xl">
              Ein Blick hinter die Kulissen
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              
            </p>
          </div>

          <div className="overflow-hidden bg-black shadow-xl">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/4ZYyir3dCHA?si=XfIQA5z7bqYGcUr0"
                title="YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
                {/* WHY BEI */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Kunst BEI Saienko
            </p>

            <h2 className="mb-10 text-4xl leading-tight tracking-tight md:text-5xl">
              Warum „BEI" und nicht „VON"?
            </h2>

            <div className="space-y-7 text-lg leading-8 text-neutral-600">
              <p>
                Weil Kunst für mich wie eine Einladung nach Hause ist. Ich
                möchte Menschen nicht nur als Betrachter begrüßen, sondern als
                Gäste in meinem kreativen Universum.
              </p>

              <p>
                Ein Bild entsteht nicht nur aus Farbe und Leinwand. Es entsteht
                aus Erinnerungen, Begegnungen, Gedanken und Emotionen. Genau
                diese Reise möchte ich mit jedem Menschen teilen, der meine
                Arbeiten entdeckt.
              </p>

              <p>
                Deshalb heißt es nicht <strong>„Kunst von Saienko"</strong>,
                sondern <strong>„Kunst bei Saienko"</strong>. Denn hier darf
                jeder eintreten, verweilen und seinen eigenen Moment mit der
                Kunst erleben.
              </p>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
  <div className="border-y border-black/10 py-20">
    <p className="text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight">
      „Jedes Kunstwerk beginnt
      <br />
      mit einem Gefühl.“
    </p>

    <p className="mt-8 uppercase tracking-[0.3em] text-sm text-neutral-500">
      — Anastasiia Saienko
    </p>
  </div>
</section>

        {/* LARGE IMAGE */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 lg:px-10">
          <div className="overflow-hidden bg-neutral-200">
            <img
              src="/images/art-1.jpg"
              alt="Artwork"
              className="aspect-[16/9] h-full w-full object-cover"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 pb-28 text-center md:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Vielen Dank für Ihren Besuch
          </p>

          <h2 className="mt-6 text-4xl tracking-tight md:text-5xl">
            Entdecken Sie meine Kunstwerke
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Jedes Werk erzählt seine eigene Geschichte. Vielleicht wartet eines
            davon bereits auf Sie.
          </p>

          <Link
            href="/kunst"
            className="mt-12 inline-flex bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
          >
            Kunst entdecken
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}