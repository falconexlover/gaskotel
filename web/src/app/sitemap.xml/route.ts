import { prisma } from "@/lib/prisma";
import { site } from "@/config/site";

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/catalog", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.8", changefreq: "monthly" },
  { path: "/service-centers", priority: "0.8", changefreq: "weekly" },
  { path: "/support/faq", priority: "0.7", changefreq: "monthly" },
  { path: "/news", priority: "0.8", changefreq: "weekly" },
  { path: "/careers", priority: "0.7", changefreq: "monthly" },
  { path: "/contacts", priority: "0.8", changefreq: "monthly" },
];

export async function GET() {
  // Получаем категории и продукты из БД
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.product.findMany({ select: { slug: true } }),
  ]);

  const categoryRoutes = categories.map((c) => ({
    path: `/catalog/${c.slug}`,
    priority: "0.8",
    changefreq: "weekly" as const,
  }));

  const productRoutes = products.map((p) => ({
    path: `/product/${p.slug}`,
    priority: "0.7",
    changefreq: "monthly" as const,
  }));

  const allRoutes = [...staticRoutes, ...categoryRoutes, ...productRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${site.url}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, { 
    headers: { 
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    } 
  });
}


