export interface StorageCore {
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  setItem: (key: string, value: string) => void;
}

export class Storage<C extends StorageCore = StorageCore> {
  constructor(private core: C) {}

  set(key: string, value: string, ttl: number) {
    const item = {
      value,
      expireAt: new Date().getTime() + ttl * 1000,
    };

    this.core.setItem(key, JSON.stringify(item));
  }

  get(key: string) {
    try {
      const itemStr = this.core.getItem(key);

      if (itemStr) {
        const item: {
          value: string;
          expireAt: number;
        } = JSON.parse(itemStr);

        if (this.isExpired(item.expireAt)) {
          this.remove(key);
        } else {
          return item.value;
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  remove(key: string) {
    this.core.removeItem(key);
  }

  isExpired(expireAt: number) {
    return new Date().getTime() > expireAt;
  }
}
