import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.serviceCenter.findMany();
  return Response.json(items);
}


