import {ConfEnum} from './interfaces/ConfEnum';
import {MockCdr} from './interfaces/MockCdr';

export interface CdrPropConfig {
  /** Default value to set on the prototype */
  default?: any;
  /** Partial property descriptor */
  desc?: ConfEnum;
  /** Key of a property used for tracking whether the component's been destroyed */
  destroyed?: PropertyKey;
}

/**
 * Call .detectChanges() on the change detector ref whenever this property is written to
 * @param propName Property at which the change detector can be found
 * @param conf Optional configuration
 */
export function CdrProp(propName: string, conf: CdrPropConfig = {}): PropertyDecorator {
  return function CdrProp(target: any, key: PropertyKey): void {
    const sym: unique symbol = Symbol(`value:${key.toString()}`);
    const defaultDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true
    };

    Object.defineProperties(target, {
      [sym]: {
        configurable: false,
        enumerable: false,
        value: conf.default || target[key],
        writable: true
      },
      [key]: Object.assign(defaultDescriptor, conf.desc || {}, {
        get() {
          return this[sym];
        },
        set(v: any) {
          this[sym] = v;
          if (!conf.destroyed || !this[conf.destroyed]) {
            (<MockCdr>this[propName]).detectChanges();
          }
        }
      })
    });
  };
}
