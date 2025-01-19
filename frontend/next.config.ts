import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.bookingvacationtour.com',
  },
  output: process.env.NEXT_PUBLIC_OUTPUT === 'export' ? 'export' : undefined,
};

export default nextConfig;