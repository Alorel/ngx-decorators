import {_setProp} from '../lib/symbols';

/** @internal */
export function setProp(self: any): void {
  if (self[_setProp]) {
    for (const p of self[_setProp]) {
      self[p.prop] = p.value;
    }
  }
}
