"use client";

import { useState } from "react";
import ReservationModal from "./ReservationModal";

type ReservationItem = {
  id: number;
  slug: string;
  title: string;
  image: string;
  price: string;
  status: string;
  exhibition: string;
  description: string;
  reserved_until: string | null;
  productType?: "artwork" | "shop";
};

export default function ArtworkBuyButton({
  art,
}: {
  art: ReservationItem;
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentTime] = useState(() => Date.now());

  const reservedUntil = art.reserved_until
    ? Date.parse(art.reserved_until)
    : Number.NaN;
  const isReserved =
    art.status === "Reserviert" &&
    (Number.isNaN(reservedUntil) || reservedUntil > currentTime);
  const isSold = art.status === "Verkauft";
  const isUnavailable = isReserved || isSold;

  return (
    <>
      <button
        disabled={isUnavailable}
        onClick={() => !isUnavailable && setShowModal(true)}
        className={`mt-10 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition ${
          isUnavailable
            ? "cursor-not-allowed bg-neutral-400"
            : "bg-black hover:bg-neutral-800"
        }`}
      >
        {isSold ? "Verkauft" : isReserved ? "Reserviert" : "Reservieren"}
      </button>

      {showModal && !isSold && (
        <ReservationModal
          art={art}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
