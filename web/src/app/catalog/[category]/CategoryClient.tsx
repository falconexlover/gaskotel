"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardItem } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";

type AttributeValue = {
  name: string;
  valueString?: string | null;
  valueNumber?: number | null;
  valueBool?: boolean | null;
};

export type SerializedProduct = {
  slug: string;
  name: string;
  description?: string | null;
  price?: number | null;
  attributes: AttributeValue[];
};

const perPage = 16;

export function CategoryClient({
  category,
  title,
  initialItems,
}: {
  category: string;
  title: string;
  initialItems: SerializedProduct[];
}) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [power, setPower] = useState("");
  const [sort, setSort] = useState<"relevance" | "price-asc" | "price-desc">("relevance");

  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get("page") || 1));

  const listAll = useMemo(() => {
    const filtered = initialItems.filter((p) => {
      const price = p.price ?? 0;
      const okMin = minPrice ? price >= Number(minPrice) : true;
      const okMax = maxPrice ? price <= Number(maxPrice) : true;

      const attributesMap = Object.fromEntries(
        p.attributes.map((attr) => [
          attr.name,
          attr.valueString ?? attr.valueNumber ?? (attr.valueBool != null ? String(attr.valueBool) : ""),
        ])
      );
      const okPower = power ? String(attributesMap["Мощность"] ?? "").includes(power) : true;

      return okMin && okMax && okPower;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "price-asc") return (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return 0;
    });

    return sorted;
  }, [initialItems, minPrice, maxPrice, power, sort]);

  const total = listAll.length;
  const start = (currentPage - 1) * perPage;
  const list = listAll.slice(start, start + perPage);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900/60 dark:ring-zinc-800">
          <span className="text-zinc-700 dark:text-zinc-300">{total} позиций</span>
        </div>
      </div>
      <form className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Цена от</label>
            <input
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="0"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Цена до</label>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              placeholder="100000"
            />
          </div>
          {category === "gazovye-kotly" && (
            <div>
              <label className="mb-1 block text-sm text-zinc-600">Мощность (кВт)</label>
              <input
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                placeholder="например 24"
              />
            </div>
          )}
          <div className="sm:col-span-1">
            <label className="mb-1 block text-sm text-zinc-600">Сортировка</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <option value="relevance">По релевантности</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(minPrice || maxPrice || power || sort !== "relevance") && (
            <button
              type="button"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setPower("");
                setSort("relevance");
              }}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 active:translate-y-px dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </form>

      {total === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
          Ничего не найдено по заданным фильтрам. Сбросьте параметры и попробуйте снова.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
            <Card>
              <CardItem
                title={p.name}
                right={
                  p.price != null && (
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {p.price.toLocaleString("ru-RU")} ₽
                    </span>
                  )
                }
              />
              {p.description && (
                <p className="mt-1 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-400">{p.description}</p>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {total > perPage && <Pagination total={total} perPage={perPage} />}
    </main>
  );
}
