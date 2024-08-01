import { useRef } from "react";
import { Storage } from "./storage";

export function useMessageStore<M>(
  store: Storage,
  key: string,
  option: {
    count: number;
    expire: number;
  } = {
    count: 50,
    expire: 60 * 60 * 24 * 7,
  }
) {
  const getHistoryMessages = () => {
    const str = store.get(key);
    const historyMessages = str ? (JSON.parse(str) as M[]) : [];
    return historyMessages;
  };
  const historyMessages = useRef(getHistoryMessages());

  const saveMessages = (msgs: M[]) => {
    historyMessages.current.push(...msgs);
    // 超过50条就删除
    store.set(
      key,
      JSON.stringify(historyMessages.current.slice(-option.count)),
      option.expire
    );
  };

  return {
    historyMessages: historyMessages.current,
    saveMessages2LocalStore(msgs: M[]) {
      setTimeout(() => saveMessages(msgs), 500);
    },
  };
}
