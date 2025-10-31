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
    <div className="mt-6 flex items-center justify-center gap-1">
      <button onClick={() => go(Math.max(1, current - 1))} className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60" disabled={current === 1}>
        ←
      </button>
      {items.map((it, i) =>
        typeof it === "number" ? (
          <button
            key={i}
            onClick={() => go(it)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors dark:border-zinc-700 ${
              it === current
                ? "border-[var(--primary-600)] bg-[var(--primary-600)] text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            }`}
          >
            {it}
          </button>
        ) : (
          <span key={i} className="px-2 text-zinc-500 dark:text-zinc-400">
            …
          </span>
        )
      )}
      <button onClick={() => go(Math.min(pages, current + 1))} className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60" disabled={current === pages}>
        →
      </button>
    </div>
  );
}


