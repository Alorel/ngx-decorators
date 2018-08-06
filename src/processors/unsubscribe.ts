import {MockUnsubscribable} from '../lib/Mocks';
import {_unsubscribe} from '../lib/symbols';

/** @internal */
export function unsubscribe(self: any): void {
  if (self[_unsubscribe]) {
    for (const prop of self[_unsubscribe]) {
      if (self[prop]) {
        if (Array.isArray(self[prop])) {
          for (const sub of self[prop]) {
            (<MockUnsubscribable>sub).unsubscribe();
          }
        } else {
          (<MockUnsubscribable>self[prop]).unsubscribe();
        }
      }
    }
  }
}
