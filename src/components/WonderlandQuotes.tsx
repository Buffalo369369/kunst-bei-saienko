"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  "„Manchmal muss man in eine fremde Welt fallen, um zu erkennen, wer man wirklich ist.“",
  "„Der Koffer war voll mit Erinnerungen, aber der Weg führte nach vorn.“",
  "„Kunst ist die Sprache, die keine Übersetzung braucht, wenn die Welt um dich herum verstummt.“",
  "„Ein Neuanfang beginnt nicht an einem neuen Ort, sondern an dem Punkt, an dem man aufhört, zurückzublicken.“",
  "„Im Wunderland verliert man nicht den Verstand — man findet endlich zu sich selbst.“",
  "„Grenzen sind nur Linien auf Papier. Das, was uns ausmacht, lässt sich in keinen Pass eintragen.“",
  "„Alles, was ich mitgebracht habe, bin ich selbst.“",
];

function getRandomQuoteIndex(excludeIndex?: number) {
  if (excludeIndex === undefined) {
    return Math.floor(Math.random() * quotes.length);
  }

  const index = Math.floor(Math.random() * (quotes.length - 1));
  return index >= excludeIndex ? index + 1 : index;
}

export default function WonderlandQuotes() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuoteIndex(getRandomQuoteIndex());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-16 lg:px-10">
      <div className="border border-black/10 bg-white/40 px-6 py-12 text-center sm:px-10 md:px-16 md:py-16">
        <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
          Notizen aus dem Wunderland
        </p>

        <div aria-live="polite" aria-atomic="true" className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-4xl text-[clamp(2rem,5vw,3.8rem)] leading-tight tracking-tight"
            >
              {quotes[quoteIndex]}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() =>
            setQuoteIndex((currentIndex) => getRandomQuoteIndex(currentIndex))
          }
          className="mt-10 border border-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-neutral-500"
        >
          ✨ Noch eine Notiz
        </button>
      </div>
    </section>
  );
}
