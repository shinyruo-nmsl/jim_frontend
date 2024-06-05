import {
  getStorageSync,
  setStorageSync,
  removeStorageSync,
} from "@tarojs/taro";
import { Store } from "proj-util";

class StorageCore implements Store.StorageCore {
  getItem(key: string) {
    return getStorageSync(key);
  }

  setItem(key: string, value: string) {
    setStorageSync(key, value);
  }

  removeItem(key: string) {
    removeStorageSync(key);
  }
}

const StorageUtil = new Store.Storage(new StorageCore());

export default StorageUtil;
