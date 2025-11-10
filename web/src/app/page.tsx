import Link from "next/link";
import { Button, ButtonSecondary } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Quiz } from "@/components/home/Quiz";
import { SeriesBlock } from "@/components/home/Series";
import { DocsTiles } from "@/components/home/DocsTiles";
import { LeadForm } from "@/components/home/LeadForm";
import { SeoText } from "@/components/home/SeoText";
import { Partners } from "@/components/home/Partners";
import { NewsList } from "@/components/home/NewsList";
import { StatsStrip } from "@/components/home/StatsStrip";
import { Trust } from "@/components/home/Trust";
import { NewsPromo } from "@/components/home/NewsPromo";
import { PopularCategories } from "@/components/home/PopularCategories";
import { RecommendedProducts } from "@/components/home/RecommendedProducts";
import { StickyConsult } from "@/components/home/StickyConsult";

export default function Home() {
  return (
    <main className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-[var(--primary-50)] via-white to-[var(--primary-50)]/40 p-10 shadow-[0_20px_60px_-30px_rgba(29,78,216,0.55)] dark:border-[var(--border-soft)]/70 dark:from-[color-mix(in_oklab,var(--primary-800)_35%,transparent)] dark:via-[rgba(23,37,84,0.85)] dark:to-[color-mix(in_oklab,var(--primary-600)_25%,transparent)]">
        <div className="absolute inset-0 bg-grid opacity-[0.22] dark:opacity-[0.12]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-transparent dark:via-[rgba(148,163,233,0.18)]" />
        <div className="relative z-10 max-w-3xl rounded-2xl border border-white/80 bg-white/85 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl dark:border-[var(--border-soft)] dark:bg-[var(--surface-base)]">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-[var(--primary-800)] to-[var(--primary-500)] bg-clip-text text-transparent drop-shadow-[0_6px_12px_rgba(15,17,32,0.18)] dark:from-[var(--primary-400)] dark:to-[var(--primary-300)]">
            Жуковский Машиностроительный Завод ЖМЗ — каталог и сервис
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
            Современный каталог продукции, документы, сервисные центры и поддержка.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog">
              <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                Перейти в каталог
              </Button>
            </Link>
            <Link href="/service-centers">
              <ButtonSecondary size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                Сервисные центры
              </ButtonSecondary>
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[color-mix(in_oklab,var(--primary-400)_22%,transparent)] blur-[120px] opacity-90 dark:bg-[color-mix(in_oklab,var(--primary-500)_38%,transparent)]" />
        <div className="pointer-events-none absolute -left-10 -bottom-16 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--primary-300)_18%,transparent)] blur-[110px] dark:bg-[color-mix(in_oklab,var(--primary-700)_28%,transparent)]" />
      </section>

      <StatsStrip />

      <section>
        <SectionTitle title="Почему мы" subtitle="Качество, сервис, опыт" />
        <Trust />
      </section>

      <section>
        <Partners />
      </section>

      <PopularCategories />

      <section>
        <SectionTitle title="Подбор оборудования" subtitle="Ответьте на пару вопросов" />
        <Quiz />
      </section>

      <section>
        <SectionTitle title="Популярные серии" />
        <SeriesBlock />
      </section>

      <RecommendedProducts />

      <section>
        <SectionTitle title="Документы и поддержка" />
        <DocsTiles />
      </section>

      <section id="lead">
        <SectionTitle title="Получить консультацию" subtitle="Оставьте контакты — инженер перезвонит и подготовит КП" />
        <LeadForm />
      </section>

      <section>
        <SectionTitle title="Новости и акции" />
        <div className="space-y-6">
          <NewsPromo />
          <NewsList />
        </div>
      </section>

      <section>
        <SeoText />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <h3 className="font-medium">Поддержка</h3>
          <p className="mt-1 text-sm text-zinc-700">FAQ, инструкции, документы.</p>
          <Link href="/support/faq" className="mt-3 inline-block text-sm text-zinc-900 underline">Открыть</Link>
        </Card>
        <Card>
          <h3 className="font-medium">Новости</h3>
          <p className="mt-1 text-sm text-zinc-700">Акции, обновления продукции.</p>
          <Link href="/news" className="mt-3 inline-block text-sm text-zinc-900 underline">Смотреть</Link>
        </Card>
        <Card>
          <h3 className="font-medium">Сервисные центры</h3>
          <p className="mt-1 text-sm text-zinc-700">Адреса и контакты авторизованных сервисов.</p>
          <Link href="/service-centers" className="mt-3 inline-block text-sm text-zinc-900 underline">Найти сервис</Link>
        </Card>
      </section>

      <section className="rounded-xl border p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-medium">Нужна помощь с подбором оборудования?</h3>
            <p className="mt-1 text-sm text-zinc-700">Ответьте на 5 вопросов и получите рекомендацию.</p>
          </div>
          <Link href="/catalog"><Button>Запустить подбор</Button></Link>
        </div>
      </section>

      <StickyConsult />
    </main>
  );
}
