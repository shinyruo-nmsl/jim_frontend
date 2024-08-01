import { useLayoutEffect, useRef, useState, KeyboardEvent } from "react";
import { Divider, Input, message } from "antd";
import { AIImgGener } from "proj-service";
import { WebUtil, WebContext, WebApi } from "web-common";

import MessageBox from "./component/Message";
import "./index.less";

const {
  Storage: { default: StorageUtil },
  Html: { awaitAllChildrenImgsLoaded },
} = WebUtil;

const {
  User: { useUserLoginInfo },
} = WebContext;

const {
  AI: { fetchGetAIImages },
} = WebApi;

function ImgGenerPage() {
  const { userId } = useUserLoginInfo();

  const { messages, prompt, setPrompt, getImages } = AIImgGener.useAIImgGener(
    userId,
    StorageUtil
  );

  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { TextArea } = Input;

  const handleEnterEditInput = async (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.keyCode === 229 || prompt.prompt.length < 1 || isPending) return;
    setIsPending(true);
    try {
      await getImages(fetchGetAIImages);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const scorll2Bottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (typeof lastMessage?.content === "string") {
      scorll2Bottom();
    } else {
      const last = messagesRef.current?.lastElementChild as HTMLElement;
      if (last) {
        awaitAllChildrenImgsLoaded(last, scorll2Bottom);
      }
    }
  }, [messages]);

  useLayoutEffect(() => {
    awaitAllChildrenImgsLoaded(
      messagesRef.current as HTMLElement,
      scorll2Bottom
    );
  }, []);

  return (
    <div className="ai-image-page">
      <div className="message-container" ref={messagesRef}>
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
      </div>
      <Divider />
      <div className="edit-container">
        <TextArea
          value={prompt.prompt}
          disabled={isPending}
          maxLength={600}
          onChange={(e) =>
            setPrompt((prev) => ({ ...prev, prompt: e.target.value }))
          }
          onPressEnter={handleEnterEditInput}
          placeholder="请输入问题"
          style={{ height: 120, resize: "none" }}
        />
      </div>
    </div>
  );
}

export default ImgGenerPage;
