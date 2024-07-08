import { request } from "@/util/http";
import { AIGNImage } from "proj-service";

export function fetchGetAIImages(prompt: AIGNImage.Prompt) {
  return request<{ images: string[] }>({
    method: "post",
    url: AIGNImage.URL.GetImages,
    data: { prompt },
  });
}
