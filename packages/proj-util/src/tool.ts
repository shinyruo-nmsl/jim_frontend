export function createPromiseResolvers<T, E>() {
  let resolve: ((val: T) => void) | undefined = undefined;
  let reject: ((err: E) => void) | undefined = undefined;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}

export function extractContentFromRichHtmlText(htmlText: string) {
  return htmlText
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractOuterJson(str: string) {
  const jsonStart = str.indexOf("{");
  const jsonEnd = str.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("No JSON object found");
  }

  const jsonStr = str.slice(jsonStart, jsonEnd + 1);
  const cleanedJsonStr = jsonStr
    .replace(/\\n/g, "")
    .replace(/\\r/g, "")
    .replace(/\\t/g, "");

  try {
    const jsonObject = JSON.parse(JSON.stringify(cleanedJsonStr));
    return jsonObject;
  } catch (e) {
    throw new Error("Invalid JSON object");
  }
}
