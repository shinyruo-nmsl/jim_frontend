import { CSSProperties } from "react";
import MarkDown from "markdown-it";
import { convertUpper2UnderLineCssKey, htmlEncode } from "@web/util/html";

let markdown: MarkDown;

export async function createMarkdown({
  hlStyle = {},
  iconStyle = {},
}: {
  hlStyle?: CSSProperties;
  iconStyle?: CSSProperties;
}) {
  if (markdown) {
    return markdown;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, hljs] = await Promise.all([
    (await import("highlight.js/styles/atom-one-dark-reasonable.css")).default,
    (await import("highlight.js")).default,
  ]);

  markdown = MarkDown({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return getMarkdownCodeTemplate(
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value,
            str,
            hlStyle,
            iconStyle
          );
        } catch (err) {
          console.log(err);
        }
      }
      return getMarkdownCodeTemplate(
        markdown.utils.escapeHtml(str),
        str,
        hlStyle,
        iconStyle
      );
    },
  });
  return markdown;
}

function getMarkdownCodeTemplate(
  code: string,
  rawString = "",
  hlStyle: CSSProperties = {},
  iconStyle: CSSProperties = {}
) {
  const hlStyleStr = Object.keys(hlStyle).reduce(
    (acc, k) =>
      `${acc}${convertUpper2UnderLineCssKey(k)}: ${hlStyle[k as keyof CSSProperties]}; `,
    ""
  );
  const iconStyleStr = Object.keys(iconStyle).reduce(
    (acc, k) =>
      `${acc}${convertUpper2UnderLineCssKey(k)}: ${iconStyle[k as keyof CSSProperties]}; `,
    ""
  );

  return `<div class="hljs" style='position: relative; ${hlStyleStr}'><i style='position: absolute; ${iconStyleStr}' class='icon-copy'></i><i style='position: absolute; display: none; ${iconStyleStr}' class='icon-ok'></i><code>${code}</code><div style='display: none;' class='raw-string'>${htmlEncode(rawString)}</div></div>`;
}
