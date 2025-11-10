/* eslint-disable no-console */
// Импорт каталога из двух источников: основной сайт (раздел «Продукция» / product-category/*)
// и интернет-магазин shop.gaskotel.ru. Слияние по SKU (Артикул) или по названию.

const { PrismaClient } = require("@prisma/client");
const cheerio = require("cheerio");

const prisma = new PrismaClient();

const SITE_ROOT = "https://www.gaskotel.ru/ru/";
const SHOP_ROOT = "https://shop.gaskotel.ru/";

function slugify(str) {
  const from = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const to   = "abvgdeezhziyklmnoprstufkhtschshsh_y_eua";
  const map = {};
  for (let i = 0; i < from.length; i++) map[from[i]] = to[i];
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[а-яё]/g, (c) => map[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "ZMZ Import Bot/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return await res.text();
}

function normalizeUrl(u) {
  try { const x = new URL(u); return x.toString(); } catch { return null; }
}

function extractSkuFromText(t) {
  if (!t) return null;
  const m = t.match(/(Артикул|Код|SKU)[:\s#]*([\w.-]+)/i);
  return m ? m[2] : null;
}

async function upsertCategory({ slug, name, description, sourceUrl }) {
  return prisma.category.upsert({
    where: { slug },
    update: { name, description, sourceUrl },
    create: { slug, name, description, sourceUrl },
  });
}

async function ensureUniqueSlug(baseSlug) {
  let s = baseSlug;
  let i = 1;
  // try 30 attempts
  while (i < 30) {
    const exists = await prisma.product.findUnique({ where: { slug: s } });
    if (!exists) return s;
    s = `${baseSlug}-${i++}`;
  }
  return `${baseSlug}-${Date.now()}`;
}

async function upsertProduct({ slug, name, description, price, categoryId, sku, sourceUrl, shopUrl, images, documents, attributes }) {
  // 1) найти по SKU
  let found = null;
  if (sku) {
    found = await prisma.product.findFirst({ where: { sku } });
  }
  // 2) иначе по slug
  if (!found) {
    found = await prisma.product.findUnique({ where: { slug } });
  }
  // 3) иначе по имени внутри категории как эвристика
  if (!found) {
    found = await prisma.product.findFirst({ where: { name, categoryId } });
  }

  let product;
  if (found) {
    product = await prisma.product.update({
      where: { id: found.id },
      data: { name, description, price, categoryId, sku: sku ?? found.sku, sourceUrl: sourceUrl ?? found.sourceUrl, shopUrl: shopUrl ?? found.shopUrl },
    });
  } else {
    const finalSlug = await ensureUniqueSlug(slug);
    product = await prisma.product.create({
      data: { slug: finalSlug, name, description, price, categoryId, sku, sourceUrl, shopUrl },
    });
  }

  // Images (replace)
  if (images && images.length) {
    await prisma.image.deleteMany({ where: { productId: product.id } });
    for (const url of images.slice(0, 12)) {
      await prisma.image.create({ data: { productId: product.id, url } });
    }
  }

  // Documents (replace)
  if (documents && documents.length) {
    await prisma.document.deleteMany({ where: { productId: product.id } });
    for (const d of documents.slice(0, 20)) {
      await prisma.document.create({ data: { productId: product.id, title: d.title || "Документ", url: d.url, type: d.type || "file" } });
    }
  }

  // Attributes (replace simple strings)
  if (attributes && Object.keys(attributes).length) {
    await prisma.attributeValue.deleteMany({ where: { productId: product.id } });
    for (const [name, value] of Object.entries(attributes)) {
      const code = slugify(name);
      const attr = await prisma.attribute.upsert({
        where: { code },
        update: { name, type: "string" },
        create: { code, name, type: "string" },
      });
      await prisma.attributeValue.create({ data: { productId: product.id, attributeId: attr.id, valueString: String(value) } });
    }
  }

  return product;
}

async function parseProductPage(url) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const name = $("h1").first().text().trim() || $(".product_title").first().text().trim();
  const description = $(".entry-content, .product, .summary, .content").first().find("p, ul, ol").slice(0, 6).toArray().map((el) => $(el).text().trim()).join("\n\n");
  const textAll = $("body").text();
  const sku = extractSkuFromText($(".sku").text()) || extractSkuFromText(textAll);
  const images = Array.from(new Set([
    $("meta[property='og:image']").attr("content"),
    ...$("img").toArray().map((el) => $(el).attr("src")),
  ].filter(Boolean)));
  const documents = $("a[href$='.pdf'], a[href$='.PDF']").toArray().map((el) => ({ title: $(el).text().trim() || "PDF", url: $(el).attr("href"), type: "pdf" }));
  // Грубый парсинг таблицы характеристик
  const attributes = {};
  $("table tr").each((_, tr) => {
    const key = $(tr).find("th, td").eq(0).text().trim();
    const val = $(tr).find("td").eq(1).text().trim();
    if (key && val) attributes[key] = val;
  });
  return { name, description, sku, images, documents, attributes };
}

async function crawlCategoryList(url) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items = [];
  // Woo шаблоны каталога
  $(".products .product a.woocommerce-LoopProduct-link, .products .product a").each((_, a) => {
    const href = $(a).attr("href");
    if (href && /\/ru\//.test(href)) items.push(href);
  });
  // Старые шаблоны
  $(".product a, .entry a").each((_, a) => {
    const href = $(a).attr("href");
    if (href && /\/ru\//.test(href) && /\/(product|ru)\//.test(href)) items.push(href);
  });
  return Array.from(new Set(items));
}

async function crawlShopList(url) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const items = [];
  $("a.woocommerce-LoopProduct-link, a.product-thumbnail").each((_, a) => {
    const href = $(a).attr("href");
    if (href && /shop\.gaskotel\.ru/.test(href)) items.push(href);
  });
  return Array.from(new Set(items));
}

async function discoverSiteCategories() {
  const toVisit = new Set([SITE_ROOT]);
  const visited = new Set();
  const cats = new Set();
  const maxPages = 40;
  while (toVisit.size && visited.size < maxPages) {
    const url = Array.from(toVisit)[0];
    toVisit.delete(url);
    if (visited.has(url)) continue;
    visited.add(url);
    try {
      const html = await fetchHtml(url);
      const $ = cheerio.load(html);
      $("a[href]").each((_, a) => {
        const href = normalizeUrl($(a).attr("href"));
        if (!href) return;
        if (!href.startsWith("https://www.gaskotel.ru/")) return;
        if (/\/ru\/product-category\//.test(href)) cats.add(href.replace(/#.*/, ""));
        if (/\/ru\//.test(href) && !visited.has(href)) toVisit.add(href);
      });
    } catch {}
  }
  return Array.from(cats);
}

async function discoverShopCategories() {
  const start = SHOP_ROOT;
  const html = await fetchHtml(start);
  const $ = cheerio.load(html);
  const cats = new Set();
  $("a[href*='/product-category/']").each((_, a) => {
    const href = normalizeUrl($(a).attr("href"));
    if (href && href.startsWith(SHOP_ROOT)) cats.add(href.replace(/#.*/, ""));
  });
  return Array.from(cats);
}

async function crawlCategoryWithPagination(url, isShop = false) {
  const results = new Set();
  let page = 1;
  while (true) {
    const pagedUrl = isShop
      ? (url.includes("?") ? `${url}&paged=${page}` : `${url}?paged=${page}`)
      : (page === 1 ? url : `${url}page/${page}/`);
    try {
      const html = await fetchHtml(pagedUrl);
      const $ = cheerio.load(html);
      const list = isShop ? await crawlShopList(pagedUrl) : await crawlCategoryList(pagedUrl);
      if (!list.length) break;
      list.forEach((x) => results.add(x));
      page++;
      if (page > 50) break;
    } catch { break; }
  }
  return Array.from(results);
}

async function parseShopProduct(url) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const name = $(".product_title").first().text().trim() || $("h1").first().text().trim();
  const priceText = $("p.price, .price").first().text().replace(/[^0-9]/g, "").trim();
  const price = priceText ? parseInt(priceText, 10) : null;
  const sku = extractSkuFromText($(".sku").text()) || extractSkuFromText($("body").text());
  const images = Array.from(new Set([
    $("meta[property='og:image']").attr("content"),
    ...$(".woocommerce-product-gallery img, img").toArray().map((el) => $(el).attr("src")),
  ].filter(Boolean)));
  return { name, price, sku, images };
}

async function main() {
  let total = 0;

  // 1) Автообход категорий основного сайта
  const siteCats = await discoverSiteCategories();
  console.log("Найдено категорий (site):", siteCats.length);
  for (const catUrl of siteCats) {
    try {
      console.log("Категория:", catUrl);
      const catSlug = slugify(catUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""));
      const catName = (catUrl.split("/").filter(Boolean).pop() || "Категория").replace(/[-_]+/g, " ");
      const cat = await upsertCategory({ slug: catSlug, name: catName, description: null, sourceUrl: catUrl });
      const list = await crawlCategoryWithPagination(catUrl, false);
      console.log("Товаров найдено:", list.length);
      for (const pUrl of list) {
        try {
          const p = await parseProductPage(pUrl);
          const slug = slugify(p.name || pUrl.split("/").filter(Boolean).pop());
          await upsertProduct({
            slug,
            name: p.name,
            description: p.description,
            price: null,
            categoryId: cat.id,
            sku: p.sku,
            sourceUrl: pUrl,
            shopUrl: null,
            images: p.images,
            documents: p.documents,
            attributes: p.attributes,
          });
          total++;
          console.log("✔", p.name);
        } catch (e) {
          console.warn("✖ Товар ошибка:", pUrl, e.message);
        }
      }
    } catch (e) {
      console.warn("✖ Категория ошибка:", catUrl, e.message);
    }
  }

  // 2) Интернет-магазин (цены/картинки), сопоставление по SKU/названию
  const shopCats = await discoverShopCategories();
  console.log("Найдено категорий (shop):", shopCats.length);
  for (const shopUrl of shopCats) {
    try {
      console.log("Магазин:", shopUrl);
      const items = await crawlCategoryWithPagination(shopUrl, true);
      console.log("Товаров найдено (shop):", items.length);
      for (const url of items) {
        try {
          const s = await parseShopProduct(url);
          if (!s.name) continue;
          let product = null;
          if (s.sku) {
            product = await prisma.product.findFirst({ where: { sku: s.sku } });
          }
          if (!product) {
            product = await prisma.product.findFirst({ where: { name: s.name } });
          }
          if (!product) {
            // создаём в техкатегории, если не нашли
            const cat = await upsertCategory({ slug: "shop-import", name: "Импорт из магазина", description: null, sourceUrl: shopUrl });
            product = await upsertProduct({
              slug: slugify(s.name),
              name: s.name,
              description: null,
              price: s.price,
              categoryId: cat.id,
              sku: s.sku,
              sourceUrl: null,
              shopUrl: url,
              images: s.images,
              documents: [],
              attributes: {},
            });
          } else {
            await prisma.product.update({ where: { id: product.id }, data: { price: s.price ?? product.price, shopUrl: url } });
            if (s.images?.length) {
              const existing = await prisma.image.findMany({ where: { productId: product.id } });
              if (existing.length === 0) {
                for (const img of s.images.slice(0, 8)) {
                  await prisma.image.create({ data: { productId: product.id, url: img } });
                }
              }
            }
          }
        } catch (e) {
          console.warn("✖ Shop товар ошибка:", url, e.message);
        }
      }
    } catch (e) {
      console.warn("✖ Магазин ошибка:", shopUrl, e.message);
    }
  }

  console.log(`Итого обработано товаров: ${total}`);
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(async () => { await prisma.$disconnect(); });


