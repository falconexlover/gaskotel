import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const cats = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });
  return Response.json(cats);
}


