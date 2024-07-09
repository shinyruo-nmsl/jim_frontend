import { useState } from "react";

import { AIPSImage } from "proj-service";
import { fetchGetAIParseMessage } from "./service";
import { useUserLoginInfo } from "@/context/user";
import StorageUtil from "@/util/storage";

import FormDialog from "./component/FormDialog";
import MessageBox from "./component/Message";

function AIPSImagePage() {
  const { userId } = useUserLoginInfo();

  const { prompt, setPrompt, messages, setMessages, chat } =
    AIPSImage.usePSAIImage(userId, StorageUtil);

  const [formDialogVisible, setFormDialogVisible] = useState(false);

  const submitForm = async () => {
    try {
      await chat(fetchGetAIParseMessage);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="h-full box-border flex flex-col">
      <div className="box-border w-full p-[24px] flex-1 overflow-y-auto flex flex-col gap-[20px]">
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} />
        ))}
      </div>

      <FormDialog
        visible={formDialogVisible}
        imgUrl={""}
        decrption={""}
        onCancel={() => setFormDialogVisible(false)}
      />
    </div>
  );
}

export default AIPSImagePage;
