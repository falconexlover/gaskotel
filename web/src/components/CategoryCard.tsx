import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icons } from "@/components/icons/Icons";

const iconMap: Record<string, keyof typeof Icons> = {
  "gazovye-kotly": "Flame",
  "tverdotoplivnye-kotly": "Thermometer",
  "plity": "Factory",
  "aksessuary": "Wrench",
  "pribory-ucheta": "Gauge",
};

type CategoryCardProps = {
  slug: string;
  name: string;
  description?: string;
  count?: number;
};

export function CategoryCard({ slug, name, description, count }: CategoryCardProps) {
  const iconKey = iconMap[slug];
  const Icon = iconKey && Icons[iconKey] ? Icons[iconKey] : Icons.Star;

  return (
    <Link href={`/catalog/${slug}`} className="group block">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[var(--primary-50)] text-[var(--primary-700)] shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 dark:bg-[var(--primary-900)]/30 dark:text-[var(--primary-300)]">
              <span className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/60 to-white/0 opacity-40 dark:via-white/5" />
              <Icon className="relative h-6 w-6" />
            </span>
            <div className="min-w-0">
              <div className="font-medium text-[var(--heading)] transition-colors duration-200 group-hover:text-[var(--primary-700)] dark:text-zinc-100 dark:group-hover:text-[var(--primary-300)]">
                {name}
              </div>
              {description && (
                <div className="mt-1 text-sm text-[color-mix(in oklab,var(--muted)_78%,white)] line-clamp-2 dark:text-zinc-400">
                  {description}
                </div>
              )}
              {typeof count === "number" && (
                <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-[var(--border-soft)] bg-white/70 px-2 py-0.5 text-[11px] font-medium text-[var(--muted)] shadow-sm dark:bg-zinc-900/60 dark:text-zinc-300">
                  <Icons.Factory className="h-3 w-3" aria-hidden />
                  {count} товаров
                </div>
              )}
            </div>
          </div>
          <span
            aria-hidden
            className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color-mix(in oklab,var(--primary-50)_60%,white)] text-[color-mix(in oklab,var(--muted)_65%,white)] transition-all duration-200 group-hover:bg-[var(--primary-50)] group-hover:text-[var(--primary-700)] dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-[var(--primary-900)]/40 dark:group-hover:text-[var(--primary-300)]"
          >
            <Icons.ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
