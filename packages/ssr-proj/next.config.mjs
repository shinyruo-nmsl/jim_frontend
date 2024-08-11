/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/ssr" : "/",
  assetPrefix: isProd ? "/ssr" : "/",
  distDir: "build",
};

export default nextConfig;
