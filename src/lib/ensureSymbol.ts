/** @internal */
export function ensureSymbol(target: any, symbol: symbol, value: any): any[] {
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
