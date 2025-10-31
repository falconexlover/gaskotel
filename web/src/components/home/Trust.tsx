import { Card } from "@/components/ui/Card";
import { FactoryIcon, WrenchIcon, DocIcon } from "@/components/icons/BrandIcons";

export function Trust() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <FactoryIcon className="text-[var(--primary-700)]" />
        <div className="mt-2 font-medium text-zinc-900 dark:text-zinc-100">Собственное производство</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">ГОСТ Р ИСО 9001‑2015</div>
      </Card>
      <Card>
        <WrenchIcon className="text-[var(--primary-700)]" />
        <div className="mt-2 font-medium text-zinc-900 dark:text-zinc-100">Партнёрский сервис</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Федеральные сети и дилеры</div>
      </Card>
      <Card>
        <DocIcon className="text-[var(--primary-700)]" />
        <div className="mt-2 font-medium text-zinc-900 dark:text-zinc-100">Документы и поддержка</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">Инструкции, паспорта, консультации</div>
      </Card>
    </div>
  );
}


