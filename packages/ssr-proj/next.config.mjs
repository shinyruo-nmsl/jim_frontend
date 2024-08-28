/** @type {import('next').NextConfig} */
import { resolve } from "path";

const __dirname = resolve();

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/ssr" : "",
  distDir: "build",
  basePath: isProd ? "/ssr" : "",
  // experimental: {
  //   ppr: true,
  // },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@web": resolve(__dirname, "../web-common/src"),
      "@util": resolve(__dirname, "../proj-util/src"),
      "@type": resolve(__dirname, "../proj-type/src"),
      "@service": resolve(__dirname, "../proj-service/src"),
    };

    return config;
  },
};

export default nextConfig;
