import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/pc/" : "/",
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
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
      "@util": resolve(__dirname, "../proj-util/src"),
      "@type": resolve(__dirname, "../proj-type/src"),
      "@service": resolve(__dirname, "../proj-service/src"),
    },
    extensions: [".js", ".json", ".ts", ".tsx", ".jsx"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("vite/preload-helper") ||
            id.includes("vite/modulepreload-polyfill")
          ) {
            return "preloadHelper";
          }
          if (id.includes("plugin-vue:export-helper")) {
            return "exportHelper";
          }
          if (id.includes("commonjsHelpers.js")) {
            return "commonjsHelper";
          }
          if (id.includes("highlight.js")) {
            return "highlight";
          }
          if (id.includes("markdown-it")) {
            return "markdown-it";
          }
          if (id.includes("pptxgenjs")) {
            return "pptxgenjs";
          }
          if (id.includes("pptxtojson")) {
            return "pptxtojson";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // 删除所有console语句
        pure_funcs: ["console.log"], // 删除console.log语句
      },
    },
    assetsInlineLimit: 0, // 设置为 0 禁用内联
  },
});
