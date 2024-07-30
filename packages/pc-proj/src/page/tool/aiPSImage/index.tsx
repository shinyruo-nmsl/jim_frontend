import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { message } from "antd";
import { AIPSImage } from "proj-service";
import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";
import ImageTextArea, { InputImg } from "@/component/TextArea";
import { fetchUploadImgFile } from "@/api/file";
import MessageBox from "./component/Message";
import { fetchGetAIParseMessage } from "./service";

function AIPSImagePage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AIPSImage.usePSAIImage(
    userId,
    StorageUtil
  );

  const [tempImg, setTempImg] = useState<InputImg | null>(null);
  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const handlePressEnter = async () => {
    if (!tempImg || !prompt.description || isPending) return;

    try {
      const { url } = await fetchUploadImgFile({
        imgFile: tempImg.file,
      });
      setPrompt({ ...prompt, imgUrl: url });
      setTempImg(null);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleChat = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (prompt.imgUrl && prompt.description) {
      handleChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-full box-border flex flex-col">
      <div
        className="box-border w-full p-[24px] flex-1 overflow-y-auto flex flex-col gap-[20px]"
        ref={messagesRef}
      >
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
      </div>

      <div className="box-border w-full h-fit p-[24px] flex-none">
        <ImageTextArea
          value={prompt.description}
          img={tempImg}
          textareaProps={{
            placeholder: "使用图片时，复制图片到此处，或者点击上传",
            maxLength: 1000,
            disabled: isPending,
          }}
          onPressEnter={handlePressEnter}
          onChange={(value) => setPrompt({ ...prompt, description: value })}
          onUploadImg={(img) => setTempImg(img)}
          onRemoveImg={() => setTempImg(null)}
        />
      </div>
    </div>
  );
}

export default AIPSImagePage;
