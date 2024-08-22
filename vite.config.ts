import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import eslintPlugin from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
    }),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    eslintPlugin(),
    viteCompression({
      verbose: true,
      disable: false,
      deleteOriginFile: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  server: {
    port: 8888,
    host: "0.0.0.0",
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
          if (id.includes("antd")) {
            return "antd";
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
