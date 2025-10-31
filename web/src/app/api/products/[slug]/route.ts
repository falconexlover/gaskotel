import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const item = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, documents: true, attributes: { include: { attribute: true } }, category: true },
  });
  if (!item) return new Response("Not found", { status: 404 });
  return Response.json(item);
}


