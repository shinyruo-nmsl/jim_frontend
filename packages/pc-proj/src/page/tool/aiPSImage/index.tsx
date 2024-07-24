import { useState } from "react";

import { AIPSImage } from "proj-service";
import { fetchGetAIParseMessage } from "./service";
import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";
import { ImageTextArea } from "@/component/Input";

import FormDialog from "./component/FormDialog";
import MessageBox from "./component/Message";

function AIPSImagePage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, chat } = AIPSImage.usePSAIImage(
    userId,
    StorageUtil
  );

  const [formDialogVisible, setFormDialogVisible] = useState(false);

  const [tmpUrl, setTmpUrl] = useState("");

  const [isPending, setIsPending] = useState(false);

  const submitForm = async () => {
    setFormDialogVisible(false);
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handlePressEnter = async () => {
    if (prompt.imgUrl.length < 1 || isPending) return;
    setIsPending(true);
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="h-full box-border flex flex-col">
      <div className="box-border w-full p-[24px] flex-1 overflow-y-auto flex flex-col gap-[20px]">
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
      </div>

      <div className="box-border w-full h-[80px] p-[24px] flex-none">
        <ImageTextArea
          value={prompt.description}
          multiple={false}
          textareaProps={{
            placeholder: "Please input the image url",
            maxLength: 1000,
            disabled: isPending,
          }}
          onPressEnter={handlePressEnter}
          onChange={(value) => setPrompt({ ...prompt, description: value })}
          onPasteImg={(base64) => setTmpUrl(base64[0])}
          onUploadImg={(base64) => setTmpUrl(base64[0])}
        />

        {tmpUrl && <img src={tmpUrl} alt="" />}
      </div>

      <FormDialog
        visible={formDialogVisible}
        imgUrl={prompt.imgUrl}
        description={prompt.description}
        onChangeForm={(prompt) => setPrompt(prompt)}
        onComfirm={submitForm}
        onCancel={() => setFormDialogVisible(false)}
      />
    </div>
  );
}

export default AIPSImagePage;
