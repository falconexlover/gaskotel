import Link from "next/link";
import { Product } from "@/data/products";
import { Card, CardItem } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { PlaceholderProduct } from "@/components/icons/Placeholder";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">Товар</div>
        </div>
        <div className="mb-4 overflow-hidden rounded-lg border border-zinc-100 transition-colors group-hover:border-zinc-200 dark:border-zinc-800 dark:group-hover:border-zinc-700">
          <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            {/* Здесь может быть Image при появлении данных изображений */}
            <PlaceholderProduct className="w-16 h-16 text-zinc-400 transition-transform duration-300 group-hover:scale-[1.03]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 to-[var(--primary-50)] opacity-80 transition-opacity duration-300 group-hover:opacity-100 dark:from-transparent dark:to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:from-black/[.03]" />
          </div>
        </div>
        <CardItem
          title={product.name}
          subtitle={product.description && (
            <span className="line-clamp-2 text-zinc-700 dark:text-zinc-400">{product.description}</span>
          )}
          right={<Price value={product.price} />}
        />
      </Card>
    </Link>
  );
}


