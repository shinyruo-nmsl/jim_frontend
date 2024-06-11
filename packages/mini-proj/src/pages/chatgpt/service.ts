import { createMiniStreamm } from "@/util/http";

export function fetchPostPromotMessage(prompt: string) {
  return createMiniStreamm<string>("/ai/gptContent", {
    prompt,
  });
}
