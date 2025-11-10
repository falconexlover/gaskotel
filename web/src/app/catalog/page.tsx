import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { CategoriesList } from "@/components/home/CategoriesList";
import { EmptyState } from "@/components/ui/EmptyState";
import { prisma } from "@/lib/prisma";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Каталог продукции",
  description: `Каталог отопительного оборудования ${site.name}. Газовые котлы, твердотопливные котлы, приборы учета и аксессуары.`,
  openGraph: {
    title: "Каталог продукции",
    description: `Каталог отопительного оборудования ${site.name}`,
    type: "website",
    url: `${site.url}/catalog`,
  },
};

export default async function CatalogPage() {
  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
  const filtered = categories.filter((c: any) => c.slug !== 'promo');
  const totalProducts = filtered.reduce((acc: number, c: any) => acc + (c._count?.products ?? 0), 0);
  return (
    <main className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl bg-radial-soft p-6 md:p-8">
        <div className="absolute inset-0 bg-grid opacity-[0.25] dark:opacity-[0.18]" />
        <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Каталог</h1>
            <p className="mt-2 max-w-2xl text-zinc-700 dark:text-zinc-300">Выбирайте по категориям, фильтруйте и находите нужное оборудование.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-sm shadow-sm ring-1 ring-black/5 backdrop-blur-md dark:bg-zinc-900/70">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary-500)]" />
            <span className="text-zinc-700 dark:text-zinc-300">{filtered.length} категорий</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-700 dark:text-zinc-300">{totalProducts} товаров</span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-6 sm:grid-cols-2">
          {filtered.length === 0 && (
            <div className="sm:col-span-2">
              <EmptyState
                title="Категории пока не добавлены"
                description="Мы работаем над наполнением каталога. Свяжитесь с нами для получения информации о продукции."
              />
            </div>
          )}
          {filtered.map((c: any) => (
            <Link key={c.slug} href={`/catalog/${c.slug}`} className="group block">
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-medium text-zinc-900 dark:text-zinc-100">{c.name}</h3>
                    {c.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-zinc-700 dark:text-zinc-400">{c.description}</p>
                    )}
                  </div>
                  <span aria-label="Кол-во товаров" className="ml-3 inline-flex items-center rounded-full bg-[var(--primary-50)] px-2 py-0.5 text-xs text-[var(--primary-700)]">
                    {c._count?.products ?? 0}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div>
          <CategoriesList />
        </div>
      </div>
    </main>
  );
}


