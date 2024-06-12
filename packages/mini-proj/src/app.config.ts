export default defineAppConfig({
  pages: ["pages/chatgpt/index", "pages/home/index"],
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
        pagePath: "pages/chatgpt/index",
        text: "AI助手",
      },
      {
        pagePath: "pages/home/index",
        text: "我的",
      },
    ],
  },
});
