"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFavorites } from "@/lib/clientStore";
import { Card, CardItem } from "@/components/ui/Card";
import { Price } from "@/components/ui/Price";
import { PlaceholderProduct } from "@/components/icons/Placeholder";

type ProductItem = {
  slug: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
};

type FavoritesResponse = {
  items?: {
    slug: string;
    name: string;
    description?: string | null;
    price?: number | null;
    images?: { url: string }[];
  }[];
};

export default function FavoritesPage() {
  const fav = useFavorites();
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(() => fav.values.size > 0);

  useEffect(() => {
    const slugs = Array.from(fav.values);
    let cancelled = false;

    async function load() {
      if (slugs.length === 0) {
        await Promise.resolve();
        if (!cancelled) {
          setItems([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/products?${slugs.map((s) => `slugs=${encodeURIComponent(s)}`).join("&")}`);
        const data: FavoritesResponse = await response.json();
        if (cancelled) return;
        const products = Array.isArray(data?.items) ? data.items : [];
        setItems(
          products.map((p) => ({
            slug: p.slug,
            name: p.name,
            description: p.description ?? undefined,
            price: p.price ?? undefined,
            image: p.images?.[0]?.url,
          }))
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load favorites:", err);
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [fav.values]);

  if (loading) {
    return (
      <main className="space-y-6">
        <h1 className="text-2xl font-semibold">Избранное</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="h-48 w-full skeleton mb-3" />
              <div className="h-5 w-2/3 skeleton" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Избранное</h1>
        {items.length > 0 && (
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
            {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
          </p>
        )}
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/60">
          <p className="text-zinc-700 dark:text-zinc-400">Список избранного пуст.</p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
            Добавьте товары в избранное, чтобы вернуться к ним позже.
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-block rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)]"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
              <Card>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Товар</div>
                </div>
                <div className="mb-4 overflow-hidden rounded-2xl border border-zinc-100 transition-colors group-hover:border-zinc-200 dark:border-zinc-800 dark:group-hover:border-zinc-700">
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <PlaceholderProduct className="h-16 w-16 text-zinc-400 transition-transform duration-300 group-hover:scale-[1.03]" />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 to-[var(--primary-50)] opacity-60 transition-opacity duration-300 group-hover:opacity-100 dark:from-transparent dark:to-transparent" />
                  </div>
                </div>
                <CardItem
                  title={p.name}
                  subtitle={p.description && (
                    <span className="line-clamp-2 text-zinc-700 dark:text-zinc-400">{p.description}</span>
                  )}
                  right={<Price value={p.price} />}
                />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
