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
  base: isProd ? "./" : "/",
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
    host: "0.0.0.0",
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
          if (id.includes("markdown-it")) {
            return "markdown-it";
          }
          if (id.includes("highlight.js")) {
            return "highlight";
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

    minify: false, // 禁用压缩
    sourcemap: true, // 生成 source map 文件，便于调试
  },
});
