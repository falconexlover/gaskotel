import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-zinc-300 hover:-translate-y-[1px] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700 reveal">{children}</div>;
}

export function CardItem({ title, subtitle, right }: { title: ReactNode; subtitle?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div>
        <div className="font-medium text-zinc-900 dark:text-zinc-100">{title}</div>
        {subtitle && <div className="text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}


