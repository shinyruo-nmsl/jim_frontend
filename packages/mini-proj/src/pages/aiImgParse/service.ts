import { createMiniStreamm } from "@/util/http";
import { AIPSImage } from "proj-service";

export function fetchGetAIParseMessage(prompt: AIPSImage.Prompt) {
  return createMiniStreamm(AIPSImage.URL.ParseImage, {
    message: prompt,
  });
}
