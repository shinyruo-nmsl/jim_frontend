import { Spin } from "antd";
import { AITextGener } from "proj-service";
import { MarkdownText } from "@web/component";
import { CharacterAvatar, UserAvatar } from "@/component/Avatar";
import "./index.less";


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

function MessageBox({ message }: { message: AITextGener.Message }) {
  if (message.role === "assistant")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
