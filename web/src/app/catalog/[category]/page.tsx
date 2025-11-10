import { notFound } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CategoryClient, type SerializedProduct } from "./CategoryClient";

const CATEGORY_TITLES: Record<string, string> = {
  "gazovye-kotly": "Газовые котлы",
  "tverdotoplivnye-kotly": "Твердотопливные котлы",
  "pribory-ucheta": "Приборы учета",
  "ustrojstva-gazogorelochnye": "Газогорелочные устройства",
  avtomatika: "Автоматика",
  "bak-teploobmennik": "Баки и теплообменники",
  plity: "Газовые плиты",
  aksessuary: "Аксессуары",
};

type ProductWithAttributes = Prisma.ProductGetPayload<{
  include: {
    attributes: {
      include: { attribute: true };
    };
  };
}>;

function serializeProducts(products: ProductWithAttributes[]): SerializedProduct[] {
  return products.map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    price: p.price == null ? null : Number(p.price),
    attributes: (p.attributes ?? []).map((attr) => ({
      name: attr.attribute.name,
      valueString: attr.valueString,
      valueNumber: attr.valueNumber == null ? null : Number(attr.valueNumber),
      valueBool: attr.valueBool,
    })),
  }));
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category;

  const products = await prisma.product.findMany({
    where: { category: { slug: category } },
    include: {
      attributes: {
        include: { attribute: true },
      },
    },
    take: 500,
  });

  if (products.length === 0) {
    notFound();
  }

  const title = CATEGORY_TITLES[category] ?? "Категория";

  return (
    <CategoryClient
      key={category}
      category={category}
      title={title}
      initialItems={serializeProducts(products)}
    />
  );
}
