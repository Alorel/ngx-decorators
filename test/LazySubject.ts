import {expect} from 'chai';
import {Proto} from 'typescript-proto-decorator';
import {LazySubject} from '../src';
import {MockCompletable} from '../src/type/Mocks';

describe('LazySubject', () => {
  function noop(..._args: any[]): void {
    //noop
  }

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

  it('Should throw if target is not a getter', () => {
    expect(() => {
      class C {
        @LazySubject()
        @Proto('', {configurable: false})
        public x() {
          return 1;
        }
      }

      return C;
    })
      .to
      .throw('LazySubject can only decorate getters');
  });

  it('Should behave like a lazy getter', () => {
    class C {
      public calls = 0;

      @LazySubject()
      public get x() {
        this.calls++;

        return 1;
      }
    }

    const c = new C();
    noop(c.x);
    noop(c.x);

    expect(c.calls).to.eq(1);
  });

  it('Clear should be noop if getter is not called', () => {
    class C {
      public calls = 0;

      @LazySubject()
      public get x() {
        this.calls++;

        return 1;
      }
    }

    const c = new C();
    c['ngOnDestroy']();
    expect(c.calls).to.eq(0);
  });

  it('Should unsubscribe', () => {
    class C {
      @LazySubject()
      public get subj() {
        return mkCompletable();
      }
    }

    const c = new C();
    const subj = c.subj;
    expect(subj.count).to.eq(0, 'Initially 0');
    c['ngOnDestroy']();
    expect(subj.count).to.eq(1, '1 after destroy');
  });
});
