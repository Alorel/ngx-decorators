import {expect} from 'chai';
import {TrackDestroyed, TrackInit} from '../src';

describe('NgxDecorators (common)', () => {
  it('Should define a ngOnDestroy if required', () => {
    class C {
      @TrackDestroyed()
      public foo: any;
    }

    new C()['ngOnDestroy']();
  });

  it('Should not define ngOnDestroy if not required', () => {
    class C {
      @TrackInit()
      public foo: any;
    }

    expect(() => new C()['ngOnDestroy']()).to.throw;
  });

  it('Should call existing ngOnDestroy', () => {
    class C {
      public calls = 0;

      @TrackDestroyed()
      public foo: any;

      public ngOnDestroy() {
        this.calls++;
      }
    }

    const c = new C();
    c.ngOnDestroy();
    expect(c.calls).to.eq(1);
  });

  it('Should call existing ngOnInit', () => {
    class C {
      public calls = 0;

      @TrackInit()
      public foo: any;

      public ngOnInit() {
        this.calls++;
      }
    }

    const c = new C();
    c.ngOnInit();
    expect(c.calls).to.eq(1);
  });

  it('Should call super ngOnDestroy', () => {
    class C1 {
      public c1Calls = 0;

      @TrackDestroyed()
      public foo: any;

      public ngOnDestroy() {
        this.c1Calls++;
      }
    }

    class C2 extends C1 {
    }

    const c = new C2();
    c.ngOnDestroy();
    expect(c.c1Calls).to.eq(1);
  });

  it('Should call extended ngOnDestroy', () => {
    class C1 {
      public c1Calls = 0;

      public ngOnDestroy() {
        this.c1Calls++;
      }
    }

    class C2 extends C1 {
      @TrackDestroyed()
      public foo: any;

      public ngOnDestroy() {
        super.ngOnDestroy();
        this.c1Calls++;
      }
    }

    const c = new C2();
    c.ngOnDestroy();
    expect(c.c1Calls).to.eq(2);
  });
});
