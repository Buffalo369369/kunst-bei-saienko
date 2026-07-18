import Link from "next/link";
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

          <h1 className="mb-16 text-[clamp(3rem,8vw,6rem)] leading-none tracking-tight">
            Kunstprojekte
          </h1>

          <div className="space-y-20 lg:space-y-28">
            {projects.map((project) =>
              project.available ? (
                <Link
                  key={project.slug}
                  href={`/kunst/${project.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-sm bg-neutral-200">
                    <div className="aspect-[16/9]">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">
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
                    <div className="aspect-[16/9]">
                      <img
                        src={project.image}
                        alt={project.name}
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

                  <div className="mt-6 space-y-2 opacity-50">
                    <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">
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