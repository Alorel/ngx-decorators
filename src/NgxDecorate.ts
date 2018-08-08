import {MockDestroyable, MockInitable} from './lib/Mocks';
import {complete} from './processors/complete';
import {destroyed} from './processors/destroyed';
import {lazySubj} from './processors/lazy-subject';
import {setProp} from './processors/setProp';
import {unsubscribe} from './processors/unsubscribe';

/** Apply all the decorators that tap into Angular's lifecycle hooks */
export function NgxDecorate(): ClassDecorator {
  return (target: any): void => {
    const proto: MockDestroyable & MockInitable = target.prototype;
    const destr = proto.ngOnDestroy;
    const init = proto.ngOnInit;

    proto.ngOnInit = function ngOnInit(): void {
      try {
        if (init) {
          init.apply(this, arguments);
        }
      } finally {
        setProp(this);
      }
    };

    proto.ngOnDestroy = function ngOnDestroy(): void {
      try {
        if (destr) {
          destr.apply(this, arguments);
        }
      } finally {
        destroyed(this);
        unsubscribe(this);
        complete(this);
        lazySubj(this);
      }
    };
  };
}
