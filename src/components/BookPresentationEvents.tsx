"use client";

import { useEffect, useState } from "react";

const presentations = [
  {
    dateTime: "2026-10-09T16:30:00+02:00",
    dateLabel: "09.10.2026 · 16:30 Uhr",
    venue: "Stadtbibliothek Solingen",
  },
  {
    dateTime: "2026-10-25T11:00:00+01:00",
    dateLabel: "25.10.2026 · 11:00 Uhr",
    venue: "Sotano Theaterproduktionen",
    address: (
      <>
        Frohnhauser Straße 219
        <br />
        45144 Essen
      </>
    ),
  },
];

export default function BookPresentationEvents() {
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(Date.now());
    const initialUpdate = window.setTimeout(updateCurrentTime, 0);
    const interval = window.setInterval(updateCurrentTime, 60_000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-5 space-y-8">
      {presentations.map((presentation, index) => {
        const hasTakenPlace =
          currentTime !== null &&
          currentTime > new Date(presentation.dateTime).getTime();
        const Heading = index === 0 ? "h2" : "h3";

        return (
          <div
            key={presentation.dateTime}
            className={index === 0 ? undefined : "border-t border-black/10 pt-8"}
          >
            <Heading className="text-[clamp(2.3rem,5vw,3.5rem)] tracking-tight">
              {presentation.dateLabel}
            </Heading>
            <p className="mt-2 text-[clamp(1.35rem,3vw,1.8rem)] tracking-tight">
              {presentation.venue}
            </p>
            {presentation.address && (
              <p className="mt-2 leading-7 text-neutral-600">
                {presentation.address}
              </p>
            )}
            {hasTakenPlace && (
              <p className="mt-4 inline-flex border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-500">
                Bereits stattgefunden
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
