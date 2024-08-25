import { copyText } from "@web/util/html";
import { Poetry } from "proj-service";
import { useState } from "react";

type PoetryCardProps = Exclude<Poetry.PoetryData, "id"> &
  Poetry.AuthorAndKeyWordsQuery;

function PoetryCard({
  title,
  author,
  content,
  keyword1,
  keyword2,
}: PoetryCardProps) {
  const [showCopy, setShowCopy] = useState(true);

  const shownContent = Poetry.fomatPoetryContent(content, keyword1, keyword2);

  const handleCopy = () => {
    setShowCopy(false);
    copyText(content);
    setTimeout(() => {
      setShowCopy(true);
    }, 1000);
  };

  return (
    <div className="mx-auto w-[80%] h-[100%] flex flex-col items-center rounded-20 bg-[#E6F7FF] p-20 relative">
      {showCopy && (
        <i
          className="icon-copy absolute right-10 top-10 w-15 h-15"
          onClick={handleCopy}
        ></i>
      )}
      {!showCopy && (
        <i className="icon-ok absolute right-10 top-10 w-15 h-15"></i>
      )}
      <h3 className="font-bold text-20 leading-32">{title}</h3>
      <h5 className="font-bold text-14 leading-18 pb-6">{author}</h5>

      <div className="w-full h-full overflow-auto">
        {shownContent.map((segment, index) => (
          <div className="text-14 leading-18" key={index}>
            {segment.map((chunk, index) => (
              <span
                className={
                  [keyword1, keyword2].includes(chunk) ? "bg-yellow" : ""
                }
                key={index}
              >
                {chunk}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PoetryCard;
