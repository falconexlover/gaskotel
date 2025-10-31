export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 reveal">
      <div className="mb-2 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-400)]" />
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-[var(--muted)]">{subtitle}</p>}
    </div>
  );
}


