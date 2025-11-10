import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Карьера - ЖМЗ",
  description: "Вакансии и карьерные возможности в Жуковском Машиностроительном Заводе",
};

export default function CareerPage() {
  const jobOpenings = [
    {
      title: "Инженер-конструктор",
      department: "Конструкторское бюро",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Разработка и проектирование отопительного оборудования, участие в инженерных проектах"
    },
    {
      title: "Технолог производства",
      department: "Производство",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Разработка технологических процессов, контроль качества на производстве"
    },
    {
      title: "Менеджер по продажам",
      department: "Отдел сбыта",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Работа с клиентами, продвижение продукции, заключение договоров"
    },
    {
      title: "Слесарь-сборщик",
      department: "Производство",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Сборка отопительного оборудования, контроль качества на этапе производства"
    },
    {
      title: "Инженер по качеству",
      department: "Отдел контроля качества",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Контроль соответствия продукции установленным стандартам и требованиям"
    },
    {
      title: "Специалист по закупкам",
      department: "Снабжение",
      location: "г. Жуковский",
      type: "Полная занятость",
      description: "Организация закупок материалов и комплектующих, работа с поставщиками"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Карьера в ЖМЗ</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Присоединяйтесь к команде профессионалов в области машиностроения и отопительного оборудования
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Почему стоит работать у нас</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span><strong>Стабильность:</strong> Работа в проверенном предприятии с более чем 50-летней историей</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span><strong>Развитие:</strong> Возможности профессионального роста и обучения</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span><strong>Команда:</strong> Работа в коллективе опытных специалистов</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span><strong>Социальный пакет:</strong> Полное социальное обеспечение сотрудников</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span><strong>Оборудование:</strong> Работа с современным оборудованием и технологиями</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gaskotel-primary to-gaskotel-secondary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Наши ценности</h2>
              <p className="mb-6 opacity-90">
                Мы ценим профессионализм, ответственность, командную работу и стремление к постоянному развитию. 
                Наша компания предлагает стабильную работу в динамично развивающемся секторе промышленности.
              </p>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Качество продукции и услуг</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Инновационное мышление</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Безопасность труда</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Развитие сотрудников</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Открытые вакансии</h2>
            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-gaskotel-primary transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-2 md:mb-0">
                      <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gaskotel-primary text-white rounded-lg hover:bg-gaskotel-secondary transition-colors text-sm">
                      Откликнуться
                    </button>
                  </div>
                  <p className="text-gray-600 mt-3">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Социальный пакет</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gaskotel-primary mr-2">✓</span>
                    <span>Оформление по ТК РФ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gaskotel-primary mr-2">✓</span>
                    <span>Медицинская страховка</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gaskotel-primary mr-2">✓</span>
                    <span>Оплачиваемый отпуск</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gaskotel-primary mr-2">✓</span>
                    <span>Корпоративные мероприятия</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gaskotel-primary mr-2">✓</span>
                    <span>Обучение и развитие</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Как стать частью команды</h2>
                <ol className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="bg-gaskotel-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 text-sm">1</span>
                    <span>Отправьте резюме через форму на сайте</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gaskotel-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 text-sm">2</span>
                    <span>Пройдите собеседование с HR-специалистом</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gaskotel-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 text-sm">3</span>
                    <span>Ознакомьтесь с условиями работы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-gaskotel-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-2 text-sm">4</span>
                    <span>Начните карьеру в ЖМЗ</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Не нашли подходящую вакансию?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Вы можете отправить нам свое резюме, и мы свяжемся с вами, если появится подходящая должность.
            </p>
            <Link href="/contacts" className="px-6 py-3 bg-gaskotel-primary text-white rounded-lg hover:bg-gaskotel-secondary transition-colors">
              Отправить резюме
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}