import { PRODUCTS, Product } from "@/data/products";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/ProductCard";

export function RelatedProducts({ product }: { product: Product }) {
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <section className="mt-8">
      <SectionTitle title="Похожие товары" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}


