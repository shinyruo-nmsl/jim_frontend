export function createPromiseResolvers<T, E>() {
  let resolve: ((val: T) => void) | undefined = undefined;
  let reject: ((err: E) => void) | undefined = undefined;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return {
    promise,
    resolve: resolve!,
    reject: reject!,
  };
}
