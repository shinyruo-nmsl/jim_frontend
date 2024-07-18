import { useLayoutEffect, useRef, useState, KeyboardEvent } from "react";
import { Divider, Input, message } from "antd";
import { ChatGPT } from "proj-service";

import { fetchPostPromotMessage } from "./service";
import MessageBox from "./component/Message";

import "./index.less";
import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";
import { convertImgFile2Base64 } from "@/util/file";

function ChatGPTPage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = ChatGPT.useChatGPT(
    userId,
    StorageUtil
  );

  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { TextArea } = Input;

  const handleEnterEditInput = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.keyCode === 229 || prompt.length < 1 || isPending) return;
    setIsPending(true);
    try {
      await chat(fetchPostPromotMessage);
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
          onPaste={async (e) => {
            const file = e.clipboardData.items[0].getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                setPrompt(e.target?.result as string);
              };
              const base64 = await convertImgFile2Base64(file);
              console.log(base64);
            }
          }}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onPressEnter={(e) => handleEnterEditInput(e)}
          placeholder="请输入问题"
          style={{ height: 120, resize: "none" }}
        />
      </div>
    </div>
  );
}

export default ChatGPTPage;
