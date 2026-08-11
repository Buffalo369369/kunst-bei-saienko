import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkBuyButton from "@/components/ArtworkBuyButton";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";

const artworksWithoutFrame = new Set([
  "sonnentanz",
  "kontinentale-kontraste",
  "lichtspiel",
  "globale-harmonie",
  "herbstliches-licht",
  "tiefsee-echo",
]);

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: art, error } = await supabase
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !art) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6]">
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          {/* IMAGE */}
          <div className="overflow-hidden bg-neutral-200 lg:max-w-[34rem] lg:self-start">
            <div className="relative aspect-[4/5]">
              <Image
                src={art.image}
                alt={art.title}
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 34rem"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="mt-12 flex flex-col justify-center space-y-10 lg:mt-0 lg:space-y-7">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Original Artwork
              </p>

              <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight lg:text-[5rem]">
                {art.title}
              </h1>
            </div>

            <div className="space-y-3 text-[clamp(1rem,2vw,1.15rem)] text-neutral-600 lg:space-y-2 lg:text-base">
              <p className="lg:text-lg lg:font-medium lg:text-black">{art.price}</p>

              <p className="lg:text-sm">Status: {art.status}</p>

              {!artworksWithoutFrame.has(art.slug) && (
                <p className="lg:text-sm">Bild inklusive schwarzem Rahmen.</p>
              )}
            </div>

            {art.description && (
              <div className="space-y-5 lg:space-y-4 lg:border-t lg:border-black/10 lg:pt-7">
                <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                  Beschreibung
                </p>

                <div className="max-w-xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
                  {art.description}
                </div>
              </div>
            )}

            <ArtworkBuyButton art={art} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
