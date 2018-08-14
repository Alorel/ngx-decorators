import {_init} from '../lib/symbols';

/** @internal */
export function init(self: any): void {
  if (self[_init]) {
    self[self[_init]] = true;
  }
}
