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

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
        <div className="mx-auto grid max-w-[1400px] gap-20 md:grid-cols-2">

          {/* IMAGE */}
          <div className="aspect-square overflow-hidden bg-neutral-200">
            <img
              src={art.image}
              alt={art.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-center space-y-8">

            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Original Artwork
              </p>

              <h1 className="text-5xl tracking-tight md:text-7xl">
                {art.title}
              </h1>
            </div>

           <div className="space-y-3 text-lg text-neutral-600">

  <p>{art.price}</p>

  <p>Status: {art.status}</p>

  <p>Bild inklusive schwarzem Rahmen.</p>

</div>

            <div className="space-y-5">

  <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
    Beschreibung
  </p>

  <div className="max-w-xl whitespace-pre-line text-lg leading-8 text-neutral-600">
    {art.description}
  </div>

</div>

            <ArtworkBuyButton art={art} />

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}