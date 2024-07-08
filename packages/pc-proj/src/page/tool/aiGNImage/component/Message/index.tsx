import { Image, Spin } from "antd";
import { AIGNImage } from "proj-service";

import { CharacterAvatar, UserAvatar } from "@/component/Avatar";

import "./index.less";

function UserMessageBox({ message }: { message: AIGNImage.UserMessage }) {
  return (
    <div className="ai-image-message user">
      <div className="dialog">{message.content}</div>
      <UserAvatar />
    </div>
  );
}

function AIImageMessageBox({ message }: { message: AIGNImage.AIMessage }) {
  return (
    <div className="ai-image-message assistant">
      <CharacterAvatar characterName="A" />
      <div className="dialog">
        {Array.isArray(message.content) ? (
          message.content.length > 0 ? (
            <Image.PreviewGroup>
              {message.content.map((url) => (
                <Image key={url} src={url} width={200} />
              ))}
            </Image.PreviewGroup>
          ) : (
            <Spin />
          )
        ) : (
          <div>{message.content}</div>
        )}
      </div>
    </div>
  );
}

function MessageBox({ message }: { message: AIGNImage.Message }) {
  if (message.type === "ai") return <AIImageMessageBox message={message} />;
  return <UserMessageBox message={message} />;
}

export default MessageBox;
