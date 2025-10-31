"use client";
import { useFavorites } from "@/lib/clientStore";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function FavoritesPage() {
  const fav = useFavorites();
  const items = PRODUCTS.filter((p) => fav.values.has(p.slug));
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Избранное</h1>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">Список пуст.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}


