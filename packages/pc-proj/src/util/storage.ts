export default class StorageUtil {
  public static set(key: string, value: string, ttl: number) {
    const item = {
      value,
      expireAt: new Date().getTime() + ttl * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  public static get(key: string) {
    try {
      const itemStr = localStorage.getItem(key);

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

  public static remove(key: string) {
    localStorage.removeItem(key);
  }

  public static isExpired(expireAt: number) {
    return new Date().getTime() > expireAt;
  }
}
