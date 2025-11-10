import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gaskotel.ru",
      },
      {
        protocol: "https",
        hostname: "gaskotel.ru",
      },
      {
        protocol: "https",
        hostname: "*.gaskotel.ru",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["react", "next"],
  },
};

export default nextConfig;
