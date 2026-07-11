"use client";

import { useState } from "react";

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
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
  await fetch("/api/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  slug: art.slug,
  artwork: art.title,
  price: art.price,
  firstName,
  lastName,
  email,
  phone,
  message,
}),
  });

  setShowModal(false);

  alert(
    "Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Das Kunstwerk ist nun für 24 Stunden für Sie reserviert."
  );
}

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-3xl bg-[#f8f8f6] p-10 shadow-2xl">

            {step === 1 ? (
              <>
                <h2 className="mb-8 text-3xl tracking-tight">
                  Reservierung
                </h2>

                <p className="leading-8 text-neutral-600">
                  Nach Absenden der Anfrage wird das Kunstwerk
                  für 24 Stunden exklusiv für Sie reserviert.
                </p>

                <p className="mt-6 leading-8 text-neutral-600">
                  Innerhalb dieser Zeit werden wir Sie kontaktieren,
                  um die Details des Kaufs zu besprechen.
                </p>

                <div className="mt-12 flex flex-col gap-4 sm:flex-row">

                  <button
                    onClick={() => setShowModal(false)}
                    className="border border-black px-6 py-3 text-sm uppercase tracking-[0.2em]"
                  >
                    Abbrechen
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="bg-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white"
                  >
                    Weiter
                  </button>

                </div>
              </>
            ) : (
              <>
                <h2 className="mb-10 text-3xl tracking-tight">
                  Reservierung
                </h2>

                <div className="space-y-5">

                  <input
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
                  />

                  <input
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
                  />

                  <input
                    placeholder="E-Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
                  />

                  <input
                    placeholder="Telefonnummer"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
                  />

                  <textarea
                    placeholder="Nachricht (optional)"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
                  />

                </div>

                <button
                  onClick={handleSubmit}
                  className="mt-10 w-full bg-black py-4 text-sm uppercase tracking-[0.2em] text-white"
                >
                  Reservieren
                </button>

              </>
            )}

          </div>

        </div>
      )}
    </>
  );
}