export default defineAppConfig({
  pages: [
    "pages/aiTextGener/index",
    "pages/aiImgParser/index",
    "pages/home/index",
  ],
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
        pagePath: "pages/aiTextGener/index",
        text: "聊天机器人",
        iconPath: "./assets/ai-assistant.png",
        selectedIconPath: "./assets/ai-assistant-active.png",
      },
      {
        pagePath: "pages/aiImgParser/index",
        text: "图像分析",
        iconPath: "./assets/camera.png",
        selectedIconPath: "./assets/camera-active.png",
      },
      {
        pagePath: "pages/home/index",
        text: "我的",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      },
    ],
  },
});
