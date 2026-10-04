import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtworkBuyButton from "@/components/ArtworkBuyButton";
import Image from "next/image";
import { notFound } from "next/navigation";

const bagProducts = [
  {
    slug: "handbemalte-tasche-1",
    title: "Handbemalte Tasche 01",
    price: "50 €",
    image: "/images/bag-10.jpg",
    description:
      "Handbemalte Baumwolltasche mit lebendigen Farben und einer einzigartigen, künstlerischen Oberfläche. Jedes Stück ist ein One-of-one-Kunstobjekt aus der Shop-Kollektion.",
  },
  {
    slug: "handbemalte-tasche-2",
    title: "Handbemalte Tasche 02",
    price: "50 €",
    image: "/images/bag-20.jpg",
    description:
      "Handbemalte Baumwolltasche mit lebendigen Farben und einer einzigartigen, künstlerischen Oberfläche. Jedes Stück ist ein One-of-one-Kunstobjekt aus der Shop-Kollektion.",
  },
  {
    slug: "handbemalte-tasche-3",
    title: "Handbemalte Tasche 03",
    price: "50 €",
    image: "/images/bag-30.jpg",
    description:
      "Handbemalte Baumwolltasche mit lebendigen Farben und einer einzigartigen, künstlerischen Oberfläche. Jedes Stück ist ein One-of-one-Kunstobjekt aus der Shop-Kollektion.",
  },
  {
    slug: "handbemalte-tasche-4",
    title: "Handbemalte Tasche 04",
    price: "50 €",
    image: "/images/bag-40.jpg",
    description:
      "Handbemalte Baumwolltasche mit lebendigen Farben und einer einzigartigen, künstlerischen Oberfläche. Jedes Stück ist ein One-of-one-Kunstobjekt aus der Shop-Kollektion.",
  },
  {
    slug: "handbemalte-tasche-5",
    title: "Handbemalte Tasche 05",
    price: "50 €",
    image: "/images/bag-50.jpg",
    description:
      "Handbemalte Baumwolltasche mit lebendigen Farben und einer einzigartigen, künstlerischen Oberfläche. Jedes Stück ist ein One-of-one-Kunstobjekt aus der Shop-Kollektion.",
  },
] as const;

export async function generateStaticParams() {
  return bagProducts.map((product) => ({ slug: product.slug }));
}

export default async function ShopBagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = bagProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const art = {
    id: product.slug.length,
    slug: product.slug,
    title: product.title,
    image: product.image,
    price: product.price,
    status: "Verfügbar",
    exhibition: "Shop",
    description: product.description,
    reserved_until: null,
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6]">
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-16">
          <div className="overflow-hidden bg-neutral-200 lg:max-w-[34rem] lg:self-start">
            <div className="relative aspect-[4/5]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 34rem"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-center space-y-10 lg:mt-0 lg:space-y-7">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
                Handbemalte Baumwolltasche
              </p>

              <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight lg:text-[5rem]">
                {product.title}
              </h1>
            </div>

            <div className="space-y-3 text-[clamp(1rem,2vw,1.15rem)] text-neutral-600 lg:space-y-2 lg:text-base">
              <p className="lg:text-lg lg:font-medium lg:text-black">{product.price}</p>
              <p className="lg:text-sm">One-of-one artwork</p>
              <p className="lg:text-sm">Maße: ca. 35 × 30 cm</p>
              <p className="lg:text-sm">Material: 100 % Baumwolle</p>
            </div>

            <div className="space-y-5 lg:space-y-4 lg:border-t lg:border-black/10 lg:pt-7">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Beschreibung
              </p>

              <div className="max-w-xl whitespace-pre-line text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
                {product.description}
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
