import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkBuyButton from "@/components/ArtworkBuyButton";
import { supabase } from "@/lib/supabase";

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
    return <div>Artwork not found</div>;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6]">
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-24">
          {/* IMAGE */}
          <div className="overflow-hidden bg-neutral-200">
            <div className="aspect-[4/5]">
              <img
                src={art.image}
                alt={art.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* INFO */}
          <div className="mt-12 flex flex-col justify-center space-y-10 lg:mt-0">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Original Artwork
              </p>

              <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight">
                {art.title}
              </h1>
            </div>

            <div className="space-y-3 text-[clamp(1rem,2vw,1.15rem)] text-neutral-600">
              <p>{art.price}</p>

              <p>Status: {art.status}</p>

              <p>Bild inklusive schwarzem Rahmen.</p>
            </div>

            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Beschreibung
              </p>

              <div className="max-w-xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
                {art.description}
              </div>
            </div>

            <ArtworkBuyButton art={art} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}