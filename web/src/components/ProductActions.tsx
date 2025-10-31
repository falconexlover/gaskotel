"use client";
import { useFavorites, useCompare } from "@/lib/clientStore";

export function ProductActions({ slug }: { slug: string }) {
  const fav = useFavorites();
  const cmp = useCompare();
  const isFav = fav.values.has(slug);
  const isCmp = cmp.values.has(slug);
  return (
    <div className="flex gap-2">
      <button
        onClick={() => fav.toggle(slug)}
        className={`rounded-md border px-3 py-1.5 text-sm ${isFav ? "bg-zinc-900 text-white" : ""}`}
      >
        {isFav ? "В избранном" : "В избранное"}
      </button>
      <button
        onClick={() => cmp.toggle(slug)}
        className={`rounded-md border px-3 py-1.5 text-sm ${isCmp ? "bg-zinc-900 text-white" : ""}`}
      >
        {isCmp ? "В сравнении" : "Сравнить"}
      </button>
    </div>
  );
}


