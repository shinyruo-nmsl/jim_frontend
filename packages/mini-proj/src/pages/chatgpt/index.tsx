import { Component, useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Textarea, ScrollView } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { ChatGPT } from "proj-service";

import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";

import { fetchPostPromotMessage } from "./service";
import MessageBox from "./component/Message";

import "./index.scss";

function ChatGPTPage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = ChatGPT.useChatGPT(
    userId,
    StorageUtil,
  );

  const [isPending, setIsPending] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const handleConfirmPrompt = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      await chat(fetchPostPromotMessage);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(".chat-gpt-main").boundingClientRect();
    query.select(".messages").boundingClientRect();
    query.exec((res) => {
      const scorllHeight = res[0].height;
      const listHeight = res[1].height;

      console.log(listHeight, scorllHeight);

      setScrollTop(listHeight - scorllHeight + 50);
    });
  }, [messages]);

  return (
    <View className="chat-gpt-page">
      <ScrollView className="chat-gpt-main" scrollY scrollTop={scrollTop}>
        <View className="messages">
          {messages.map((message, index) => (
            <MessageBox id={`m_${index}`} key={index} message={message} />
          ))}
        </View>
      </ScrollView>
      <View className="bottom">
        <Textarea
          autoHeight
          value={prompt}
          onInput={(e) => setPrompt(e.detail.value)}
          onConfirm={handleConfirmPrompt}
        />
        <AtIcon
          value="message"
          size="20"
          onClick={handleConfirmPrompt}
        ></AtIcon>
      </View>
    </View>
  );
}

export default ChatGPTPage;
