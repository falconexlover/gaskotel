import Link from "next/link";
import { Card } from "@/components/ui/Card";

type Item = { slug: string; title: string; date: string; isPromo?: boolean };

const ITEMS: Item[] = [
  { slug: "reliz-2025-q4", title: "Обновления каталога Q4 2025", date: "2025-10-31" },
  { slug: "akciya-otopitelny-sezon", title: "Скидки к отопительному сезону", date: "2025-09-01", isPromo: true },
  { slug: "novyy-sertifikat", title: "Получен новый сертификат соответствия", date: "2025-08-20" },
];

export function NewsPromo() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {ITEMS.map((n) => (
          <Link key={n.slug} href={`/news`} className="group block">
            <Card>
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{n.title}</div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    n.isPromo
                      ? "bg-[var(--accent-100)] text-[var(--accent-700)]"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {n.isPromo ? "Акция" : "Новость"}
                </span>
              </div>
              <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">{new Date(n.date).toLocaleDateString("ru-RU")}</div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link href="/news" className="text-sm font-medium text-[var(--primary-700)] underline-offset-4 hover:underline dark:text-[var(--primary-300)]">
          Все новости →
        </Link>
      </div>
    </div>
  );
}

