"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ total, perPage }: { total: number; perPage: number }) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const params = useSearchParams();
  const router = useRouter();
  const current = Math.min(
    pages,
    Math.max(1, Number(params.get("page") || 1))
  );
  function go(p: number) {
    const sp = new URLSearchParams(params.toString());
    sp.set("page", String(p));
    router.replace(`?${sp.toString()}`);
  }
  if (pages <= 1) return null;
  const items: (number | string)[] = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - current) <= 1) items.push(p);
    else if (items[items.length - 1] !== "…") items.push("…");
  }
  return (
    <nav aria-label="Пагинация" className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={() => go(Math.max(1, current - 1))}
        disabled={current === 1}
        className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60 dark:disabled:hover:bg-zinc-900"
        aria-label="Предыдущая страница"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className="flex items-center gap-1">
        {items.map((it, i) =>
          typeof it === "number" ? (
            <button
              key={i}
              onClick={() => go(it)}
              className={`min-w-[2.5rem] rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:border-zinc-700 ${
                it === current
                  ? "border-[var(--primary-600)] bg-[var(--primary-600)] text-white shadow-sm ring-2 ring-[var(--primary-200)] dark:ring-[var(--primary-800)]"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
              }`}
              aria-label={`Страница ${it}`}
              aria-current={it === current ? "page" : undefined}
            >
              {it}
            </button>
          ) : (
            <span key={i} className="px-2 text-zinc-600 dark:text-zinc-400" aria-hidden="true">
              …
            </span>
          )
        )}
      </div>
      <button
        onClick={() => go(Math.min(pages, current + 1))}
        disabled={current === pages}
        className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:bg-zinc-50 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60 dark:disabled:hover:bg-zinc-900"
        aria-label="Следующая страница"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}


