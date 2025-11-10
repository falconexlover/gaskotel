const STATS = [
  {
    value: "25+",
    label: "лет на рынке",
    description: "Опыт производства и внедрения отопительных систем",
  },
  {
    value: "120",
    label: "сервисных центров",
    description: "Авторизованные партнёры и дилерская поддержка по всей стране",
  },
  {
    value: "350+",
    label: "моделей в каталоге",
    description: "Газовые котлы, плиты и аксессуары для частных и коммерческих объектов",
  },
  {
    value: "24/7",
    label: "поддержка",
    description: "Консультации инженеров и оперативная обратная связь",
  },
];

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-glass)] p-6 shadow-sm backdrop-blur-md dark:bg-[var(--surface-muted)]">
      <div className="pointer-events-none absolute -left-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--primary-300)_28%,transparent)] blur-[90px] opacity-70 dark:bg-[color-mix(in_oklab,var(--primary-500)_32%,transparent)]" />
      <div className="pointer-events-none absolute -right-16 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[color-mix(in_oklab,var(--primary-400)_26%,transparent)] blur-[110px] opacity-80 dark:bg-[color-mix(in_oklab,var(--primary-600)_28%,transparent)]" />
      <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">{item.value}</div>
            <div className="text-sm font-medium uppercase tracking-wide text-[var(--primary-700)] dark:text-[var(--primary-300)]">
              {item.label}
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
