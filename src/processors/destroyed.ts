import {_destroyed} from '../lib/symbols';

/** @internal */
export function destroyed(self: any): void {
  if (self[_destroyed]) {
    self[self[_destroyed]] = true;
  }
}
