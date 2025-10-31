import Link from "next/link";
import { Button, ButtonSecondary } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Quiz } from "@/components/home/Quiz";
import { SeriesBlock } from "@/components/home/Series";
import { Trust } from "@/components/home/Trust";
import { DocsTiles } from "@/components/home/DocsTiles";
import { LeadForm } from "@/components/home/LeadForm";
import { NewsPromo } from "@/components/home/NewsPromo";
import { SeoText } from "@/components/home/SeoText";
import { Partners } from "@/components/home/Partners";
import { NewsList } from "@/components/home/NewsList";

export default function Home() {
  return (
    <main className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl bg-radial-soft p-10">
        <div className="absolute inset-0 bg-grid opacity-[0.25] dark:opacity-[0.18]" />
        <div className="relative z-10 max-w-3xl rounded-xl bg-white/80 p-6 shadow-sm backdrop-blur-md ring-1 ring-black/5 dark:bg-zinc-900/70">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Газкотел — каталог и сервис</h1>
          <p className="mt-3 max-w-2xl text-zinc-800 dark:text-zinc-300">
            Современный каталог продукции, документы, сервисные центры и поддержка.
          </p>
          <div className="mt-7 flex gap-3">
            <Link href="/catalog"><Button>Перейти в каталог</Button></Link>
            <Link href="/service-centers"><ButtonSecondary>Сервисные центры</ButtonSecondary></Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--primary-400)_20%,transparent)] blur-3xl" />
      </section>
      <section>
        <SectionTitle title="Популярные категории" subtitle="Быстрый переход к основным разделам" />
        <div className="grid gap-6 md:grid-cols-3">
          <CategoryCard slug="gazovye-kotly" name="Газовые котлы" description="Настенные и напольные" />
          <CategoryCard slug="plity" name="Газовые плиты" description="Бытовые и профессиональные" />
          <CategoryCard slug="aksessuary" name="Аксессуары" description="Дымоходы, автоматика" />
        </div>
      </section>

      <section>
        <SectionTitle title="Подбор оборудования" subtitle="Ответьте на пару вопросов" />
        <Quiz />
      </section>

      <section>
        <SectionTitle title="Популярные серии" />
        <SeriesBlock />
      </section>

      <section>
        <SectionTitle title="Почему мы" subtitle="Качество, сервис, опыт" />
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <div className="text-3xl">🏭</div>
            <div className="mt-2 font-medium">Собственное производство</div>
            <div className="text-sm text-zinc-700">Контроль качества и стабильные поставки.</div>
          </Card>
          <Card>
            <div className="text-3xl">🛠️</div>
            <div className="mt-2 font-medium">Авторизованный сервис</div>
            <div className="text-sm text-zinc-700">Сеть центров по всей стране.</div>
          </Card>
          <Card>
            <div className="text-3xl">📄</div>
            <div className="mt-2 font-medium">Документы и поддержка</div>
            <div className="text-sm text-zinc-700">Инструкции, паспорта, консультации.</div>
          </Card>
        </div>
      </section>

      <section>
        <SectionTitle title="Рекомендуемые товары" subtitle="Выбор покупателей" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.slice(0, 3).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Документы и поддержка" />
        <DocsTiles />
      </section>

      <section>
        <Partners />
      </section>

      <section>
        <LeadForm />
      </section>

      <section>
        <SectionTitle title="Новости и акции" />
        <NewsList />
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
    </main>
  );
}
