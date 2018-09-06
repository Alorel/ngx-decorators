import {_subscrToSubs, _unsubscribe} from '../lib/symbols';
import {MockUnsubscribable} from '../type/Mocks';

/** @internal */
function unsubArray(props: MockUnsubscribable[]): void {
  for (const sub of props) {
    sub.unsubscribe();
  }
}

/** @internal */
function processProp(prop: MockUnsubscribable | MockUnsubscribable[]): void {
  if (prop) {
    if (Array.isArray(prop)) {
      unsubArray(prop);
    } else {
      prop.unsubscribe();
    }
  }
}

/** @internal */
export function unsubscribe(self: any): void {
  if (self[_unsubscribe]) {
    for (const prop of self[_unsubscribe]) {
      processProp(self[prop]);
    }
  }
  if (self[_subscrToSubs]) {
    for (const prop of self[_subscrToSubs]) {
      processProp(prop);
    }
  }
}
