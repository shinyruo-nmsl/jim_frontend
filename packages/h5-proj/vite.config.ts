import { defineConfig } from "vite";
import { resolve } from "path";
import baseConfig from "../../vite.config";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  ...baseConfig,
  base: isProd ? "/h5/" : "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@web": resolve(__dirname, "../web-common/src"),
      "@util": resolve(__dirname, "../proj-util/src"),
      "@type": resolve(__dirname, "../proj-type/src"),
      "@service": resolve(__dirname, "../proj-service/src"),
    },
    extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
  },
});
