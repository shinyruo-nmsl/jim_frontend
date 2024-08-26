/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  assetPrefix: isProd ? "/ssr" : "",
  distDir: "build",
  experimental: {
    ppr: true,
  },
};

export default nextConfig;
