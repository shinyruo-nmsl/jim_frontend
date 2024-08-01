import MarkDown from "markdown-it";
import hljs from "highlight.js";
import { htmlEncode } from "../util/html";
import "highlight.js/styles/atom-one-dark-reasonable.css";

export function createMarkdown() {
  const markdown: MarkDown = MarkDown({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return getMarkdownCodeTemplate(
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value,
            str
          );
        } catch (err) {
          console.log(err);
        }
      }
      return getMarkdownCodeTemplate(markdown.utils.escapeHtml(str));
    },
  });
  return markdown;
}

function getMarkdownCodeTemplate(code: string, rawString = "") {
  return `<div class="hljs" style='position: relative;'><i style='position: absolute;' class='icon-copy'></i><i style='position: absolute;' class='icon-ok'></i><code>${code}</code><div style='display: none;' class='raw-string'>${htmlEncode(rawString)}</div></div>`;
}
