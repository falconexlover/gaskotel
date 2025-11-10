import { prisma } from "@/lib/prisma";

export async function GET() {
  const cats = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
  return Response.json(cats);
}


