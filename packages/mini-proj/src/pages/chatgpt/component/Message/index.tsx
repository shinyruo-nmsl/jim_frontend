import { AtAvatar } from "taro-ui";
import { View } from "@tarojs/components";

import { ChatGPT } from "proj-service";
import { useUserLoginInfo } from "@/context/user";

import "./index.scss";
import OPENAI_IMG from "@/assets/openai.png";

function UserMessageBox({ content }: { content: string }) {
  const { avatar } = useUserLoginInfo();

  return (
    <View className="chat-message user">
      <View className="dialog">{content}</View>
      <AtAvatar size="small" circle image={avatar}></AtAvatar>
    </View>
  );
}

function GPTMessageBox({ content }: { content: string }) {
  return (
    <View className="chat-message assistant">
      <AtAvatar size="small" circle image={OPENAI_IMG}></AtAvatar>
      <View className="dialog">{content}</View>
    </View>
  );
}

function MessageBox({ message }: { message: ChatGPT.Message }) {
  if (message.role === "assistant")
    return <GPTMessageBox content={message.content} />;
  return <UserMessageBox content={message.content} />;
}

export default MessageBox;
