import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости - ЖМЗ",
  description: "Новости Жуковского Машиностроительного Завода, обновления продукции, события предприятия",
};

export default function NewsPage() {
  // В реальном приложении этот массив данных приходил бы из API или CMS
  const newsItems = [
    {
      id: 1,
      title: "Новое поколение газовых котлов ЖМЗ",
      date: "15 октября 2025",
      excerpt: "Завод представил новую серию энергоэффективных газовых котлов с улучшенными характеристиками и сниженным потреблением.",
      image: "/placeholder-news.jpg"
    },
    {
      id: 2,
      title: "Расширение линейки твердотопливных котлов",
      date: "5 октября 2025",
      excerpt: "Добавлены новые модели твердотопливных котлов с увеличенной эффективностью и улучшенной системой сгорания.",
      image: "/placeholder-news.jpg"
    },
    {
      id: 3,
      title: "Участие в международной выставке оборудования",
      date: "20 сентября 2025",
      excerpt: "ЖМЗ принял участие в международной выставке отопительного оборудования, представив инновационные решения.",
      image: "/placeholder-news.jpg"
    },
    {
      id: 4,
      title: "Сертификация продукции по новым стандартам",
      date: "10 сентября 2025",
      excerpt: "Продукция завода успешно прошла сертификацию по новым международным стандартам качества и безопасности.",
      image: "/placeholder-news.jpg"
    },
    {
      id: 5,
      title: "Новый цех по производству газогорелочных устройств",
      date: "2 сентября 2025",
      excerpt: "Открыт новый производственный цех с современным оборудованием для выпуска газогорелочных устройств.",
      image: "/placeholder-news.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Новости завода</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Последние новости и события Жуковского Машиностроительного Завода
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article 
                key={news.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 bg-gradient-to-r from-gaskotel-primary to-gaskotel-secondary"></div>
                <div className="p-6">
                  <div className="text-sm text-gaskotel-secondary font-medium mb-2">{news.date}</div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h2>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <a 
                    href={`/news/${news.id}`} 
                    className="inline-flex items-center text-gaskotel-primary font-medium hover:text-gaskotel-secondary"
                  >
                    Читать далее
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-gaskotel-primary text-white rounded-lg hover:bg-gaskotel-secondary transition-colors">
              Показать еще новости
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}