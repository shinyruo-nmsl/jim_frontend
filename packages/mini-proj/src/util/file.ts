import Taro from "@tarojs/taro";

export function convertTempImgPath2Base64(tmpPath: string) {
  return new Promise<string>((resolve, reject) => {
    Taro.getFileSystemManager().readFile({
      filePath: tmpPath,
      encoding: "base64",
      success: (res) => {
        resolve("data:image/png;base64," + res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
