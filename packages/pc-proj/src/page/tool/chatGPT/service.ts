import { createFetchStream } from "@/util/http";

export function fetchPostPromotMessage(prompt: string) {
  return createFetchStream("/ai/gptContent", { prompt });
}
