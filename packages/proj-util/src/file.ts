export enum URL {
  UPLOAD_BASE64_IMAGE = "/file/uploadBase64Img",
}

export function arrayBuffer2String(buffer: ArrayBuffer) {
  const uintArray = new Uint8Array(buffer);
  const decoder = new TextDecoder();
  const result = decoder.decode(uintArray);

  return result;
}

export async function convertImgFile2Base64(imgFile: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => resolve(e.target!.result as string);
  });
}
