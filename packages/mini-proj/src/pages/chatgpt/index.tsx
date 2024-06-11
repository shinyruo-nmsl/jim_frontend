import { View, Text, Input, Textarea } from "@tarojs/components";
import {AtInput} from 'taro-ui'
import { ChatGPT } from "proj-service";

import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";

import "./index.scss";
import { useEffect, useState } from "react";
import { fetchPostPromotMessage } from "./service";

function ChatGPTPage() {
  const { avatar, userId } = useUserLoginInfo();

  const {
    prompt,
    setPrompt,

    messages,
    setMessages,

   chat,
  } = ChatGPT.useChatGPT(userId, StorageUtil);

  const [isPending, set] = useState(false)

  const handleConfirmPrompt = () => {

  }



  return <View className="chat-gpt-page">
    <View className="main"></View>
    <View className="bottom">
      <Textarea autoHeight  value={prompt} onInput={(e) => setPrompt(e.detail.value)} onConfirm={handleConfirmPrompt} />
    </View>
  </View>;
}

export default ChatGPTPage;
