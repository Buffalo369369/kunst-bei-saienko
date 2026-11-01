"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const DISMISSED_UNTIL_KEY = "kunst-bei-saienko.newsletter.dismissed-until";
const SUBMITTED_KEY = "kunst-bei-saienko.newsletter.submitted";
const DISMISS_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const OPEN_DELAY_MS = 10_000;

export default function NewsletterSignupModal() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isExcludedPage = pathname.startsWith("/newsletter/");

  useEffect(() => {
    if (isExcludedPage) return;
    if (window.localStorage.getItem(SUBMITTED_KEY)) return;

    const dismissedUntil = Number.parseInt(
      window.localStorage.getItem(DISMISSED_UNTIL_KEY) ?? "0",
      10
    );

    if (Number.isFinite(dismissedUntil) && dismissedUntil > Date.now()) return;

    const timeout = window.setTimeout(() => {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [isExcludedPage]);

  useEffect(() => {
    if (!isOpen) return;

    const focusableSelector =
      'button:not([disabled]), input:not([disabled]), a[href]';
    const focusFirstElement = () => {
      dialogRef.current
        ?.querySelector<HTMLElement>(focusableSelector)
        ?.focus();
    };
    const frame = window.requestAnimationFrame(focusFirstElement);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !success) {
        closeForThirtyDays();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement.current?.focus();
    };
  }, [isOpen, success]);

  function closeForThirtyDays() {
    window.localStorage.setItem(
      DISMISSED_UNTIL_KEY,
      String(Date.now() + DISMISS_DURATION_MS)
    );
    setIsOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, consent, website }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorMessage(
          data?.error ?? "Die Anmeldung konnte gerade nicht versendet werden."
        );
        return;
      }

      window.localStorage.setItem(SUBMITTED_KEY, "true");
      setSuccess(true);
    } catch {
      setErrorMessage("Die Anmeldung konnte gerade nicht versendet werden.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen || isExcludedPage) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 px-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target && !success) closeForThirtyDays();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        aria-describedby="newsletter-description"
        className="w-full max-w-xl bg-[#f8f8f6] px-6 py-8 shadow-2xl sm:px-10 sm:py-12"
      >
        {success ? (
          <div className="text-center">
            <h2 id="newsletter-title" className="text-3xl tracking-tight">
              Vielen Dank!
            </h2>
            <p className="mt-5 leading-8 text-neutral-600">
              Bitte prüfen Sie Ihr E-Mail-Postfach und bestätigen Sie Ihre
              Anmeldung über den Link in unserer Nachricht.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Schließen
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Newsletter
            </p>
            <h2 id="newsletter-title" className="mt-4 text-3xl tracking-tight sm:text-4xl">
              BLEIBEN WIR IN KONTAKT
            </h2>
            <p id="newsletter-description" className="mt-5 leading-8 text-neutral-600">
              Erfahren Sie Neuigkeiten über neue Kunstwerke, Ausstellungen und
              besondere Veranstaltungen von Kunst bei Saienko.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="newsletter-first-name" className="sr-only">
                    Vorname
                  </label>
                  <input
                    id="newsletter-first-name"
                    required
                    autoComplete="given-name"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="newsletter-last-name" className="sr-only">
                    Nachname
                  </label>
                  <input
                    id="newsletter-last-name"
                    required
                    autoComplete="family-name"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none focus:border-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  E-Mail-Adresse
                </label>
                <input
                  id="newsletter-email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="E-Mail-Adresse"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full border border-black/10 bg-transparent px-5 py-4 outline-none focus:border-black"
                />
              </div>
              <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-neutral-600">
                <input
                  required
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-black"
                />
                <span>
                  „Ich möchte per E-Mail über neue Kunstwerke, Ausstellungen und
                  Veranstaltungen von Kunst bei Saienko informiert werden. Ich
                  kann meine Einwilligung jederzeit widerrufen. Weitere
                  Informationen finde ich in der{" "}
                  <Link href="/datenschutz" className="underline underline-offset-4">
                    Datenschutzerklärung
                  </Link>
                  .“
                </span>
              </label>
              {errorMessage && (
                <p role="alert" className="text-sm leading-6 text-red-700">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Wird gesendet …" : "JETZT ANMELDEN"}
              </button>
            </form>
            <button
              type="button"
              onClick={closeForThirtyDays}
              className="mt-6 text-sm text-neutral-500 underline underline-offset-4 transition hover:text-black"
            >
              Vielleicht später
            </button>
          </>
        )}
      </div>
    </div>
  );
}
