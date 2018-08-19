import {ensureSymbol} from './lib/ensureSymbol';
import {_complete} from './lib/symbols';

/**
 * Automatically completes the subjects and event emitters at this property.
 * The property can be either a single object or an array of objects.
 */
export function Complete(): PropertyDecorator {
  return (target: any, prop: PropertyKey): void => {
    ensureSymbol<PropertyKey[]>(target, _complete, []).push(prop);
  };
}
