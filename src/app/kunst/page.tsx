import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export default function KunstPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6]">
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10 lg:py-24">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Projects
          </p>

          <h1 className="mb-16 text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight lg:mb-12 lg:text-[4.75rem]">
            Kunstprojekte
          </h1>

          <div className="space-y-20 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-14 lg:space-y-0">
            {projects.map((project, index) =>
              project.available ? (
                <Link
                  key={project.slug}
                  href={`/kunst/${project.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-sm bg-neutral-200">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        preload={index === 0}
                        sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 40rem"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 lg:mt-5">
                    <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight lg:text-[2.25rem]">
                      {project.name}
                    </h2>

                    <p className="text-[clamp(1rem,2vw,1.15rem)] text-neutral-500">
                      {project.city}
                    </p>
                  </div>
                </Link>
              ) : (
                <div key={project.slug}>
                  <div className="relative overflow-hidden rounded-sm bg-neutral-200">
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 1023px) 100vw, (max-width: 1279px) 45vw, 40rem"
                        className="h-full w-full object-cover blur-[3px] opacity-50"
                      />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border border-white/50 bg-white/80 px-6 py-3 backdrop-blur-md">
                        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2 opacity-50 lg:mt-5">
                    <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight lg:text-[2.25rem]">
                      {project.name}
                    </h2>

                    <p className="text-[clamp(1rem,2vw,1.15rem)] text-neutral-500">
                      {project.city}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
