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
  const html = markdown.render(content);

  return (
    <div className="chat-message gpt">
      <CharacterAvatar characterName="A" />
      <div className="dialog" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

function MessageBox({ message }: { message: ChatGPT.Message }) {
  if (message.role === "gpt")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
