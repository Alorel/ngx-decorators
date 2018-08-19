import {ensureSymbol} from './ensureSymbol';

/** @internal */
export function mkPropertyKeyDecorator(symbolKey: symbol): PropertyDecorator {
  return (target: any, prop: PropertyKey): void => {
    ensureSymbol<PropertyKey[]>(target, symbolKey, []).push(prop);
  };
}
