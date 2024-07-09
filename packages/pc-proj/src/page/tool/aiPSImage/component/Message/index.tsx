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
    <div className="">
      <UserAvatar />
      <div>
        <div>{content.description}</div>
        <img src={content.imgUrl} alt={content.description} />
      </div>
    </div>
  );
}

function AIMessageBox({ content }: { content: string }) {
  const html = markdown.render(content);

  return (
    <div className="w-full flex items-start gap-5">
      <CharacterAvatar characterName="A" />
      <div
        className="w-fit max-w-[800px] bg-[azure] border border-solid border-[blue] rounded-[5px] p-[12px] text-sm break-all"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
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
