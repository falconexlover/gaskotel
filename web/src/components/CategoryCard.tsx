import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PlaceholderCategory } from "@/components/icons/Placeholder";

export function CategoryCard({ slug, name, description }: { slug: string; name: string; description?: string }) {
  return (
    <Link href={`/catalog/${slug}`} className="group block">
      <Card>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 bg-[var(--primary-50)]/70 dark:bg-zinc-800/40" />
              <PlaceholderCategory className="relative w-8 h-8 text-zinc-400 transition-transform duration-300 group-hover:scale-[1.06]" />
            </div>
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100">{name}</div>
              {description && <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{description}</div>}
            </div>
          </div>
          <span aria-hidden className="mt-0.5 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </div>
      </Card>
    </Link>
  );
}


