/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включить оптимизацию изображений
  images: {
    domains: ['www.gaskotel.ru', 'gaskotel.ru', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Оптимизация сборки
  webpack: (config, { dev, isServer }) => {
    // Дополнительные оптимизации вебпака
    if (!dev) {
      // Убедимся, что минификация включена
      if (!isServer) {
        config.optimization.minimize = true;
      }
    }
    
    return config;
  },
  
  // Включить сжатие
  compress: true,
  
  // Оптимизация для продакшена
  productionBrowserSourceMaps: false,
  
  // Оптимизация статических ресурсов
  experimental: {
    // Использовать новейшие возможности оптимизации
    optimizeCss: true,
    optimizeImages: true,
  },
  
  // Включить strict-режим
  reactStrictMode: true,
};

module.exports = nextConfig;