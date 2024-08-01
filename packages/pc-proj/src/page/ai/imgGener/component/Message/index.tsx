import { Image, Spin } from "antd";
import { AIImgGener } from "proj-service";

import { CharacterAvatar, UserAvatar } from "@/component/Avatar";

import "./index.less";

function UserMessageBox({ message }: { message: AIImgGener.UserMessage }) {
  return (
    <div className="ai-image-message user">
      <div className="dialog">{message.content}</div>
      <UserAvatar />
    </div>
  );
}

function AIImageMessageBox({ message }: { message: AIImgGener.AIMessage }) {
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

function MessageBox({ message }: { message: AIImgGener.Message }) {
  if (message.type === "assistant")
    return <AIImageMessageBox message={message} />;
  return <UserMessageBox message={message} />;
}

export default MessageBox;
