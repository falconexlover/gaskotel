import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/icons/Icons";

export function StickyConsult() {
  return (
    <section className="rounded-3xl border border-[var(--border-soft)] bg-gradient-to-r from-[var(--primary-50)] via-white to-[var(--primary-50)]/70 p-6 shadow-lg shadow-[var(--primary-200)]/30 dark:from-[color-mix(in_oklab,var(--primary-900)_40%,transparent)] dark:via-[var(--surface-base)] dark:to-[color-mix(in_oklab,var(--primary-700)_30%,transparent)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--primary-600)] dark:text-[var(--primary-300)]">Нужна консультация</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--heading)] dark:text-zinc-100">Инженеры на связи 7 дней в неделю</h3>
          <p className="mt-1 max-w-2xl text-sm text-zinc-700 dark:text-zinc-300">
            Подберём котёл, подготовим коммерческое предложение и вышлем документы в течение рабочего дня.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <a href="tel:+74959876543" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--primary-800)] hover:text-[var(--primary-700)] dark:text-[var(--primary-100)]">
            <Icons.Phone className="h-5 w-5" /> +7 (495) 987-65-43
          </a>
          <Link href="#lead">
            <Button size="lg" className="inline-flex items-center gap-2">
              <Icons.Heart className="h-4 w-4" /> Получить консультацию
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

