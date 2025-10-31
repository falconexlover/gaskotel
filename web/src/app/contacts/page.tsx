export default function ContactsPage() {
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Контактная информация</h1>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Фирменный магазин ОАО "ЖМЗ"</h3>
          <div className="mt-3 space-y-1 text-sm">
            <div className="text-zinc-700 dark:text-zinc-300">Адрес завода: г. Жуковский, ул. Заводская, д. 3</div>
            <div className="text-zinc-700 dark:text-zinc-300">Магазин: перекрёсток ул. Праволинейной и ул. Мичурина (вход с Праволинейной, параллельно ж/д)</div>
          </div>
          <div className="mt-4 grid gap-1 text-sm">
            <div className="text-zinc-800 dark:text-zinc-200">Тел.: <a href="tel:+74952216688" className="underline underline-offset-2">(495) 221-66-88</a></div>
            <div className="text-zinc-800 dark:text-zinc-200">E‑mail: <a href="mailto:zmz@gaskotel.ru" className="underline underline-offset-2">zmz@gaskotel.ru</a></div>
          </div>
          <div className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
            Режим работы: с 9:00 до 19:00, без обеда и выходных
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Проезд</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            <li>
              Электропоезда до платформы Ильинская, далее ~800 м пешком.
            </li>
            <li>
              Автобусы по ул. Гагарина (г. Жуковский). Остановка «Институт», далее пешком по ул. Мичурина до пересечения с ул. Праволинейной (ориентир — ж/д).
            </li>
            <li>
              На автомобиле — ориентируйтесь на перекрёсток ул. Мичурина и ул. Праволинейной (г. Жуковский).
            </li>
          </ol>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <figure className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <img src="/contacts/walk-route.jpg" alt="Схема прохода от станции Ильинская" className="h-auto w-full rounded-lg" />
          <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">а) Проход от станции Ильинская</figcaption>
        </figure>
        <figure className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
          <img src="/contacts/car-bus-route.jpg" alt="Схема проезда на автомобиле или от автобусной остановки" className="h-auto w-full rounded-lg" />
          <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">б) Проезд на автомобиле / проход от автобусной остановки</figcaption>
        </figure>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Форма обратной связи</h3>
        {/* Клиентский компонент с onSubmit */}
        {require("@/components/ContactForm").ContactForm()}
      </section>
    </main>
  );
}


