import {expect} from 'chai';
import {Proto} from 'typescript-proto-decorator';
import {NgxDecorate, SubjectSetter} from '../src';
import {MockSubject} from '../src/lib/Mocks';

describe('SubjectSetter', () => {
  interface Sbj<T = any> extends MockSubject<T> {
    value: T;
  }

  function mkSbj<T>(value?: T): Sbj<T> {
    return {
      next(v: T): void {
        this.value = v;
      },
      value: <any>value,
      unsubscribe(): void {
        //noop
      }
    };
  }

  describe('Descriptor', () => {
    let desc: PropertyDescriptor;

    before('init descriptor', () => {
      class C {
        @SubjectSetter('x')
        public prop: any;
      }

      desc = <PropertyDescriptor>Object.getOwnPropertyDescriptor(C.prototype, 'prop');
    });

    it('Should be configurable', () => {
      expect(desc.configurable).to.be.true;
    });

    it('Should be enumerable', () => {
      expect(desc.enumerable).to.be.true;
    });

    it('Writable should be undefined', () => {
      expect(desc.writable).to.be.undefined;
    });

    it('Get should be a function', () => {
      expect(typeof desc.get).to.eq('function');
    });

    it('Set should be a function', () => {
      expect(typeof desc.set).to.eq('function');
    });
  });

  describe('Default', () => {
    describe('Prop value should default to prototype value', () => {
      it('undefined', () => {
        class C {
          @SubjectSetter('')
          public p: any;
        }

        expect(new C().p).to.be.undefined;
      });

      it('set', () => {
        class C {
          @SubjectSetter('')
          @Proto('foo')
          public p: any;
        }

        expect(new C().p).to.be.eq('foo');
      });
    });
  });

  it('Should set default value', () => {
    class C {
      @SubjectSetter('', {default: 'bar'})
      public prop: string;
    }

    expect(new C().prop).to.eq('bar');
  });

  describe('Should set descriptor', () => {
    let desc: PropertyDescriptor;

    before('init descriptor', () => {
      class C {
        @SubjectSetter('x', {desc: {configurable: false, enumerable: false}})
        public prop: any;
      }

      desc = <PropertyDescriptor>Object.getOwnPropertyDescriptor(C.prototype, 'prop');
    });

    it('Should not be configurable', () => {
      expect(desc.configurable).to.be.false;
    });

    it('Should not be enumerable', () => {
      expect(desc.enumerable).to.be.false;
    });

    it('Writable should be undefined', () => {
      expect(desc.writable).to.be.undefined;
    });

    it('Get should be a function', () => {
      expect(typeof desc.get).to.eq('function');
    });

    it('Set should be a function', () => {
      expect(typeof desc.set).to.eq('function');
    });
  });

  describe('Functionality', () => {
    interface Mock {
      prop: string;
      sbj: Sbj<string>;
    }

    let mock: Mock;

    beforeEach('reset mock', () => {
      @NgxDecorate()
      class M implements Mock {
        @SubjectSetter('sbj', {default: 'bar'})
        public prop: string;

        public sbj: Sbj<string> = mkSbj();
      }

      mock = new M();
      mock['ngOnInit']();
    });

    it('Initial subject value should be "bar"', () => {
      expect(mock.sbj.value).to.eq('bar');
    });

    it('New value should be "qux"', () => {
      mock.prop = 'qux';
      expect(mock.prop).to.eq('qux', 'Property');
      expect(mock.sbj.value).to.eq('qux', 'Subject');
    });
  });
});
