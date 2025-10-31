import Link from "next/link";
import { Card } from "@/components/ui/Card";

const tiles = [
  { href: "/support/faq", title: "FAQ", desc: "Популярные вопросы" },
  { href: "/support/docs", title: "Документы", desc: "Паспорта и инструкции" },
  { href: "/service/request", title: "Заявка на сервис", desc: "Вызвать мастера" },
  { href: "/service-centers", title: "Сервисные центры", desc: "Адреса и контакты" },
];

export function DocsTiles() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {tiles.map((t) => (
        <Link key={t.href} href={t.href} className="group block">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-medium text-zinc-900 dark:text-zinc-100">{t.title}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{t.desc}</div>
              </div>
              <span aria-hidden className="text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}


