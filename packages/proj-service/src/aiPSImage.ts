import { useRef, useState } from "react";
import { Store } from "proj-util";

export interface Prompt {
  imgUrl: string;
  description: string;
}

export interface UserMessage {
  type: "user";
  content: Prompt;
}

export interface AIMessage {
  type: "ai";
  content: string;
}

export type Message = UserMessage | AIMessage;

export enum URL {
  ParseImage = "/ai/parseImageContent",
}

export function usePSImageStore(userId: string, store: Store.Storage) {
  const key = `__${userId}_ai_ps_image_key__`;

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
      JSON.stringify(historyMessages.current.slice(-50)),
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

export function usePSAIImage(userId: string, store: Store.Storage) {
  const { historyMessages, saveMessages2LocalStore } = usePSImageStore(
    userId,
    store
  );

  const [messages, setMessages] = useState<Message[]>(
    historyMessages.length > 0
      ? [...historyMessages]
      : [{ type: "ai", content: "我是您的图像解析助手，欢迎提问👏🏻" }]
  );

  const [prompt, setPrompt] = useState<Prompt>({ imgUrl: "", description: "" });

  const chat = async (
    streamApi: (prompt: Prompt) => Promise<AsyncIterableIterator<string>>
  ) => {
    const userMessage: UserMessage = { type: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage, { type: "ai", content: "" }]);
    setPrompt({ imgUrl: "", description: "" });

    // const stream = await streamApi(prompt);
    // let gptMessage4Store = "";
    // for await (const chunk of stream) {
    //   setMessages((messages: Message[]) => {
    //     const gptMessage = messages[messages.length - 1] as AIMessage;
    //     return [
    //       ...messages.slice(0, messages.length - 1),
    //       { ...gptMessage, content: gptMessage.content + chunk },
    //     ];
    //   });
    //   gptMessage4Store = gptMessage4Store + chunk;
    // }
    // saveMessages2LocalStore([
    //   userMessage,
    //   { type: "ai", content: gptMessage4Store },
    // ]);
  };

  return {
    prompt,
    setPrompt,

    messages,
    setMessages,

    chat,
  };
}
