import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-6 shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--border-strong)] hover:shadow-lg dark:bg-[var(--surface-base)] reveal">
      {children}
    </div>
  );
}

export function CardItem({ title, subtitle, right }: { title: ReactNode; subtitle?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <div className="font-medium text-[var(--heading)] dark:text-zinc-100">{title}</div>
        {subtitle && <div className="text-sm text-zinc-700 dark:text-zinc-400">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}
