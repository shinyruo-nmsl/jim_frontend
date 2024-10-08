import type { Config } from "tailwindcss";
import DefaultConfig from "../../config/tailwind.config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../web-common/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      ...DefaultConfig.theme?.extend,
    },
  },
  plugins: [],
};
export default config;
