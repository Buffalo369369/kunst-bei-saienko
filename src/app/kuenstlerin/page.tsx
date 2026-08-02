import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function KuenstlerinPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] text-black">

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            <div className="overflow-hidden bg-neutral-200">
              <img
                src="/images/artist.jpg"
                alt="Anastasiia Saienko"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6">

              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Über die Künstlerin
              </p>

              <h1 className="text-[clamp(3rem,6vw,5rem)] leading-[0.9] tracking-tight">
                Willkommen
                <br />
                in meiner Welt
              </h1>

              <p className="max-w-xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
                Kunst ist für mich mehr als nur Farbe auf Leinwand – sie ist
                meine Sprache, mein Zuhause und meine Art, die Welt zu
                verstehen. Jedes Bild erzählt eine Geschichte von Emotionen,
                Momenten und Begegnungen.
              </p>

            </div>

          </div>
        </section>

        {/* VIDEO */}
        <section className="mx-auto max-w-5xl px-6 pt-6 pb-16 md:px-8">

          <div className="mb-8 text-center">

            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Atelier
            </p>

            <h2 className="text-[clamp(2.3rem,5vw,3.5rem)] tracking-tight">
              Ein Blick hinter die Kulissen
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
              In einem besonderen künstlerischen Video-Porträt, das gemeinsam
              mit der Journalistin Natalka Klykova-Volianiuk entstanden ist,
              teile ich meine ganz persönliche Perspektive auf meinen kreativen
              Weg und das, was mich inspiriert.
            </p>

          </div>

          <div className="overflow-hidden shadow-xl">
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
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-20">

          <div className="mx-auto max-w-4xl">

            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Kunst BEI Saienko
            </p>

            <h2 className="mb-6 text-[clamp(2.3rem,5vw,3.5rem)] leading-tight tracking-tight">
              Warum „BEI" und nicht „VON"?
            </h2>

            <div className="space-y-5 text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">

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
                Deshalb heißt es nicht{" "}
                <strong>„Kunst von Saienko"</strong>, sondern{" "}
                <strong>„Kunst bei Saienko"</strong>. Denn hier darf jeder
                eintreten, verweilen und seinen eigenen Moment mit der Kunst
                erleben.
              </p>

            </div>

          </div>

        </section>

        {/* IMAGE */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-16 lg:px-10">

          <div className="overflow-hidden bg-neutral-200">
            <img
              src="/images/art-1.jpg"
              alt="Artwork"
              className="aspect-[16/9] h-full w-full object-cover"
            />
          </div>

        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 pt-6 pb-20 text-center md:px-8">

          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Vielen Dank für Ihren Besuch
          </p>

          <h2 className="mt-5 text-[clamp(2.3rem,5vw,3.5rem)] tracking-tight">
            Entdecken Sie meine Kunstwerke
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
            Jedes Werk erzählt seine eigene Geschichte. Vielleicht wartet eines
            davon bereits auf Sie.
          </p>

          <Link
            href="/kunst"
            className="mt-10 inline-flex bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
          >
            Kunst entdecken
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}