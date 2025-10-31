const routes = [
  "/",
  "/catalog",
  "/catalog/gazovye-kotly",
  "/catalog/tverdotoplivnye-kotly",
  "/catalog/pribory-ucheta",
  "/catalog/plity",
  "/catalog/aksessuary",
  "/product/kotyol-a24",
  "/product/kotyol-b12",
  "/product/plita-4g",
  "/product/dymohod-120",
  "/services",
  "/service-centers",
  "/support/faq",
  "/news",
  "/careers",
  "/contacts",
];

export function GET() {
  const base = "https://example.com";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${base}${r}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}


