import { createMiniStreamm } from "@/util/http";
import { AITextGener, AIImgParser } from "proj-service";

export function fetchPostPromotMessage(messages: AITextGener.Message[]) {
  return createMiniStreamm<string>(AITextGener.URL.GetGPTContent, {
    messages,
  });
}

export function fetchGetAIParseMessage(prompt: AIImgParser.Prompt) {
  return createMiniStreamm(AIImgParser.URL.ParseImage, {
    message: prompt,
  });
}
