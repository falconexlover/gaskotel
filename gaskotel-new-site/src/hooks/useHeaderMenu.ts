import { useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  href: string;
  children?: MenuItem[];
  external?: boolean;
}

export const useHeaderMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation: MenuItem[] = [
    { name: "О заводе", href: "/about" },
    { name: "Новости", href: "/news" },
    {
      name: "Продукция",
      href: "#",
      children: [
        { name: "Газовое отопительное оборудование", href: "/products/gas" },
        { name: "Твердотопливные котлы", href: "/products/solid-fuel" },
        { name: "Газогорелочные устройства", href: "/products/gas-burners" },
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
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Закрытие меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMenuOpen,
    activeDropdown,
    navigation,
    toggleMenu,
    closeMenu,
    toggleDropdown
  };
};