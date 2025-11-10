import Link from "next/link"
import { MapPin, Phone, Envelope } from "lucide-react"

export function Footer() {
  const footerLinks = [
    {
      title: "Информация",
      links: [
        { name: "О заводе", href: "/about" },
        { name: "Новости", href: "/news" },
        { name: "Карьера", href: "/career" },
        { name: "Контакты", href: "/contacts" },
      ]
    },
    {
      title: "Продукция",
      links: [
        { name: "Газовые котлы", href: "/products/gas" },
        { name: "Твердотопливные котлы", href: "/products/solid-fuel" },
        { name: "Устройства газогорелочные", href: "/products/gas-burners" },
        { name: "Для дома и сада", href: "/products/home-garden" },
      ]
    },
    {
      title: "Магазин",
      links: [
        { name: "Каталог товаров", href: "/catalog" },
        { name: "Оплата и доставка", href: "/payment-delivery" },
        { name: "Возврат товара", href: "/returns" },
        { name: "Гарантия", href: "/warranty" },
      ]
    },
    {
      title: "Услуги",
      links: [
        { name: "Сервисное обслуживание", href: "/services/maintenance" },
        { name: "Консультации", href: "/services/consulting" },
        { name: "Монтаж оборудования", href: "/services/installation" },
        { name: "Обучение персонала", href: "/services/training" },
      ]
    }
  ]

  return (
    <footer className="bg-gaskotel-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Логотип и контакты */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-gaskotel-primary font-bold text-lg">Ж</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Жуковский Машиностроительный Завод ЖМЗ</h3>
                <p className="text-sm text-gray-300">Жуковский машиностроительный завод</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-gaskotel-accent" />
                <div>
                  <p className="text-sm">
                    140184, Московская область,<br />
                    г. Жуковский, ул. Заводская, д. 3
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gaskotel-accent" />
                <div>
                  <p className="text-sm font-medium">+7 (495) 221-66-88</p>
                  <p className="text-xs text-gray-300">Многоканальный телефон</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Envelope className="h-5 w-5 text-gaskotel-accent" />
                <a
                  href="mailto:zmz@gaskotel.ru"
                  className="text-sm hover:text-gaskotel-accent transition-colors"
                >
                  zmz@gaskotel.ru
                </a>
              </div>
            </div>
          </div>

          {/* Навигационные ссылки */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} Жуковский Машиностроительный Завод ЖМЗ. Все права защищены.
            </div>

            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Публичная оферта
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}



