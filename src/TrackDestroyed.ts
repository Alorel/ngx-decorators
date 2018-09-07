import {defineImmutable} from './lib/defineProp';
import {HookManager} from './lib/HookManager';
import {Lifecycle} from './lib/Lifecycle';
import {_destroyed} from './lib/symbols';
import {destroyed} from './processors/destroyed';

/** Set the given property to true when the component is destroyed */
export function TrackDestroyed(): PropertyDecorator {
  return (target: any, value: PropertyKey): void => {
    defineImmutable(target, _destroyed, value);
    HookManager.for(target).add(Lifecycle.PRE_DESTROY, destroyed);
  };
}
