"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Action = "confirm" | "unsubscribe" | "delete";

type Props = {
  action: Action;
  token: string;
};

const content: Record<Action, { title: string; text: string; button: string }> = {
  confirm: {
    title: "Newsletter-Anmeldung bestätigen",
    text: "Mit Ihrer Bestätigung stimmen Sie dem Erhalt von Neuigkeiten von Kunst bei Saienko per E-Mail zu.",
    button: "Anmeldung bestätigen",
  },
  unsubscribe: {
    title: "Newsletter abmelden",
    text: "Nach der Bestätigung erhalten Sie keine weiteren Newsletter von Kunst bei Saienko.",
    button: "Abmeldung bestätigen",
  },
  delete: {
    title: "Daten löschen",
    text: "Nach der Bestätigung werden Ihre Newsletter-Daten bei Kunst bei Saienko gelöscht und aus der Newsletter-Liste entfernt.",
    button: "Löschung bestätigen",
  },
};

export default function NewsletterTokenAction({ action, token }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currentContent = content[action];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("Dieser Link ist ungültig oder unvollständig.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/newsletter/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorMessage(data?.error ?? "Die Anfrage konnte nicht abgeschlossen werden.");
        return;
      }

      const destination =
        action === "confirm"
          ? "/newsletter/bestaetigt"
          : action === "unsubscribe"
            ? "/newsletter/abgemeldet"
            : "/newsletter/geloescht";
      router.replace(destination);
    } catch {
      setErrorMessage("Die Anfrage konnte nicht abgeschlossen werden.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] px-6 py-20">
      <div className="mx-auto max-w-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Kunst bei Saienko
        </p>
        <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">
          {currentContent.title}
        </h1>
        <p className="mt-8 leading-8 text-neutral-600">{currentContent.text}</p>
        <form className="mt-10" onSubmit={handleSubmit}>
          {errorMessage && (
            <p role="alert" className="mb-5 text-sm leading-6 text-red-700">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !token}
            className="bg-black px-6 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Wird verarbeitet …" : currentContent.button}
          </button>
        </form>
        <Link
          href="/"
          className="mt-8 inline-block text-sm text-neutral-500 underline underline-offset-4 transition hover:text-black"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
