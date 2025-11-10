import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

async function searchProducts(query: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    });
    if (!res.ok) return { items: [], total: 0 };
    return await res.json();
  } catch {
    return { items: [], total: 0 };
  }
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = searchParams.q ?? "";
  const { items: results, total } = q ? await searchProducts(q) : { items: [], total: 0 };

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Поиск</h1>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">Найдите нужный товар по названию, описанию или характеристикам</p>
      </div>
      <form action="/search" method="get" className="flex gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder="Введите название товара..."
          className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        />
        <button type="submit" className="rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)] active:translate-y-px">
          Найти
        </button>
      </form>
      {q && (
        <div className="text-sm text-zinc-700 dark:text-zinc-400">
          Найдено: {total} {total === 1 ? "товар" : total < 5 ? "товара" : "товаров"}
        </div>
      )}
      {q && total === 0 && (
        <EmptyState
          title={`По запросу "${q}" ничего не найдено`}
          description="Попробуйте изменить запрос или использовать другие ключевые слова. Также вы можете посмотреть весь каталог товаров."
          action={
            <Link href="/catalog">
              <Button>Перейти в каталог</Button>
            </Link>
          }
        />
      )}
      {results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p: any) => (
            <Link key={p.slug} href={`/product/${p.slug}`} className="group block">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary-700)] dark:group-hover:text-[var(--primary-300)]">{p.name}</h3>
                  {p.price && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{p.price.toLocaleString("ru-RU")} ₽</span>}
                </div>
                {p.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-400">{p.description}</p>
                )}
                {p.category && (
                  <span className="mt-2 inline-block text-xs text-zinc-500 dark:text-zinc-500">{p.category}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
