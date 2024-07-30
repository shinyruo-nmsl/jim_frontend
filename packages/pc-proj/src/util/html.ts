import { CSSProperties } from "react";
import MarkDown from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import CPOY_SVG from "@/assets/copy.svg";
import OK_SVG from "@/assets/ok.svg";

export function createMarkdown(markdownStyle: CSSProperties = {}) {
  const markdown: MarkDown = MarkDown({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return getMarkdownCodeTemplate(
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value,
            markdownStyle,
            str
          );
        } catch (err) {
          console.log(err);
        }
      }
      return getMarkdownCodeTemplate(
        markdown.utils.escapeHtml(str),
        markdownStyle
      );
    },
  });
  return markdown;
}

function getMarkdownCodeTemplate(
  code: string,
  _style: CSSProperties = {},
  rawString = ""
) {
  const style: CSSProperties = {
    ..._style,
    position: "relative",
  };

  const styleStr = Object.keys(style)
    .map(
      (k) =>
        `${convertUpper2UnderLineCssKey(k)}: ${style[k as keyof CSSProperties]}`
    )
    .join("; ");

  const svgStyle: CSSProperties = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    width: "25px",
    height: "25px",
  };

  const copySvgStyleStr = Object.keys(svgStyle)
    .map(
      (k) =>
        `${convertUpper2UnderLineCssKey(k)}: ${svgStyle[k as keyof CSSProperties]}`
    )
    .join("; ");

  const okSvgStyleStr = `${copySvgStyleStr}; display: none;`;

  return `<div class="hljs" style='${styleStr}'><img style='${copySvgStyleStr}' class='icon-copy' src=${CPOY_SVG} alt=""/><img style='${okSvgStyleStr}' class='icon-ok' src=${OK_SVG} alt=""/><code>${code}</code><div style='display: none;' class='raw-string'>${htmlEncode(rawString)}</div></div>`;
}

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
  navigator.clipboard.writeText(str);
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
  console.log("url:", url);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.dispatchEvent(new MouseEvent("click"));
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
