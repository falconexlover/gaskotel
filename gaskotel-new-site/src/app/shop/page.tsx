import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Интернет-магазин - ЖМЗ",
  description: "Интернет-магазин Жуковского Машиностроительного Завода, купить продукцию онлайн",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Интернет-магазин</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Удобная покупка продукции ЖМЗ онлайн с доставкой по всей России
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-gaskotel-primary to-gaskotel-secondary rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Почему выбирают наш интернет-магазин</h2>
              <ul className="space-y-3 opacity-90">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Оригинальные товары с гарантией завода-изготовителя</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Круглосуточный доступ к каталогу продукции</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Удобная система поиска и фильтрации товаров</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Быстрая доставка по всей территории РФ</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Профессиональная консультация специалистов</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Как совершить покупку</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gaskotel-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Выберите товар</h3>
                    <p className="text-gray-600 text-sm">Используйте фильтры и поиск для нахождения нужного оборудования</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gaskotel-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Оформите заказ</h3>
                    <p className="text-gray-600 text-sm">Добавьте товары в корзину и заполните контактную информацию</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gaskotel-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Оплатите заказ</h3>
                    <p className="text-gray-600 text-sm">Выберите удобный способ оплаты и подтвердите заказ</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gaskotel-primary text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Получите товар</h3>
                    <p className="text-gray-600 text-sm">Доставка осуществляется транспортной компанией или курьером</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Категории товаров</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/products/gas" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">🔥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Газовые котлы</h3>
                <p className="text-gray-600 text-sm">Энергоэффективные решения</p>
              </Link>
              
              <Link href="/products/solid-fuel" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">🏭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Твердотопливные котлы</h3>
                <p className="text-gray-600 text-sm">Надежные системы отопления</p>
              </Link>
              
              <Link href="/products/gas-burners" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">💨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Газогорелочные устройства</h3>
                <p className="text-gray-600 text-sm">Комплектующие и горелки</p>
              </Link>
              
              <Link href="/products/home-garden" className="border border-gray-200 rounded-xl p-6 text-center hover:border-gaskotel-primary transition-colors group">
                <div className="text-4xl mb-4 group-hover:text-gaskotel-primary transition-colors">🏡</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Для дома и сада</h3>
                <p className="text-gray-600 text-sm">Оборудование и инструменты</p>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Нужна помощь с выбором?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Наши специалисты готовы проконсультировать вас по всем вопросам, связанным с подбором, 
              установкой и эксплуатацией оборудования ЖМЗ.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contacts" className="px-6 py-3 bg-gaskotel-primary text-white rounded-lg hover:bg-gaskotel-secondary transition-colors">
                Заказать консультацию
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