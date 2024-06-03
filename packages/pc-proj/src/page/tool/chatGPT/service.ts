import { useRef } from "react";
import { useUserLoginInfo } from "../../../context/user";
import { createFetchStream } from "../../../util/http";
import StorageUtil from "../../../util/storage";
import { Message } from "./component/Message";

export function fetchPostPromotMessage(prompt: string) {
  return createFetchStream("/ai/gptContent", { prompt });
}

export function useMessageStore() {
  const { userId } = useUserLoginInfo();

  const key = `__${userId}_gpt_message_key__`;

  const getHistoryMessages = () => {
    const str = StorageUtil.get(key);
    const historyMessages = str ? (JSON.parse(str) as Message[]) : [];
    return historyMessages;
  };
  const historyMessages = useRef(getHistoryMessages());

  const saveMessages = (msgs: Message[]) => {
    historyMessages.current.push(...msgs);
    // 超过50条就删除
    StorageUtil.set(
      key,
      JSON.stringify(historyMessages.current.slice(0, 50)),
      60 * 60 * 24 * 7
    );
  };

  return {
    historyMessages: historyMessages.current,
    saveMessages2LocalStore(msgs: Message[]) {
      setTimeout(() => saveMessages(msgs), 500);
    },
  };
}
