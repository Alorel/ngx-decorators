import {noop} from './lib/noop';
import {complete} from './processors/complete';
import {destroyed} from './processors/destroyed';
import {init} from './processors/init';
import {lazySubj} from './processors/lazy-subject';
import {setProp} from './processors/setProp';
import {subscribeTo} from './processors/subscribe-to';
import {unsubscribe} from './processors/unsubscribe';
import {MockDestroyable, MockInitable} from './type/Mocks';

/** @internal */
function applyOnInit(proto: MockInitable): void {
  const orig = proto.ngOnInit || noop;

  proto.ngOnInit = function ngOnInit(): void {
    try {
      init(this);
      orig.apply(this, arguments);
    } finally {
      setProp(this);
      subscribeTo(this);
    }
  };
}

/** @internal */
function applyOnDestroy(proto: MockDestroyable): void {
  const orig = proto.ngOnDestroy || noop;

  proto.ngOnDestroy = function ngOnDestroy(): void {
    try {
      destroyed(this);
      orig.apply(this, arguments);
    } finally {
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
