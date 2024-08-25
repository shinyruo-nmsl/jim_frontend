import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  KeyboardEvent,
} from "react";
import { TextArea, Toast, ImageViewer } from "antd-mobile";
import { AIImgParser } from "proj-service";
import { fetchUploadImgFile } from "@web/api/file";
import { fetchGetAIParseMessage } from "@web/api/ai";
import { useUserLoginInfo } from "@web/context/user";
import StorageUtil from "@web/util/storage";
import MessageBox from "./component/MessageBox";

function ImgParserPage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AIImgParser.useAIImgParser(
    userId,
    StorageUtil
  );

  const [tempImg, setTempImg] = useState<{
    file: File;
    base64: string;
  } | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewImgVisible, setPreviewImgVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const handlePressEnter = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 229 || !tempImg || !prompt.description || isPending)
      return;

    try {
      const { url } = await fetchUploadImgFile({
        imgFile: tempImg.file,
      });
      setPrompt({ ...prompt, imgUrl: url });
      setTempImg(null);
    } catch (err: any) {
      Toast.show(err.message);
    }
  };

  const handleChat = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      Toast.show(err.message);
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
    <div className="h-full flex flex-col pt-10">
      <div className="flex-1 overflow-auto px-5" ref={messagesRef}>
        {messages.map((message, index) => (
          <MessageBox
            key={index}
            message={message}
            onPreview={(img) => {
              setPreviewImg(img);
              setPreviewImgVisible(true);
            }}
          />
        ))}
      </div>

      <div className="flex-none w-full flex items-center px-10 pb-safe-bottom">
        <TextArea
          className="h-fit border border-solid border-blue bg-white rounded-5 w-350 my-10 px-3 text-5 mr-10"
          value={prompt.description}
          disabled={isPending}
          maxLength={600}
          onChange={(e) => {
            setPrompt({ ...prompt, description: e });
          }}
          onFocus={() => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
          }}
          onEnterPress={handlePressEnter}
          placeholder="请输入问题"
        />
        {!tempImg && (
          <label htmlFor="upload" className="cursor-pointer w-fit h-fit">
            <i className="icon-upload-mini block w-40 h-40"></i>
            <input
              className="hidden"
              type="file"
              id="upload"
              multiple={false}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setTempImg({
                    file,
                    base64: URL.createObjectURL(file),
                  });
                }
              }}
            />
          </label>
        )}
        {tempImg && (
          <div className="relative w-40 h-40 flex justify-center items-center ">
            <i
              className="icon-close absolute z-10  right-0 top-0 translate-x-1/2 -translate-y-1/2"
              onClick={() => setTempImg(null)}
            ></i>
            <img
              src={tempImg.base64}
              alt="img"
              className="max-w-40 max-h-40 h-auto w-auto"
              onClick={() => {
                setPreviewImg(tempImg.base64);
                setPreviewImgVisible(true);
              }}
            />
          </div>
        )}

        <ImageViewer
          visible={previewImgVisible}
          image={previewImg!}
          onClose={() => setPreviewImgVisible(false)}
        />
      </div>
    </div>
  );
}

export default ImgParserPage;
