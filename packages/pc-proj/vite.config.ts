import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/pc/" : "/",
  plugins: [
    react(),
    {
      ...legacy({
        targets: ["defaults", "not IE 11"],
      }),
      apply: "build",
    },
    // checker({ typescript: true }),
    eslintPlugin(),
  ],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@web": resolve(__dirname, "../web-common/src"),
    },
    extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
  },
  build: {
    assetsInlineLimit: 0, // 设置为 0 禁用内联
  },
});
