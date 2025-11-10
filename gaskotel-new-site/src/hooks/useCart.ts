import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        updateCartCount(parsedCart);
      } catch (e) {
        console.error('Ошибка при загрузке корзины:', e);
        setItems([]);
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartCount(items);
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const updateCartCount = (cartItems: CartItem[]) => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return {
    items,
    isOpen,
    cartCount,
    totalPrice: getTotalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  };
};