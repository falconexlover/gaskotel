import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ru');
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'ru', name: 'Русский', active: true },
    { code: 'en', name: 'English', active: false },
  ]);

  // Загрузка сохраненного языка из localStorage или определение по настройкам браузера
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.startsWith('ru') ? 'ru' : 'en';
    
    const language = savedLanguage || browserLanguage;
    changeLanguage(language);
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode !== currentLanguage) {
      setCurrentLanguage(langCode);
      setAvailableLanguages(prev =>
        prev.map(lang => ({
          ...lang,
          active: lang.code === langCode
        }))
      );
      
      // Сохраняем предпочтение пользователя
      localStorage.setItem('preferred-language', langCode);
      
      // Здесь можно добавить логику обновления контента на новом языке
      console.log(`Язык изменен на: ${langCode}`);
      
      // В реальном приложении здесь будет вызов API или обновление словаря
    }
  };

  return {
    currentLanguage,
    availableLanguages,
    changeLanguage,
  };
};