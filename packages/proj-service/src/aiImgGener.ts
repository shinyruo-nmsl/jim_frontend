import { useState } from "react";
import { Store, AI } from "proj-util";

export enum URL {
  GetImages = "/ai/images",
}

export interface Prompt {
  prompt: string;
  count: number;
}

export interface UserMessage {
  type: "user";
  content: string;
}

export interface AIMessage {
  type: "assistant";
  content: string[] | string;
}

export type Message = UserMessage | AIMessage;

export function useAIImgGener(userId: string, store: Store.Storage) {
  const { historyMessages, saveMessages2LocalStore } =
    AI.useMessageStore<Message>(store, `__${userId}_ai_gn_image_key__`);

  const [messages, setMessages] = useState<Message[]>([...historyMessages]);

  const [prompt, setPrompt] = useState<Prompt>({ prompt: "", count: 1 });

  const getImages = async (
    api: (prompt: Prompt) => Promise<{ images: string[] }>
  ) => {
    const userMessage: UserMessage = { type: "user", content: prompt.prompt };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { type: "assistant", content: [] },
    ]);
    setPrompt({ prompt: "", count: prompt.count });

    try {
      const { images } = await api(prompt);
      const aiMessage: AIMessage = { type: "assistant", content: images };
      setMessages((prev) => [...prev.slice(0, prev.length - 1), aiMessage]);
      saveMessages2LocalStore([userMessage, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { type: "assistant", content: "抱歉，图片生成失败" },
      ]);
      throw err;
    }
  };

  return {
    messages,
    prompt,
    setPrompt,
    getImages,
  };
}
