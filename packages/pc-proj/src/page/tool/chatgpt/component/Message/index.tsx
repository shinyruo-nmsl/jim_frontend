import { Spin } from "antd";

import { ChatGPT } from "proj-service";

import { CharacterAvatar, UserAvatar } from "@/component/Avatar";
import { createMarkdown } from "@/util/html";

import "./index.less";

const markdown = createMarkdown({
  borderRadius: "5px",
  padding: "10px",
  margin: "10px 0",
});

function UserMessageBox({ content }: { content: string }) {
  return (
    <div className="chat-message user">
      <div className="dialog">{content}</div>
      <UserAvatar />
    </div>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  return (
    <div className="chat-message assistant">
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

function MessageBox({ message }: { message: ChatGPT.Message }) {
  if (message.role === "assistant")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
