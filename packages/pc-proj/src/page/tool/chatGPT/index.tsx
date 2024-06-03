import { useLayoutEffect, useRef, useState, KeyboardEvent } from "react";
import { Divider, Input, message } from "antd";

import { fetchPostPromotMessage, useMessageStore } from "./service";
import MessageBox, { Message } from "./component/Message";

import "./index.less";

function ChatGPT() {
  const { historyMessages, saveMessages2LocalStore } = useMessageStore();

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    historyMessages.length > 0
      ? [...historyMessages]
      : [{ role: "gpt", content: "我是您的AI助手，欢迎提问👏🏻" }]
  );
  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { TextArea } = Input;

  const handleEnterEditInput = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.keyCode === 229 || prompt.length < 1 || isPending) return;
    setIsPending(true);
    setPrompt("");
    setMessages((messages: Message[]) => [
      ...messages,
      { role: "user", content: prompt },
    ]);

    try {
      const stream = await fetchPostPromotMessage(prompt);
      setMessages((messages: Message[]) => [
        ...messages,
        { role: "gpt", content: "" },
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
        { role: "gpt", content: gptMessage4Store },
      ]);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ai-chat-page">
      <div className="message-container" ref={messagesRef}>
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
      </div>
      <Divider />
      <div className="edit-container">
        <TextArea
          value={prompt}
          disabled={isPending}
          maxLength={600}
          onChange={(e) => setPrompt(e.target.value)}
          onPressEnter={(e) => handleEnterEditInput(e)}
          placeholder="请输入问题"
          style={{ height: 120, resize: "none" }}
        />
      </div>
    </div>
  );
}

export default ChatGPT;
