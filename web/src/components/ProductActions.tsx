"use client";
import { useFavorites, useCompare } from "@/lib/clientStore";
import { Icons } from "@/components/icons/Icons";
import { toast } from "sonner";

export function ProductActions({ slug }: { slug: string }) {
  const fav = useFavorites();
  const cmp = useCompare();
  const isFav = fav.values.has(slug);
  const isCmp = cmp.values.has(slug);
  
  const handleFavorite = () => {
    fav.toggle(slug);
    toast.success(isFav ? "Удалено из избранного" : "Добавлено в избранное");
  };
  
  const handleCompare = () => {
    cmp.toggle(slug);
    toast.success(isCmp ? "Удалено из сравнения" : "Добавлено в сравнение");
  };

  const actionClasses = (active: boolean) =>
    `group inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-[var(--border-strong)] bg-[var(--primary-600)] text-white shadow-sm hover:bg-[var(--primary-700)]"
        : "border-[var(--border-soft)] bg-[var(--surface-base)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:bg-white/90 dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_14%,transparent)]"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={handleFavorite}
        className={actionClasses(isFav)}
        aria-label={isFav ? "Удалить из избранного" : "Добавить в избранное"}
      >
        <Icons.Heart className={`h-4 w-4 transition-all ${isFav ? "fill-current" : ""}`} />
        <span>{isFav ? "В избранном" : "В избранное"}</span>
      </button>
      <button
        onClick={handleCompare}
        className={actionClasses(isCmp)}
        aria-label={isCmp ? "Удалить из сравнения" : "Добавить в сравнение"}
      >
        <Icons.CompareArrows className="h-4 w-4" />
        <span>{isCmp ? "В сравнении" : "Сравнить"}</span>
      </button>
    </div>
  );
}


