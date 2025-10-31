import { ContactForm } from "@/components/ContactForm";

export default function ServicesPage() {
  return (
    <main className="space-y-10">
      <header className="rounded-2xl bg-radial-soft p-8 ring-1 ring-black/5 dark:bg-zinc-900/60">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Услуги ОАО «Жуковский машиностроительный завод»</h1>
        <p className="mt-2 max-w-3xl text-zinc-700 dark:text-zinc-300">Производственные услуги полного цикла: изготовление изделий по вашим данным, лазерная резка и обработка металла, литьё чугуна, стали и алюминия.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-700)] dark:text-[var(--primary-300)]">Производство</div>
          <h2 className="mt-1 text-xl font-medium text-zinc-900 dark:text-zinc-100">Изготовление изделий</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
            Изготавливаем детали любого конструктива по чертежам, эскизам, фото, техзаданию или рабочему образцу. Все этапы производства осуществляются на современном оборудовании. Выполняем сварку всех видов металла, процессы гибки, резки – качественно и без лишнего расхода материалов. Обратившись к нам, заказчики получают изделия высокого качества, доступные цены изготовления, короткие сроки выполнения работ.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-700)] dark:text-[var(--primary-300)]">Лазерные технологии</div>
          <h2 className="mt-1 text-xl font-medium text-zinc-900 dark:text-zinc-100">Лазерная резка и обработка металла</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
            Предлагаем услуги лазерной резки и обработки металла, выполняем заказы различной сложности и объёма. Все работы осуществляются на лазерных станках ЧПУ последнего поколения с точной резкой и обработкой металла толщиной 0,4–16 мм. Обрабатываем металл из чёрной, оцинкованной, нержавеющей стали, алюминия. Осуществляем гравировку металла по индивидуальным эскизам.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-zinc-800 dark:text-zinc-300">
            <li>Толщина: 0,4–16 мм</li>
            <li>Материалы: сталь (чёрная, оцинкованная, нержавеющая), алюминий</li>
            <li>Габариты листа: до 1500×3000 мм</li>
            <li>Точность реза: до ±0,1 мм (в зависимости от материала и толщины)</li>
            <li>Файлы: DXF, DWG, STEP, PDF; эскизы — по согласованию</li>
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-700)] dark:text-[var(--primary-300)]">Литьё</div>
          <h2 className="mt-1 text-xl font-medium text-zinc-900 dark:text-zinc-100">Литьё чугуна, стали, алюминия</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-300">
            Выполняем заказы по литью чугуна, стали, алюминия для всех отраслей промышленности по доступным ценам. От заказчика требуется чертёж, оснастка, форма. Осуществляем контроль качества на всех стадиях производства — от подготовки материалов до сдачи продукции заказчику.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-[var(--primary-25)] to-white p-6 shadow-sm ring-1 ring-black/5 dark:border-zinc-800 dark:from-zinc-900/60 dark:to-zinc-900/40">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Связаться для расчёта и консультации</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="text-zinc-800 dark:text-zinc-200">Телефон: <a href="tel:+74952216644" className="underline underline-offset-2">+7 (495) 221-66-44</a></div>
            <div className="text-zinc-700 dark:text-zinc-300">Работаем с заказами любой сложности и объёма. Предоставим КП в кратчайшие сроки.</div>
          </div>
          <div className="mt-4">
            <a href="tel:+74952216644" className="inline-flex items-center justify-center rounded-md border border-[var(--primary-300)] px-4 py-2 text-sm font-medium text-[var(--primary-800)] hover:bg-[var(--primary-50)] dark:border-zinc-700 dark:text-[var(--primary-300)] dark:hover:bg-zinc-800/60">Позвонить</a>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border p-6 ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900/60">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Запрос коммерческого предложения</h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">Опишите задачу (деталь, материал, толщина, тираж, формат файлов) — мы свяжемся для уточнений и расчёта.</p>
        <div className="mt-4">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}


