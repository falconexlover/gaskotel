import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

export async function RelatedProducts({ productSlug, categorySlug }: { productSlug: string; categorySlug: string }) {
  const related = await prisma.product.findMany({
    where: {
      category: { slug: categorySlug },
      slug: { not: productSlug },
    },
    include: { images: { take: 1 }, category: true },
    take: 3,
  });

  if (related.length === 0) return null;

  const products = related.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description ?? undefined,
    price: p.price ?? undefined,
    category: p.category.slug as any,
    images: p.images.map((i) => i.url),
  }));

  return (
    <section className="mt-8">
      <SectionTitle title="Похожие товары" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
