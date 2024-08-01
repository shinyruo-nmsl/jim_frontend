import { AITextGener, AIImgParser, AIImgGener } from "proj-service";
import { createFetchStream, request } from "@web/util/http";


export function fetchPostPromotMessage(messages: AITextGener.Message[]) {
  return createFetchStream(AITextGener.URL.GetGPTContent, {
    messages,
  });
}

export function fetchGetAIParseMessage(prompt: AIImgParser.Prompt) {
  return createFetchStream(AIImgParser.URL.ParseImage, {
    message: prompt,
  });
}

export function fetchGetAIImages(prompt: AIImgGener.Prompt) {
  return request<{ images: string[] }>({
    method: "post",
    url: AIImgGener.URL.GetImages,
    data: { prompt },
  });
}
