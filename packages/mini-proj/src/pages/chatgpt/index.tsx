import { View, Text } from "@tarojs/components";
import { ChatGPT } from "proj-service";

import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";

import "./index.less";
import { useEffect, useState } from "react";
import { fetchPostPromotMessage } from "./service";

function ChatGPTPage() {
  const { avatar, userId } = useUserLoginInfo();

  const {
    prompt,
    setPrompt,

    messages,
    setMessages,

    receiveMessage,
  } = ChatGPT.useChatGPT(userId, StorageUtil);

  useEffect(() => {
    receiveMessage(fetchPostPromotMessage);
  }, []);

  return <View className="chat-gpt-page"></View>;
}

export default ChatGPTPage;
