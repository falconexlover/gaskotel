import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.serviceCenter.findMany();
  return Response.json(items);
}


