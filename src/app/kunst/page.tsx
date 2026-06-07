import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

export default function KunstPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">

        <div className="mx-auto max-w-[1400px]">

          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-500">
            Projects
          </p>

          <h1 className="mb-20 text-5xl tracking-tight md:text-7xl">
            Kunstprojekte
          </h1>

          <div className="space-y-20">

            {projects.map((project) => (

  project.available ? (

    <Link
      key={project.slug}
      href={`/kunst/${project.slug}`}
      className="group block"
    >

      <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-[1500ms] group-hover:scale-105"
        />
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="text-3xl tracking-tight md:text-4xl">
          {project.name}
        </h2>

        <p className="text-lg text-neutral-500">
          {project.city}
        </p>
      </div>

    </Link>

  ) : (

    <div key={project.slug} className="relative">

      <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
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

      <div className="mt-6 space-y-2 opacity-50">

        <h2 className="text-3xl tracking-tight md:text-4xl">
          {project.name}
        </h2>

        <p className="text-lg text-neutral-500">
          {project.city}
        </p>

      </div>

    </div>

  )

))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}