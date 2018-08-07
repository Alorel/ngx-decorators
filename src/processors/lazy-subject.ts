import {completeArray} from '../lib/completeArray';
import {_lazySubj} from '../lib/symbols';

/** @internal */
export function lazySubj(self: any): void {
  if (Array.isArray(self[_lazySubj])) {
    completeArray(self[_lazySubj]);
  }
}
