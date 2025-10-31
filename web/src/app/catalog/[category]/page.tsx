"use client";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Card, CardItem } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const [base, setBase] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?category=${encodeURIComponent(category)}&perPage=500`)
      .then((r) => r.json())
      .then((data) => {
        const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
        setBase(items);
      })
      .finally(() => setLoading(false));
  }, [category]);
  if (!loading && base.length === 0) return notFound();
  const title =
    category === "gazovye-kotly"
      ? "Газовые котлы"
      : category === "tverdotoplivnye-kotly"
      ? "Твердотопливные котлы"
      : category === "pribory-ucheta"
      ? "Приборы учета"
      : category === "plity"
      ? "Газовые плиты"
      : "Аксессуары";

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("relevance");
  const perPage = 16;

  const listAll = useMemo(() => {
    const filtered = base.filter((p: any) => {
      const okMin = minPrice ? (p.price ?? 0) >= Number(minPrice) : true;
      const okMax = maxPrice ? (p.price ?? 0) <= Number(maxPrice) : true;
      const attributesMap = Object.fromEntries((p.attributes ?? []).map((av: any) => [av.attribute.name, av.valueString ?? av.valueNumber ?? av.valueBool ?? ""])) as Record<string, string>;
      const okPower = power ? String(attributesMap["Мощность"] ?? "").includes(power) : true;
      return okMin && okMax && okPower;
    });
    const sorted = [...filtered].sort((a: any, b: any) => {
      if (sort === "price-asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
      if (sort === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      return 0;
    });
    return sorted;
  }, [base, minPrice, maxPrice, power, sort]);
  const total = listAll.length;
  const start = (page - 1) * perPage;
  const list = listAll.slice(start, start + perPage);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {!loading && (
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900/60 dark:ring-zinc-800">
            <span className="text-zinc-700 dark:text-zinc-300">{total} позиций</span>
          </div>
        )}
      </div>
      <form className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Цена от</label>
            <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" placeholder="0" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Цена до</label>
            <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" placeholder="100000" />
          </div>
          {category === "gazovye-kotly" && (
            <div>
              <label className="mb-1 block text-sm text-zinc-600">Мощность (кВт)</label>
              <input value={power} onChange={(e) => setPower(e.target.value)} className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" placeholder="например 24" />
            </div>
          )}
          <div className="sm:col-span-1">
            <label className="mb-1 block text-sm text-zinc-600">Сортировка</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
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
              onClick={() => { setMinPrice(""); setMaxPrice(""); setPower(""); setSort("relevance"); setPage(1); }}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 active:translate-y-px dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </form>
      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="h-36 w-full skeleton" />
              <div className="mt-3 h-5 w-2/3 skeleton" />
              <div className="mt-2 h-4 w-1/2 skeleton" />
            </div>
          ))}
        </div>
      )}
      {!loading && total > 0 && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Отображение {Math.min(start + 1, total)}–{Math.min(start + list.length, total)} из {total}</div>
      )}
      {!loading && total === 0 && (
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
                right={p.price && <span className="text-sm text-zinc-700 dark:text-zinc-300">{p.price.toLocaleString("ru-RU")} ₽</span>}
              />
              {p.description && (
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
              )}
            </Card>
          </Link>
        ))}
      </div>
      {!loading && total > 0 && (
        <div onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.tagName === 'BUTTON' && t.textContent) {
            const num = Number(t.textContent);
            if (!Number.isNaN(num)) setPage(num);
          }
        }}>
          <Pagination total={total} perPage={perPage} />
        </div>
      )}
    </main>
  );
}


