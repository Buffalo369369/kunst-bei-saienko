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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

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
    setErrorMessage(null);

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: art.slug,
          firstName,
          lastName,
          email,
          phone,
          message,
          website,
        }),
      });

      if (res.status === 201) {
        setSuccess(true);

        setTimeout(() => {
          onClose();
        }, 1800);

        return;
      }

      const errors = {
        400: "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.",
        404: "Dieses Kunstwerk ist leider nicht mehr verfügbar.",
        409: "Dieses Kunstwerk ist leider nicht mehr verfügbar oder bereits reserviert.",
      } as const;

      setErrorMessage(
        errors[res.status as keyof typeof errors] ??
          "Beim Senden ist ein Fehler aufgetreten."
      );
    } catch (err) {
      console.error(err);
      setErrorMessage("Beim Senden ist ein Fehler aufgetreten.");
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
        className="max-h-[calc(100dvh-3rem)] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#f8f8f6] p-6 shadow-2xl sm:p-8 lg:p-10"
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
              Innerhalb dieser Zeit kontaktiert Anastasiia Sie persönlich, um den Kauf
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
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
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

              {errorMessage && (
                <p aria-live="polite" className="leading-8 text-neutral-600">
                  {errorMessage}
                </p>
              )}

              <section className="border-t border-black/10 pt-5">
                <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                  Wie geht es danach weiter?
                </h3>
                <ol className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-6 text-neutral-600 sm:grid-cols-2">
                  <li>
                    1. Ihre Reservierungsanfrage geht direkt bei Anastasiia ein.
                  </li>
                  <li>
                    2. Das Kunstwerk wird für 24 Stunden für Sie reserviert.
                  </li>
                  <li>3. Anastasiia meldet sich persönlich bei Ihnen.</li>
                  <li>
                    4. Anschließend werden Kauf, Zahlung und Übergabe bzw.
                    Versand gemeinsam abgestimmt.
                  </li>
                </ol>
              </section>

              <p className="leading-8 text-neutral-600">
                Mit dem Absenden der Reservierungsanfrage kommt noch kein
                Kaufvertrag zustande. Wir melden uns persönlich bei Ihnen, um
                den Kauf, die Zahlung und die Übergabe bzw. den Versand zu
                bestätigen.
              </p>

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
