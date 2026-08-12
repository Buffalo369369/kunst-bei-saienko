"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";

type DeliveryMethod = "presentation" | "pickup_solingen" | "shipping_de";
type PaymentMethod = "paypal" | "bank_transfer";
type Language = "de" | "uk";

const inputClassName =
  "mt-2 w-full border border-white/30 bg-white/90 px-4 py-3 text-black outline-none transition focus:border-white focus:ring-2 focus:ring-white/70";

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export default function BookPreorderForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("presentation");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [language, setLanguage] = useState<Language>("de");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "validation_error" | "error"
  >("idle");

  const requiresShippingAddress = deliveryMethod === "shipping_de";
  const shippingCost = requiresShippingAddress ? "10,00 €" : "Kostenlos";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const response = await fetch("/api/book-preorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: getFormValue(formData, "firstName"),
          lastName: getFormValue(formData, "lastName"),
          email: getFormValue(formData, "email"),
          quantity,
          language,
          deliveryMethod,
          street: requiresShippingAddress ? getFormValue(formData, "street") : null,
          postalCode: requiresShippingAddress
            ? getFormValue(formData, "postalCode")
            : null,
          city: requiresShippingAddress ? getFormValue(formData, "city") : null,
          paymentMethod,
          message: getFormValue(formData, "message"),
          website: getFormValue(formData, "website"),
        }),
      });

      if (response.status === 201) {
        formRef.current?.reset();
        setDeliveryMethod("presentation");
        setPaymentMethod("paypal");
        setLanguage("de");
        setQuantity(1);
        setSubmissionStatus("success");
        return;
      }

      setSubmissionStatus(
        response.status === 400 ? "validation_error" : "error"
      );
    } catch {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="mt-10 space-y-10 md:mt-12 md:space-y-12"
      onSubmit={handleSubmit}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="book-preorder-website">Website</label>
        <input
          id="book-preorder-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-white/80">
          Vorname
          <input
            required
            type="text"
            name="firstName"
            autoComplete="given-name"
            className={inputClassName}
          />
        </label>

        <label className="block text-sm text-white/80">
          Nachname
          <input
            required
            type="text"
            name="lastName"
            autoComplete="family-name"
            className={inputClassName}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-[1fr_10rem]">
        <label className="block text-sm text-white/80">
          E-Mail-Adresse
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={inputClassName}
          />
        </label>

        <label className="block text-sm text-white/80">
          Anzahl
          <input
            required
            type="number"
            name="quantity"
            min={1}
            max={20}
            step={1}
            value={quantity}
            onChange={(event) => {
              const nextQuantity = Number(event.target.value);
              setQuantity(
                Number.isFinite(nextQuantity)
                  ? Math.min(20, Math.max(1, nextQuantity))
                  : 1
              );
            }}
            className={inputClassName}
          />
        </label>
      </div>

      <fieldset>
        <legend className="text-[clamp(1.4rem,3vw,1.8rem)] tracking-tight">
          Sprache der Ausgabe
        </legend>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label
            className={`block border p-5 transition ${
              language === "de" ? "border-white bg-white/10" : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                required
                type="radio"
                name="language"
                value="de"
                checked={language === "de"}
                onChange={() => setLanguage("de")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span className="block text-base">🇩🇪 Deutsch</span>
            </span>
          </label>

          <label
            className={`block border p-5 transition ${
              language === "uk" ? "border-white bg-white/10" : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="language"
                value="uk"
                checked={language === "uk"}
                onChange={() => setLanguage("uk")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span className="block text-base">🇺🇦 Українська</span>
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[clamp(1.4rem,3vw,1.8rem)] tracking-tight">
          Wie möchtest du dein Buch erhalten?
        </legend>

        <div className="mt-5 grid gap-3">
          <label
            className={`block border p-5 transition ${
              deliveryMethod === "presentation"
                ? "border-white bg-white/10"
                : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="deliveryMethod"
                value="presentation"
                checked={deliveryMethod === "presentation"}
                onChange={() => setDeliveryMethod("presentation")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span>
                <span className="block text-base">Selbstabholung bei der Buchpräsentation</span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  09.10.2026 · 16:30 Uhr · Stadtbibliothek Solingen
                </span>
                <span className="mt-3 block text-sm">Kostenlos</span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  + exklusiver Mini-Bonus als Dankeschön für dein Kommen
                </span>
              </span>
            </span>
          </label>

          <label
            className={`block border p-5 transition ${
              deliveryMethod === "pickup_solingen"
                ? "border-white bg-white/10"
                : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="deliveryMethod"
                value="pickup_solingen"
                checked={deliveryMethod === "pickup_solingen"}
                onChange={() => setDeliveryMethod("pickup_solingen")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span>
                <span className="block text-base">Persönliche Abholung nach Absprache</span>
                <span className="mt-3 block text-sm">Kostenlos</span>
              </span>
            </span>
          </label>

          <label
            className={`block border p-5 transition ${
              deliveryMethod === "shipping_de"
                ? "border-white bg-white/10"
                : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="deliveryMethod"
                value="shipping_de"
                checked={deliveryMethod === "shipping_de"}
                onChange={() => setDeliveryMethod("shipping_de")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span>
                <span className="block text-base">Postversand innerhalb Deutschlands</span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  inkl. sicherer Verpackung & Versand
                </span>
                <span className="mt-3 block text-sm">+ 10,00 € Versand</span>
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {requiresShippingAddress && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 border-t border-white/20 pt-8 sm:grid-cols-2"
          >
            <label className="block text-sm text-white/80 sm:col-span-2">
              Straße und Hausnummer
              <input
                required
                type="text"
                name="street"
                autoComplete="street-address"
                className={inputClassName}
              />
            </label>

            <label className="block text-sm text-white/80">
              PLZ
              <input
                required
                type="text"
                name="postalCode"
                autoComplete="postal-code"
                className={inputClassName}
              />
            </label>

            <label className="block text-sm text-white/80">
              Ort
              <input
                required
                type="text"
                name="city"
                autoComplete="address-level2"
                className={inputClassName}
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      <fieldset>
        <legend className="text-[clamp(1.4rem,3vw,1.8rem)] tracking-tight">
          Zahlungsart
        </legend>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label
            className={`block border p-5 transition ${
              paymentMethod === "paypal" ? "border-white bg-white/10" : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span>
                <span className="block text-base">PayPal</span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  Die Zahlungsinformationen erhältst du nach deiner Vorbestellung.
                </span>
              </span>
            </span>
          </label>

          <label
            className={`block border p-5 transition ${
              paymentMethod === "bank_transfer"
                ? "border-white bg-white/10"
                : "border-white/20"
            }`}
          >
            <span className="flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                value="bank_transfer"
                checked={paymentMethod === "bank_transfer"}
                onChange={() => setPaymentMethod("bank_transfer")}
                className="mt-1 h-4 w-4 accent-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <span>
                <span className="block text-base">Banküberweisung</span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  Die Bankverbindung erhältst du nach deiner Vorbestellung per E-Mail oder persönlich.
                </span>
              </span>
            </span>
          </label>
        </div>
      </fieldset>

      <label className="block text-sm text-white/80">
        Nachricht (optional)
        <textarea
          name="message"
          rows={5}
          className={inputClassName}
        />
      </label>

      <div className="border-y border-white/20 py-6 text-sm leading-7 text-white/75">
        <p>Anzahl: {quantity}</p>
        <p>Versand: {shippingCost}</p>
      </div>

      <section className="border-t border-white/20 pt-6">
        <h3 className="text-sm uppercase tracking-[0.2em] text-white/70">
          Wie geht es danach weiter?
        </h3>
        <ol className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-6 text-white/75 sm:grid-cols-2">
          <li>
            1. Deine Vorbestellungsanfrage geht direkt bei Anastasiia ein.
          </li>
          <li>2. Anastasiia meldet sich persönlich bei dir.</li>
          <li>
            3. Verfügbarkeit, Preis und Zahlung werden gemeinsam bestätigt.
          </li>
          <li>4. Anschließend wird Abholung oder Versand abgestimmt.</li>
        </ol>
      </section>

      <p className="text-sm leading-7 text-white/75">
        Mit dem Absenden der Anfrage kommt noch kein Kaufvertrag zustande. Wir
        melden uns persönlich bei dir, um Verfügbarkeit, Preis, Zahlung und
        Abholung bzw. Versand zu bestätigen.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white px-6 py-4 text-sm uppercase tracking-[0.2em] text-black transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        {isSubmitting
          ? "Anfrage wird gesendet..."
          : "Vorbestellung anfragen"}
      </button>

      {submissionStatus === "success" && (
        <p aria-live="polite" className="text-center text-sm leading-6 text-white/65">
          Vielen Dank für deine Vorbestellungsanfrage! Anastasiia meldet sich in
          Kürze persönlich bei dir per E-Mail.
        </p>
      )}

      {submissionStatus === "validation_error" && (
        <p aria-live="polite" className="text-center text-sm leading-6 text-white/65">
          Bitte überprüfe deine Eingaben und versuche es erneut.
        </p>
      )}

      {submissionStatus === "error" && (
        <p aria-live="polite" className="text-center text-sm leading-6 text-white/65">
          Die Vorbestellung konnte leider nicht gesendet werden. Bitte versuche
          es später erneut.
        </p>
      )}
    </form>
  );
}
