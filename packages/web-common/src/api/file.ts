import { File } from "proj-util";
import { request } from "@web/util/http";

export function fetchUploadBase64Image(params: {
  base64Img: string;
  fileName?: string;
}) {
  return request<{ url: string }>({
    method: "post",
    url: File.URL.UPLOAD_BASE64_IMAGE,
    data: { ...params },
  });
}

export async function fetchUploadImgFile(params: { imgFile: File }) {
  const { imgFile } = params;
  const formData = new FormData();
  formData.append("file", imgFile);

  return request<{ url: string }>({
    method: "post",
    url: File.URL.UPLOAD_IMG_FILE,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "*/*",
    },
  });
}
