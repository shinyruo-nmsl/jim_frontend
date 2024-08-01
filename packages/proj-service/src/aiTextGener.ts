import { useState } from "react";
import { Store, AI } from "proj-util";

export enum URL {
  GetGPTContent = "/ai/gptContent",
}

type ChatRole = "assistant" | "user";
export interface Message {
  role: ChatRole;
  content: string;
}

export function useAITextGener(userId: string, store: Store.Storage) {
  const { historyMessages, saveMessages2LocalStore } =
    AI.useMessageStore<Message>(store, `__${userId}_gpt_message_key__`);

  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([...historyMessages]);

  const chat = async (
    streamApi: (messages: Message[]) => Promise<AsyncIterableIterator<string>>
  ) => {
    setPrompt("");

    const newMessages = [
      ...messages,
      { role: "user" as ChatRole, content: prompt },
      { role: "assistant" as ChatRole, content: "" },
    ];

    const lastFourUserMessages: Message[] = newMessages.slice(-5, -1);
    setMessages(newMessages);

    try {
      const stream = await streamApi(lastFourUserMessages);

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
    } catch (err: any) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          role: "assistant",
          content: err.message || "抱歉，回复失败",
        },
      ]);
    }
  };

  return {
    prompt,
    setPrompt,

    messages,
    setMessages,

    chat,
  };
}
