module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 设计稿的宽度，一般是 375 或 750
      unitPrecision: 5, // 转换后的精度，即小数点位数
      viewportUnit: "vw", // 转换后的单位，建议使用 vw
      minPixelValue: 1, // 最小的转换数值，单位小于等于 1px 时不转换
    },
  },
};
