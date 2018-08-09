import {MockUnsubscribable} from '../lib/Mocks';
import {_unsubscribe} from '../lib/symbols';

/** @internal */
function completeArray(props: MockUnsubscribable[]): void {
  for (const sub of props) {
    sub.unsubscribe();
  }
}

/** @internal */
function processProp(prop: MockUnsubscribable | MockUnsubscribable[]): void {
  if (prop) {
    if (Array.isArray(prop)) {
      completeArray(prop);
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
}
