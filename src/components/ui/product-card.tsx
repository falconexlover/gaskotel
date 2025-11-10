import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Eye, Heart } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    price: number
    originalPrice?: number
    image: string
    description: string
    features: string[]
    inStock: boolean
    isNew?: boolean
    isOnSale?: boolean
  }
  variant?: 'default' | 'compact' | 'featured'
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    image,
    description,
    features,
    inStock,
    isNew,
    isOnSale
  } = product

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="flex">
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-gray-500 text-xs">Фото</span>
          </div>
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
              {name}
            </h3>
            <p className="text-xs text-gray-600 mb-2">{description}</p>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gaskotel-primary">
                {price.toLocaleString('ru-RU')} ₽
              </div>
              <Button size="sm" disabled={!inStock}>
                {inStock ? 'В корзину' : 'Нет в наличии'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Изображение товара</span>
          </div>

          {/* Бейджи */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Новинка
              </Badge>
            )}
            {isOnSale && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Акция
              </Badge>
            )}
            {!inStock && (
              <Badge variant="secondary">
                Нет в наличии
              </Badge>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gaskotel-primary transition-colors">
            {name}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>

          {/* Особенности */}
          <div className="mb-4">
            <ul className="text-sm text-gray-600 space-y-1">
              {features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gaskotel-accent rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Цена и кнопки */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gaskotel-primary">
                {price.toLocaleString('ru-RU')} ₽
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {originalPrice.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              className="flex-1 bg-gaskotel-primary hover:bg-gaskotel-primary/90"
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {inStock ? 'В корзину' : 'Под заказ'}
            </Button>
            <Button variant="outline" className="px-3">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="aspect-square bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Изображение товара</span>
        </div>

        {/* Бейджи */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">
              Новинка
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-red-500 hover:bg-red-600">
              Акция
            </Badge>
          )}
        </div>

        {/* Кнопки действий */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="text-white border-white">
              Нет в наличии
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-gaskotel-primary transition-colors cursor-pointer">
            {name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Особенности */}
        <div className="mb-4">
          <ul className="text-sm text-gray-600 space-y-1">
            {features.slice(0, 2).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-gaskotel-accent rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Цена */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gaskotel-primary">
              {price.toLocaleString('ru-RU')} ₽
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </div>

        {/* Кнопка */}
        <Button
          className="w-full bg-gaskotel-primary hover:bg-gaskotel-primary/90"
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {inStock ? 'В корзину' : 'Под заказ'}
        </Button>
      </div>
    </div>
  )
}




