import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const promo = url.searchParams.get("promo");
  const category = url.searchParams.get("category");
  const page = Number(url.searchParams.get("page") || 1);
  const perPage = Number(url.searchParams.get("perPage") || 50);
  const where: any = {};
  if (promo === "1" || promo === "true") where.isPromo = true;
  if (category) where.category = { slug: category };
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: true, attributes: { include: { attribute: true } }, category: true },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.product.count({ where }),
  ]);
  return Response.json({ items, total, page, perPage });
}


