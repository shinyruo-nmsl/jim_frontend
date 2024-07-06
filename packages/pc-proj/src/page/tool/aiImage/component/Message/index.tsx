import { AIImage } from "proj-service";

import { CharacterAvatar, UserAvatar } from "@/component/Avatar";

import "./index.less";

function UserMessageBox({ message }: { message: AIImage.UserMessage }) {
  return (
    <div className="ai-image-message user">
      <div className="dialog">{message.content}</div>
      <UserAvatar />
    </div>
  );
}

function AIImageMessageBox({ message }: { message: AIImage.AIMessage }) {
  return (
    <div className="ai-image-message assistant">
      <CharacterAvatar characterName="A" />
      <div className="dialog">
        {Array.isArray(message.content) ? (
          message.content.map((item, index) => <img key={index} src={item} />)
        ) : (
          <div>{message.content}</div>
        )}
      </div>
    </div>
  );
}

function MessageBox({ message }: { message: AIImage.Message }) {
  if (message.type === "ai") return <AIImageMessageBox message={message} />;
  return <UserMessageBox message={message} />;
}

export default MessageBox;
