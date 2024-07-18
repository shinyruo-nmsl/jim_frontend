import { createFetchStream } from "@/util/http";
import { AIPSImage } from "proj-service";

export function fetchGetAIParseMessage(prompt: AIPSImage.Prompt) {
  return createFetchStream(AIPSImage.URL.ParseImage, {
    message: prompt,
  });
}
