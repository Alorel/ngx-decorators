import {defineImmutable} from './lib/defineProp';
import {HookManager} from './lib/HookManager';
import {Lifecycle} from './lib/Lifecycle';
import {_init} from './lib/symbols';
import {init} from './processors/init';

/** Set the given property to true when the component is initialised */
export function TrackInit(): PropertyDecorator {
  return (target: any, value: PropertyKey): void => {
    defineImmutable(target, _init, value);
    HookManager.for(target).add(Lifecycle.PRE_INIT, init);
  };
}
