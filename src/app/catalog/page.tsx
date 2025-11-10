"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, Grid, List, Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  features: string[]
  inStock: boolean
}

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'Все товары', count: 24 },
    { id: 'gas-boilers', name: 'Газовые котлы', count: 8 },
    { id: 'solid-fuel-boilers', name: 'Твердотопливные котлы', count: 6 },
    { id: 'gas-burners', name: 'Газогорелочные устройства', count: 5 },
    { id: 'home-garden', name: 'Для дома и сада', count: 5 }
  ]

  // Примерные товары (в реальном проекте будут загружаться из API)
  const products: Product[] = [
    {
      id: '1',
      name: 'Газовый котел АОГВ-11.6',
      category: 'gas-boilers',
      price: 45000,
      image: '/placeholder-boiler.jpg',
      description: 'Одноконтурный газовый котел с открытой камерой сгорания',
      features: ['Мощность 11.6 кВт', 'Открытая камера сгорания', 'Механическое управление'],
      inStock: true
    },
    {
      id: '2',
      name: 'Котел твердотопливный КЧМ-5',
      category: 'solid-fuel-boilers',
      price: 32000,
      image: '/placeholder-boiler.jpg',
      description: 'Котел длительного горения на твердом топливе',
      features: ['Мощность 5 кВт', 'Длительное горение', 'Чугунный теплообменник'],
      inStock: true
    },
    {
      id: '3',
      name: 'Газогорелочное устройство ГГУ-10',
      category: 'gas-burners',
      price: 15000,
      image: '/placeholder-burner.jpg',
      description: 'Газогорелочное устройство для промышленного использования',
      features: ['Мощность 10 кВт', 'Регулируемая производительность', 'Автоматическая модуляция'],
      inStock: false
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gaskotel-primary to-gaskotel-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Каталог товаров
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Полный ассортимент отопительного оборудования от Жуковского Машиностроительного Завода ЖМЗ
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {/* Поиск */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gaskotel-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Категории */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Категории
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-gaskotel-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Фильтры */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Фильтры
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цена (руб.)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="От"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="number"
                        placeholder="До"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-gaskotel-primary focus:ring-gaskotel-primary" />
                      <span className="ml-2 text-sm text-gray-700">В наличии</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="lg:w-3/4">
            {/* Заголовок и управление */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'Все товары' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">
                  Найдено товаров: {filteredProducts.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Сетка товаров */}
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Изображение */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Изображение товара</span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Нет в наличии
                      </div>
                    )}
                  </div>

                  {/* Информация о товаре */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-gaskotel-primary bg-gaskotel-primary/10 px-2 py-1 rounded">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Особенности */}
                    <div className="mb-4">
                      <ul className="text-sm text-gray-600 space-y-1">
                        {product.features.slice(0, viewMode === 'grid' ? 2 : 3).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-gaskotel-accent rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Цена и кнопка */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gaskotel-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <Button
                        className="bg-gaskotel-primary hover:bg-gaskotel-primary/90"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? 'В корзину' : 'Под заказ'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Пагинация */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" disabled>
                  Предыдущая
                </Button>
                <Button className="bg-gaskotel-primary hover:bg-gaskotel-primary/90">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Следующая
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}



