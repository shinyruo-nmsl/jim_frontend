import { createMiniStreamm } from "@/util/http";
import { ChatGPT } from "proj-service";

export function fetchPostPromotMessage(messages: ChatGPT.Message[]) {
  return createMiniStreamm<string>(ChatGPT.URL.GetGPTContent, {
    messages: JSON.stringify(messages),
  });
}
