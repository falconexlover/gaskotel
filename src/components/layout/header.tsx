"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, Phone, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  const navigation = [
    { name: "О заводе", href: "/about" },
    { name: "Новости", href: "/news" },
    {
      name: "Продукция",
      href: "#",
      children: [
        { name: "Газовое отопительное оборудование", href: "/products/gas" },
        { name: "Котлы твердотопливные", href: "/products/solid-fuel" },
        { name: "Газорегуляторное оборудование", href: "/products/gas-regulators" },
        { name: "Жестяная евробанка", href: "/products/tin-cans" },
        { name: "Для дома и сада", href: "/products/home-garden" },
      ]
    },
    { name: "Фирменный магазин", href: "/store" },
    { name: "Интернет-магазин", href: "/shop" },
    { name: "Санаторий-профилакторий", href: "https://lesnoidvorik.ru", external: true },
    { name: "Услуги", href: "/services" },
    { name: "Карьера", href: "/career" },
    { name: "Контакты", href: "/contacts" },
  ]

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Управление фокусом для доступности
  useEffect(() => {
    if (isMenuOpen) {
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [isMenuOpen])

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      {/* Верхняя панель с контактами */}
      <div className="bg-gaskotel-primary text-white py-2" role="complementary">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm" aria-label="Верхняя панель контактов">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span aria-label="Многоканальный телефон">+7 (495) 221-66-77</span>
            </div>
            <span>Многоканальный телефон</span>
          </div>
          <div className="flex items-center space-x-4" aria-label="Языковые настройки">
            <span>Русский</span>
            <span className="text-gray-300">|</span>
            <span>English</span>
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link 
            href="/" 
            className="group flex items-center gap-4" 
            aria-label="Главная страница Жуковского Машиностроительного Завода"
          >
            <div 
              className="relative inline-flex items-center overflow-hidden rounded-2xl px-5 py-3 shadow-lg ring-1 ring-white/20 backdrop-blur-sm"
              aria-hidden="true"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gaskotel-secondary via-gaskotel-accent to-gaskotel-warm opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-0 bg-white/10 mix-blend-overlay" />
              <h1 className="relative text-3xl font-black uppercase tracking-[0.25em] text-white drop-shadow-sm transition-transform duration-500 group-hover:scale-105">
                ЖМЗ
              </h1>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gaskotel-primary/80">
                Жуковский машиностроительный завод
              </span>
              <p className="text-xs text-gray-500">
                Современное отопительное оборудование
              </p>
            </div>
          </Link>

          {/* Поиск */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8" role="search">
            <div className="relative w-full">
              <label htmlFor="header-search" className="sr-only">Поиск товаров</label>
              <input
                id="header-search"
                type="text"
                placeholder="Поиск товаров..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gaskotel-secondary focus:border-transparent focus:outline-none focus:ring-offset-0"
                aria-label="Поиск товаров"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/cart" 
              aria-label="Корзина (0 товаров)"
              className="relative"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                aria-describedby="cart-count"
              >
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                <span 
                  id="cart-count"
                  className="absolute -top-2 -right-2 bg-gaskotel-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  aria-label="Количество товаров в корзине"
                >
                  0
                </span>
              </Button>
            </Link>

            <Link 
              href="/account" 
              aria-label="Личный кабинет"
            >
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Личный кабинет"
              >
                <User className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>

            {/* Мобильное меню */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Десктопная навигация */}
        <nav 
          className="hidden md:flex items-center justify-center space-x-8 py-4 border-t border-gray-200" 
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <div key={item.name} className="relative group" onMouseEnter={() => setOpenDropdown(null)}>
              <Link
                href={item.href}
                className="text-gray-700 hover:text-gaskotel-primary font-medium transition-colors duration-200 block"
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                aria-haspopup={item.children ? "true" : undefined}
                aria-expanded={openDropdown === item.name}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault()
                    handleDropdownToggle(item.name)
                  }
                }}
              >
                {item.name}
              </Link>

              {item.children && (
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 ${
                    openDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                  } transition-all duration-200`}
                  role="menu"
                  aria-label={`${item.name} подменю`}
                >
                  <div className="py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gaskotel-primary"
                        role="menuitem"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu"
            ref={mobileMenuRef}
            className="md:hidden py-4 border-t border-gray-200"
            aria-label="Мобильная навигация"
            role="navigation"
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-gaskotel-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {item.name}
                  </Link>

                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block py-1 text-sm text-gray-600 hover:text-gaskotel-primary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

