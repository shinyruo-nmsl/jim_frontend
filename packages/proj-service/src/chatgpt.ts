import { useRef, useState } from "react";
import { Store } from "proj-util";

export interface Message {
  role: "gpt" | "user";
  content: string;
}

export function useMessageStore(userId: string, store: Store.Storage) {
  const key = `__${userId}_gpt_message_key__`;

  const getHistoryMessages = () => {
    const str = store.get(key);
    const historyMessages = str ? (JSON.parse(str) as Message[]) : [];
    return historyMessages;
  };
  const historyMessages = useRef(getHistoryMessages());

  const saveMessages = (msgs: Message[]) => {
    historyMessages.current.push(...msgs);
    // 超过50条就删除
    store.set(
      key,
      JSON.stringify(historyMessages.current.slice(0, 50)),
      60 * 60 * 24 * 7
    );
  };

  return {
    historyMessages: historyMessages.current,
    saveMessages2LocalStore(msgs: Message[]) {
      setTimeout(() => saveMessages(msgs), 500);
    },
  };
}

export function useChatGPT(userId: string, store: Store.Storage) {
  const { historyMessages, saveMessages2LocalStore } = useMessageStore(
    userId,
    store
  );

  const [prompt, setPrompt] = useState("实现一个红黑树");
  const [messages, setMessages] = useState<Message[]>(
    historyMessages.length > 0
      ? [...historyMessages]
      : [{ role: "gpt", content: "我是您的AI助手，欢迎提问👏🏻" }]
  );

  const receiveMessage = async (
    api: (prompt: string) => Promise<AsyncIterableIterator<string>>
  ) => {
    setPrompt("");
    setMessages((messages: Message[]) => [
      ...messages,
      { role: "user", content: prompt },
    ]);

    console.log("prompt", prompt);

    const stream = await api(prompt);
    // setMessages((messages: Message[]) => [
    //   ...messages,
    //   { role: "gpt", content: "" },
    // ]);
    // let gptMessage4Store = "";
    // for await (const chunk of stream) {
    //   setMessages((messages: Message[]) => {
    //     const gptMessage = messages[messages.length - 1];
    //     return [
    //       ...messages.slice(0, messages.length - 1),
    //       { ...gptMessage, content: gptMessage.content + chunk },
    //     ];
    //   });
    //   gptMessage4Store = gptMessage4Store + chunk;
    // }
    // saveMessages2LocalStore([
    //   { role: "user", content: prompt },
    //   { role: "gpt", content: gptMessage4Store },
    // ]);
  };

  return {
    prompt,
    setPrompt,

    messages,
    setMessages,

    receiveMessage,
  };
}
