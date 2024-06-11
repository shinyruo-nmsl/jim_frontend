import { AtAvatar } from "taro-ui";
import { View } from "@tarojs/components";

import { ChatGPT } from "proj-service";
import { useUserLoginInfo } from "@/context/user";

import "./index.scss";

function UserMessageBox({ content, id }: { content: string; id: string }) {
  const { avatar } = useUserLoginInfo();

  return (
    <View className="chat-message user" id={id}>
      <View className="dialog">{content}</View>
      <AtAvatar size="small" circle image={avatar}></AtAvatar>
    </View>
  );
}

function GPTMessageBox({ content, id }: { content: string; id: string }) {
  return (
    <View className="chat-message gpt" id={id}>
      <AtAvatar size="small" circle text="gpt"></AtAvatar>
      <View className="dialog">{content}</View>
    </View>
  );
}

function MessageBox({ message, id }: { message: ChatGPT.Message; id: string }) {
  if (message.role === "gpt")
    return <GPTMessageBox content={message.content} id={id} />;
  return <UserMessageBox content={message.content} id={id} />;
}

export default MessageBox;
