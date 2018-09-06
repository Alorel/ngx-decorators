import {ensureSymbol} from './lib/ensureSymbol';
import {HookManager} from './lib/HookManager';
import {Lifecycle} from './lib/Lifecycle';
import {_lazySubj} from './lib/symbols';
import {lazySubj} from './processors/lazy-subject';

/**
 * Decorate a getter that returns a subject. The subject will automatically get completed
 * when the component/service/pipe is destroyed.
 */
export function LazySubject(): MethodDecorator {
  return (_target: any, key: PropertyKey, desc: PropertyDescriptor): void => {
    const orig = desc.get;

    if (!orig) {
      throw new Error('LazySubject can only decorate getters');
    }

    desc.get = function () {
      const value = orig.apply(this, arguments);

      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: desc.enumerable,
        value
      });

      ensureSymbol<any[]>(this, _lazySubj, []).push(value);

      return value;
    };

    HookManager.for(_target).add(Lifecycle.POST_DESTROY, lazySubj);
  };
}
