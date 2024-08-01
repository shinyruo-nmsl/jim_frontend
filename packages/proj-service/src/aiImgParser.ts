import { useState } from "react";
import { Store, AI } from "proj-util";

export enum URL {
  ParseImage = "/ai/parseImageContent",
}

export interface Prompt {
  imgUrl: string;
  description: string;
}

export interface UserMessage {
  type: "user";
  content: Prompt;
}

export interface AIMessage {
  type: "assistant";
  content: string;
}

export type Message = UserMessage | AIMessage;

export function useAIImgParser(userId: string, store: Store.Storage) {
  const { historyMessages, saveMessages2LocalStore } =
    AI.useMessageStore<Message>(store, `__${userId}_ai_ps_image_key__`);

  const [messages, setMessages] = useState<Message[]>([...historyMessages]);

  const [prompt, setPrompt] = useState<Prompt>({ imgUrl: "", description: "" });

  const chat = async (
    streamApi: (prompt: Prompt) => Promise<AsyncIterableIterator<string>>
  ) => {
    const userMessage: UserMessage = { type: "user", content: prompt };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { type: "assistant", content: "" },
    ]);
    setPrompt({ imgUrl: "", description: "" });

    try {
      const stream = await streamApi(prompt);
      let gptMessage4Store = "";
      for await (const chunk of stream) {
        setMessages((messages: Message[]) => {
          const gptMessage = messages[messages.length - 1] as AIMessage;
          return [
            ...messages.slice(0, messages.length - 1),
            { ...gptMessage, content: gptMessage.content + chunk },
          ];
        });
        gptMessage4Store = gptMessage4Store + chunk;
      }
      saveMessages2LocalStore([
        userMessage,
        { type: "assistant", content: gptMessage4Store },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          type: "assistant",
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
