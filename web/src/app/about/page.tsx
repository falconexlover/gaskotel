import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "О предприятии | Жуковский Машиностроительный Завод",
  description:
    "Жуковский Машиностроительный Завод — современное предприятие: аэродромная спецтехника, газовое отопительное и газорегуляторное оборудование, жестяная евробанка.",
};

export default function AboutPage() {
  return (
    <main className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">О предприятии</h1>
        <p className="max-w-3xl text-zinc-700 dark:text-zinc-300">
          Жуковский Машиностроительный Завод — современное, динамично развивающееся предприятие по выпуску аэродромной
          спецтехники, газового отопительного, газорегуляторного оборудования и жестяной евробанки для химической и
          лакокрасочной промышленности. Производственные мощности, современные технологии и высококвалифицированные
          специалисты обеспечивают стабильный выпуск продукции высокого качества, пользующейся спросом в России и мире.
        </p>
      </header>

      {/* Галерея: завод, продукция и спецтехника */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Figure src="/about/plant-modern.svg" alt="Современные корпуса и территория завода" caption="Завод сегодня" />
        <Figure src="/about/boilers-line.svg" alt="Линейка отопительных котлов ЖМЗ" caption="Газовые котлы ЖМЗ" />
        <Figure src="/about/airfield-truck.svg" alt="Аэродромная спецтехника на шасси" caption="Аэродромная спецтехника" />
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-xl font-semibold">Завод сегодня</h2>
        <div className="mt-3 space-y-3 text-zinc-800 dark:text-zinc-300">
          <p>
            Жуковский Машиностроительный Завод — это современное, динамично развивающееся предприятие по выпуску
            аэродромной спецтехники, газового отопительного, газорегуляторного оборудования и жестяной евробанки для
            химической и лакокрасочной промышленности.
          </p>
          <p>
            Производственные мощности, современные технологии и высококвалифицированные специалисты обеспечивают
            стабильный выпуск продукции высокого качества, пользующейся постоянным спросом во всём мире.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">История</h2>
        <div className="grid gap-4">
          <HistoryItem year="1939" image="/about/factory-foundation.svg" caption="Территория будущего завода, 1939">
            27 октября 1939 года на базе ремонтных мастерских в соответствии с Приказом Наркома авиационной промышленности
            СССР Кагановича М.М. создан Жуковский машиностроительный завод.
          </HistoryItem>
          <HistoryItem year="1942" image="/about/armored-train.svg" caption="Бронепоезд «Москвич», 1942">
            В годы войны завод выпускал технику для нужд фронта, в 1942‑м был построен бронепоезд «МОСКВИЧ». В 1946 году
            завод принял участие в изготовлении аэродинамической трубы для ЦАГИ им. Н. Е. Жуковского.
          </HistoryItem>
          <HistoryItem year="1955" image="/about/ground-support.svg" caption="Наземная техника для авиации, 1950‑е">
            По заказу Министерства обороны на базе завода организовано производство специальной наземной техники для
            обслуживания самолётов и контрольно‑испытательных станций.
          </HistoryItem>
          <HistoryItem year="1960‑е" image="/about/workshop-trucks.svg" caption="Сборка спецтехники, 1960‑е">
            Освоены серийные изделия подвижных ракетно‑технических баз автомобильного базирования для войск ПВО. В конце
            60‑х запущено производство первых моделей аэродромной спецтехники АПА‑50М, В3‑20‑350.
          </HistoryItem>
          <HistoryItem year="1967" image="/about/agv-boilers.svg" caption="Первые котлы АГВ">
            С конвейера сошёл первый отопительный котёл АГВ. Сегодня Жуковский котёл — ведущий бренд в регионах России и
            странах СНГ.
          </HistoryItem>
          <HistoryItem year="1970‑е" image="/about/astronaut-eva.svg" caption="Комплектующие для выхода в открытый космос">
            Освоен выпуск отдельных узлов жизнеобеспечения космонавтов: кресла, амортизаторы, ранцы для выхода в открытый
            космос и другое оборудование.
          </HistoryItem>
          <HistoryItem year="2000‑е" image="/about/ugzs-mr.svg" caption="УГЗС.М‑Р">
            Разработана и запущена в серийное производство УГЗС.М‑Р.
          </HistoryItem>
          <HistoryItem year="2005">
            Освоено производство: ПГУ‑200/260, УПГ‑300, СПО‑15М, А2111‑0000. Также начато производство новой продукции —
            жестяной евробанки ёмкостью от 10 до 20 литров для химической и лакокрасочной промышленности.
          </HistoryItem>
          <HistoryItem year="2007">
            Организовано производство жестяной евробанки с крышками «Корона» и «Мастер» ёмкостью от 2,2 до 6 литров.
          </HistoryItem>
          <HistoryItem year="2010">
            Организовано производство цилиндрической банки ёмкостью от 0,35 до 1,1 литра. Запущены линии нанесения
            литографии конвекционными красками и лакирования.
          </HistoryItem>
          <HistoryItem year="2012">
            Ассортиментный ряд газового отопительного оборудования расширен до 55 моделей. Выпущена серия котлов «Эконом
            плюс».
          </HistoryItem>
          <HistoryItem year="2014">
            Выпущена новая серия квадратных котлов «ЖУК».
          </HistoryItem>
          <HistoryItem year="2015">
            Модельный ряд жестяной евробанки расширен до 28 литров.
          </HistoryItem>
          <HistoryItem year="2017">
            Освоено производство твердотопливного котла КОВ‑СТ‑12,5 «ЖУК» и устройства газогорелочного печного УГОП‑П‑16.
          </HistoryItem>
          <HistoryItem year="2017">
            Запущена линия нанесения литографии на листы жести УФ‑красками.
          </HistoryItem>
          <HistoryItem year="2019">
            Ассортиментный ряд отопительного оборудования представлен 64 моделями.
          </HistoryItem>
          <HistoryItem year="2019" image="/about/airfield-truck.svg" caption="Современная аэродромная спецтехника">
            Выпускается более 10 модификаций различных видов наземной спецтехники по обеспечению полётов летательных
            аппаратов.
          </HistoryItem>
        </div>
      </section>
    </main>
  );
}

function HistoryItem({ year, children, image, caption }: { year: string; children: React.ReactNode; image?: string; caption?: string }) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-lg bg-[var(--primary-700)] px-3 py-1 text-sm font-medium text-white dark:bg-[var(--primary-400)]">
          {year}
        </div>
        <div className="text-zinc-800 dark:text-zinc-300 leading-relaxed flex-1">
          {children}
          {image && (
            <figure className="mt-3">
              <Image src={image} alt={caption ?? "Историческое фото"} width={800} height={500} className="h-auto w-full rounded-lg border border-zinc-200 dark:border-zinc-800" />
              {caption && (
                <figcaption className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{caption}</figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </article>
  );
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
      <Image src={src} alt={alt} width={1200} height={800} className="h-auto w-full rounded-lg" />
      <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">{caption}</figcaption>
    </figure>
  );
}


