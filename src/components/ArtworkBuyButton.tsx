"use client";

import { useState } from "react";
import ReservationModal from "./ReservationModal";

type Artwork = {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: string;
  status: string;
  exhibition: string;
  description: string;
  reserved_until: string | null;
};

export default function ArtworkBuyButton({
  art,
}: {
  art: Artwork;
}) {
  const [showModal, setShowModal] = useState(false);

  const isReserved = art.status === "Reserviert";

  return (
    <>
      <button
        disabled={isReserved}
        onClick={() => !isReserved && setShowModal(true)}
        className={`mt-10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition ${
          isReserved
            ? "cursor-not-allowed bg-neutral-400"
            : "bg-black hover:bg-neutral-800"
        }`}
      >
        {isReserved ? "Reserviert" : "Kaufen"}
      </button>

      {showModal && (
        <ReservationModal
          art={art}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}