import { CSSProperties, useEffect, useRef, useState } from "react";
import { copyText, htmlDecode } from "@web/util/html";
import MarkDown from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { convertUpper2UnderLineCssKey, htmlEncode } from "@web/util/html";

let markdown: MarkDown;

function createMarkdown({
  hlStyle = {},
  iconStyle = {},
}: {
  hlStyle?: CSSProperties;
  iconStyle?: CSSProperties;
}) {
  if (markdown) {
    return markdown;
  }

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

function MarkdownText({
  content,
  hlStyle = {},
  iconStyle = {},
}: {
  content: string;
  hlStyle?: CSSProperties;
  iconStyle?: CSSProperties;
}) {
  const markdownDomRef = useRef<HTMLDivElement>(null);

  const markdownRef = useRef(createMarkdown({ hlStyle, iconStyle }));

  const [showCopy, setShowCopy] = useState(true);

  const handleCopy = () => {
    copyText(content);
    setShowCopy(false);
    setTimeout(() => {
      setShowCopy(true);
    }, 1000);
  };

  useEffect(() => {
    const ref = markdownDomRef.current;
    let callback: (e: Event) => void;
    if (ref) {
      callback = (e: Event) => {
        const target = e.target as HTMLElement;
        const hljs = target.closest(".hljs");
        if (hljs) {
          const copySvg = hljs.querySelector("i.icon-copy") as HTMLElement;
          const okSvg = hljs.querySelector("i.icon-ok") as HTMLElement;
          const rawString = hljs.querySelector(".raw-string") as HTMLElement;
          copyText(htmlDecode(rawString.textContent || ""));
          copySvg.style.display = "none";
          okSvg.style.removeProperty("display");
          setTimeout(() => {
            okSvg.style.display = "none";
            copySvg.style.display = "block";
          }, 1000);
        }
      };

      ref.addEventListener("click", callback);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("click", callback);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute right-[1px] top-[1px] px-[10px] py-[5px] rounded-[5px] bg-gray-300 bg-opacity-40 flex items-center justify-center cursor-pointer"
        onClick={handleCopy}
      >
        {showCopy && <i className="icon-copy text-white w-[20px] h-[20px]"></i>}
        {!showCopy && <i className="icon-ok text-red w-[20px] h-[20px]"></i>}
      </div>
      <div
        ref={markdownDomRef}
        className="w-fit max-w-[800px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all"
        dangerouslySetInnerHTML={{
          __html: markdownRef.current.render(content),
        }}
      ></div>
    </div>
  );
}

export default MarkdownText;
