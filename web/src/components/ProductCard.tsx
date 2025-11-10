"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/data/products";
import { Card, CardItem } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Price } from "@/components/ui/Price";
import { PlaceholderProduct } from "@/components/icons/Placeholder";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export function ProductCard({ product, loading }: { product?: Product; loading?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (loading) {
    return <ProductCardSkeleton />;
  }

  if (!product) return null;

  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Товар</div>
          {product.category && (
            <Badge color="primary" className="text-[10px] px-1.5 py-0">
              {product.category}
            </Badge>
          )}
        </div>
        <div className="mb-4 overflow-hidden rounded-lg border border-zinc-100 transition-all duration-300 group-hover:border-zinc-300 group-hover:shadow-md dark:border-zinc-800 dark:group-hover:border-zinc-700">
          <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center overflow-hidden">
            {imageUrl && !imageError ? (
              <>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoading(false)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlaceholderProduct className="w-16 h-16 text-zinc-400 animate-pulse" />
                  </div>
                )}
              </>
            ) : (
              <PlaceholderProduct className="w-16 h-16 text-zinc-400 transition-transform duration-300 group-hover:scale-110" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-[var(--primary-50)] opacity-0 transition-opacity duration-300 group-hover:opacity-20 dark:to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/0 via-black/0 to-black/0 transition-all duration-300 group-hover:from-black/[.05]" />
          </div>
        </div>
        <CardItem
          title={<span className="group-hover:text-[var(--primary-700)] dark:group-hover:text-[var(--primary-400)] transition-colors duration-200">{product.name}</span>}
          subtitle={product.description && (
            <span className="line-clamp-2 text-zinc-700 dark:text-zinc-400 mt-1">{product.description}</span>
          )}
          right={<Price value={product.price} />}
        />
      </Card>
    </Link>
  );
}


