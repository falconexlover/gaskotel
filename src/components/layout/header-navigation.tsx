import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
  external?: boolean;
}

interface HeaderNavigationProps {
  navigation: NavigationItem[];
}

export function HeaderNavigation({ navigation }: HeaderNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    // Задержка для предотвращения мигания
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) {
        clearTimeout(dropdownTimeout.current);
      }
    };
  }, []);

  return (
    <nav 
      className="hidden md:flex items-center justify-center space-x-8 py-4 border-t border-gray-200"
      onMouseLeave={handleMouseLeave}
    >
      {navigation.map((item) => (
        <div 
          key={item.name} 
          className="relative group"
          onMouseEnter={() => item.children && handleMouseEnter(item.name)}
        >
          <Link
            href={item.href}
            className="text-gray-700 hover:text-gaskotel-primary font-medium transition-colors duration-200 block"
            {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {item.name}
          </Link>

          {item.children && (
            <div 
              className={`absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 transition-all duration-200 ${
                openDropdown === item.name 
                  ? 'opacity-100 visible' 
                  : 'opacity-0 invisible pointer-events-none'
              }`}
              onMouseEnter={() => handleMouseEnter(item.name)}
            >
              <div className="py-2">
                {item.children.map((child) => (
                  <Link
                    key={child.name}
                    href={child.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gaskotel-primary transition-colors duration-150"
                    {...(child.external && { target: "_blank", rel: "noopener noreferrer" })}
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
  );
}