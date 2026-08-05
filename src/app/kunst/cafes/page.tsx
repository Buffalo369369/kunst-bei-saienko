import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CafesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">

        <div className="mx-auto max-w-[1400px]">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Cafés
          </p>

          <h1 className="mb-20 text-5xl tracking-tight md:text-7xl lg:mb-12 lg:text-[4.75rem]">
            Ausstellungen
          </h1>

          <div className="space-y-20 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-14 lg:space-y-0">

            <Link
              href="/kunst/cafes/freiraum"
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200">

                <Image
                  src="/images/project-10.jpg"
                  alt="Wunderlich Rösterei in Solingen"
                  fill
                  sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 40rem"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
                />

              </div>

              <div className="mt-6 lg:mt-5">

                <h2 className="text-3xl md:text-4xl lg:text-[2.25rem]">
                  Wunderlich Rösterei
                </h2>

                <p className="text-neutral-500">
                  Solingen
                </p>

              </div>

            </Link>

            <Link
              href="/kunst/cafes/morgenlicht"
              className="group block"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200">

                <Image
                  src="/images/project-20.jpg"
                  alt="Karabusta Solingen"
                  fill
                  sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 40rem"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
                />

              </div>

              <div className="mt-6 lg:mt-5">

                <h2 className="text-3xl md:text-4xl lg:text-[2.25rem]">
                  Karabusta Solingen
                </h2>

                <p className="text-neutral-500">
                  Solingen
                </p>

              </div>

            </Link>

            <Link
  href="/kunst/cafes/atelier"
  className="group block"
>
  <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200">

    <Image
      src="/images/project-30.jpg"
      alt="Kunstwerke mit Lieferoption"
      fill
      sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 40rem"
      className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
    />

  </div>

  <div className="mt-6 lg:mt-5">

    <h2 className="text-3xl md:text-4xl lg:text-[2.25rem]">
      Kunstwerke
    </h2>

    <p className="text-neutral-500">
      mit Lieferoption
    </p>

  </div>

</Link>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
