import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Textarea, ScrollView, Button } from "@tarojs/components";
import { AITextGener } from "proj-service";
import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";
import { fetchPostPromotMessage } from "@/api/ai";
import MessageBox from "./component/Message";

function AITextGenerPage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AITextGener.useAITextGener(
    userId,
    StorageUtil,
  );

  const [isPending, setIsPending] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  const handleConfirmPrompt = async () => {
    if (isPending || !prompt) return;
    setIsPending(true);
    try {
      await chat(fetchPostPromotMessage);
    } catch (error) {
      Taro.showToast({
        title: "网络异常，请稍后再试",
        icon: "none",
      });
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query.select(".chat-gpt-main").boundingClientRect();
    query.select(".messages").boundingClientRect();
    query.exec((res) => {
      const scorllHeight = res[0]?.height;
      const listHeight = res[1]?.height;
      if (
        typeof scorllHeight !== "undefined" &&
        typeof listHeight !== "undefined"
      ) {
        setScrollTop(listHeight - scorllHeight);
      }
    });
  }, [messages]);

  return (
    <View className="h-100vh">
      <ScrollView
        className="chat-gpt-main h-calc-100vh-minus-96 box-border mb-24"
        scrollY
        scrollTop={scrollTop}
      >
        <View className="messages">
          {messages.map((message, index) => (
            <MessageBox key={index} message={message} />
          ))}
        </View>
      </ScrollView>

      <View className="position: fixed left-0 bottom-0 w-full box-border p-20 flex items-center bg-grey">
        <Textarea
          className="min-h-60 round-5 box-border bg-white"
          autoHeight
          value={prompt}
          onInput={(e) => setPrompt(e.detail.value)}
          onConfirm={handleConfirmPrompt}
        />
        <Button
          type="primary"
          className="w-90 h-40 text-white rounded-md text-28 leading-40 ml-20 whitespace-nowrap m-auto flex items-center justify-center"
          onClick={handleConfirmPrompt}
        >
          send
        </Button>
      </View>
    </View>
  );
}

export default AITextGenerPage;
