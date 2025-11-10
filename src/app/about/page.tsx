import { Award, Users, Factory, Shield, Target, Heart } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Лет опыта", value: "50+", icon: Award },
    { label: "Сотрудников", value: "200+", icon: Users },
    { label: "Квадратных метров", value: "10 000", icon: Factory },
    { label: "Довольных клиентов", value: "50 000+", icon: Heart }
  ]

  const values = [
    {
      icon: Shield,
      title: "Качество",
      description: "Мы производим оборудование, соответствующее самым строгим стандартам качества и безопасности."
    },
    {
      icon: Target,
      title: "Инновации",
      description: "Постоянно внедряем новые технологии и совершенствуем наши продукты."
    },
    {
      icon: Users,
      title: "Команда",
      description: "Наша команда профессионалов обеспечивает высокий уровень сервиса и поддержки."
    },
    {
      icon: Factory,
      title: "Традиции",
      description: "Сохраняем традиции качества, заложенные десятилетиями работы завода."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gaskotel-primary to-gaskotel-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              О заводе
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Жуковский машиностроительный завод - лидер в производстве отопительного оборудования
              с более чем 50-летней историей
            </p>
          </div>
        </div>
      </section>

      {/* История компании */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Жуковский машиностроительный завод был основан в 1973 году и с тех пор является
                  одним из ведущих производителей отопительного оборудования в России.
                </p>
                <p>
                  За более чем 50 лет работы мы накопили огромный опыт в производстве газовых котлов,
                  твердотопливных котлов и другого отопительного оборудования.
                </p>
                <p>
                  Наша продукция поставляется по всей России и странам СНГ, обеспечивая комфорт
                  и тепло в тысячах домов и предприятий.
                </p>
                <p>
                  Сегодня завод представляет собой современное предприятие с высокотехнологичным
                  оборудованием и командой квалифицированных специалистов.
                </p>
              </div>
            </div>

            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Фото завода</span>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-20 bg-gaskotel-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Жуковский Машиностроительный Завод ЖМЗ в цифрах
            </h2>
            <p className="text-xl text-white/90">
              Достижения, которыми мы гордимся
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши ценности */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Наши ценности
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Принципы, которые определяют нашу работу и отношение к клиентам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gaskotel-primary rounded-lg flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Производство */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Современное производство
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы используем передовые технологии и оборудование для производства качественной продукции
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gaskotel-secondary rounded-lg flex items-center justify-center mx-auto mb-6">
                <Factory className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Автоматизированные линии
              </h3>
              <p className="text-gray-600">
                Современное оборудование обеспечивает высокую точность и качество производства
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gaskotel-accent rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Контроль качества
              </h3>
              <p className="text-gray-600">
                Каждое изделие проходит многоступенчатый контроль качества
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gaskotel-warm rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Опытные специалисты
              </h3>
              <p className="text-gray-600">
                Наша команда мастеров имеет многолетний опыт работы в отрасли
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 bg-gaskotel-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Готовы сотрудничать с нами?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Свяжитесь с нами для обсуждения партнерства или получения дополнительной информации
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacts"
                className="bg-white text-gaskotel-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Связаться с нами
              </a>
              <a
                href="/catalog"
                className="border-2 border-white text-white hover:bg-white hover:text-gaskotel-primary font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Посмотреть продукцию
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}



