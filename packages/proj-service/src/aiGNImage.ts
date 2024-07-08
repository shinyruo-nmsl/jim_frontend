import { useRef, useState } from "react";
import { Store } from "proj-util";

export interface Prompt {
  prompt: string;
  count: number;
}

export interface UserMessage {
  type: "user";
  content: string;
}

export interface AIMessage {
  type: "ai";
  content: string[] | string;
}

export type Message = UserMessage | AIMessage;

export enum URL {
  GetImages = "/ai/images",
}

export function useImageStore(userId: string, store: Store.Storage) {
  const key = `__${userId}_ai_image_key__`;

  const getHistoryImages = () => {
    const str = store.get(key);
    const historyImages = str ? (JSON.parse(str) as Message[]) : [];
    return historyImages;
  };
  const historyImages = useRef(getHistoryImages());

  const saveImages = (imgs: Message[]) => {
    historyImages.current.push(...imgs);
    // 超过50条就删除
    store.set(
      key,
      JSON.stringify(historyImages.current.slice(-50)),
      60 * 60 * 24 * 7
    );
  };

  return {
    historyImages: historyImages.current,
    saveImages2LocalStore(imgs: Message[]) {
      setTimeout(() => saveImages(imgs), 500);
    },
  };
}

export function useAIImage(userId: string, store: Store.Storage) {
  const { historyImages, saveImages2LocalStore } = useImageStore(userId, store);

  const [messages, setMessages] = useState<Message[]>(
    historyImages.length > 0
      ? [...historyImages]
      : [{ type: "ai", content: "我是您的文生图助手，欢迎提问👏🏻" }]
  );

  const [prompt, setPrompt] = useState<Prompt>({ prompt: "", count: 1 });

  const getImages = async (
    api: (prompt: Prompt) => Promise<{ images: string[] }>
  ) => {
    const userMessage: UserMessage = { type: "user", content: prompt.prompt };
    setMessages((prev) => [...prev, userMessage, { type: "ai", content: [] }]);
    setPrompt({ prompt: "", count: prompt.count });

    try {
      const { images } = await api(prompt);
      const aiMessage: AIMessage = { type: "ai", content: images };
      setMessages((prev) => [...prev.slice(0, prev.length - 1), aiMessage]);
      saveImages2LocalStore([userMessage, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { type: "ai", content: "抱歉，图片生成失败" },
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