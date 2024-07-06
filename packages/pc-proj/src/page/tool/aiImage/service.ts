import { request } from "@/util/http";
import { AIImage } from "proj-service";

export function fetchGetAIImages(prompt: AIImage.Prompt) {
  return request<{ images: string[] }>({
    method: "post",
    url: AIImage.URL.GetImages,
    data: { prompt },
  });
}
