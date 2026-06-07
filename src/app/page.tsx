"use client";

import { motion } from "framer-motion";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { artworks } from "@/data/artworks";

export default function Home() {

  return (
    <main className="min-h-screen bg-[#f8f8f6] text-black">

      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-[1400px] px-5 py-6 md:px-6 md:py-16">

        <div className="grid min-h-[70vh] items-center gap-14 md:min-h-[85vh] md:gap-24 md:grid-cols-2">

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

             <h1 className="max-w-xl text-4xl leading-[0.92] tracking-[-0.04em] sm:text-6xl md:text-8xl">
                Einzigartige
                <br />
                Kunst.
                <br />
                Handgemacht.
                <br />
                Für dich.
              </h1>

              <p className="max-w-md text-base leading-8 text-neutral-500 md:text-lg">
                Originale Kunstwerke und handbemalter Merch —
                jedes Stück ein Unikat von Anastasiia Saienko.
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

             <Link
  href="/kunst"
  className="bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
>
  Kunst entdecken
</Link>

              <a
  href="#about"
  className="border border-black px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
>
  Über die Künstlerin
</a>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div

  initial={{ opacity: 0, scale: 0.96 }}

  animate={{ opacity: 1, scale: 1 }}

  transition={{ duration: 1.2 }}

  className="relative"

>

            <div className="group aspect-[4/5] overflow-hidden bg-neutral-200 md:aspect-square">

              <img
                src="/images/art-1.jpg"
                alt="Artwork"
                className="h-full w-full object-cover transition duration-[2000ms] group-hover:scale-105"
              />

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURED WORKS */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24">

        <div className="mb-12 flex items-center justify-between">

          <h2 className="text-2xl tracking-tight">
            Ausgewählte Kunstwerke
          </h2>

          <Link
  href="/kunst/cafes"
  className="text-sm uppercase tracking-[0.2em] transition hover:opacity-50"
>
  Alle ansehen
</Link>

</div>

<div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-6">

  {artworks.slice(0, 4).map((art) => (

    <Link
      key={art.slug}
      href={`/kunst/${art.slug}`}
      className="group"
    >

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.4 }}
        className="cursor-pointer space-y-3"
      >

        <div className="relative aspect-square overflow-hidden bg-neutral-200">

          <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
            {art.status}
          </div>

          <img
            src={art.image}
            alt={art.title}
            className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
          />

        </div>

        <div className="space-y-2">

          <h3 className="text-lg">{art.title}</h3>

          <p className="text-sm text-neutral-500">
            {art.medium}
          </p>

          <p className="text-sm">
            {art.price}
          </p>

        </div>

      </motion.div>

    </Link>

  ))}

</div>

      </section>

            {/* ABOUT */}
      <section

  id="about"

  className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-24 md:grid-cols-2"

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

          <h2 className="text-4xl md:text-5xl leading-tight tracking-tight">
            Kunst als Erinnerung,
            Emotion und Ruhe.
          </h2>

          <p className="max-w-xl text-lg leading-8 text-neutral-600">
            Meine Kunst sollte nicht zwischen vier Wänden eingesperrt sein. Die Idee für dieses Projekt entstand aus dem Wunsch, Gemälde in den Rhythmus des städtischen Lebens zu integrieren – dorthin, wo Menschen Kaffee trinken, sich austauschen und das Leben genießen. Jedes Café, in dem meine Arbeiten ausgestellt sind, erzählt eine eigene Geschichte und präsentiert eine exklusive Serie. Sie können meiner Kunst zufällig beim Frühstück begegnen und sie in diesem Moment zu einem Teil Ihres Zuhauses machen.
          </p>

          <button className="w-fit border border-black px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white">
            Mehr erfahren
          </button>

        </div>

      </section>

      {/* CAFE PROJECT */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24">

        <div className="grid overflow-hidden border border-black/5 md:grid-cols-2">

          <div className="aspect-square overflow-hidden bg-neutral-200">
            <img
              src="/images/project-1.jpg"
              alt="Cafe"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center space-y-8 p-12 md:p-20">

            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Café Project
            </p>

            <h2 className="text-4xl md:text-5xl leading-tight tracking-tight">
              Cafés
              <br />
              Solingen
            </h2>

            <p className="max-w-lg text-lg leading-8 text-neutral-600">
              Entdecke Originalwerke direkt im Café.
              Scanne den QR-Code neben den Kunstwerken
              und erfahre mehr über jedes Unikat.
            </p>

            <Link
  href="/kunst/cafes"
  className="w-fit bg-black px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
>
  Projekt ansehen
</Link>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}