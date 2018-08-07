import {_destroyed} from './lib/symbols';

/** Set the given property to true when the component is destroyed */
export function TrackDestroyed(): PropertyDecorator {
  return (target: any, value: PropertyKey): void => {
    Object.defineProperty(target, _destroyed, {
      configurable: false,
      enumerable: false,
      value,
      writable: false
    });
  };
}
