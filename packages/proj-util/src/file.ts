export function arrayBuffer2String(buffer: ArrayBuffer) {
  const uintArray = new Uint8Array(buffer);
  const decoder = new TextDecoder();
  const result = decoder.decode(uintArray);

  return result;
}
