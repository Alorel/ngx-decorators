import {expect} from 'chai';
import {Complete, NgxDecorators} from '../src';
import {MockCompletable, MockDestroyable} from '../src/lib/Mocks';

interface Completable extends MockCompletable {
  count: number;
}

function mkCompletable(): Completable {
  return {
    count: 0,
    complete() {
      this.count++;
    }
  };
}

describe('Complete', () => {
  interface Mock extends MockDestroyable {
    subj: Completable;
  }

  it('Should be a noop on undefined', () => {
    @NgxDecorators()
    class C implements Mock {
      @Complete()
      public subj: Completable;

      public ngOnDestroy(): void {
        //noop
      }
    }

    const i = new C();
    i.ngOnDestroy();
  });

  it('Should be a noop on undefined (array)', () => {
    @NgxDecorators()
    class C implements Mock {
      @Complete()
      public subj: Completable;

      public ngOnDestroy(): void {
        //noop
      }
    }

    const i = new C();
    i.ngOnDestroy();
  });

  it('Should complete (1)', () => {
    @NgxDecorators()
    class C {
      @Complete()
      public sub: Completable = mkCompletable();
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(1);
  });

  it('Should complete (array)', () => {
    @NgxDecorators()
    class C {
      public sub: Completable;
      // noinspection JSMismatchedCollectionQueryUpdate
      @Complete()
      public subs: Completable[];

      public constructor() {
        const s = mkCompletable();
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

  it('Should complete multiple singles', () => {
    @NgxDecorators()
    class C {
      @Complete()
      public sub: Completable = mkCompletable();
      @Complete()
      public sub2: Completable = this.sub;
    }

    const i = new C();
    i['ngOnDestroy']();
    expect(i.sub.count).to.eq(2);
  });

  it('Should complete (multi-array)', () => {
    @NgxDecorators()
    class C {
      public sub: Completable;
      @Complete()
      public subs: Completable[];
      // noinspection JSMismatchedCollectionQueryUpdate
      @Complete()
      public subs2: Completable[];

      public constructor() {
        const s = mkCompletable();
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
