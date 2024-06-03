import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      ...legacy({
        targets: ["defaults", "not IE 11"],
      }),
      apply: "build",
    },
    checker({ typescript: true }),
    eslintPlugin(),
  ],
  server: {
    port: 8888,
  },
});
