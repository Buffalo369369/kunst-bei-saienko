"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const quotes = [
  {
    text: "„Manchmal muss man in eine fremde Welt fallen, um zu erkennen, wer man wirklich ist.“",
    audio: "/audio/notizen/quote-1.mp3",
  },
  {
    text: "„Der Koffer war voll mit Erinnerungen, aber der Weg führte nach vorn.“",
    audio: "/audio/notizen/quote-2.mp3",
  },
  {
    text: "„Kunst ist die Sprache, die keine Übersetzung braucht, wenn die Welt um dich herum verstummt.“",
    audio: "/audio/notizen/quote-3.mp3",
  },
  {
    text: "„Ein Neuanfang beginnt nicht an einem neuen Ort, sondern an dem Punkt, an dem man aufhört, zurückzublicken.“",
    audio: "/audio/notizen/quote-4.mp3",
  },
  {
    text: "„Im Wunderland verliert man nicht den Verstand — man findet endlich zu sich selbst.“",
    audio: "/audio/notizen/quote-5.mp3",
  },
  {
    text: "„Grenzen sind nur Linien auf Papier. Das, was uns ausmacht, lässt sich in keinen Pass eintragen.“",
    audio: "/audio/notizen/quote-6.mp3",
  },
  {
    text: "„Alles, was ich mitgebracht habe, bin ich selbst.“",
    audio: "/audio/notizen/quote-7.mp3",
  },
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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setQuoteIndex(getRandomQuoteIndex());
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const audio = new Audio(quotes[quoteIndex].audio);
    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("ended", handleEnded);

      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [quoteIndex]);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  function showAnotherQuote() {
    const audio = audioRef.current;
    audio?.pause();

    if (audio) {
      audio.currentTime = 0;
    }

    setIsPlaying(false);
    setQuoteIndex((currentIndex) => getRandomQuoteIndex(currentIndex));
  }

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
              {quotes[quoteIndex].text}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={toggleAudio}
          className="mt-8 border border-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-neutral-500"
        >
          {isPlaying ? "⏸ Pause" : "▶ Anhören"}
        </button>

        <button
          type="button"
          onClick={showAnotherQuote}
          className="mt-10 border border-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-neutral-500"
        >
          ✨ Noch eine Notiz
        </button>
      </div>
    </section>
  );
}
