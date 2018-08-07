import {completeArray} from '../lib/completeArray';
import {MockCompletable} from '../lib/Mocks';
import {_complete} from '../lib/symbols';

/** @internal */
export function complete(self: any): void {
  if (self[_complete]) {
    for (const prop of self[_complete]) {
      if (self[prop]) {
        if (Array.isArray(self[prop])) {
          completeArray(self[prop]);
        } else {
          (<MockCompletable>self[prop]).complete();
        }
      }
    }
  }
}
