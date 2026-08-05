"use client";

import { useState } from "react";

export default function YouTubeConsent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="overflow-hidden shadow-xl">
      <div className="aspect-video bg-neutral-200">
        {isLoaded ? (
          <iframe
            className="h-full w-full"
            src="https://www.youtube-nocookie.com/embed/4ZYyir3dCHA?si=XfIQA5z7bqYGcUr0"
            title="Video-Porträt von Anastasiia Saienko auf YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              YouTube-Video
            </p>
            <p className="mt-4 max-w-md leading-7 text-neutral-600">
              Beim Laden des Videos werden Daten an YouTube übertragen.
            </p>
            <button
              type="button"
              onClick={() => setIsLoaded(true)}
              className="mt-6 bg-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Video laden
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
