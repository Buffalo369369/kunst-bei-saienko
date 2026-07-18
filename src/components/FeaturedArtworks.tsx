"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Artwork = {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: string;
  status: string;
};

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function loadArtworks() {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .order("id")
        .limit(4);

      if (error) {
        console.error(error);
        return;
      }

      setArtworks(data);
    }

    loadArtworks();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-8 lg:px-10 lg:py-32">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="text-[clamp(2rem,4vw,3rem)] tracking-tight">
          Ausgewählte Kunstwerke
        </h2>

        <Link
          href="/kunst/cafes"
          className="text-sm uppercase tracking-[0.2em] transition hover:opacity-50"
        >
          Alle ansehen
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {artworks.map((art) => (
          <Link
            key={art.id}
            href={`/kunst/${art.slug}`}
            className="group"
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                <div className="absolute left-4 top-4 z-10 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                  {art.status}
                </div>

                <img
                  src={art.image}
                  alt={art.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-[clamp(1.15rem,2vw,1.4rem)] leading-snug">
                  {art.title}
                </h3>

                <p className="text-neutral-600">
                  {art.price}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}