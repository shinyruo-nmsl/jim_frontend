import { request } from "@/util/http";

export function fetchUploadBase64Image(params: {
  base64Img: string;
  fileName?: string;
}) {
  return request<{ url: string }>({
    method: "post",
    url: "file/uploadBase64Img",
    data: { ...params },
  });
}
