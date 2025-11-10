require('ts-node/register/transpile-only');
const { PrismaClient } = require('@prisma/client');
const { PRODUCTS } = require('../src/data/products');
const { SERVICE_CENTERS } = require('../src/data/serviceCenters');

const prisma = new PrismaClient();

async function main() {
  const cats = [
    { slug: 'promo', name: 'Акционные товары' },
    { slug: 'napolnye-gazovye-kotly', name: 'Напольные газовые котлы' },
    { slug: 'tverdotoplivnye-kotly', name: 'Твердотопливные котлы' },
    { slug: 'nastennye-gazovye-kotly', name: 'Настенные газовые котлы' },
    { slug: 'ustrojstva-gazogorelochnye', name: 'Устройства газогорелочные' },
    { slug: 'tovary-dlya-doma', name: 'Товары для дома' },
    { slug: 'sadovyj-inventar', name: 'Садовый инвентарь' },
    { slug: 'udobreniya', name: 'Удобрения' },
    { slug: 'posuda-tovary-dlya-kuhni', name: 'Посуда. Товары для кухни' },
    { slug: 'santehnika', name: 'Сантехника' },
    { slug: 'instrumenty', name: 'Инструменты' },
    { slug: 'lakokrasochnaya-produkciya', name: 'Лакокрасочная продукция' },
    { slug: 'elementy-teplo-vodo-gazosnabzheniya', name: 'Элементы систем тепло-, водо- и газоснабжения' },
    { slug: 'produkty-pitaniya', name: 'Продукты питания' },
    { slug: 'ballony-gazovye', name: 'Баллоны газовые' },
    { slug: 'shlangi-gazovye', name: 'Шланги газовые' },
    { slug: 'dymohod', name: 'Дымоход' },
    { slug: 'vozduhoochistiteli', name: 'Воздухоочистители' },
    { slug: 'plity', name: 'Плиты' },
    { slug: 'vodonagrevateli-bojlery', name: 'Водонагреватели, бойлеры' },
    { slug: 'kalorifery-obogrevateli-konvektory', name: 'Калориферы, обогреватели и конвекторы' },
    { slug: 'zapchasti', name: 'Запасные части' },
    { slug: 'gidroakkumulyatory', name: 'Гидроаккумуляторы' },
    { slug: 'rasshiritelnye-baki', name: 'Расширительные баки' },
    { slug: 'membrannye-baki', name: 'Мембранные баки' },
    { slug: 'mojki-vysokogo-davleniya', name: 'Мойки высокого давления' },
    { slug: 'nasosy-stancii', name: 'Насосы, насосные станции' },
    { slug: 'pribory-ucheta', name: 'Приборы учета' },
    { slug: 'filtraciya-ochistka-vody', name: 'Средства фильтрации и очистки воды' },
    { slug: 'tovary-dlya-otdyha', name: 'Товары для отдыха' },
    { slug: 'polotencесushiteli', name: 'Полотенцесушители' },
    { slug: 'tovary-dlya-avtomobilista', name: 'Товары для автомобилиста' },
    // Категории из src/data/products.ts
    { slug: 'gazovye-kotly', name: 'Газовые котлы' },
    { slug: 'pribory-ucheta', name: 'Приборы учета' },
    { slug: 'avtomatika', name: 'Автоматика' },
    { slug: 'bak-teploobmennik', name: 'Бак-теплообменник' },
    { slug: 'plity', name: 'Плиты' },
    { slug: 'aksessuary', name: 'Аксессуары' },
  ];
  const catMap = {};
  for (const c of cats) {
    const created = await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c });
    catMap[c.slug] = created.id;
  }

  for (const p of PRODUCTS) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        name: p.name,
        description: p.description ?? null,
        price: p.price ?? null,
        isPromo: true,
        categoryId: catMap[p.category],
      },
    });
    if (p.images) {
      await prisma.image.createMany({ data: p.images.map((url) => ({ url, productId: product.id })) });
    }
    if (p.documents) {
      await prisma.document.createMany({ data: p.documents.map((d) => ({ title: d.title, url: d.url, type: 'file', productId: product.id })) });
    }
    if (p.attributes) {
      for (const [name, value] of Object.entries(p.attributes)) {
        const code = name;
        const attr = await prisma.attribute.upsert({ where: { code }, update: {}, create: { code, name, type: 'string' } });
        await prisma.attributeValue.create({ data: { productId: product.id, attributeId: attr.id, valueString: String(value) } });
      }
    }
  }

  for (const c of SERVICE_CENTERS) {
    await prisma.serviceCenter.upsert({
      where: { extId: c.id },
      update: {},
      create: {
        extId: c.id,
        name: c.name,
        city: c.city,
        address: c.address,
        lat: c.lat,
        lng: c.lng,
        phone: c.phone,
        services: c.services.join(','),
      },
    });
  }

  // Parse raw promo list from embedded text
  const rawText = `Акционные товары

Акционные товары (205)

Напольные газовые котлы

Напольные газовые котлы (15)

Твердотопливные котлы

Твердотопливные котлы (1)

Настенные газовые котлы

Настенные газовые котлы (6)

Устройства газогорелочные

Устройства газогорелочные (1)

Товары для дома

Товары для дома (57)

Садовый инвентарь

Садовый инвентарь (60)

Удобрения

Удобрения (20)

Посуда. Товары для кухни

Посуда. Товары для кухни (28)

Сантехника

Сантехника (72)

Инструменты

Инструменты (29)

Лакокрасочная продукция

Лакокрасочная продукция (37)

Элементы систем тепло-, водо- и газоснабжения

Элементы систем тепло-, водо- и газоснабжения (134)

Продукты питания

Продукты питания (32)

Баллоны газовые

Баллоны газовые (4)

Шланги газовые

Шланги газовые (35)

Дымоход

Дымоход (6)

Воздухоочистители

Воздухоочистители (6)

Плиты

Плиты (58)

Водонагреватели, бойлеры

Водонагреватели, бойлеры (67)

Калориферы, обогреватели и конвекторы

Калориферы, обогреватели и конвекторы (17)

Запасные части

Запасные части (80)

Гидроаккумуляторы

Гидроаккумуляторы (5)

Расширительные баки

Расширительные баки (13)

Мембранные баки

Мембранные баки (2)

Мойки высокого давления

Мойки высокого давления (3)

Насосы, насосные станции

Насосы, насосные станции (23)

Приборы учета

Приборы учета (14)

Средства фильтрации и очистки воды

Средства фильтрации и очистки воды (31)

Товары для отдыха

Товары для отдыха (11)

Полотенцесушители

Полотенцесушители (1)

Товары для автомобилиста

Товары для автомобилиста (3)

Полотенцедержатель кольцевой Solinne 15041, хром, коллекция Classic, 1402.201

407.00₽

Полотенцедержатель одинарный Solinne 15071, 450 мм, хром, коллекция Classic, код 1402.222

610.00₽

Полотенцедержатель одинарный Solinne 15072, 600 мм, хром, коллекция Classic

596.00₽

Полотенцедержатель Solinne 15042, хром, коллекция Classic, код 1402.221

Паста колеровочная универсальная FARBITEX, цвет: лимонный, 0,1 л

70.00₽

Паста колеровочная универсальная FARBITEX, цвет: мандариновый, 0,1 л

70.00₽

Паста колеровочная универсальная FARBITEX, цвет: медный, 0,1 л

70.00₽

Шпатлевка акриловая Farbitex для наружных и внутренних работ, 3,5 кг

235.00₽

Шпатлевка акриловая по дереву Farbitex Profi Wood, махагон (0,25 л)

71.00₽

Шпатлевка акриловая по дереву Farbitex Profi Wood, орех, 0,25 л

71.00₽

Грунт-эмаль по ржавчине белый, Olecolor, 2 кг

1,000.00₽

Эмаль акриловая OLECOLOR, для пола, цвет: желто-коричневый, 1 кг

312.00₽

Эмаль акриловая OLECOLOR, для пола, цвет: желто-коричневый, 2,5 кг

796.00₽

Эмаль акриловая матовая OLECOLOR, цвет: белый, 1 кг

246.00₽

Эмаль акриловая матовая OLECOLOR, цвет: белый, 3 кг

714.00₽

Эмаль акриловая перламутровая универсальная OLECOLOR, золотой жемчуг, 0,3 кг

270.00₽

Эмаль акриловая перламутровая универсальная OLECOLOR, хамелеон, 0,3 кг

270.00₽

Эмаль OLECOLOR ПФ-115, 0,8 кг, цвет: салатный

300.00₽

Эмаль OLECOLOR ПФ-115, цвет: вишневый, 0,8 кг

300.00₽

Эмаль OLECOLOR ПФ-115, цвет: желтый, 0,8 кг

194.00₽

...`;

  function slugify(name) {
    return String(name)
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
  }

  const lines = rawText.split(/\r?\n/);
  let lastName = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Price line pattern: number (with spaces/commas) ending with ₽
    const m = trimmed.match(/^([0-9][0-9\s.,]*)\s*₽$/);
    if (m && lastName) {
      const priceNum = Number(m[1].replace(/\s|,/g, "").replace(/\.(?=\d{3}\b)/g, ""));
      const name = lastName;
      lastName = "";
      const slug = `promo-${slugify(name)}`;
      await prisma.product.upsert({
        where: { slug },
        update: { price: isFinite(priceNum) ? Math.round(priceNum) : null, isPromo: true },
        create: {
          slug,
          name,
          description: null,
          price: isFinite(priceNum) ? Math.round(priceNum) : null,
          isPromo: true,
          categoryId: catMap['promo'],
        },
      });
      continue;
    }
    // Skip headings and pagination markers
    if (/^Акционные товары|Отображение\s|Новости|\d{1,2}\s[А-ЯЁа-яё]{3}\s\d{4}$|^←|^→|^\d+$/.test(trimmed)) {
      continue;
    }
    // Otherwise treat as potential name
    lastName = trimmed;
  }
}

main().then(() => prisma.$disconnect());


