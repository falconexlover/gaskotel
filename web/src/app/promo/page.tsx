"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardItem } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { Price } from "@/components/ui/Price";

export default function PromoPage() {
  const [data, setData] = useState<{ items: any[]; total: number; page: number; perPage: number }>({ items: [], total: 0, page: 1, perPage: 16 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 16;

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?promo=1&page=${page}&perPage=${perPage}`)
      .then((r) => r.json())
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [page]);

  const start = (page - 1) * perPage;
  const items = data.items;
  const total = data.total;

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Акционные товары</h1>
      {!loading && (
        <div className="text-sm text-zinc-600">Отображение {Math.min(start + 1, total)}–{Math.min(start + items.length + start, total)} из {total}</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link key={p.slug} href={`/product/${p.slug}`}>
            <Card>
              <CardItem
                title={p.name}
                right={<Price value={p.price ?? undefined} />}
                subtitle={p.description && <span className="line-clamp-2 text-zinc-700">{p.description}</span>}
              />
            </Card>
          </Link>
        ))}
      </div>
      {!loading && (
        <div onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t.tagName === 'BUTTON' && t.textContent) {
            const num = Number(t.textContent);
            if (!Number.isNaN(num)) setPage(num);
          }
        }}>
          <Pagination total={total} perPage={perPage} />
        </div>
      )}
    </main>
  );
}


