import Link from "next/link"
import { ArrowRight, Shield, Zap, Award, Thermometer, Flame, Home, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const categories = [
    {
      title: "Газовые котлы",
      description: "Современные газовые котлы для отопления и горячего водоснабжения",
      icon: Flame,
      href: "/products/gas",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Твердотопливные котлы",
      description: "Надежные котлы на твердом топливе с длительным горением",
      icon: Factory,
      href: "/products/solid-fuel",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Газогорелочные устройства",
      description: "Газогорелочные устройства и комплектующие",
      icon: Zap,
      href: "/products/gas-burners",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Для дома и сада",
      description: "Оборудование и инструменты для дома и дачи",
      icon: Home,
      href: "/products/home-garden",
      color: "from-green-500 to-teal-500"
    }
  ]

  const advantages = [
    {
      icon: Shield,
      title: "Надежность",
      description: "Качественное оборудование с многолетней гарантией"
    },
    {
      icon: Award,
      title: "Качество",
      description: "Сертифицированная продукция от проверенного производителя"
    },
    {
      icon: Thermometer,
      title: "Эффективность",
      description: "Высокий КПД и экономичное потребление топлива"
    },
    {
      icon: Zap,
      title: "Современность",
      description: "Новейшие технологии и инновационные решения"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-gaskotel-primary via-gaskotel-secondary to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/20 rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 animate-fade-in">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                  Жуковский Машиностроительный Завод
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed">
                  Современное отопительное оборудование от ЖМЗ
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-gaskotel-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/catalog">
                    Каталог товаров
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gaskotel-primary font-semibold px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/about">
                    О заводе
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="glass-effect rounded-2xl p-8 backdrop-blur-md">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Почему выбирают ЖМЗ?</h3>
                  <p className="text-lg opacity-90">
                    Более 50 лет опыта производства отопительного оборудования.
                    Современные технологии, надежность и качество.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают ЖМЗ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы производим надежное и эффективное отопительное оборудование,
              которое служит десятилетиями и обеспечивает комфорт в вашем доме
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gaskotel-primary rounded-xl flex items-center justify-center mb-6">
                  <advantage.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Категории товаров */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Продукция
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Широкий ассортимент отопительного оборудования для любых нужд
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-br ${category.color} p-12 relative`}>
                  <div className="relative z-10">
                    <category.icon className="h-16 w-16 text-white mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {category.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      {category.description}
                    </p>
                    <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Перейти к товарам
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </div>

                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gaskotel-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Готовы выбрать качественное отопительное оборудование?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Свяжитесь с нами для консультации и подбора оптимального решения
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gaskotel-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                asChild
              >
                <Link href="/contacts">
                  Связаться с нами
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gaskotel-primary font-semibold px-8 py-4 text-lg"
                asChild
              >
                <Link href="/catalog">
                  Перейти в каталог
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
