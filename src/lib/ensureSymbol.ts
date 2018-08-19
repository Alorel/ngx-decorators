/** @internal */
export function ensureSymbol<T>(target: any, symbol: symbol, value: T): T {
  if (!target[symbol]) {
    Object.defineProperty(target, symbol, {
      configurable: false,
      enumerable: false,
      value,
      writable: false
    });
  }

  return target[symbol];
}
