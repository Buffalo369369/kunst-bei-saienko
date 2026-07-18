"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedArtworks from "@/components/FeaturedArtworks";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-black">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14 md:px-8 lg:px-10 lg:py-20">
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-24
            min-h-[70vh]
            lg:min-h-[85vh]
          "
        >
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
                Original Art & Unique Pieces
              </p>

              <h1
                className="
                  max-w-xl
                  text-[clamp(3rem,8vw,6.5rem)]
                  leading-[0.92]
                  tracking-[-0.04em]
                "
              >
                Einzigartige
                <br />
                Kunst.
                <br />
                Handgemacht.
                <br />
                Für dich.
              </h1>

              <p
                className="
                  max-w-md
                  text-[clamp(1rem,2vw,1.15rem)]
                  leading-8
                  text-neutral-500
                "
              >
                Originale Kunstwerke und handbemalter Merch — jedes Stück ein
                Unikat von Anastasiia Saienko.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/kunst"
                className="bg-black px-6 sm:px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
              >
                Kunst entdecken
              </Link>

              <a
                href="#about"
                className="border border-black px-6 sm:px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
              >
                Über die Künstlerin
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="group aspect-[4/5] overflow-hidden bg-neutral-200 lg:aspect-square">
              <img
                src="/images/art-1.jpg"
                alt="Artwork"
                className="h-full w-full object-cover transition duration-[2000ms] group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED */}
      <FeaturedArtworks />

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-32"
      >
        <div className="aspect-[4/5] overflow-hidden bg-neutral-200">
          <img
            src="/images/artist.jpg"
            alt="Artist"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Über die Künstlerin
          </p>

          <h2
            className="
              text-[clamp(2.2rem,5vw,3.5rem)]
              leading-tight
              tracking-tight
            "
          >
            Kunst BEI Saienko – Warum „bei“ und nicht „von“?
          </h2>

          <p
            className="
              max-w-xl
              text-[clamp(1rem,2vw,1.15rem)]
              leading-8
              text-neutral-600
            "
          >
            Weil Kunst für mich wie eine Einladung nach Hause ist. Ich möchte
            Sie nicht nur als Betrachter, sondern als Gast in meinem kreativen
            Universum begrüßen. Treten Sie ein, nehmen Sie Platz und genießen
            Sie den Moment.
          </p>

          <button className="w-fit border border-black px-6 sm:px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white">
            Mehr erfahren
          </button>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8 lg:px-10 lg:pb-32">
        <div className="grid overflow-hidden border border-black/5 lg:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-neutral-200">
            <img
              src="/images/project-666.jpg"
              alt="Cafe"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-8 p-8 md:p-12 lg:p-20">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Projekte
            </p>

            <h2
              className="
                text-[clamp(2.2rem,5vw,3.5rem)]
                leading-tight
                tracking-tight
              "
            >
              Bilder, Bücher und vieles mehr..
            </h2>

            <p
              className="
                max-w-lg
                text-[clamp(1rem,2vw,1.15rem)]
                leading-8
                text-neutral-600
              "
            >
              Meine Kreativität lässt sich nicht in eine einzige Schublade
              stecken. Ob ausdrucksstarke Malerei, Buchprojekte oder Kunst im
              Raum – hier teile ich meine neuesten Arbeiten und
              Herzensprojekte mit Ihnen. Werfen Sie einen Blick hinter die
              Kulissen!
            </p>

            <Link
              href="/kunst"
              className="w-fit bg-black px-6 sm:px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Projekte ansehen
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}