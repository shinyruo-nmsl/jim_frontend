import MarkDown from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { CSSProperties } from "react";

export function createMarkdown(markdownStyle: CSSProperties = {}) {
  const markdown: MarkDown = MarkDown({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return getCodeTemplate(
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value,
            markdownStyle
          );
        } catch (err) {
          console.log(err);
        }
      }
      return getCodeTemplate(markdown.utils.escapeHtml(str), markdownStyle);
    },
  });
  return markdown;
}

function convertCssKey(key: string) {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}

function getCodeTemplate(code: string, style: CSSProperties = {}) {
  const styleStr = Object.keys(style)
    .map((k) => `${convertCssKey(k)}: ${style[k as keyof CSSProperties]}`)
    .join("; ");

  return `<div class="hljs" style='${styleStr}'><code>${code}</code></div>`;
}
