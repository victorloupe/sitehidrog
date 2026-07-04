"use client";

import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ["/window.svg"];

  return (
    <div>
      <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-white p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={active}
          src={list[active]}
          alt={alt}
          className="h-full w-full animate-fade-in object-contain"
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-white p-1 transition-all ${
                active === i ? "border-brand-dark" : "border-slate-200 hover:border-brand/50"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`${alt} ${i + 1}`} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
