export function convertUpper2UnderLineCssKey(key: string) {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export function htmlEncode(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function htmlDecode(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export function copyText(str: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = str;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function awaitAllChildrenImgsLoaded(
  parent: HTMLElement,
  callback: () => void
) {
  const imgs = parent.querySelectorAll("img");
  let loadedCount = 0;

  imgs.forEach((img) => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        if (loadedCount === imgs.length) {
          callback();
        }
      });
    }
  });

  if (loadedCount === imgs.length) {
    callback();
  }
}

export function downloadFileFromBlob(blob: Blob, fileName: string) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.dispatchEvent(new MouseEvent("click"));
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
