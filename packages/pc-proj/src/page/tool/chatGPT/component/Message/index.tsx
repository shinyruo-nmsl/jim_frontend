import { CharacterAvatar, UserAvatar } from "../../../../../component/Avatar";

import "./index.less";
import { createMarkdown } from "../../../../../util/html";

export interface Message {
  role: "gpt" | "user";
  content: string;
}

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

function MessageBox({ message }: { message: Message }) {
  if (message.role === "gpt")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
