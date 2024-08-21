import { Spin } from "antd";
import { AIImgParser } from "proj-service";
import { MarkdownText } from "@web/component";
import { CharacterAvatar, UserAvatar } from "@/component/Avatar";


export function UserMessageBox({ content }: { content: AIImgParser.Prompt }) {
  return (
    <div className="w-full flex items-start gap-10 justify-end">
      <div className="w-fit max-w-[800px]  flex flex-col items-center gap-2 bg-green-600 rounded-[5px] p-[12px] text-[12px]/[16px] break-all text-white">
        <img
          className="h-[120px] w-auto"
          src={content.imgUrl}
          alt={content.description}
        />
        <div className="self-start">{`描述：${content.description}`}</div>
      </div>
      <UserAvatar />
    </div>
  );
}

function AIMessageBox({ content }: { content: string }) {
  return (
    <div className="w-full flex items-start gap-10">
      <CharacterAvatar characterName="A" />
      {content.length > 0 ? (
        <MarkdownText
          content={content}
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
        <div className="w-fit max-w-[800px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default function MessageBox({
  message,
}: {
  message: AIImgParser.Message;
}) {
  if (message.type === "assistant")
    return <AIMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}
