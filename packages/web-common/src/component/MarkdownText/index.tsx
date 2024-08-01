import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  copyText,
  htmlDecode,
  convertUpper2UnderLineCssKey,
} from "@web/util/html";
import { createMarkdown } from "@web/service/markdown";

const markdown = createMarkdown();

function MarkdownText({
  content,
  hlStyle = {},
  iconStyle = {},
}: {
  content: string;
  hlStyle?: CSSProperties;
  iconStyle?: CSSProperties;
}) {
  const markdownRef = useRef<HTMLDivElement>(null);

  const [showCopy, setShowCopy] = useState(true);

  const handleCopy = () => {
    copyText(content);
    setShowCopy(false);
    setTimeout(() => {
      setShowCopy(true);
    }, 1000);
  };

  useEffect(() => {
    const ref = markdownRef.current;
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

  useEffect(() => {
    const ref = markdownRef.current;
    if (ref) {
      const hljs = ref.querySelectorAll(".hljs") as NodeListOf<HTMLElement>;
      hljs.forEach((hl) => {
        const copySvg = hl.querySelector("i.icon-copy") as HTMLElement;
        const okSvg = hl.querySelector("i.icon-ok") as HTMLElement;
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
        copySvg.style.cssText = `position: absolute; ${iconStyleStr}`;
        okSvg.style.cssText = `position: absolute; display: none; ${iconStyleStr}`;
        hl.style.cssText = `position: relative; ${hlStyleStr}`;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ref={markdownRef}
        className="w-fit max-w-[800px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all"
        dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
      ></div>
    </div>
  );
}

export default MarkdownText;
