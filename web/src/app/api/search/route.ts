import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim();

  if (!q || q.length === 0) {
    return Response.json({ items: [], total: 0 });
  }

  const searchTerm = q.toLowerCase();

  // Поиск по названию, описанию и атрибутам
  // SQLite не поддерживает insensitive mode, поэтому используем contains
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { description: { contains: q } },
        {
          attributes: {
            some: {
              valueString: { contains: q },
            },
          },
        },
      ],
    },
    include: {
      images: { take: 1 },
      category: true,
      attributes: { include: { attribute: true } },
    },
    take: 50,
  });

  // Преобразуем данные для ответа
  const items = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    description: p.description,
    image: p.images[0]?.url,
    category: p.category.name,
  }));

  return Response.json({ items, total: items.length });
}

