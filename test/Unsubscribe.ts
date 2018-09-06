import {expect} from 'chai';
import {Unsubscribe} from '../src';
import {MockDestroyable, MockUnsubscribable} from '../src/type/Mocks';

interface Unsub extends MockUnsubscribable {
  count: number;
}

function mkUnsub(): Unsub {
  return {
    count: 0,
    unsubscribe() {
      this.count++;
    }
  };
}

describe('Unsubscribe', () => {
  interface Mock extends MockDestroyable {
    sub: Unsub;
  }

  it('Should be a noop on undefined', () => {
    class C implements Mock {
      @Unsubscribe()
      public sub: Unsub;

      public ngOnDestroy(): void {
        //noop
      }
    }

    const i = new C();
    i.ngOnDestroy();
  });

  it('Should be a noop on undefined (array)', () => {
    class C implements Mock {
      @Unsubscribe()
      public sub: Unsub;

      public ngOnDestroy(): void {
        //noop
      }
    }

    const i = new C();
    i.ngOnDestroy();
  });

  it('Should unsubscribe (1)', () => {
    class C {
      @Unsubscribe()
      public sub: Unsub = mkUnsub();
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(1);
  });

  it('Should unsubscribe (array)', () => {
    class C {
      public sub: Unsub;

      // noinspection JSMismatchedCollectionQueryUpdate
      @Unsubscribe()
      public subs: Unsub[];

      public constructor() {
        const s = mkUnsub();
        this.sub = s;
        this.subs = [
          s,
          s,
          s,
          s,
          s
        ];
      }
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(5);
  });

  it('Should unsub multiple singles', () => {
    class C {
      @Unsubscribe()
      public sub: Unsub = mkUnsub();

      @Unsubscribe()
      public sub2: Unsub = this.sub;
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(2);
  });

  it('Should unsubscribe (multi-array)', () => {
    class C {
      public sub: Unsub;

      @Unsubscribe()
      public subs: Unsub[];

      // noinspection JSMismatchedCollectionQueryUpdate
      @Unsubscribe()
      public subs2: Unsub[];

      public constructor() {
        const s = mkUnsub();
        this.sub = s;
        this.subs = [
          s,
          s,
          s,
          s,
          s
        ];
        this.subs2 = this.subs;
      }
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(10);
  });
});
