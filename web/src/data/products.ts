export type Product = {
  slug: string;
  name: string;
  category:
    | "gazovye-kotly"
    | "tverdotoplivnye-kotly"
    | "pribory-ucheta"
    | "ustrojstva-gazogorelochnye"
    | "avtomatika"
    | "bak-teploobmennik"
    | "plity"
    | "aksessuary";
  price?: number;
  description?: string;
  attributes?: Record<string, string>;
  documents?: { title: string; url: string }[];
  images?: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "kotyol-a24",
    name: "Котёл A24",
    category: "gazovye-kotly",
    price: 45900,
    description: "Двухконтурный газовый котёл мощностью 24 кВт.",
    attributes: {
      "Мощность": "24 кВт",
      "Контуры": "2",
      "Камера сгорания": "закрытая",
      "КПД": "92%",
    },
    documents: [
      { title: "Паспорт изделия (PDF)", url: "#" },
      { title: "Инструкция по монтажу (PDF)", url: "#" },
    ],
    images: [
      "/placeholder/a24-1.jpg",
      "/placeholder/a24-2.jpg",
      "/placeholder/a24-3.jpg",
    ],
  },
  {
    slug: "kotyol-b12",
    name: "Котёл B12",
    category: "gazovye-kotly",
    price: 33900,
    description: "Одноконтурный газовый котёл мощностью 12 кВт.",
    attributes: {
      "Мощность": "12 кВт",
      "Контуры": "1",
      "Камера сгорания": "открытая",
      "КПД": "90%",
    },
    images: [
      "/placeholder/b12-1.jpg",
      "/placeholder/b12-2.jpg",
    ],
  },
  // Серия ЖУК
  {
    slug: "akgv-11-6-3-zhuk",
    name: "АКГВ-11,6-3 ЖУК",
    category: "gazovye-kotly",
    price: 43000,
    attributes: {
      "Артикул": "495000",
      "Серия": "ЖУК",
    },
  },
  {
    slug: "akgv-11-6-3-zhuk-01",
    name: "АКГВ-11,6-3 ЖУК (01)",
    category: "gazovye-kotly",
    price: 41500,
    attributes: {
      "Артикул": "403000",
      "Серия": "ЖУК",
    },
  },
  // Серия ЭКОНОМ
  {
    slug: "akgv-11-6-3-ekonom-n",
    name: "АКГВ-11,6-3 ЭКОНОМ (Н)",
    category: "gazovye-kotly",
    price: 38836,
    attributes: {
      "Артикул": "391200",
      "Серия": "ЭКОНОМ",
    },
  },
  {
    slug: "aogv-11-6-3-ekonom-n",
    name: "АОГВ-11,6-3 ЭКОНОМ (Н)",
    category: "gazovye-kotly",
    price: 31350,
    attributes: {
      "Артикул": "390200",
      "Серия": "ЭКОНОМ",
    },
  },
  // Серия УНИВЕРСАЛ
  {
    slug: "aogv-11-6-3-universal-n",
    name: "АОГВ-11,6-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 33200,
    attributes: {
      "Артикул": "471200",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "akgv-11-6-3-universal-n",
    name: "АКГВ-11,6-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 42750,
    attributes: {
      "Артикул": "472200",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "aogv-17-4-3-universal-n",
    name: "АОГВ-17,4-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 37250,
    attributes: {
      "Артикул": "479100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "akgv-17-4-3-universal-n",
    name: "АКГВ-17,4-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 55700,
    attributes: {
      "Артикул": "481100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "aogv-23-2-3-universal-n",
    name: "АОГВ-23,2-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 41200,
    attributes: {
      "Артикул": "480100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "akgv-23-2-3-universal-n",
    name: "АКГВ-23,2-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 61200,
    attributes: {
      "Артикул": "482100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "aogv-29-3-universal-n",
    name: "АОГВ-29-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 45000,
    attributes: {
      "Артикул": "444100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  {
    slug: "akgv-29-3-universal-n",
    name: "АКГВ-29-3 Универсал (N)",
    category: "gazovye-kotly",
    price: 61200,
    attributes: {
      "Артикул": "447100",
      "Серия": "УНИВЕРСАЛ",
    },
  },
  // Серия КОМФОРТ
  {
    slug: "kov-g-68-komfort",
    name: "КОВ-Г-68 КОМФОРТ",
    category: "gazovye-kotly",
    price: 190000,
    attributes: {
      "Артикул": "453000",
      "Серия": "КОМФОРТ",
    },
  },
  {
    slug: "kov-sg-50-komfort-belyj",
    name: "КОВ-СГ-50 КОМФОРТ (белый)",
    category: "gazovye-kotly",
    price: 115000,
    attributes: {
      "Артикул": "449000",
      "Серия": "КОМФОРТ",
    },
  },
  {
    slug: "kov-sg-43-komfort-belyj",
    name: "КОВ-СГ-43 КОМФОРТ (белый)",
    category: "gazovye-kotly",
    price: 96000,
    attributes: {
      "Артикул": "448000",
      "Серия": "КОМФОРТ",
    },
  },
  { slug: "plita-4g", name: "Плита 4G", category: "plity", price: 21900, description: "Газовая плита на 4 конфорки.", images: ["/placeholder/plita-1.jpg"] },
  { slug: "dymohod-120", name: "Дымоход 120мм", category: "aksessuary", price: 2900, description: "Труба дымохода диаметром 120 мм.", images: ["/placeholder/dymohod-1.jpg"] },
  // Приборы учета: счетчики воды и газа
  {
    slug: "schetchik-gaza-sgmn-1-g6-levyj-43752",
    name: "СЧЕТЧИК ГАЗА ДИАФРАГМЕННЫЙ СГМН-1 G-6 (левый)",
    category: "pribory-ucheta",
    price: 7400,
    attributes: { "Артикул": "43752", "Назначение": "Газ" },
  },
  {
    slug: "schetchik-vody-ohta-gl15-80mm-universalnyj-41020",
    name: "СЧЕТЧИК ВОДЫ КРЫЛЬЧАТЫЙ ОХТА ГЛ 15 80мм без КМЧ (универсальный)",
    category: "pribory-ucheta",
    price: 500,
    attributes: { "Артикул": "41020", "Назначение": "Вода" },
  },
  {
    slug: "schetchik-gaza-vk-g4-levyj-74296",
    name: "СЧЕТЧИК ГАЗА ДИАФРАГМЕННЫЙ ВК-G4 (левый)",
    category: "pribory-ucheta",
    price: 3680,
    attributes: { "Артикул": "74296", "Назначение": "Газ" },
  },
  {
    slug: "schetchik-gaza-sgmn-1-g6-levyj-43754",
    name: "СЧЕТЧИК ГАЗА ДИАФРАГМЕННЫЙ СГМН-1 G-6 (левый)",
    category: "pribory-ucheta",
    attributes: { "Артикул": "43754", "Назначение": "Газ" },
  },
  {
    slug: "schetchik-gaza-sgmn-1-g6-pravyj-43753",
    name: "СЧЕТЧИК ГАЗА ДИАФРАГМЕННЫЙ СГМН-1 G-6 (правый)",
    category: "pribory-ucheta",
    price: 6200,
    attributes: { "Артикул": "43753", "Назначение": "Газ" },
  },
  {
    slug: "schetchik-gaza-bk-g4-pravyj-72907",
    name: "СЧЕТЧИК ГАЗА ДИАФРАГМЕННЫЙ ВК-G4 (правый)",
    category: "pribory-ucheta",
    price: 3600,
    attributes: { "Артикул": "72907", "Назначение": "Газ" },
  },
  {
    slug: "schetchik-goryachej-vody-zenner-etw-n-mz-43075",
    name: "СЧЕТЧИК ГОРЯЧЕЙ ВОДЫ ОДНОСТРУЙНЫЙ ZENNER ЕТW-N-MZ",
    category: "pribory-ucheta",
    price: 800,
    attributes: { "Артикул": "43075", "Назначение": "Горячая вода" },
  },
  {
    slug: "schetchik-holodnoj-vody-zenner-etk-n-mz-43076",
    name: "СЧЕТЧИК ХОЛОДНОЙ ВОДЫ ОДНОСТРУЙНЫЙ ZENNER ЕТК-N-MZ",
    category: "pribory-ucheta",
    price: 800,
    attributes: { "Артикул": "43076", "Назначение": "Холодная вода" },
  },
  // Котлы твердотопливные
  {
    slug: "kov-st-12-5-zhuk",
    name: "КОВ-СТ-12,5 ЖУК",
    category: "tverdotoplivnye-kotly",
    price: 35000,
    attributes: {
      "Артикул": "400000",
      "Серия": "ЖУК",
    },
  },
  {
    slug: "kov-st-25-zhuk",
    name: "КОВ-СТ-25 ЖУК",
    category: "tverdotoplivnye-kotly",
    price: 40000,
    attributes: {
      "Артикул": "400027",
      "Серия": "ЖУК",
    },
  },
  // Устройства газогорелочные
  {
    slug: "ugop-p-16",
    name: "УГОП-П-16",
    category: "ustrojstva-gazogorelochnye",
    price: 12500,
    attributes: { "Артикул": "360000" },
  },
  // Автоматика
  {
    slug: "avtomatika-po-peregrevu-399006",
    name: "Автоматика по перегреву",
    category: "avtomatika",
    price: 995,
    attributes: { "Артикул": "399006" },
  },
  {
    slug: "avtomatika-po-tyage-i-peregrevu-416006",
    name: "Автоматика по тяге и перегреву",
    category: "avtomatika",
    price: 3113,
    attributes: { "Артикул": "416006" },
  },
  // Бак-теплообменник
  {
    slug: "bak-teploobmennik-ufzhi-289-20-00-000-01-353003",
    name: "Бак-теплообменник УФЖИ 289.20.00.000-01",
    category: "bak-teploobmennik",
    price: 16679,
    attributes: { "Артикул": "353003" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-315-02-00-000-358002",
    name: "Бак-теплообменник УФЖИ 315.02.00.000",
    category: "bak-teploobmennik",
    price: 29966,
    attributes: { "Артикул": "358002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-321-20-00-000-372002",
    name: "Бак-теплообменник УФЖИ 321.20.00.000",
    category: "bak-teploobmennik",
    price: 21129,
    attributes: { "Артикул": "372002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-322-20-00-000-368002",
    name: "Бак-теплообменник УФЖИ 322.20.00.000",
    category: "bak-teploobmennik",
    price: 24258,
    attributes: { "Артикул": "368002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-325-20-00-000-366002",
    name: "Бак-теплообменник УФЖИ 325.20.00.000",
    category: "bak-teploobmennik",
    price: 57442,
    attributes: { "Артикул": "366002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-332-21-00-000-375011",
    name: "Бак-теплообменник УФЖИ 332.21.00.000",
    category: "bak-teploobmennik",
    price: 21872,
    attributes: { "Артикул": "375011" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-333-20-00-000-376002",
    name: "Бак-теплообменник УФЖИ 333.20.00.000",
    category: "bak-teploobmennik",
    price: 25105,
    attributes: { "Артикул": "376002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-333-21-00-000-376007",
    name: "Бак-теплообменник УФЖИ 333.21.00.000",
    category: "bak-teploobmennik",
    price: 24780,
    attributes: { "Артикул": "376007" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-345-20-00-000-382002",
    name: "Бак-теплообменник УФЖИ 345.20.00.000",
    category: "bak-teploobmennik",
    price: 33053,
    attributes: { "Артикул": "382002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-345-20-00-000-01-386002",
    name: "Бак-теплообменник УФЖИ 345.20.00.000-01",
    category: "bak-teploobmennik",
    price: 33204,
    attributes: { "Артикул": "386002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-350-20-00-000-381002",
    name: "Бак-теплообменник УФЖИ 350.20.00.000",
    category: "bak-teploobmennik",
    price: 14441,
    attributes: { "Артикул": "381002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-350-20-02-000-381013",
    name: "Бак-теплообменник УФЖИ 350.20.02.000",
    category: "bak-teploobmennik",
    price: 15130,
    attributes: { "Артикул": "381013" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-351-20-00-000-388002",
    name: "Бак-теплообменник УФЖИ 351.20.00.000",
    category: "bak-teploobmennik",
    price: 28946,
    attributes: { "Артикул": "388002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-356-21-00-000-436002",
    name: "Бак-теплообменник УФЖИ 356.21.00.000",
    category: "bak-teploobmennik",
    price: 27456,
    attributes: { "Артикул": "436002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-356-21-00-000-01-437002",
    name: "Бак-теплообменник УФЖИ 356.21.00.000-01",
    category: "bak-teploobmennik",
    price: 35789,
    attributes: { "Артикул": "437002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-360-20-00-000-399002",
    name: "Бак-теплообменник УФЖИ 360.20.00.000",
    category: "bak-teploobmennik",
    price: 43786,
    attributes: { "Артикул": "399002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-360-20-00-000-01-426001",
    name: "Бак-теплообменник УФЖИ 360.20.00.000-01",
    category: "bak-teploobmennik",
    price: 49262,
    attributes: { "Артикул": "426001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-374-20-00-000-428002",
    name: "Бак-теплообменник УФЖИ 374.20.00.000",
    category: "bak-teploobmennik",
    price: 21348,
    attributes: { "Артикул": "428002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-374-20-00-000-01-434002",
    name: "Бак-теплообменник УФЖИ 374.20.00.000-01",
    category: "bak-teploobmennik",
    price: 25321,
    attributes: { "Артикул": "434002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-374-20-00-000-02-433002",
    name: "Бак-теплообменник УФЖИ 374.20.00.000-02",
    category: "bak-teploobmennik",
    price: 55093,
    attributes: { "Артикул": "433002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-374-20-00-000-03-435002",
    name: "Бак-теплообменник УФЖИ 374.20.00.000-03",
    category: "bak-teploobmennik",
    price: 55899,
    attributes: { "Артикул": "435002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-375-21-00-000-431002",
    name: "Бак-теплообменник УФЖИ 375.21.00.000",
    category: "bak-teploobmennik",
    price: 15934,
    attributes: { "Артикул": "431002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-375-21-00-000-01-432002",
    name: "Бак-теплообменник УФЖИ 375.21.00.000-01",
    category: "bak-teploobmennik",
    price: 28538,
    attributes: { "Артикул": "432002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-392-20-00-000-454001",
    name: "Бак-теплообменник УФЖИ 392.20.00.000",
    category: "bak-teploobmennik",
    price: 27356,
    attributes: { "Артикул": "454001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-407-20-00-000-469002",
    name: "Бак-теплообменник УФЖИ 407.20.00.000",
    category: "bak-teploobmennik",
    price: 15577,
    attributes: { "Артикул": "469002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-407-20-00-000-01-470001",
    name: "Бак-теплообменник УФЖИ 407.20.00.000-01",
    category: "bak-teploobmennik",
    price: 29966,
    attributes: { "Артикул": "470001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-479001",
    name: "Бак-теплообменник УФЖИ 409.20.00.000",
    category: "bak-teploobmennik",
    price: 21427,
    attributes: { "Артикул": "479001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-01-480002",
    name: "Бак-теплообменник УФЖИ 409.20.00.000-01",
    category: "bak-teploobmennik",
    price: 24542,
    attributes: { "Артикул": "480002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-02-475001",
    name: "Бак-теплообменник УФЖИ 409.20.00.000-02",
    category: "bak-teploobmennik",
    price: 27216,
    attributes: { "Артикул": "475001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-03-481001",
    name: "Бак-теплообменник УФЖИ 409.20.00.000-03",
    category: "bak-teploobmennik",
    price: 55198,
    attributes: { "Артикул": "481001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-04-482001",
    name: "Бак-теплообменник УФЖИ 409.20.00.000-04",
    category: "bak-teploobmennik",
    price: 54891,
    attributes: { "Артикул": "482001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-409-20-00-000-05-478001",
    name: "Бак-теплообменник УФЖИ 409.20.00.000-05",
    category: "bak-teploobmennik",
    price: 59754,
    attributes: { "Артикул": "478001" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-412-20-00-000-411002",
    name: "Бак-теплообменник УФЖИ 412.20.00.000",
    category: "bak-teploobmennik",
    price: 15445,
    attributes: { "Артикул": "411002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-417-20-00-000-01-485002",
    name: "Бак-теплообменник УФЖИ 417.20.00.000-01",
    category: "bak-teploobmennik",
    price: 24951,
    attributes: { "Артикул": "485002" },
  },
  {
    slug: "bak-teploobmennik-ufzhi-417-20-00-000-02-494002",
    name: "Бак-теплообменник УФЖИ 417.20.00.000-02",
    category: "bak-teploobmennik",
    price: 39380,
    attributes: { "Артикул": "494002" },
  },
];

export function findByCategory(category: Product["category"]) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function findBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [] as Product[];
  return PRODUCTS.filter((p) =>
    [p.name, p.description, ...(Object.values(p.attributes ?? {}))]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q))
  );
}


