import {ConfEnum} from './type/ConfEnum';
import {MockCdr} from './type/Mocks';

/** Configuration for {@link CdrProp} */
export interface CdrPropConfig {
  /** Default value to set on the prototype */
  default?: any;

  /** Partial property descriptor */
  desc?: ConfEnum;

  /**
   * Key of a property used for tracking whether the component's been destroyed
   * to prevent errors caused by triggering change detection on a destroyed component.
   */
  destroyed?: PropertyKey;
}

/**
 * Call .markForCheck() on the change detector ref whenever this property is written to.
 *
 * @param propName Property at which the change detector can be found
 * @param conf Optional configuration
 */
export function CdrProp(propName: PropertyKey, conf: CdrPropConfig = {}): PropertyDecorator {
  return (target: any, key: PropertyKey): void => {
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
            (<MockCdr>this[propName]).markForCheck();
          }
        }
      })
    });
  };
}
