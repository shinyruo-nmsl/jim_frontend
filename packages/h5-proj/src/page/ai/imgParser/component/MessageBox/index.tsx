import { SpinLoading, Avatar } from "antd-mobile";
import { AIImgParser } from "proj-service";
import { MarkdownText } from "@web/component";
import GPT_SVG from "@web/assets/gpt.svg";
import { UserAvatar } from "@/component/Avatar";

export function UserMessageBox({
  content,
  onPreview,
}: {
  content: AIImgParser.Prompt;
  onPreview: (img: string) => void;
}) {
  return (
    <>
      <div className="w-full flex items-start gap-10 justify-end mb-10">
        <div className="w-fit text-left max-w-100  gap-2 bg-green-600 rounded-[5px] p-[12px] text-[12px]/[16px] break-all text-white">
          <img
            className="w-full h-auto"
            src={content.imgUrl}
            alt=""
            onClick={() => onPreview(content.imgUrl)}
          />
        </div>
        <UserAvatar />
      </div>

      <div className="w-full flex items-start gap-10 justify-end mb-10">
        <div className="w-fit text-left max-w-[300px]  gap-2 bg-green-600 rounded-[5px] p-[12px] text-[12px]/[16px] break-all text-white">
          {content.description}
        </div>
        <UserAvatar />
      </div>
    </>
  );
}

function AIMessageBox({ content }: { content: string }) {
  return (
    <div className="w-full flex items-start gap-10">
      <Avatar style={{ "--size": "30px" }} src={GPT_SVG} />
      {content.length > 0 ? (
        <MarkdownText
          content={content}
          markdownClassName="max-w-[300px] text-left"
          hlStyle={{
            borderRadius: "5px",
            padding: "10px",
            margin: "10px 0",
            overflowX: "auto",
          }}
          iconStyle={{
            top: "5px",
            right: "5px",
            cursor: "pointer",
            width: "25px",
            height: "25px",
          }}
        />
      ) : (
        <div className="w-fit max-w-[300px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all">
          <SpinLoading />
        </div>
      )}
    </div>
  );
}

export default function MessageBox({
  message,
  onPreview,
}: {
  message: AIImgParser.Message;
  onPreview: (img: string) => void;
}) {
  if (message.type === "assistant")
    return <AIMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} onPreview={onPreview} />;
}
