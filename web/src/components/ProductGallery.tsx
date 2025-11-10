"use client";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "@/components/icons/Icons";
import { PlaceholderProduct } from "@/components/icons/Placeholder";

export function ProductGallery({ images = [] as string[] }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const safe = images.length > 0 ? images : null;

  if (!safe) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 flex items-center justify-center">
        <PlaceholderProduct className="w-24 h-24 text-zinc-400" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        <div className="group relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={safe[current]}
              alt={`Фото товара ${current + 1}`}
              fill
              className={`object-cover transition-transform duration-300 ${zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
              onClick={() => setZoom(!zoom)}
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            {safe.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent((prev) => (prev === 0 ? safe.length - 1 : prev - 1));
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900"
                  aria-label="Предыдущее фото"
                >
                  <Icons.ChevronLeft className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent((prev) => (prev === safe.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900"
                  aria-label="Следующее фото"
                >
                  <Icons.ChevronRight className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFullscreen(true);
              }}
              className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-zinc-900/90 dark:hover:bg-zinc-900 opacity-0 group-hover:opacity-100"
              aria-label="Открыть в полноэкранном режиме"
            >
              <Icons.Maximize2 className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
            </button>
            {safe.length > 1 && (
              <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {current + 1} / {safe.length}
              </div>
            )}
          </div>
        </div>
        {safe.length > 1 && (
          <div className="flex gap-2 overflow-auto pb-2">
            {safe.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setCurrent(i)}
                className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  current === i
                    ? "border-[var(--primary-600)] ring-2 ring-[var(--primary-300)] scale-105"
                    : "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
                }`}
                aria-label={`Фото ${i + 1}`}
                aria-pressed={current === i}
              >
                <Image
                  src={src}
                  alt={`Миниатюра ${i + 1}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {fullscreen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Закрыть"
          >
            <Icons.X className="h-6 w-6" />
          </button>
          {safe.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((prev) => (prev === 0 ? safe.length - 1 : prev - 1));
                }}
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                aria-label="Предыдущее фото"
              >
                <Icons.ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((prev) => (prev === safe.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                aria-label="Следующее фото"
              >
                <Icons.ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={safe[current]}
              alt={`Фото товара ${current + 1} (полный экран)`}
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {safe.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm text-white backdrop-blur-sm">
                {current + 1} / {safe.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


