import { PrismaClient } from "@prisma/client";
import { PRODUCTS } from "../src/data/products";
import { SERVICE_CENTERS } from "../src/data/serviceCenters";

const prisma = new PrismaClient();

async function main() {
  const catMap: Record<string, number> = {};
  const cats = [
    { slug: "gazovye-kotly", name: "Газовые котлы" },
    { slug: "tverdotoplivnye-kotly", name: "Твердотопливные котлы" },
    { slug: "pribory-ucheta", name: "Приборы учета" },
    { slug: "plity", name: "Газовые плиты" },
    { slug: "aksessuary", name: "Аксессуары" },
  ];
  for (const c of cats) {
    const created = await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
    catMap[c.slug] = created.id;
  }

  for (const p of PRODUCTS) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description ?? null,
        price: p.price ?? null,
        categoryId: catMap[p.category],
      },
    });
    if (p.images) {
      await prisma.image.createMany({ data: p.images.map((url) => ({ url, productId: product.id })) });
    }
    if (p.documents) {
      await prisma.document.createMany({ data: p.documents.map((d) => ({ title: d.title, url: d.url, type: "file", productId: product.id })) });
    }
    if (p.attributes) {
      for (const [name, value] of Object.entries(p.attributes)) {
        const code = name;
        const attr = await prisma.attribute.upsert({ where: { code }, update: {}, create: { code, name, type: "string" } });
        await prisma.attributeValue.create({ data: { productId: product.id, attributeId: attr.id, valueString: String(value) } });
      }
    }
  }

  for (const c of SERVICE_CENTERS) {
    await prisma.serviceCenter.upsert({
      where: { extId: c.id },
      update: {},
      create: {
        extId: c.id,
        name: c.name,
        city: c.city,
        address: c.address,
        lat: c.lat,
        lng: c.lng,
        phone: c.phone,
        services: c.services.join(","),
      },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});


