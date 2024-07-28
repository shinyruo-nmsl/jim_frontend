/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[i] = `${i}px`;
          return acc;
        }, {}),
      },
      spacing: {
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[i] = `${i}px`;
          return acc;
        }, {}),
      },
      colors: {
        red: {
          DEFAULT: "#ED1B26",
          dark: "#94171D",
        },
        blue: "#276EF1",
        brown: "#99644C",
        green: {
          DEFAULT: "#219653",
          dark: "#21531C",
        },
        orange: "#FB6939",
        purple: "#7356BF",
        yellow: "#EEAB27",
        black: {
          DEFAULT: "#161616",
          light: "#363636",
          pure: "#000000",
        },
        gray: {
          DEFAULT: "#222222",
          pressed: "#2b2b2b",
          subtitle: "#757575",
          description: "#AFAFAF",
          skeleton: "#2c2c2c",
          indicator: "#353535",
        },
        white: "#FFFFFF",
        background: "#282828",
        border: "rgba(117, 117, 117, 0.1)",
        grey: "#f7f7f7",
        azure: "azure",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
        large: "12px",
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[i] = `${i}px`;
          return acc;
        }, {}),
      },
      height: {
        "100vh": "100vh",
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[`calc-100vh-minus-${i}`] = `calc(100vh - ${i}px)`;
          return acc;
        }, {}),
        fit: "fit-content",
      },
      width: {
        fit: "fit-content",
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[`calc-100vw-minus-${i}`] = `calc(100vw - ${i}px)`;
          return acc;
        }, {}),
      },
      lineHeight: {
        ...Array.from({ length: 1000 }).reduce((acc, _, i) => {
          acc[i] = `${i}px`;
          return acc;
        }, {}),
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
