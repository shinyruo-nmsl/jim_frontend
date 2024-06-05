export default defineAppConfig({
  pages: ["pages/home/index", "pages/chatgpt/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000",
    selectedColor: "#198CFF",
    backgroundColor: "#e6f8fe",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
      },
      {
        pagePath: "pages/chatgpt/index",
        text: "AI助手",
      },
    ],
  },
});
