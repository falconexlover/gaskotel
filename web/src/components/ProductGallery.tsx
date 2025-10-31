"use client";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images = [] as string[] }) {
  const [current, setCurrent] = useState(0);
  const safe = images.length > 0 ? images : ["/placeholder/fallback.jpg"];
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
        <Image
          src={safe[current]}
          alt="Фото товара"
          width={800}
          height={600}
          className="h-auto w-full object-cover"
        />
      </div>
      {safe.length > 1 && (
        <div className="flex gap-2 overflow-auto">
          {safe.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setCurrent(i)}
              className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border transition-colors ${
                current === i ? "border-[var(--primary-600)] ring-2 ring-[var(--primary-300)]" : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              }`}
              aria-label={`Фото ${i + 1}`}
            >
              <Image src={src} alt="Миниатюра" width={160} height={120} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


