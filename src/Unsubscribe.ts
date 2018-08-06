import {_unsubscribe} from './lib/symbols';

function ensureSymbol(target: any, symbol: symbol): PropertyKey[] {
  if (!target[symbol]) {
    Object.defineProperty(target, symbol, {
      configurable: false,
      enumerable: false,
      value: [],
      writable: false
    });
  }

  return target[symbol];
}

/**
 * Automatically unsubscribe from the subscription(s) present at this property.
 * The property can be either a single subscription or an array of subscriptions.
 */
export function Unsubscribe(): PropertyDecorator {
  return (target: any, prop: PropertyKey): void => {
    ensureSymbol(target, _unsubscribe).push(prop);
  };
}
