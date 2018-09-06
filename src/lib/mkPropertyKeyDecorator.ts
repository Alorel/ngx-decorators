import {HookFn} from '../type/HookFn';
import {ensureSymbol} from './ensureSymbol';
import {HookManager} from './HookManager';
import {Lifecycle} from './Lifecycle';

/** @internal */
export function mkPropertyKeyDecorator(symbolKey: symbol, hook: HookFn, lc: Lifecycle): PropertyDecorator {
  return (target: any, prop: PropertyKey): void => {
    ensureSymbol<PropertyKey[]>(target, symbolKey, []).push(prop);
    HookManager.for(target).add(lc, hook);
  };
}
