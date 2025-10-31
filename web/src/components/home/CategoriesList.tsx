"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";

export function CategoriesList() {
  const [cats, setCats] = useState<any[]>([]);
  const [promoCount, setPromoCount] = useState<number>(0);
  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCats(data));
    fetch('/api/products?promo=1&perPage=1')
      .then((r) => r.json())
      .then((data) => setPromoCount(Number(data?.total || 0)));
  }, []);
  return (
    <Card>
      <div className="mb-2 font-medium text-zinc-900 dark:text-zinc-100">Категории</div>
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        <a href="/promo" className="flex items-center justify-between px-1.5 py-2 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60 first:pt-0 last:pb-0 rounded-md">
          <div className="truncate text-sm text-zinc-800 dark:text-zinc-200">Акционные товары</div>
          <span className="ml-3 inline-flex min-w-7 justify-center rounded-full bg-[var(--primary-50)] px-2 py-0.5 text-xs text-[var(--primary-700)]">{promoCount}</span>
        </a>
        {cats.map((c) => (
          <a key={c.slug} href={`/catalog/${c.slug}`} className="flex items-center justify-between px-1.5 py-2 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60 first:pt-0 last:pb-0 rounded-md">
            <div className="truncate text-sm text-zinc-800 dark:text-zinc-200">{c.name}</div>
            <span className="ml-3 inline-flex min-w-7 justify-center rounded-full bg-[var(--primary-50)] px-2 py-0.5 text-xs text-[var(--primary-700)]">{c._count?.products ?? 0}</span>
          </a>
        ))}
      </div>
    </Card>
  );
}


