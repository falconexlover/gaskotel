export function Partners() {
  const items = ["partner-a","partner-b","partner-c","partner-d","partner-e"];
  return (
    <div className="rounded-2xl border p-6 bg-white/80 backdrop-blur ring-1 ring-black/5 dark:bg-zinc-900/60">
      <div className="mb-4 text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Нам доверяют</div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {items.map((i) => (
          <div key={i} className="h-10 rounded-md border border-zinc-200 bg-zinc-50 text-center text-xs text-zinc-500 flex items-center justify-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            Логотип
          </div>
        ))}
      </div>
    </div>
  );
}


