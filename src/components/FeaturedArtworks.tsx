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
        {artworks.map((art) => (
          <Link
            key={art.id}
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

                <p className="text-sm">{art.price}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}