import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Tabs } from "./Tabs";
import { ProductGallery } from "@/components/ProductGallery";
import { RelatedProducts } from "@/components/RelatedProducts";
import { Reviews } from "@/components/Reviews";
import { ProductActions } from "@/components/ProductActions";
import { prisma } from "@/lib/prisma";
import { site } from "@/config/site";

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { images: true, documents: true, attributes: { include: { attribute: true } }, category: true },
  });
  return product;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) {
    return {
      title: "Товар не найден",
    };
  }

  const price = product.price ? `${product.price.toLocaleString("ru-RU")} ₽` : undefined;
  const description = product.description || `Купить ${product.name} по выгодной цене. ${site.name} - качественное отопительное оборудование.`;

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      type: "product",
      images: product.images.length > 0 ? [{ url: product.images[0].url, alt: product.name }] : [],
      ...(price && { priceAmount: String(product.price), priceCurrency: "RUB" }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const db = await getProduct(params.slug);
  if (!db) return notFound();
  const attributes = Object.fromEntries((db.attributes ?? []).map((av: any) => [av.attribute.name, av.valueString ?? av.valueNumber ?? av.valueBool ?? ""])) as Record<string, string>;
  const product = {
    slug: db.slug,
    name: db.name,
    price: db.price ?? undefined,
    description: db.description ?? undefined,
    images: (db.images ?? []).map((i: any) => i.url),
    documents: (db.documents ?? []).map((d: any) => ({ title: d.title, url: d.url })),
    attributes,
  } as const;

  return (
    <main className="space-y-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <div className="md:w-2/3 space-y-6">
          <ProductGallery images={product.images} />
          <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
          <ProductActions slug={product.slug} />
          {product.description && (
            <p className="mt-2 max-w-2xl text-zinc-700 dark:text-zinc-300">{product.description}</p>
          )}
          <Tabs characteristics={product.attributes} documents={product.documents} />
        </div>
        <aside className="md:w-1/3">
          {product.price && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="text-3xl font-semibold">
                {product.price.toLocaleString("ru-RU")} ₽
              </div>
              <div className="mt-4 grid gap-2">
                <Button className="w-full">Запросить предложение</Button>
                <a href="#docs" className="text-center text-sm text-[var(--primary-700)] underline underline-offset-2 hover:text-[var(--primary-800)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:text-[var(--primary-300)]">Скачать документы</a>
              </div>
            </div>
          )}
          {product.documents && product.documents.length > 0 && (
            <div id="docs" className="mt-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Документы</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {product.documents.map((d) => (
                  <li key={d.title}>
                    <a href={d.url} className="group inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60">
                      <span className="i">📄</span>
                      <span className="text-zinc-800 group-hover:underline dark:text-zinc-100">{d.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
      <RelatedProducts productSlug={product.slug} categorySlug={db.category.slug} />
      <Reviews />
    </main>
  );
}


