# Неиспользуемые файлы из старой версии сайта (которые можно удалить)

## CSS файлы:
1. https://www.gaskotel.ru/wp-content/plugins/content-views-query-and-display-post-page/public/assets/css/cv.css?ver=4.1
   - Назначение: Стили для плагина Content Views
   - Статус: Не используется в новом хедере
   - Решение: Можно удалить

2. https://www.gaskotel.ru/wp-content/plugins/yith-woocommerce-wishlist/assets/css/jquery.selectBox.css?ver=1.2.0
   - Назначение: Стили для избранного товаров
   - Статус: Не используется в новом хедере
   - Решение: Можно удалить

3. https://www.gaskotel.ru/wp-content/plugins/yith-woocommerce-wishlist/assets/css/font-awesome.css?ver=4.7.0
   - Назначение: Иконки Font Awesome (старая версия)
   - Статус: В новом проекте используется Lucide React
   - Решение: Можно удалить

4. https://www.gaskotel.ru/wp-content/plugins/woocommerce/assets/css/prettyPhoto.css?ver=3.1.6
   - Назначение: Стили для галереи изображений
   - Статус: Не используется в хедере
   - Решение: Можно удалить

5. https://www.gaskotel.ru/wp-content/plugins/yith-woocommerce-wishlist/assets/css/style.css?ver=3.35.0
   - Назначение: Стили для списка избранного
   - Статус: Не используется в новом хедере
   - Решение: Можно удалить

6. https://www.gaskotel.ru/wp-content/plugins/contact-form-7-style/css/frontend.css?ver=3.1.9
   - Назначение: Стили для форм обратной связи
   - Статус: Не используется в хедере
   - Решение: Можно удалить

7. https://www.gaskotel.ru/wp-content/plugins/contact-form-7-style/css/responsive.css?ver=3.1.9
   - Назначение: Адаптивные стили для форм
   - Статус: Не используется в хедере
   - Решение: Можно удалить

8. https://www.gaskotel.ru/wp-content/plugins/so-page-builder-animate/css/animate.min.css?ver=1
   - Назначение: Анимации для страниц
   - Статус: В новом проекте используются Framer Motion
   - Решение: Можно удалить

9. https://www.gaskotel.ru/wp-content/plugins/widgets-for-siteorigin/inc/../css/defaults.css?ver=1.4.7
   - Назначение: Стили для виджетов
   - Статус: Не используется в хедере
   - Решение: Можно удалить

10. https://www.gaskotel.ru/wp-content/plugins/advanced-woo-search/assets/css/common.min.css?ver=3.39
    - Назначение: Стили для поиска товаров
    - Статус: В новом проекте реализация будет другая
    - Решение: Можно удалить

## JS файлы:
1. https://www.gaskotel.ru/wp-content/plugins/tabs/assets/frontend/js/scripts.js?ver=30fb3fb57e3af51081f7ff7acc1d3c51
   - Назначение: Табы на страницах
   - Статус: Не используется в хедере
   - Решение: Можно удалить

2. https://www.gaskotel.ru/wp-content/plugins/woo-shop-manager-admin-bar/assets/js/switch-user.js?ver=3.6.5
   - Назначение: Переключение пользователей (админка)
   - Статус: Не используется в хедере
   - Решение: Можно удалить

## Общие рекомендации:
1. После перехода на новую версию сайта можно удалить все плагины WordPress, связанные с устаревшими компонентами.
2. Необходимо протестировать сайт на наличие битых функций перед удалением файлов.
3. Рекомендуется оставить только основные файлы:
   - bootstrap.min.css (заменить на современный подход)
   - style.css (основной файл темы)
   - font-awesome (заменить на Lucide React в новом проекте)
   - jQuery только если действительно необходим
   - Основные WooCommerce файлы