import Footer from "@/components/Footer";
import ExpandableText from "@/components/ExpandableText";
import Navbar from "@/components/Navbar";
import PressSection, { PressArticle } from "@/components/PressSection";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const artworkOrder = [
  "verschmelzung-von-formen",
  "einfach-und-komplex",
  "standards-unterschiede",
  "sonnentanz",
  "kontinentale-kontraste",
  "lichtspiel",
  "globale-harmonie",
  "herbstliches-licht",
  "tiefsee-echo",
];

const pressFarbenDerWelt: PressArticle[] = [
  {
    title: 'Farben der Welt – Ausstellung in Solingen',
    image: "/images/statya1.jpg",
    description: 'Ein Bericht über die Ausstellung "Farben der Welt" und die künstlerische Auseinandersetzung mit globalen Farbräumen und kulturellen Perspektiven.',
  },
  {
    title: 'Interview: Abstrakte Kunst und kulturelle Grenzen',
    image: "/images/statya2.jpg",
    description: 'Tiefgehendes Gespräch über die Motivation hinter der Serie "Farben der Welt" und die Bedeutung von Farbe als universelle Sprache.',
  },
  {
    title: 'Kunstkritik: Harmonische Kontraste',
    image: "/images/statya33.jpg",
    description: 'Eine kunstkritische Betrachtung der abstrakten Werke und ihrer emotionalen Wirkung auf den Betrachter.',
  },
];

export default async function FarbenDerWeltPage() {
  const { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("exhibition", "farben-der-welt");

  if (error) {
    console.error(error);
  }

  const orderedArtworks = [...(artworks ?? [])].sort(
    (firstArtwork, secondArtwork) =>
      artworkOrder.indexOf(firstArtwork.slug) -
      artworkOrder.indexOf(secondArtwork.slug)
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <section className="mb-20 max-w-4xl">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
              Projekt
            </p>

            <h1 className="text-5xl tracking-tight">Farben der Welt</h1>

            <p className="mt-3 text-neutral-500">Solingen</p>

            <div className="mt-12 text-lg leading-9 text-neutral-600">
              <section>
                <h2 className="mb-5 text-3xl tracking-tight text-black">
                  Über die Ausstellung
                </h2>

                <ExpandableText
                  text={`Die Serie „Farben der Welt" ist eine Hommage an die Vielfalt und die energetische Verbindung unserer Erde. In einer Zeit, in der die Welt oft komplex und fragmentiert wirkt, suchen diese abstrakten Arbeiten nach einer gemeinsamen Sprache durch Farbe und Form.

Die kräftigen Blau-, Gelb- und Grüntöne fließen ineinander über, überschreiten ihre Grenzen und bilden neue, harmonische Ebenen. Die Bilder verzichten auf starre Konturen und laden stattdessen dazu ein, die Welt als ein leuchtendes Ganzes wahrzunehmen – ohne Grenzen, aber voller Leben.`}
                />
              </section>

            </div>
          </section>

          <h2 className="mb-20 text-5xl tracking-tight md:text-7xl">
            Kunstwerke
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {orderedArtworks.map((art) => (
              <Link
                key={art.slug}
                href={`/kunst/${art.slug}`}
                className="group space-y-3"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-200">
                  <div className="absolute left-4 top-4 z-10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                    {art.status}
                  </div>

                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 767px) 50vw, 25vw"
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg">{art.title}</h3>

                  <p>{art.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="my-16 border-t border-black/10 md:my-24 lg:my-32" />

          <PressSection
            eyebrow="Ausstellung & Begegnungen"
            heading="„Farben der Welt“ – Kunst im Dialog"
            description='Im Weltladen Solingen-Ohligs wurde „Farben der Welt“ nicht nur ausgestellt, sondern lebendig erlebt. Die Werke wurden Teil eines besonderen Ortes voller Begegnungen, Farben und Geschichten.

Bei einem persönlichen Spezial-Event erzählte ich mehr über die Inspiration und die Geschichten hinter den einzelnen Werken. Neben den Originalgemälden waren auch handbemalte Unikat-Taschen und kleine Kunstobjekte Teil des Projekts.

Ein Moment, in dem Kunst Menschen zusammengebracht hat.'
            collageImages={{
              left: "/images/got-1.jpg",
              center: "/images/got-2.jpg",
              right: "/images/got-3.jpg",
            }}
            articles={pressFarbenDerWelt}
            expandable={false}
            withBackground={false}
          />

          <section className="mt-20 max-w-4xl text-lg leading-9 text-neutral-600">
            <h2 className="mb-5 text-3xl tracking-tight text-black">
              Stil und Technik
            </h2>

            <div className="space-y-6">
              <p>
                Die Werke zeichnen sich durch einen expressiven Farbauftrag und
                eine spürbare Dynamik aus. Durch die Schichtung und das bewusste
                Verwischen der Konturen entstehen „innere Landschaften&quot;, die dem
                Betrachter Raum für eigene Interpretationen lassen.
              </p>

              <p>
                Die Farben stehen symbolisch für die Elemente unserer Natur: das
                tiefe Blau der Ozeane, das leuchtende Gelb der Sonne und das
                lebendige Grün der Erde.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
