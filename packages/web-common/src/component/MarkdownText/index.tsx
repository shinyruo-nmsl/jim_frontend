import { CSSProperties, useEffect, useRef, useState } from "react";
import { copyText, htmlDecode } from "@web/util/html";
import { createMarkdown } from "@web/service/markdown";

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

  const [hasInitMarkdown, setHasInitMarkdown] = useState(false);

  const markdownRef = useRef<any>(null);

  const [showCopy, setShowCopy] = useState(true);

  const handleCopy = () => {
    copyText(content);
    setShowCopy(false);
    setTimeout(() => {
      setShowCopy(true);
    }, 1000);
  };

  useEffect(() => {
    if (!hasInitMarkdown) {
      createMarkdown({ hlStyle, iconStyle }).then((markdown) => {
        markdownRef.current = markdown;
        setHasInitMarkdown(true);
      });
    }
  }, [hlStyle, iconStyle, hasInitMarkdown]);

  useEffect(() => {
    if (hasInitMarkdown) {
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
    }
  }, [hasInitMarkdown]);

  return (
    hasInitMarkdown && (
      <div className="relative">
        <div
          className="absolute right-[1px] top-[1px] px-[10px] py-[5px] rounded-[5px] bg-gray-300 bg-opacity-40 flex items-center justify-center cursor-pointer"
          onClick={handleCopy}
        >
          {showCopy && (
            <i className="icon-copy text-white w-[20px] h-[20px]"></i>
          )}
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
    )
  );
}

export default MarkdownText;
