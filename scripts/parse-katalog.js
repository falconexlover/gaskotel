#!/usr/bin/env node

// Simple parser for the plain-text `katalog` file -> JSON.
// Outputs `web/src/data/catalog.generated.json` with { categories, products }.

const fs = require('fs');
const path = require('path');

const INPUT_PATH = path.resolve('/root/GASKOTEL/katalog');
const OUTPUT_DIR = path.resolve('/root/GASKOTEL/web/src/data');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'catalog.generated.json');

/**
 * Transliterate RU → slug (kebab-case). Covers common Cyrillic letters.
 */
function slugify(input) {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
    э: 'e', ю: 'yu', я: 'ya',
  };
  const lower = String(input).toLowerCase();
  const transliterated = Array.from(lower)
    .map((ch) => map[ch] ?? ch)
    .join('');
  return transliterated
    .replace(/[^a-z0-9\s-_]/g, ' ')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isEmpty(line) {
  return !line || !line.trim();
}

function isPagination(line) {
  return /^Отображение\s+\d+/.test(line.trim());
}

function isPresentedCount(line) {
  return /^Представлено\s+\d+\s+тов/.test(line.trim());
}

function extractCount(line) {
  const m = line.match(/\((\d+)\)\s*$/);
  return m ? parseInt(m[1], 10) : undefined;
}

function isPriceLine(line) {
  return /₽\s*$/.test(line.trim());
}

function parsePrice(line) {
  const digits = line
    .replace(/[^0-9,\.]/g, '')
    .replace(/\.(?=\d{3}(\D|$))/g, '') // remove thousand separators like 1,000.00 or 1.000,00 (rough)
    .replace(/,(?=\d{3}(\D|$))/g, '')
    .replace(',', '.');
  const n = Number(digits);
  return Number.isFinite(n) ? n : null;
}

function isSectionLike(line) {
  const trimmed = line.trim();
  if (isEmpty(trimmed)) return false;
  if (isPagination(trimmed)) return false;
  if (isPresentedCount(trimmed)) return false;
  if (isPriceLine(trimmed)) return false;
  if (/^Серия\s+/i.test(trimmed)) return true; // treat as subcategory
  if (/^Каталог товаров$/i.test(trimmed)) return true;
  if (/^[А-Яа-яA-Za-z0-9].*/.test(trimmed)) return true;
  return false;
}

function main() {
  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`Input not found: ${INPUT_PATH}`);
    process.exit(1);
  }
  const text = fs.readFileSync(INPUT_PATH, 'utf8');
  const lines = text.split(/\r?\n/);

  /** @type {Array<{ id: string, title: string, count?: number, parentId?: string }>} */
  const categories = [];
  /** @type {Array<{ id: string, title: string, price: number, currency: string, categoryId: string, availability: string }>} */
  const products = [];

  const catStack = []; // store categoryIds as a simple stack (shallow hierarchy heuristic)

  // Simple registry to avoid duplicate categories by title path
  const pathToCategoryId = new Map();

  let productTitleBuffer = [];

  function ensureCategory(pathParts) {
    const key = pathParts.join(' > ');
    if (pathToCategoryId.has(key)) return pathToCategoryId.get(key);
    const title = pathParts[pathParts.length - 1];
    const idBase = slugify(title);
    let id = idBase || `cat-${categories.length + 1}`;
    // ensure unique id
    let suffix = 1;
    while (categories.some((c) => c.id === id)) {
      id = `${idBase}-${suffix++}`;
    }
    const parentId = pathParts.length > 1 ? ensureCategory(pathParts.slice(0, -1)) : undefined;
    categories.push({ id, title, parentId });
    pathToCategoryId.set(key, id);
    return id;
  }

  function pushSection(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    const id = ensureCategory([trimmed]);
    // reset stack to only this top-level for simplicity
    catStack.length = 0;
    catStack.push(id);
  }

  function pushSubSection(title) {
    const trimmed = title.trim();
    if (!trimmed) return;
    const parentId = catStack[0];
    const parentTitle = categories.find((c) => c.id === parentId)?.title || '';
    const id = ensureCategory([parentTitle, trimmed]);
    // set current active to subsection
    catStack.length = 0;
    catStack.push(id);
  }

  // First pass: detect and register categories by adjacency heuristics
  for (let i = 0; i < lines.length; i++) {
    const cur = (lines[i] || '').trim();
    const next = (lines[i + 1] || '').trim();
    if (isEmpty(cur)) continue;
    if (isPagination(cur) || isPresentedCount(cur) || isPriceLine(cur)) continue;
    if (/^Серия\s+/i.test(cur)) {
      // Will be handled when a top category exists; skip until second pass
      continue;
    }
    if (
      /(\(\d+\))$/.test(next) ||
      isPagination(next) ||
      /^Представлено\s+\d+/.test(next) ||
      /^Серия\s+/i.test(next)
    ) {
      pushSection(cur);
    }
  }

  // Second pass: assign counts, subsections, and products
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (isEmpty(line)) continue;

    // Count updates on the immediately preceding section-like lines
    const count = extractCount(line);
    if (typeof count === 'number') {
      // Try assign to the latest category
      if (catStack.length > 0) {
        const currentId = catStack[catStack.length - 1];
        const cat = categories.find((c) => c.id === currentId);
        if (cat) cat.count = count;
      }
      continue;
    }

    if (isPagination(line) || isPresentedCount(line)) {
      // skip pagination / presented count lines entirely
      continue;
    }

    if (isPriceLine(line)) {
      const price = parsePrice(line);
      if (price != null && productTitleBuffer.length > 0) {
        const title = productTitleBuffer.join('. ').trim();
        productTitleBuffer = [];
        const categoryId = catStack[catStack.length - 1] || ensureCategory(['Прочее']);
        const idBase = slugify(title);
        let id = idBase || `prod-${products.length + 1}`;
        let suffix = 1;
        while (products.some((p) => p.id === id)) {
          id = `${idBase}-${suffix++}`;
        }
        products.push({
          id,
          title,
          price,
          currency: 'RUB',
          categoryId,
          availability: 'in_stock',
        });
      }
      continue;
    }

    // Non-price, non-pagination lines. Decide if section/subsection or product title part.
    if (/^Серия\s+/i.test(line)) {
      // Treat as subsection under current top category
      pushSubSection(line.replace(/^Серия\s+/i, '').trim());
      continue;
    }

    if (/^Каталог товаров$/i.test(line)) {
      pushSection('Каталог товаров');
      continue;
    }

    // Heuristic: treat a line as a category if the next line is a count in parentheses or pagination or a subsection marker
    const next = (lines[i + 1] || '').trim();
    if (
      /(\(\d+\))$/.test(next) ||
      isPagination(next) ||
      /^Представлено\s+\d+/.test(next) ||
      /^Серия\s+/i.test(next)
    ) {
      pushSection(line);
      continue;
    }

    if (/^Санфаянс\. Мебель для ванной$/i.test(line)) {
      pushSubSection('Санфаянс. Мебель для ванной');
      continue;
    }

    // Everything else: likely part of product title
    productTitleBuffer.push(line);
  }

  // Ensure output directory
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const payload = { categories, products, generatedAt: new Date().toISOString() };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Written: ${OUTPUT_PATH}`);
  console.log(`Categories: ${categories.length}, Products: ${products.length}`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}


