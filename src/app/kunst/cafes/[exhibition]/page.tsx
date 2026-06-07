import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artworks } from "@/data/artworks";

export default async function ExhibitionPage({
  params,
}: {
  params: Promise<{ exhibition: string }>;
}) {

  const { exhibition } = await params;

  const exhibitionArtworks = artworks.filter(
    (art) => art.exhibition === exhibition
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">

        <div className="mx-auto max-w-[1400px]">

          <h1 className="mb-20 text-5xl md:text-7xl tracking-tight">
            Kunstwerke
          </h1>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">

            {exhibitionArtworks.map((art) => (

              <Link
                key={art.slug}
                href={`/kunst/${art.slug}`}
                className="group space-y-3"
              >

                <div className="relative aspect-square overflow-hidden bg-neutral-200">

                  <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">

                    {art.status}

                  </div>

                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                  />

                </div>

                <div className="space-y-2">

                  <h2 className="text-lg">
                    {art.title}
                  </h2>

                  <p className="text-sm text-neutral-500">
                    {art.medium}
                  </p>

                  <p>
                    {art.price}
                  </p>

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