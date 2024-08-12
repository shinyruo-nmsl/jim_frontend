import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // swc.vite({
    //   jsc: {
    //     parser: {
    //       syntax: "typescript",
    //       decorators: true,
    //     },
    //     transform: {
    //       decoratorMetadata: true,
    //       decoratorVersion: "2022-03",
    //       react: {
    //         runtime: "automatic",
    //       },
    //     },
    //   },
    // }),
    react({
      tsDecorators: true,
    }),
    eslintPlugin(),
  ],
  // esbuild: { target: "es2022" },
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
        unused: true,
      },
    },
    assetsInlineLimit: 0, // 设置为 0 禁用内联
  },
});
