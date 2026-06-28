import Link from "next/link";
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

          <h1 className="mb-20 text-5xl md:text-7xl tracking-tight">
            Ausstellungen
          </h1>

          <div className="space-y-20">

            <Link
              href="/kunst/cafes/freiraum"
              className="group block"
            >
              <div className="aspect-[16/9] overflow-hidden bg-neutral-200">

                <img
                  src="/images/project-10.jpg"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
                />

              </div>

              <div className="mt-6">

                <h2 className="text-3xl md:text-4xl">
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
              <div className="aspect-[16/9] overflow-hidden bg-neutral-200">

                <img
                  src="/images/project-20.jpg"
                  className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
                />

              </div>

              <div className="mt-6">

                <h2 className="text-3xl md:text-4xl">
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
  <div className="aspect-[16/9] overflow-hidden bg-neutral-200">

    <img
      src="/images/project-30.jpg"
      className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
    />

  </div>

  <div className="mt-6">

    <h2 className="text-3xl md:text-4xl">
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