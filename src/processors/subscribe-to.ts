import {ensureSymbol} from '../lib/ensureSymbol';
import {_subscrTo, _subscrToSubs} from '../lib/symbols';
import {SubscribeToDef} from '../SubscribeTo';
import {MockCdr, MockSubscribable, MockUnsubscribable} from '../type/Mocks';

/** @internal */
function processSource(self: any, source: SubscribeToDef, subs: MockUnsubscribable[]): void {
  let subscrFn: (v: any) => void;
  const cdrProp = <PropertyKey>source.cfg.cdrProp;

  if (cdrProp) {
    subscrFn = v => {
      self[source.target] = v;
      (<MockCdr>self[<PropertyKey>source.cfg.cdrProp]).markForCheck();
    };
  } else {
    subscrFn = v => {
      self[source.target] = v;
    };
  }

  subs.push((<MockSubscribable<any>>self[source.source]).subscribe(subscrFn, console.error));
}

/** @internal */
export function subscribeTo(self: any): void {
  const sources: SubscribeToDef[] = self[_subscrTo];

  if (sources) {
    const subs = ensureSymbol<MockUnsubscribable[]>(self, _subscrToSubs, []);

    for (const source of sources) {
      if (self[source.source]) {
        processSource(self, source, subs);
      }
    }
  }
}
