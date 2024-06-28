import { useRef, useState } from "react";
import { Store } from "proj-util";

export enum URL {
  GetGPTContent = "/ai/gptContent",
}

type ChatRole = "assistant" | "user";
export interface Message {
  role: ChatRole;
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

  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(
    historyMessages.length > 0
      ? [...historyMessages]
      : [{ role: "assistant", content: "我是您的AI助手，欢迎提问👏🏻" }]
  );

  const chat = async (
    api: (messages: Message[]) => Promise<AsyncIterableIterator<string>>
  ) => {
    setPrompt("");

    const newMessages = [
      ...messages,
      { role: "user" as ChatRole, content: prompt },
    ];

    const lastFourUserMessages: Message[] = newMessages
      .filter((msg) => msg.role === "user")
      .slice(-4);

    setMessages(newMessages);

    const stream = await api(lastFourUserMessages);
    setMessages((messages: Message[]) => [
      ...messages,
      { role: "assistant", content: "" },
    ]);
    let gptMessage4Store = "";
    for await (const chunk of stream) {
      setMessages((messages: Message[]) => {
        const gptMessage = messages[messages.length - 1];
        return [
          ...messages.slice(0, messages.length - 1),
          { ...gptMessage, content: gptMessage.content + chunk },
        ];
      });
      gptMessage4Store = gptMessage4Store + chunk;
    }
    saveMessages2LocalStore([
      { role: "user", content: prompt },
      { role: "assistant", content: gptMessage4Store },
    ]);
  };

  return {
    prompt,
    setPrompt,

    messages,
    setMessages,

    chat,
  };
}
