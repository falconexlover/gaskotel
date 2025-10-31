export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl py-16 text-center">
      <div className="mx-auto mb-6 h-2 w-24 rounded-full bg-[var(--primary-700)]" />
      <h1 className="text-4xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Кажется, этой страницы больше нет или она была перемещена.
      </p>
      <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-zinc-800 shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100">
        <a href="/catalog" className="underline underline-offset-2">Перейти в каталог</a>
        <span aria-hidden>→</span>
      </div>
    </main>
  );
}
