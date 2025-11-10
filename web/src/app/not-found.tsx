import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl py-16 text-center">
      <div className="mx-auto mb-6 h-2 w-24 rounded-full bg-[var(--primary-700)]" />
      <h1 className="text-4xl font-semibold tracking-tight">Страница не найдена</h1>
      <p className="mt-3 text-zinc-700 dark:text-zinc-400">
        Кажется, этой страницы больше нет или она была перемещена.
      </p>
      <Link
        href="/catalog"
        className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[var(--border-soft)] bg-[var(--surface-base)] px-5 py-3 text-sm font-medium text-[var(--primary-700)] shadow-sm transition-all hover:-translate-y-[1px] hover:border-[var(--border-strong)] hover:text-[var(--primary-800)] hover:shadow-lg dark:text-[var(--primary-200)]"
      >
        Перейти в каталог
        <span aria-hidden>→</span>
      </Link>
    </main>
  );
}
