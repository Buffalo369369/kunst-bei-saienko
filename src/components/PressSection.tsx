"use client";

import Image from "next/image";
import { useId, useState } from "react";

export type PressArticle = {
  title: string;
  image: string;
  publication?: string;
  description?: string;
  href?: string;
};

export type PressSectionProps = {
  heading: string;
  description: string;
  eyebrow: string;
  articles: PressArticle[];
  collageImages: {
    left: string;
    center: string;
    right: string;
  };
  buttonLabel?: string;
  buttonClosedLabel?: string;
  expandable?: boolean;
  withBackground?: boolean;
};

export const pressArticles: PressArticle[] = [
  {
    title: "Einzelausstellung im KirchenCafé (Solingen-Wald)",
    image: "/images/statya11.jpg",
    description: "Beitrag über meine persönliche Kunstausstellung im KirchenCafé – ein Ort für Kunst, Begegnung und kreativen Austausch.",
  },
  {
    title: "«Die Toleranzsphäre»",
    image: "/images/statya33.jpg",
    description: "Skulpturenpark Sinneswald Veröffentlichung im Katalog zur Freiluftausstellung in Leichlingen über mein Kunstprojekt zum Thema Toleranz und Menschlichkeit.",
  },
  {
    title: "«Anastasia aus der Ukraine»",
    image: "/images/statya2.jpg",
    description: "Persönliches Porträt Ein Bericht über mein Ankommen in Solingen, mein Leben und die Anfänge meines kreativen Weges.",
  },
  {
    title: 'SolingenMagazin: "Hoffnung in Farben"',
    image: "/images/statya44.jpg",
    description: "Ausführliches Porträt über meinen Neuanfang in Solingen, meine Kunstprojekte zu besonderen deutschen Wörtern und regionale Ausstellungen.",
    href: "https://solingenmagazin.de/hoffnung-in-farben-ukrainische-kuenstlerin-startet-neu-in-solingen",
  },
];

export default function PressSection({
  heading,
  description,
  eyebrow,
  articles,
  collageImages,
  buttonLabel = "PRESSE ANSEHEN",
  buttonClosedLabel = "PRESSE SCHLIESSEN",
  expandable = true,
  withBackground = true,
}: PressSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <>
      <section className={`mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-10 lg:py-32 ${withBackground ? "bg-white" : ""}`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-neutral-500">
            {eyebrow}
          </p>

          <h2 className="text-[clamp(2.3rem,5vw,3.5rem)] tracking-tight">
            {heading}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2vw,1.15rem)] leading-8 text-neutral-600">
            {description}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div
            className="relative flex w-full flex-col items-center justify-center sm:flex-row"
            style={{ maxWidth: "760px" }}
          >
            <div className="relative z-0 mb-6 w-[72%] rotate-[-8deg] overflow-hidden border border-black/5 bg-neutral-200 sm:mb-3 sm:w-[30%] sm:-mr-10">
              <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={collageImages.left}
                  alt={`${heading} Collage Left`}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative z-10 w-[86%] overflow-hidden border border-black/10 bg-white shadow-xl sm:w-[42%]">
              <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={collageImages.center}
                  alt={`${heading} Collage Center`}
                  fill
                  sizes="(max-width: 768px) 42vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="relative z-0 mt-6 w-[72%] rotate-[8deg] overflow-hidden border border-black/5 bg-neutral-200 sm:mt-0 sm:mb-3 sm:w-[30%] sm:-ml-10">
              <div className="relative" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={collageImages.right}
                  alt={`${heading} Collage Right`}
                  fill
                  sizes="(max-width: 768px) 33vw, 220px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="text-center">
            {expandable && (
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setIsOpen((current) => !current)}
                className="inline-flex border border-black bg-white px-8 py-4 text-sm uppercase tracking-[0.25em] text-black transition duration-200 hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
              >
                {isOpen ? buttonClosedLabel : buttonLabel}
              </button>
            )}
          </div>

          {expandable ? (
            <div
              id={contentId}
              aria-live="polite"
              aria-hidden={!isOpen}
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mx-auto mt-8 max-w-5xl border-t border-black/10">
                  {articles.map((article, index) => (
                    <article
                      key={`${article.title}-${index}`}
                      className="grid gap-5 border-b border-black/10 py-6 md:grid-cols-[35%_65%] md:gap-8"
                    >
                      <div className="flex justify-center md:justify-start">
                        <div className="relative w-full max-w-[260px] bg-neutral-200 md:max-w-[280px]">
                          <div className="relative aspect-[5/7]">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              sizes="(max-width: 767px) 100vw, 280px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl uppercase tracking-[0.12em] text-black md:text-2xl">
                          {article.title}
                        </h3>

                        {article.publication ? (
                          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-neutral-500">
                            {article.publication}
                          </p>
                        ) : null}

                        {article.description ? (
                          <p className="mt-4 text-base leading-7 text-neutral-600">
                            {article.description}
                          </p>
                        ) : null}

                        {article.href ? (
                          <a
                            href={article.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-black underline-offset-4 hover:underline"
                          >
                            Zum Artikel →
                          </a>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
