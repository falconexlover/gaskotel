type NewsItem = {
  slug: string;
  title: string;
  date: string; // ISO format YYYY-MM-DD
  subtitle?: string;
};

const news: NewsItem[] = [
  // 2025
  {
    slug: "akciya-udachnyy-assortiment-2025-07-10",
    title: "Акция «Удачный ассортимент»",
    date: "2025-07-10",
    subtitle: "По 31 августа",
  },
  {
    slug: "skidochnoe-leto-v-firmennom-magazine-2025-06-02",
    title: "Скидочное лето в фирменном магазине",
    date: "2025-06-02",
    subtitle: "Сразу две акции!",
  },
  {
    slug: "gotov-kotel-po-vesne-2025-03-31",
    title: "Акция «Готовь котел по весне!»",
    date: "2025-03-31",
    subtitle: "Скидка действует по 31 мая",
  },
  {
    slug: "prodlenie-akcii-khoroshiy-khozyain-2025-02-07",
    title: "Продление акции «Хороший Хозяин»",
    date: "2025-02-07",
    subtitle: "До конца марта",
  },
  {
    slug: "akciya-khoroshiy-khozyain-2025-02-21",
    title: "АКЦИЯ «ХОРОШИЙ ХОЗЯИН»",
    date: "2025-02-21",
    subtitle: "Скидка на инструмент и аксессуары",
  },

  // 2024
  {
    slug: "rezhim-raboty-prazdnichnye-dni-2024-12-16",
    title: "Режим работы в праздничные дни",
    date: "2024-12-16",
    subtitle: "1 января – выходной день",
  },
  {
    slug: "novogodniy-cenopad-2024-12-11",
    title: "Акция «Новогодний Ценопад»",
    date: "2024-12-11",
    subtitle: "Продлится до 31 января 2025 года",
  },
  {
    slug: "akciya-cenopad-2024-10-17",
    title: "Акция «Ценопад!»",
    date: "2024-10-17",
    subtitle: "Огромные скидки действуют по 15 ноября!",
  },
  {
    slug: "akciya-zolotaya-osen-2024-09-02",
    title: "Акция «Золотая Осень»",
    date: "2024-09-02",
    subtitle: "Акция продлится до конца ноября",
  },
  {
    slug: "akciya-udachnyy-assortiment-2024-06-21",
    title: "Акция «Удачный ассортимент»",
    date: "2024-06-21",
    subtitle: "Акция продлится до 31 августа 2024 г.",
  },
  {
    slug: "akciya-zdravstvuy-vesna-2024-03-20",
    title: "Акция «Здравствуй, весна!»",
    date: "2024-03-20",
    subtitle: "Успейте приобрести со скидкой!",
  },

  // 2023
  {
    slug: "rezhim-raboty-prazdnichnye-dni-2023-12-22",
    title: "Режим работы в праздничные дни",
    date: "2023-12-22",
    subtitle: "31 декабря и 1 января – выходные дни",
  },
];

export default function NewsPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Новости</h1>
      <ul className="space-y-3">
        {news.map((n) => (
          <li key={n.slug} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{new Date(n.date).toLocaleDateString("ru-RU")}</div>
            <div className="font-medium text-zinc-900 dark:text-zinc-100">{n.title}</div>
            {n.subtitle && (
              <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{n.subtitle}</div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}


