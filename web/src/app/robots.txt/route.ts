import { site } from "@/config/site";

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${site.url}/sitemap.xml`;
  return new Response(body, { 
    headers: { 
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    } 
  });
}


