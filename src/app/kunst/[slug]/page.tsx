import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkBuyButton from "@/components/ArtworkBuyButton";
import { artworks } from "@/data/artworks";

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const art = artworks.find((art) => art.slug === slug);

  if (!art) {
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
            </div>

            <div className="max-w-lg text-lg leading-8 text-neutral-600">
              Dieses Werk ist Teil der Ausstellung und kann direkt über
              Kunst bei Saienko erworben werden.
            </div>

            <ArtworkBuyButton art={art} />

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}