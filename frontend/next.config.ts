import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bookingvacationtour.com', // Replace with your API URL
  },

  // Base path (if your app is hosted in a subdirectory)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Replace with your subpath (e.g., '/booking')

  // Custom Webpack configuration (optional)
  webpack: (config, { isServer }) => {
    // Add custom Webpack configuration here if needed
    return config;
  },

  // Redirects (optional)
  async redirects() {
    return [
      {
        source: '/old-tours', // Replace with your old URL
        destination: '/tours', // Replace with your new URL
        permanent: true, // Use true for 301 redirect, false for 302
      },
    ];
  },

  // Headers (optional)
  async headers() {
    return [
      {
        source: '/:path*', // Apply to all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Example security header
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'; style-src 'self';", // Example CSP header
          },
        ],
      },
    ];
  },

  // Internationalization (i18n) (optional)
  i18n: {
    locales: ['en', 'kh'], // Replace with your supported locales
    defaultLocale: 'en', // Replace with your default locale
  },

  // Static export (optional)
  output: process.env.NEXT_PUBLIC_OUTPUT === 'export' ? 'export' : undefined, // Enable static export if needed

  // Trailing slashes (optional)
  trailingSlash: true, // Add trailing slashes to URLs
};

export default nextConfig;