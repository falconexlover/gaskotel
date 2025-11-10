import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CategoryCard } from "@/components/CategoryCard";

type PopularCategory = {
  slug: string;
  name: string;
  description?: string | null;
  count?: number;
};

const FALLBACK: PopularCategory[] = [
  { slug: "gazovye-kotly", name: "Газовые котлы", description: "Настенные и напольные", count: 42 },
  { slug: "plity", name: "Газовые плиты", description: "Бытовые и профессиональные", count: 18 },
  { slug: "aksessuary", name: "Аксессуары", description: "Дымоходы, автоматика", count: 27 },
  { slug: "pribory-ucheta", name: "Приборы учёта", description: "Счётчики, датчики, автоматика", count: 12 },
];

export async function PopularCategories() {
  const categories = await prisma.category.findMany({
    where: { slug: { not: "promo" } },
    include: { _count: { select: { products: true } } },
    orderBy: { products: { _count: "desc" } },
    take: 4,
  });

  const hasData = categories.some((cat) => (cat._count?.products ?? 0) > 0);
  const items: PopularCategory[] = hasData
    ? categories.map((cat) => ({
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        count: cat._count?.products ?? 0,
      }))
    : FALLBACK;

  return (
    <section>
      <SectionTitle title="Популярные категории" subtitle="Быстрый переход к разделам каталога" />
      <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-muted)]/80 p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <CategoryCard key={item.slug} slug={item.slug} name={item.name} description={item.description ?? undefined} count={item.count} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link href="/catalog" className="text-sm font-medium text-[var(--primary-700)] underline-offset-4 hover:underline dark:text-[var(--primary-300)]">
            Все категории →
          </Link>
        </div>
      </div>
    </section>
  );
}

