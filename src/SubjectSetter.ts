import {ConfEnum} from './lib/ConfEnum';
import {ensureSymbol} from './lib/ensureSymbol';
import {MockSubject} from './lib/Mocks';
import {_setProp} from './lib/symbols';

export interface SubjectSetterConfig {
  /** Default value to set on the prototype */
  default?: any;
  /** Partial property descriptor */
  desc?: ConfEnum;
}

/**
 * Mark the property as a subject setter. When written to, it will call .next(value) on the subject.
 *
 * @param subjectPropName Name of the property at which the subject resides
 * @param conf Optional configuration
 */
export function SubjectSetter(subjectPropName: PropertyKey, conf: SubjectSetterConfig = {}): PropertyDecorator {
  return (target: any, prop: PropertyKey): void => {
    const symbolValue: unique symbol = Symbol(`subjectSetter:${prop.toString()}`);
    const defaultDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: true
    };
    const defaultValue = conf.default || target[prop];

    if (defaultValue) {
      ensureSymbol(target, _setProp, []).push({prop, value: defaultValue});
    }

    Object.defineProperties(target, {
      [symbolValue]: {
        configurable: false,
        enumerable: false,
        value: defaultValue,
        writable: true
      },
      [prop]: Object.assign(defaultDescriptor, conf.desc || {}, {
        get() {
          return this[symbolValue];
        },
        set(v: any) {
          this[symbolValue] = v;
          (<MockSubject>this[subjectPropName]).next(v);
        }
      })
    });
  };
}
