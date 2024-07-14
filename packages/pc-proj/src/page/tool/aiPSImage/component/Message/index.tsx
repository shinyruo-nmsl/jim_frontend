import { Spin } from "antd";

import { AIPSImage } from "proj-service";

import { CharacterAvatar, UserAvatar } from "@/component/Avatar";
import { createMarkdown } from "@/util/html";

const markdown = createMarkdown({
  borderRadius: "5px",
  padding: "10px",
  margin: "10px 0",
});

export function UserMessageBox({ content }: { content: AIPSImage.Prompt }) {
  return (
    <div className="w-full flex items-start gap-5 justify-end">
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
    <div className="w-full flex items-start gap-5">
      <CharacterAvatar characterName="A" />
      {content.length > 0 ? (
        <div
          className="w-fit max-w-[800px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-[12px]/[16px] break-all"
          dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
        ></div>
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
  message: AIPSImage.Message;
}) {
  if (message.type === "ai") return <AIMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}
