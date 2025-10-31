import Link from "next/link";
import { searchProducts } from "@/data/products";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";
  const results = q ? searchProducts(q) : [];
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Поиск</h1>
      <form action="/search" className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Запрос"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        />
        <button className="rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)] active:translate-y-px">Найти</button>
      </form>
      {q && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Найдено: {results.length}</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{p.name}</h3>
                {p.price && <span className="text-sm text-zinc-700 dark:text-zinc-300">{p.price.toLocaleString("ru-RU")} ₽</span>}
              </div>
              {p.description && (
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}


