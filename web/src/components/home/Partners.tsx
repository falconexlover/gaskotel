const partners = [
  { name: "ТехноГарант", alias: "TG" },
  { name: "ЭнергоДом", alias: "ED" },
  { name: "HeatPoint", alias: "HP" },
  { name: "СеверСервис", alias: "SS" },
  { name: "ГазАртель", alias: "GA" },
  { name: "Коминвест", alias: "KI" },
];

export function Partners() {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-900/70 dark:ring-zinc-900/70">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wide text-[var(--primary-700)] dark:text-[var(--primary-300)]">
            Нам доверяют
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Промышленные и сервисные партнёры по всей стране</p>
        </div>
        <span className="hidden rounded-full bg-[var(--primary-50)] px-3 py-1 text-xs font-medium text-[var(--primary-700)] dark:bg-[var(--primary-900)]/40 dark:text-[var(--primary-300)] sm:inline-flex">
          {partners.length}+ партнёров
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="group rounded-2xl border border-zinc-200 bg-white/70 p-3 transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary-200)] hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-[var(--primary-800)]"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-50)] text-sm font-semibold text-[var(--primary-700)] shadow-sm transition-colors group-hover:bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30 dark:text-[var(--primary-300)] dark:group-hover:bg-[var(--primary-900)]/50">
              {partner.alias}
            </div>
            <div className="mt-3 text-sm font-medium text-zinc-800 dark:text-zinc-100">{partner.name}</div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">Авторизованный дистрибьютор</div>
          </div>
        ))}
      </div>
    </div>
  );
}

