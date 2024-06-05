interface OnceHandler {
  once?: boolean;
  (...params: any[]): void;
}

type Listener = [string, (...params: any[]) => void | OnceHandler];

export class EventEmitter {
  private listeners: Listener[] = [];

  on(_type: string, _handler: (...params: any[]) => void) {
    this.listeners.push([_type, _handler]);
  }

  once(_type: string, _handler: (...params: any[]) => void) {
    const wrapper: OnceHandler = (..._params: any[]) => {
      _handler(..._params);

      this.remove(_type, wrapper);
    };

    wrapper.once = true;

    this.listeners.push([_type, wrapper]);
  }

  fire(_type: string, ..._params: any[]) {
    this.listeners.forEach(
      ([_listenType, _handler]) => _listenType === _type && _handler(..._params)
    );
  }

  remove(_type: string, _handler?: (...params: any[]) => void) {
    const index = this.listeners.findIndex(
      (listener) =>
        listener[0] === _type &&
        (listener[1] === _handler || !!(listener[1] as OnceHandler).once)
    );

    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  removeByType(_type: string) {
    let i = 0;

    do {
      i = this.listeners.findIndex((l, idx) => idx >= i && l[0] === _type);
      if (i !== -1) {
        this.listeners.splice(i, 1);
      }
    } while (i > 0 && i < this.listeners.length);
  }

  removeAllListeners() {
    this.listeners = [];
  }

  hasListener(_type: string) {
    return (
      this.listeners.findIndex(([_listenType]) => _listenType === _type) !== -1
    );
  }
}
