import Taro from "@tarojs/taro";
import { convertTempImgPath2Base64 } from "./file";

export function chooseImg({ count }: { count: number }) {
  return new Promise<string[]>((resolve, reject) => {
    Taro.chooseMedia({
      count,
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      camera: "back",
      success: (res) => {
        resolve(res.tempFiles.map((file) => file.tempFilePath));
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export async function chooseImgAndConvert2Base64({ count }: { count: number }) {
  const imgPaths = await chooseImg({ count });
  const base64s = await Promise.all(imgPaths.map(convertTempImgPath2Base64));
  return base64s;
}
