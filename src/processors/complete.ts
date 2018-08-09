import {completeArray} from '../lib/completeArray';
import {MockCompletable} from '../lib/Mocks';
import {_complete} from '../lib/symbols';

/** @internal */
function processProp(prop: MockCompletable | MockCompletable[]): void {
  if (prop) {
    if (Array.isArray(prop)) {
      completeArray(prop);
    } else {
      prop.complete();
    }
  }
}

/** @internal */
export function complete(self: any): void {
  if (self[_complete]) {
    for (const prop of self[_complete]) {
      processProp(self[prop]);
    }
  }
}
