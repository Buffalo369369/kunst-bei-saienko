"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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
  const dialogRef = useRef<HTMLDivElement>(null);
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
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;

    const focusFirstElement = () => {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
      );

      focusableElements?.[0]?.focus();
    };

    focusFirstElement();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
        ) ?? []
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-[#f8f8f6] p-6 shadow-2xl sm:p-8 lg:p-10"
      >
        {success ? (
          <div className="py-10 text-center">
            <div className="mb-6 text-6xl">✓</div>

            <h2 id="reservation-title" className="text-3xl tracking-tight">
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
            <h2 id="reservation-title" className="mb-8 text-3xl tracking-tight">
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
                type="button"
                onClick={onClose}
                className="border border-black px-6 py-3 text-sm uppercase tracking-[0.2em]"
              >
                Abbrechen
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
              >
                Weiter
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="reservation-title" className="mb-8 text-3xl tracking-tight">
              Reservierung
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label htmlFor="reservation-first-name" className="sr-only">
                Vorname
              </label>
              <input
                id="reservation-first-name"
                required
                autoComplete="given-name"
                placeholder="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <label htmlFor="reservation-last-name" className="sr-only">
                Nachname
              </label>
              <input
                id="reservation-last-name"
                required
                autoComplete="family-name"
                placeholder="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <label htmlFor="reservation-email" className="sr-only">
                E-Mail
              </label>
              <input
                id="reservation-email"
                required
                type="email"
                autoComplete="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <label htmlFor="reservation-phone" className="sr-only">
                Telefonnummer
              </label>
              <input
                id="reservation-phone"
                type="tel"
                autoComplete="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <label htmlFor="reservation-message" className="sr-only">
                Nachricht (optional)
              </label>
              <textarea
                id="reservation-message"
                rows={5}
                placeholder="Nachricht (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none"
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  !firstName ||
                  !lastName ||
                  !email
                }
                className="mt-4 w-full bg-black py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
              >
                {loading ? "Reservieren..." : "Reservieren"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
