import { File } from "proj-util";
import { request } from "@/util/http";

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
