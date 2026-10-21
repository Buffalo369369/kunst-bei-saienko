"use client";

import { type ReactNode, useState } from "react";

export default function ExpandableText({
  text,
  expandedContent,
}: {
  text: string;
  expandedContent?: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  const shortText = text.slice(0, 350);

  return (
    <div className="text-lg leading-9 text-neutral-600">
      {expanded ? (
        expandedContent ?? <p className="whitespace-pre-line">{text}</p>
      ) : (
        <p className="whitespace-pre-line">{`${shortText}...`}</p>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-10 border border-black px-8 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
      >
        {expanded ? "Weniger anzeigen" : "Mehr erfahren"}
      </button>
    </div>
  );
}
