import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/data/products";
import { EmptyState } from "@/components/ui/EmptyState";
import { ButtonSecondary } from "@/components/ui/Button";

const DEFAULT_CATEGORY: Product["category"] = "gazovye-kotly";
const KNOWN_CATEGORIES = new Set<Product["category"]>([
  "gazovye-kotly",
  "tverdotoplivnye-kotly",
  "pribory-ucheta",
  "ustrojstva-gazogorelochnye",
  "avtomatika",
  "bak-teploobmennik",
  "plity",
  "aksessuary",
]);

function normalizeCategory(slug?: string | null): Product["category"] {
  if (slug && KNOWN_CATEGORIES.has(slug as Product["category"])) {
    return slug as Product["category"];
  }
  return DEFAULT_CATEGORY;
}

async function fetchProducts(isPromo: boolean, take: number) {
  const products = await prisma.product.findMany({
    where: { isPromo },
    take,
    orderBy: { id: "desc" },
    include: {
      images: { take: 1 },
      category: true,
    },
  });
  return products;
}

function mapProduct(p: any): Product {
  return {
    slug: p.slug,
    name: p.name,
    description: p.description ?? undefined,
    price: p.price ?? undefined,
    category: normalizeCategory(p.category?.slug),
    images: p.images?.map((img: any) => img.url) ?? [],
  };
}

export async function RecommendedProducts() {
  const primary = await fetchProducts(false, 6);
  let pool = [...primary];

  if (pool.length < 3) {
    const promo = await fetchProducts(true, 6);
    const seen = new Set(pool.map((p) => p.slug));
    pool = [...pool, ...promo.filter((p) => !seen.has(p.slug))];
  }

  const selected = pool.slice(0, 3).map(mapProduct);
  const todayLabel = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionTitle title="Рекомендуемые товары" subtitle="Выбор покупателей с актуальной ценой" />
        <div className="text-xs text-zinc-500 dark:text-zinc-400">Обновлено: {todayLabel}</div>
      </div>
      {selected.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : pool.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ProductCard key={`skeleton-${idx}`} loading />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Товары скоро появятся"
          description="Мы обновляем каталог. Оставьте заявку, и менеджер подберёт оборудование под задачу."
          action={<Link href="/catalog"><ButtonSecondary size="sm">Перейти в каталог</ButtonSecondary></Link>}
        />
      )}
      <div className="mt-6 text-right">
        <Link href="/catalog">
          <ButtonSecondary size="sm">Весь каталог</ButtonSecondary>
        </Link>
      </div>
    </section>
  );
}
