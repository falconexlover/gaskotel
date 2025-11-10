/*
  Импорт новостей с https://www.gaskotel.ru/ru/category/novosti/
  Ограничение: парсится первая страница списка. При необходимости добавим пагинацию.
*/

/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const cheerio = require("cheerio");

const prisma = new PrismaClient();

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

async function parseNewsDetail(url) {
  try {
    const html = await fetchHtml(url);
    const $ = cheerio.load(html);
    // Основной контент: вёрстка WP, пробуем несколько контейнеров
    const contentEl = $(".entry-content, .content, article .article-back, .post, .single-post, .post-content").first();
    // Удалим навигацию и служебные элементы
    contentEl.find('script, style, nav, .breadcrumbs, .share, .tags, .post-meta, .wp-block-buttons, .aws-container').remove();
    const cover = $("meta[property='og:image']").attr("content") || contentEl.find("img").first().attr("src") || null;
    const firstP = contentEl.find("p").first().text().trim();
    const excerpt = firstP || null;
    const contentHtml = contentEl.html()?.trim() || null;
    return { contentHtml, excerpt, cover };
  } catch (e) {
    return { contentHtml: null, excerpt: null, cover: null };
  }
}

async function parseNewsList(html) {
  const $ = cheerio.load(html);
  const items = [];
  const monthMap = {
    "янв": 0, "фев": 1, "мар": 2, "апр": 3, "май": 4, "мая": 4, "июн": 5, "июл": 6, "авг": 7, "сен": 8, "сент": 8, "окт": 9, "ноя": 10, "дек": 11,
    "январ": 0, "феврал": 1, "март": 2, "апрел": 3, "июнь": 5, "июль": 6, "август": 7, "сентябр": 8, "октябр": 9, "ноябр": 10, "декабр": 11
  };
  function parseRuDate(text) {
    const t = (text || "").toLowerCase().trim();
    const m = t.match(/(\d{1,2})\s+([а-яё]+)/i);
    const y = t.match(/(\d{4})/);
    if (!m || !y) return null;
    const day = parseInt(m[1], 10);
    const monthKey = m[2].slice(0, 3);
    const month = monthMap[monthKey] ?? monthMap[m[2]];
    const year = parseInt(y[1], 10);
    if (Number.isNaN(day) || Number.isNaN(year) || month == null) return null;
    return new Date(Date.UTC(year, month, day));
  }

  $(".news-page article").each((_, el) => {
    const $el = $(el);
    const title = $el.find("p a b").first().text().trim();
    const href = $el.find("p a").first().attr("href")?.trim() || "";
    const dateText = $el.find(".col-sm-6 p").first().text().trim();
    if (!title) return;
    const date = parseRuDate(dateText) || new Date();
    const slug = slugify(title);
    const isPromo = /акци|скид|распродаж/i.test(title);
    items.push({ title, date, slug, isPromo, href });
  });
  return items;
}

async function main() {
  const base = "https://www.gaskotel.ru/ru/category/novosti/";
  let page = 1;
  let totalImported = 0;
  while (true) {
    const url = page === 1 ? base : `${base}page/${page}/`;
    console.log("Загружаю:", url);
    const html = await fetchHtml(url);
    const items = await parseNewsList(html);
    if (!items.length) break;
    console.log(`Найдено записей: ${items.length}`);

    for (const n of items) {
      let detail = { contentHtml: null, excerpt: null, cover: null };
      if (n.href) {
        detail = await parseNewsDetail(n.href);
      }
      const data = {
        title: n.title,
        date: n.date,
        isPromo: n.isPromo,
        excerpt: detail.excerpt,
        content: detail.contentHtml,
        coverImage: detail.cover,
        sourceUrl: n.href || null,
      };
      try {
        await prisma.news.upsert({
          where: { slug: n.slug },
          update: data,
          create: { slug: n.slug, ...data },
        });
        console.log("✔", n.title);
        totalImported++;
      } catch (e) {
        console.warn("✖ Ошибка записи:", n.title, e.message);
      }
    }

    page++;
    if (page > 50) break; // предохранитель
  }
  console.log(`Итого импортировано/обновлено: ${totalImported}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


