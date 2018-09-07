import {expect} from 'chai';
import {Proto} from 'typescript-proto-decorator';
import {CdrProp} from '../src/CdrProp';
import {MockCdr} from '../src/type/Mocks';

describe('CdrProp', () => {
  interface Cdr extends MockCdr {
    calls: number;
  }

  interface HasCdr {
    cdr: Cdr;
    prop: any;
  }

  function mkCdr(): Cdr {
    return {
      calls: 0,
      detectChanges() {
        this.calls++;
      }
    };
  }

  describe('Descriptor', () => {
    describe('Default', () => {
      let desc: PropertyDescriptor;

      before('init desc', () => {
        class C {
          @CdrProp('foo')
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

    describe('Overridden', () => {
      let desc: PropertyDescriptor;

      before('init', () => {
        class C {
          @CdrProp('foo', {desc: {enumerable: false}})
          public prop: any;
        }

        desc = <PropertyDescriptor>Object.getOwnPropertyDescriptor(C.prototype, 'prop');
      });

      it('Should be configurable', () => {
        expect(desc.configurable).to.be.true;
      });

      it('Should NOT be enumerable', () => {
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
  });

  describe('Default', () => {
    describe('Prop value should default to prototype value', () => {
      it('undefined', () => {
        class C {
          @CdrProp('')
          public p: any;
        }

        expect(new C().p).to.be.undefined;
      });

      it('set', () => {
        class C {
          @CdrProp('')
          @Proto('foo')
          public p: any;
        }

        expect(new C().p).to.be.eq('foo');
      });
    });
  });

  describe('Functionality', () => {
    describe('No destroyed checks', () => {
      let o: HasCdr;

      before('init', () => {
        class C implements HasCdr {
          public cdr: Cdr = mkCdr();
          @CdrProp('cdr')
          @Proto('foo')
          public prop: any;
        }

        o = new C();
      });

      it('Prop should be foo initially', () => {
        expect(o.prop).to.eq('foo');
      });

      it('Calls should be 0', () => {
        expect(o.cdr.calls).to.eq(0);
      });

      it('Calls should increment to 1', () => {
        o.prop = 'bar';
        expect(o.cdr.calls).to.eq(1);
      });

      it('Prop should now be bar', () => {
        expect(o.prop).to.eq('bar');
      });

      it('Calls should increment futher', () => {
        o.prop = 'x';
        expect(o.cdr.calls).to.eq(2);
      });
    });

    describe('With destroyed checks', () => {
      let o: HasCdr & { destroyed: boolean };

      before('init', () => {
        class C implements HasCdr {
          public cdr: Cdr = mkCdr();
          @Proto(false)
          public destroyed: boolean;
          @CdrProp('cdr', {destroyed: 'destroyed'})
          @Proto('foo')
          public prop: any;
        }

        o = new C();
      });

      it('Should increment normally if not destroyed', () => {
        expect(o.cdr.calls).to.eq(0, 'Initial is not 0');
        o.prop = 'x';
        expect(o.cdr.calls).to.eq(1, 'Incremented is not 1');
      });

      it('Shuld not increment if destroyed', () => {
        o.destroyed = true;
        o.prop = 'y';
        expect(o.cdr.calls).to.eq(1);
      });
    });
  });
});
