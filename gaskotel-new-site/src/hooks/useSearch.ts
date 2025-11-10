import { useState, useEffect } from 'react';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Здесь будет вызов API для поиска
      // Временная имитация поиска
      await new Promise(resolve => setTimeout(resolve, 500));
      setSearchResults([
        { id: 1, name: `Результат по запросу "${query}" 1`, category: 'Категория 1' },
        { id: 2, name: `Результат по запросу "${query}" 2`, category: 'Категория 2' },
      ]);
    } catch (error) {
      console.error('Ошибка поиска:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Сброс результатов при изменении запроса
  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return {
    searchQuery,
    isSearchFocused,
    searchResults,
    isLoading,
    setSearchQuery,
    setIsSearchFocused,
    handleSearchChange,
    handleSearchSubmit,
    clearSearch,
  };
};