import { Card } from "@/components/ui/Card";

const SERIES = [
  { slug: "a", title: "Серия A", desc: "Двухконтурные, до 24 кВт", cta: "/catalog/gazovye-kotly" },
  { slug: "b", title: "Серия B", desc: "Одноконтурные, до 12 кВт", cta: "/catalog/gazovye-kotly" },
  { slug: "pro", title: "PRO", desc: "Профессиональные решения", cta: "/catalog/gazovye-kotly" },
];

export function SeriesBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {SERIES.map((s) => (
        <a key={s.slug} href={s.cta} className="group block">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{s.title}</div>
                <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{s.desc}</div>
              </div>
              <span aria-hidden className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}


