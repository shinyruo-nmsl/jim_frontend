import { useLayoutEffect, useRef, useState } from "react";
import { TextArea, Toast } from "antd-mobile";
import { AITextGener } from "proj-service";
import StorageUtil from "@web/util/storage";
import { fetchPostPromotMessage } from "@web/api/ai";
import { useUserLoginInfo } from "@web/context/user";

function AITextGenerPage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AITextGener.useAITextGener(
    userId,
    StorageUtil
  );

  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);


  const handleEnterEditInput = async (
  ) => {
    if (prompt.length < 1 || isPending) return;
    setIsPending(true);
    try {
      await chat(fetchPostPromotMessage);
    } catch (err: any) {
      Toast.show(err.message);
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
      <div className="edit-container">
        <TextArea
          value={prompt}
          disabled={isPending}
          maxLength={600}
          onChange={(e) => {
            setPrompt(e);
          }}
          onEnterPress={handleEnterEditInput}
          placeholder="请输入问题"
        />
      </div>
    </div>
  );
}

export default AITextGenerPage;
