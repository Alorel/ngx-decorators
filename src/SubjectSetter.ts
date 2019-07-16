import {ensureSymbol} from './lib/ensureSymbol';
import {HookManager} from './lib/HookManager';
import {Lifecycle} from './lib/Lifecycle';
import {_setProp} from './lib/symbols';
import {setProp} from './processors/setProp';
import {ConfEnum} from './type/ConfEnum';
import {MockSubject} from './type/Mocks';

/** Configuration for {@link SubjectSetter} */
export interface SubjectSetterConfig {
  /** Default value to set on the prototype */
  default?: any;

  /** Partial property descriptor */
  desc?: ConfEnum;
}

/**
 * Mark the property as a subject setter. When written to, it will call .next(value) on the subject.
 * The decorator's <b>default</b> config option only works on items that make use of the OnInit hook,
 * i.e. it will <b>not</b> work for services and pipes.
 *
 * Because the <b>default</b> config option utilises the OnInit hook, it should not be used on
 * properties that are component inputs as the input would get overridden during the hook.
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
      ensureSymbol<{ prop: PropertyKey; value: any }[]>(target, _setProp, [])
        .push({prop, value: defaultValue});
      HookManager.for(target).add(Lifecycle.POST_INIT, setProp);
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
