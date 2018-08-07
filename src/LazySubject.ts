import {ensureSymbol} from './lib/ensureSymbol';
import {_lazySubj} from './lib/symbols';

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

    desc.get = function() {
      const value = orig.apply(this, arguments);

      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: desc.enumerable,
        value
      });

      ensureSymbol(this, _lazySubj, []).push(value);

      return value;
    };
  };
}
