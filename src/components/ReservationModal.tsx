"use client";

import { useEffect, useState } from "react";

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

type Props = {
  art: Artwork;
  onClose: () => void;
};

export default function ReservationModal({ art, onClose }: Props) {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  async function handleSubmit() {
    setLoading(true);

    try {
      const res = await fetch("/api/reservation", {
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

      if (!res.ok) {
        throw new Error("Reservation failed");
      }

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      alert("Beim Senden ist ein Fehler aufgetreten.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#f8f8f6] p-6 shadow-2xl sm:p-8 lg:p-10"
      >
        {success ? (
          <div className="py-10 text-center">
            <div className="mb-6 text-6xl">✓</div>

            <h2 className="text-3xl tracking-tight">
              Vielen Dank!
            </h2>

            <p className="mt-6 leading-8 text-neutral-600">
              Ihre Reservierung wurde erfolgreich erstellt.
              <br />
              Wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </div>
        ) : step === 1 ? (
          <>
            <h2 className="mb-8 text-3xl tracking-tight">
              Reservierung
            </h2>

            <p className="leading-8 text-neutral-600">
              Nach Absenden der Anfrage wird das Kunstwerk für 24 Stunden
              exklusiv für Sie reserviert.
            </p>

            <p className="mt-6 leading-8 text-neutral-600">
              Innerhalb dieser Zeit kontaktieren wir Sie, um den Kauf
              abzuschließen.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onClose}
                className="border border-black px-6 py-3 text-sm uppercase tracking-[0.2em]"
              >
                Abbrechen
              </button>

              <button
                onClick={() => setStep(2)}
                className="bg-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
              >
                Weiter
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-8 text-3xl tracking-tight">
              Reservierung
            </h2>

            <div className="space-y-5">
              <input
                required
                autoComplete="given-name"
                placeholder="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <input
                required
                autoComplete="family-name"
                placeholder="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <input
                required
                type="email"
                autoComplete="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <input
                type="tel"
                autoComplete="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <textarea
                rows={5}
                placeholder="Nachricht (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <button
                disabled={
                  loading ||
                  !firstName ||
                  !lastName ||
                  !email
                }
                onClick={handleSubmit}
                className="mt-4 w-full bg-black py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              >
                {loading ? "Reservieren..." : "Reservieren"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}