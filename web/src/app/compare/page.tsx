"use client";
import { useCompare } from "@/lib/clientStore";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type ProductItem = {
  slug: string;
  name: string;
  price?: number;
  description?: string;
  attributes: Record<string, string>;
};

type ApiAttribute = {
  attribute: { name: string };
  valueString?: string | null;
  valueNumber?: number | null;
  valueBool?: boolean | null;
};

type ProductsResponse = {
  items?: {
    slug: string;
    name: string;
    price?: number | null;
    description?: string | null;
    attributes?: ApiAttribute[];
  }[];
};

export default function ComparePage() {
  const cmp = useCompare();
  const [items, setItems] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(() => cmp.values.size > 0);

  useEffect(() => {
    const slugs = Array.from(cmp.values);
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
        const data: ProductsResponse = await response.json();
        if (cancelled) return;
        const products = Array.isArray(data?.items) ? data.items : [];
        setItems(
          products.map((p) => {
            const attributesMap = Object.fromEntries(
              (p.attributes ?? []).map((av) => [
                av.attribute.name,
                av.valueString ?? av.valueNumber ?? (av.valueBool != null ? String(av.valueBool) : ""),
              ])
            ) as Record<string, string>;
            return {
              slug: p.slug,
              name: p.name,
              price: p.price ?? undefined,
              description: p.description ?? undefined,
              attributes: attributesMap,
            };
          })
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load compare items:", err);
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
  }, [cmp.values]);

  const attrs = useMemo(
    () => Array.from(new Set(items.flatMap((p) => Object.keys(p.attributes)))),
    [items]
  );

  if (loading) {
    return (
      <main className="space-y-6">
        <h1 className="text-2xl font-semibold">Сравнение товаров</h1>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="h-64 w-full skeleton" />
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Сравнение товаров</h1>
        {items.length > 0 && (
          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">
            Сравниваете {items.length} {items.length === 1 ? "товар" : items.length < 5 ? "товара" : "товаров"}
          </p>
        )}
      </div>
      {items.length < 2 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/60">
          <p className="text-zinc-700 dark:text-zinc-400">Добавьте минимум 2 товара для сравнения.</p>
          <Link
            href="/catalog"
            className="mt-4 inline-block rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)]"
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                  <th className="border border-zinc-200 p-4 text-left text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 sticky left-0 bg-zinc-50 dark:bg-zinc-800/50">
                    Характеристика
                  </th>
                  {items.map((p) => (
                    <th key={p.slug} className="border border-zinc-200 p-4 text-left text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:text-zinc-100 max-w-xs">
                      <Link href={`/product/${p.slug}`} className="hover:text-[var(--primary-700)] dark:hover:text-[var(--primary-300)]">
                        {p.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-zinc-200 p-3 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/30 sticky left-0">
                    Цена
                  </td>
                  {items.map((p) => (
                    <td key={p.slug} className="border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                      {p.price ? `${p.price.toLocaleString("ru-RU")} ₽` : "—"}
                    </td>
                  ))}
                </tr>
                {attrs.length === 0 ? (
                  <tr>
                    <td colSpan={items.length + 1} className="border border-zinc-200 p-4 text-center text-sm text-zinc-500 dark:border-zinc-800">
                      Характеристики не указаны
                    </td>
                  </tr>
                ) : (
                  attrs.map((a, idx) => (
                    <tr key={a} className={idx % 2 === 1 ? "bg-zinc-50 dark:bg-zinc-800/30" : ""}>
                      <td className="border border-zinc-200 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 font-medium sticky left-0 bg-inherit">
                        {a}
                      </td>
                      {items.map((p) => (
                        <td key={p.slug + a} className="border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                          {p.attributes[a] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                cmp.values.forEach((slug) => cmp.toggle(slug));
              }}
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Очистить список
            </button>
            <Link
              href="/catalog"
              className="rounded-md bg-[var(--primary-700)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--primary-800)]"
            >
              Добавить еще товары
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
