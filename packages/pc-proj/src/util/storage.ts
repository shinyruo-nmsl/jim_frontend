import { Store } from "proj-util";

class StorageCore implements Store.StorageCore {
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

const StorageUtil = new Store.Storage(new StorageCore());

export default StorageUtil;
