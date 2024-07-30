import { parse } from "pptxtojson";
import { createPromiseResolvers } from "./tool";
import { zipPPTJson } from "./ppt";

export enum URL {
  UPLOAD_BASE64_IMAGE = "/file/uploadBase64Img",
  UPLOAD_IMG_FILE = "/file/uploadImgFile",
}

export function arrayBuffer2String(buffer: ArrayBuffer) {
  const uintArray = new Uint8Array(buffer);
  const decoder = new TextDecoder();
  const result = decoder.decode(uintArray);

  return result;
}

export async function imgFile2Base64(imgFile: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => resolve(e.target!.result as string);
  });
}

export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export async function pptFile2Json(pptFile: File) {
  const { promise, resolve } = createPromiseResolvers();
  const reader = new FileReader();
  reader.readAsArrayBuffer(pptFile);
  reader.onload = async (e) => {
    const pptJson = await parse(e.target!.result as ArrayBuffer);
    resolve(zipPPTJson(pptJson));
  };

  return promise;
}
