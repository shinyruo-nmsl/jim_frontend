import { createFetchStream } from "@/util/http";
import { ChatGPT } from "proj-service";

export function fetchPostPromotMessage(messages: ChatGPT.Message[]) {
  return createFetchStream(ChatGPT.URL.GetGPTContent, {
    messages,
  });
}
