import Link from "next/link";

export const metadata = {
  title: "Карьера и вакансии",
  description: "Работа в ОАО «ЖМЗ»: открытые вакансии, условия, контакты HR.",
};

type Vacancy = {
  title: string;
  salary: string;
};

const vacancies: Vacancy[] = [
  { title: "Администратор в санаторий-профилакторий", salary: "45 тыс. руб." },
  { title: "Водитель погрузчика", salary: "55 тыс. руб." },
  { title: "Дизайнер", salary: "от 50 до 70 тыс. руб." },
  { title: "Инженер-метролог", salary: "60 – 70 тыс. руб." },
  { title: "Инженер-конструктор", salary: "60 – 80 тыс. руб." },
  { title: "Инженер-технолог", salary: "60 – 80 тыс. руб." },
  { title: "Кладовщик", salary: "50 тыс. руб." },
  { title: "Контролер ОТК", salary: "от 40 до 80 тыс. руб." },
  { title: "Мастер цеха", salary: "80 тыс. руб." },
  { title: "Менеджер по продажам", salary: "50 – 80 тыс. руб." },
  { title: "Механик", salary: "от 80 до 100 тыс. руб." },
  { title: "Начальник цеха", salary: "100 тыс. руб." },
  { title: "Оператор окрасочно-сушильной линии и агрегатов", salary: "80 – 100 тыс. руб." },
  { title: "Оператор станков с ЧПУ", salary: "120 тыс. руб." },
  { title: "Печатник по жести", salary: "120 тыс. руб." },
  { title: "Подсобный рабочий", salary: "33 тыс. руб." },
  { title: "Системный администратор", salary: "60 – 70 тыс. руб." },
  { title: "Секретарь", salary: "50 – 60 тыс. руб." },
  { title: "Слесарь-инструментальщик", salary: "80 тыс. руб." },
  { title: "Шлифовщик", salary: "60 – 80 тыс. руб." },
  { title: "Электросварщик ручной сварки", salary: "60 – 100 тыс. руб." },
  { title: "Экономист по материально-техническому снабжению", salary: "60 – 80 тыс. руб." },
  { title: "Юрисконсульт", salary: "45 – 70 тыс. руб." },
];

export default function CareersPage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Карьера в ОАО «ЖМЗ»</h1>
        <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">
          ОАО «ЖМЗ» предоставляет широкие возможности для раскрытия собственного потенциала и карьерного роста.
          Наш коллектив — команда профессионалов, реализующая стратегическую цель предприятия — укрепление лидирующих позиций на рынке по всем направлениям выпускаемой продукции.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border p-4">
            <div className="text-sm text-zinc-500">Работодатель</div>
            <div className="mt-1 text-lg font-medium">с 1939 года</div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm text-zinc-500">Подразделений</div>
            <div className="mt-1 text-lg font-medium">более 50</div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm text-zinc-500">Сотрудников</div>
            <div className="mt-1 text-lg font-medium">более 800</div>
          </div>
          <div className="rounded-xl border p-4">
            <div className="text-sm text-zinc-500">Локация</div>
            <div className="mt-1 text-lg font-medium">Работа рядом с домом</div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-medium">Что мы производим</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
            <li>Бытовые отопительные котлы</li>
            <li>Наземная аэродромная спецтехника</li>
            <li>Газорегуляторное оборудование</li>
            <li>Жестяная евробанка</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-medium">Почему у нас комфортно</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
            <li>Современное предприятие</li>
            <li>Стабильный доход</li>
            <li>Безопасные условия труда</li>
            <li>Возможности для карьерного роста</li>
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="text-xl font-medium">Мы ценим людей</h2>
        <p className="mt-3 max-w-3xl text-zinc-700 dark:text-zinc-300">
          Коллектив — основная ценность компании. Мы соблюдаем высокие международные стандарты в вопросах социальной и кадровой политики.
          Приглашаем студентов, выпускников и начинающих специалистов — это одно из ключевых направлений.
          Повышаем профессиональный уровень сотрудников, поддерживаем развитие и обучение.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Открытые вакансии</h2>
          <Link href="#contacts" className="text-sm text-[var(--primary-700)] underline-offset-2 hover:underline dark:text-[var(--primary-300)]">Отправить резюме</Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {vacancies.map((v) => (
            <div key={v.title} className="rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{v.title}</div>
                  <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-400">Жуковский, полный день</div>
                </div>
                <div className="shrink-0 rounded-md bg-[var(--primary-50)] px-2 py-1 text-sm text-[var(--primary-800)] dark:bg-zinc-800/60 dark:text-[var(--primary-300)]">{v.salary}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacts" className="rounded-2xl border p-6">
        <h2 className="text-xl font-medium">Контакты HR</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <div>
            <div className="text-sm text-zinc-500">Email для резюме</div>
            <a href="mailto:zmz@gaskotel.ru" className="mt-1 block text-[var(--primary-700)] underline-offset-2 hover:underline dark:text-[var(--primary-300)]">zmz@gaskotel.ru</a>
          </div>
          <div>
            <div className="text-sm text-zinc-500">Телефоны</div>
            <div className="mt-1">+7 (495) 221 66 99</div>
            <div>+7 (495) 221 66 44</div>
          </div>
          <div>
            <div className="text-sm text-zinc-500">Адрес</div>
            <div className="mt-1">Московская область, г. Жуковский, ул. Заводская, д. 3</div>
          </div>
        </div>
        <div className="mt-4">
          <a href="https://www.joblab.ru/" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-900 underline underline-offset-2 dark:text-zinc-100">Вакансии ОАО «ЖМЗ» на JobLab.ru</a>
        </div>
      </section>
    </div>
  );
}


