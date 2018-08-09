import {MockDestroyable, MockInitable} from './lib/Mocks';
import {noop} from './lib/noop';
import {complete} from './processors/complete';
import {destroyed} from './processors/destroyed';
import {lazySubj} from './processors/lazy-subject';
import {setProp} from './processors/setProp';
import {unsubscribe} from './processors/unsubscribe';

/** @internal */
function applyOnInit(proto: MockInitable): void {
  const orig = proto.ngOnInit || noop;

  proto.ngOnInit = function ngOnInit(): void {
    try {
      orig.apply(this, arguments);
    } finally {
      setProp(this);
    }
  };
}

/** @internal */
function applyOnDestroy(proto: MockDestroyable): void {
  const orig = proto.ngOnDestroy || noop;

  proto.ngOnDestroy = function ngOnDestroy(): void {
    try {
      orig.apply(this, arguments);
    } finally {
      destroyed(this);
      unsubscribe(this);
      complete(this);
      lazySubj(this);
    }
  };
}

/** Apply all the decorators that tap into Angular's lifecycle hooks */
export function NgxDecorate(): ClassDecorator {
  return (target: any): void => {
    const proto: MockDestroyable & MockInitable = target.prototype;
    applyOnInit(proto);
    applyOnDestroy(proto);
  };
}
