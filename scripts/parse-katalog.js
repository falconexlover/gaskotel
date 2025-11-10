#!/usr/bin/env node

/**
 * Utility script to convert the plain-text `katalog` dump into a structured JSON file
 * that can be consumed inside the Next.js application.
 *
 * Usage: node scripts/parse-katalog.js
 */

const fs = require("fs");
const path = require("path");

const INPUT_PATH = path.resolve(__dirname, "..", "katalog");
const OUTPUT_PATH = path.resolve(__dirname, "..", "web", "src", "data", "catalog.generated.json");

function readLines() {
  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  return raw.split(/\r?\n/).map((line) => line.trim());
}

function parseCategoryList(lines, fromIndex) {
  const categories = [];
  let index = fromIndex;
  if (lines[index] === "Каталог товаров") {
    index += 1;
  }

  while (index + 1 < lines.length) {
    const name = lines[index];
    if (!name) {
      index += 1;
      continue;
    }

    const next = lines[index + 1];
    const match = next && next.match(/^(.+?)\s*\((\d+)\)$/);
    if (match && match[1].trim() === name) {
      categories.push({
        title: name,
        count: Number(match[2])
      });
      index += 2;
      continue;
    }

    break;
  }

  return { categories, index };
}

function parseSubcategoryList(lines, fromIndex) {
  const subcategories = [];
  let index = fromIndex;

  while (index + 1 < lines.length) {
    const name = lines[index];
    if (!name) {
      index += 1;
      continue;
    }

    const next = lines[index + 1];
    const match = next && next.match(/^(.+?)\s*\((\d+)\)$/);
    if (match && match[1].trim() === name) {
      subcategories.push({
        title: name,
        count: Number(match[2])
      });
      index += 2;
      continue;
    }

    break;
  }

  return { subcategories, index };
}

const SKIP_PATTERNS = [
  /^Отображение/i,
  /^Представлено/i,
  /^Показано/i
];

function shouldSkipLine(line) {
  if (!line) {
    return true;
  }
  return SKIP_PATTERNS.some((pattern) => pattern.test(line));
}

function normalizePrice(value) {
  const priceText = value.replace(/\s+/g, "");
  const numeric = Number(priceText.replace(/[^\d.,-]/g, "").replace(/,/g, ""));
  return {
    text: priceText,
    value: Number.isFinite(numeric) ? numeric : null
  };
}

function parseProducts(options) {
  const {
    lines,
    startIndex,
    expectedCount,
    categoryTitle,
    stopNames
  } = options;

  const items = [];
  let index = startIndex;
  let buffer = [];
  const stopSet = new Set(stopNames || []);

  const priceRegex = /^\d[\d\s.,]*₽$/i;

  while (index < lines.length && (!expectedCount || items.length < expectedCount)) {
    const rawLine = lines[index];
    const line = rawLine;

    if (!line) {
      index += 1;
      continue;
    }

    if (line === categoryTitle && buffer.length === 0) {
      index += 1;
      continue;
    }

    if (stopSet.has(line) && buffer.length === 0) {
      // We hit the next subcategory without collecting the expected amount.
      break;
    }

    if (shouldSkipLine(line)) {
      index += 1;
      continue;
    }

    if (priceRegex.test(line)) {
      const infoLines = buffer.slice();
      buffer = [];
      if (!infoLines.length) {
        index += 1;
        continue;
      }

      const title = infoLines.pop();
      const description = infoLines.join(" ").trim();
      const { text, value } = normalizePrice(line);

      items.push({
        title,
        description: description || undefined,
        priceText: text,
        priceValue: value
      });

      index += 1;
      continue;
    }

    buffer.push(line);
    index += 1;
  }

  return { items, index };
}

function findNextOccurrence(lines, fromIndex, target) {
  for (let i = fromIndex; i < lines.length; i += 1) {
    if (lines[i] === target) {
      return i;
    }
  }
  return -1;
}

function parseCatalog(lines, topCategories) {
  const parsed = [];
  let index = 0;

  for (const category of topCategories) {
    const start = findNextOccurrence(lines, index, category.title);
    if (start === -1) {
      continue;
    }

    index = start + 1;

    const { subcategories, index: afterSubcategories } = parseSubcategoryList(lines, index);
    index = afterSubcategories;

    if (subcategories.length > 0) {
      const stopNames = subcategories.map((sub) => sub.title);
      const subcategoryData = [];

      for (const sub of subcategories) {
        const subStart = findNextOccurrence(lines, index, sub.title);
        if (subStart === -1) {
          continue;
        }

        index = subStart + 1;

        // Skip optional informational lines.
        while (index < lines.length && shouldSkipLine(lines[index])) {
          index += 1;
        }

        const { items, index: nextIndex } = parseProducts({
          lines,
          startIndex: index,
          expectedCount: sub.count,
          categoryTitle: category.title,
          stopNames
        });

        subcategoryData.push({
          title: sub.title,
          count: sub.count,
          items
        });

        index = nextIndex;
      }

      parsed.push({
        title: category.title,
        count: category.count,
        subcategories: subcategoryData
      });
    } else {
      while (index < lines.length && shouldSkipLine(lines[index])) {
        index += 1;
      }

      const { items, index: nextIndex } = parseProducts({
        lines,
        startIndex: index,
        expectedCount: category.count,
        categoryTitle: category.title
      });

      parsed.push({
        title: category.title,
        count: category.count,
        items
      });

      index = nextIndex;
    }
  }

  return parsed;
}

function main() {
  const lines = readLines();
  const { categories, index } = parseCategoryList(lines, 0);
  if (!categories.length) {
    console.error("Не удалось распознать список категорий.");
    process.exit(1);
  }

  const catalog = parseCatalog(lines.slice(index), categories);

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ categories: catalog }, null, 2), "utf8");

  console.log(`Каталог успешно сохранён в ${OUTPUT_PATH}`);
}

if (require.main === module) {
  main();
}
