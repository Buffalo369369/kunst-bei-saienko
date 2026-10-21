import Footer from "@/components/Footer";
import ExpandableText from "@/components/ExpandableText";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

const artworkOrder = Array.from(
  { length: 31 },
  (_, index) => `die-andere-hand-der-liebe-werk-${String(index + 1).padStart(2, "0")}`
);

const artworkPositions = new Map(
  artworkOrder.map((slug, index) => [slug, index])
);

const exhibitionText = `Der Titel „Die andere Hand der Liebe“ beleuchtet die toxische Dualität von familiärer Zuneigung und psychischer Verletzung, die oft hinter verschlossenen Türen stattfindet. Anastasiia Saienko visualisiert die subtilen, aber zerstörerischen Mechanismen emotionalen Missbrauchs und die tiefen Narben, die er in der Seele hinterlässt.

In den kraftvollen abstrakten Gemälden der Ausstellung werden die inneren Konflikte, die Sprachlosigkeit und der Prozess der Heilung oder des Zusammenbruchs dargestellt. Die komplexen Schichtungen und die intensive Farbpalette dienen als Metapher für die überlappenden Realitäten von Liebe, Pflichtgefühl und psychischem Druck.

Ziel der Ausstellung ist es, den unsichtbaren Schmerz sichtbar zu machen und eine Öffnung für das Gespräch über dieses Tabuthema zu schaffen.`;

export default async function DieAndereHandDerLiebePage() {
  const { data: artworks, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("exhibition", "die-andere-hand-der-liebe")
    .eq("product_type", "artwork");

  if (error) {
    console.error(error);
  }

  const orderedArtworks = [...(artworks ?? [])].sort(
    (firstArtwork, secondArtwork) =>
      (artworkPositions.get(firstArtwork.slug) ?? Number.POSITIVE_INFINITY) -
      (artworkPositions.get(secondArtwork.slug) ?? Number.POSITIVE_INFINITY)
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

            <h1 className="text-5xl tracking-tight">
              Die andere Hand der Liebe
            </h1>

            <p className="mt-3 text-neutral-500">Essen</p>

            <div className="mt-12 text-lg leading-9 text-neutral-600">
              <section>
                <h2 className="mb-5 text-3xl tracking-tight text-black">
                  Über die Ausstellung
                </h2>

                <ExpandableText
                  text={exhibitionText}
                  expandedContent={
                    <div className="space-y-6">
                      <p>
                        Der Titel „Die andere Hand der Liebe“ beleuchtet die
                        toxische Dualität von familiärer Zuneigung und
                        psychischer Verletzung, die oft hinter verschlossenen
                        Türen stattfindet. Anastasiia Saienko visualisiert die
                        subtilen, aber zerstörerischen Mechanismen emotionalen
                        Missbrauchs und die tiefen Narben, die er in der Seele
                        hinterlässt.
                      </p>

                      <p>
                        In den kraftvollen abstrakten Gemälden der Ausstellung
                        werden die inneren Konflikte, die Sprachlosigkeit und
                        der Prozess der Heilung oder des Zusammenbruchs
                        dargestellt. Die komplexen Schichtungen und die
                        intensive Farbpalette dienen als Metapher für die
                        überlappenden Realitäten von Liebe, Pflichtgefühl und
                        psychischem Druck.
                      </p>

                      <p>
                        Ziel der Ausstellung ist es, den unsichtbaren Schmerz
                        sichtbar zu machen und eine Öffnung für das Gespräch
                        über dieses Tabuthema zu schaffen.
                      </p>

                      <blockquote className="border-l border-black/10 pl-6">
                        <p>
                          „Diese Arbeit ist ein Versuch, das Unaussprechliche
                          zu malen. Die andere Hand der Liebe kann manchmal die
                          sein, die uns fesselt, statt uns zu halten. Mein
                          Wunsch ist es, Betroffenen eine visuelle Stimme zu
                          geben.“
                        </p>

                        <footer className="mt-4 text-sm uppercase tracking-[0.2em] text-neutral-500">
                          — Anastasiia Saienko
                        </footer>
                      </blockquote>
                    </div>
                  }
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
        </div>
      </main>

      <Footer />
    </>
  );
}
