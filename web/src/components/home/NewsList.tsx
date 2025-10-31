import { Card } from "@/components/ui/Card";

type News = { title: string; date: string; promo?: boolean };
const NEWS: News[] = [
  { title: "Акция «Удачный ассортимент»", date: "2025-07-10", promo: true },
  { title: "Скидочное лето в фирменном магазине", date: "2025-06-02", promo: true },
  { title: "Акция «Готовь котел по весне!»", date: "2025-03-31", promo: true },
  { title: "Продление акции «Хороший Хозяин»", date: "2025-02-07", promo: true },
  { title: "АКЦИЯ «ХОРОШИЙ ХОЗЯИН»", date: "2025-02-21", promo: true },
];

export function NewsList() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {NEWS.map((n) => (
        <Card key={n.title}>
          <div className="flex items-center justify-between gap-3">
            <div className="font-medium text-zinc-900 dark:text-zinc-100">{n.title}</div>
            {n.promo && (
              <span className="rounded-full bg-[var(--accent-100)] px-2 py-0.5 text-xs text-[var(--accent-700)]">Акция</span>
            )}
          </div>
          <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{new Date(n.date).toLocaleDateString("ru-RU")}</div>
        </Card>
      ))}
    </div>
  );
}


