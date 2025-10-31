"use client";
import { useCompare } from "@/lib/clientStore";
import { PRODUCTS } from "@/data/products";

export default function ComparePage() {
  const cmp = useCompare();
  const items = PRODUCTS.filter((p) => cmp.values.has(p.slug));
  const attrs = Array.from(
    new Set(
      items.flatMap((p) => Object.keys(p.attributes ?? {}))
    )
  );
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Сравнение</h1>
      {items.length < 2 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">Добавьте 2+ товара для сравнения.</div>
      ) : (
        <div className="overflow-auto rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <table className="min-w-[600px] w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-zinc-200 p-3 text-left text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">Характеристика</th>
                {items.map((p) => (
                  <th key={p.slug} className="border border-zinc-200 p-3 text-left text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:text-zinc-100">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">Цена</td>
                {items.map((p) => (
                  <td key={p.slug} className="border border-zinc-200 p-3 text-sm dark:border-zinc-800">{p.price?.toLocaleString("ru-RU")} ₽</td>
                ))}
              </tr>
              {attrs.map((a, idx) => (
                <tr key={a} className={idx % 2 === 1 ? "bg-zinc-50 dark:bg-zinc-800/30" : ""}>
                  <td className="border border-zinc-200 p-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">{a}</td>
                  {items.map((p) => (
                    <td key={p.slug + a} className="border border-zinc-200 p-3 text-sm dark:border-zinc-800">{p.attributes?.[a] ?? "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}


