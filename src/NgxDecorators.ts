import {MockDestroyable} from './lib/Mocks';
import {complete} from './processors/complete';
import {lazySubj} from './processors/lazy-subject';
import {unsubscribe} from './processors/unsubscribe';

/** Apply all the decorators that tap into Angular's lifecycle hooks */
export function NgxDecorators(): ClassDecorator {
  return (target: any): void => {
    const proto: MockDestroyable = target.prototype;
    const original = proto.ngOnDestroy;

    proto.ngOnDestroy = function ngOnDestroy(): void {
      try {
        if (original) {
          original.apply(this, arguments);
        }
      } finally {
        unsubscribe(this);
        complete(this);
        lazySubj(this);
      }
    };
  };
}
