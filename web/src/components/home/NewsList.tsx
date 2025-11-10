import Link from "next/link";
import { Card } from "@/components/ui/Card";

type News = { title: string; date: string; promo?: boolean };
const NEWS: News[] = [
  { title: "Акция «Удачный ассортимент»", date: "2025-07-10", promo: true },
  { title: "Скидочное лето в фирменном магазине", date: "2025-06-02" },
  { title: "Продление акции «Хороший Хозяин»", date: "2025-02-07", promo: true },
  { title: "Получен новый сертификат соответствия", date: "2025-01-20" },
];

export function NewsList() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {NEWS.map((n) => (
        <Link key={n.title} href="/news" className="group block">
          <Card>
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium text-zinc-900 transition-colors group-hover:text-[var(--primary-700)] dark:text-zinc-100">
                {n.title}
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  n.promo
                    ? "bg-[var(--accent-100)] text-[var(--accent-700)]"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                }`}
              >
                {n.promo ? "Акция" : "Новость"}
              </span>
            </div>
            <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{new Date(n.date).toLocaleDateString("ru-RU")}</div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

