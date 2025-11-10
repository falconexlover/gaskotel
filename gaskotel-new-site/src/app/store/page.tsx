import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Фирменный магазин - ЖМЗ",
  description: "Фирменный магазин Жуковского Машиностроительного Завода, купить оригинальную продукцию",
};

export default function StorePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Фирменный магазин</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Оригинальная продукция Жуковского Машиностроительного Завода с гарантией качества
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Преимущества покупки в фирменном магазине</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span>Оригинальная продукция от производителя</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span>Полная гарантия завода-изготовителя</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span>Консультации специалистов завода</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span>Доступные цены без наценок посредников</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gaskotel-primary mr-2">✓</span>
                  <span>Поддержка и обслуживание на всей территории</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gaskotel-primary to-gaskotel-secondary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Широкий ассортимент</h2>
              <p className="mb-6 opacity-90">
                В нашем фирменном магазине вы найдете полный ассортимент продукции ЖМЗ: 
                газовые и твердотопливные котлы, газогорелочные устройства, газорегуляторное оборудование, 
                товары для дома и сада.
              </p>
              <p className="mb-6 opacity-90">
                Наши квалифицированные консультанты помогут подобрать оборудование, 
                соответствующее вашим потребностям и условиям эксплуатации.
              </p>
              <Link href="/catalog" className="inline-block bg-white text-gaskotel-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                Перейти к каталогу
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Популярные категории</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/products/gas" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">🔥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Газовые котлы</h3>
                <p className="text-gray-600 text-sm">Современные газовые котлы для отопления и горячего водоснабжения</p>
              </Link>
              
              <Link href="/products/solid-fuel" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">🏭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Твердотопливные котлы</h3>
                <p className="text-gray-600 text-sm">Надежные котлы на твердом топливе с длительным горением</p>
              </Link>
              
              <Link href="/products/gas-burners" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">💨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Газогорелочные устройства</h3>
                <p className="text-gray-600 text-sm">Газогорелочные устройства и комплектующие</p>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-2 mb-4">
              <span className="h-2 w-2 bg-gaskotel-primary rounded-full mr-2"></span>
              <span className="text-sm font-medium text-gray-600">Наши контакты</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Для получения дополнительной информации о продукции, наличии на складе или для заказа консультации 
              обращайтесь по телефону или через форму обратной связи.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contacts" className="px-6 py-3 bg-gaskotel-primary text-white rounded-lg hover:bg-gaskotel-secondary transition-colors">
                Контактная информация
              </Link>
              <Link href="tel:+74952216688" className="px-6 py-3 border border-gaskotel-primary text-gaskotel-primary rounded-lg hover:bg-gaskotel-primary hover:text-white transition-colors">
                Позвонить: +7 (495) 221-66-88
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}