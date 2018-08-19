import {expect} from 'chai';
import * as _ from 'lodash';
import {NgxDecorate, SubscribeTo} from '../src';
import {MockDestroyable, MockInitable, MockSubscribable, MockUnsubscribable} from '../src/lib/Mocks';

describe('SubscribeTo', () => {
  function mkSubscribable<T = any>(self: { unsubCalls: number }): MockSubscribable<T> {
    let fn: (v: T) => void = _.noop;

    return {
      next(v: T): void {
        fn(v);
      },
      subscribe(next: (v: T) => void, _err: (e: any) => void): MockUnsubscribable {
        fn = next;

        return {
          unsubscribe: () => {
            self.unsubCalls++;
          }
        };
      }
    };
  }

  interface Mock extends MockInitable, MockDestroyable {
    sub: MockSubscribable<any>;
    unsubCalls: number;
    value: any;
  }

  abstract class AbstractMock implements Mock {
    public sub: MockSubscribable<any>;
    public unsubCalls = 0;
    public abstract value: any;

    public ngOnDestroy(): void {
      //noop
    }

    public ngOnInit(): void {
      this.sub = mkSubscribable<any>(this);
    }
  }

  describe('With cdr', () => {
    interface CdrMock extends Mock {
      cdr: { detectChanges(): void };
      cdrCalls: number;
    }

    let mock: CdrMock;

    beforeEach('Init new mock', () => {
      @NgxDecorate()
      class MockImpl extends AbstractMock implements CdrMock {
        public cdrCalls = 0;
        public cdr = {
          detectChanges: () => {
            this.cdrCalls++;
          }
        };
        @SubscribeTo('sub', {cdrProp: 'cdr'})
        public value: any;
      }

      mock = new MockImpl();
      mock.ngOnInit();
    });

    it('cdrCalls should initially be 0', () => {
      expect(mock.cdrCalls).to.eq(0);
    });

    it('Value should be undefined first', () => {
      expect(mock.value).to.be.undefined;
    });

    it('Num unsub calls should be 0 at first', () => {
      expect(mock.unsubCalls).to.eq(0);
    });

    it('Should set value when emitted', () => {
      mock.sub.next('bar');
      expect(mock.value).to.eq('bar');
    });

    it('Should trigger change detection when emitted', () => {
      mock.sub.next('qux');
      expect(mock.cdrCalls).to.eq(1);
    });
  });

  describe('No CDR', () => {
    let mock: Mock;

    beforeEach('Init new mock', () => {
      @NgxDecorate()
      class MockImpl extends AbstractMock {
        @SubscribeTo('sub')
        public value: any;
      }

      mock = new MockImpl();
    });

    describe('(with auto init)', () => {
      beforeEach('init', () => {
        mock.ngOnInit();
      });

      it('Value should be undefined first', () => {
        expect(mock.value).to.be.undefined;
      });

      it('Num unsub calls should be 0 at first', () => {
        expect(mock.unsubCalls).to.eq(0);
      });

      it('Should set value when a value is emitted', () => {
        mock.sub.next('foo');
        expect(mock.value).to.eq('foo');
      });

      it('Should automatically unsubscribe', () => {
        mock.ngOnDestroy();
        expect(mock.unsubCalls).to.eq(1);
      });
    });
  });

  it('Should be a no-op if source is not defined', () => {
    @NgxDecorate()
    class EmptyMock extends AbstractMock {
      @SubscribeTo('foo')
      public value: any;
    }

    const m = new EmptyMock();
    m['ngOnInit']();
    m['ngOnDestroy']();
  });
});
