import {expect} from 'chai';
import {NgxDecorate} from '../src';

describe('NgxDecorate', () => {
  it('Should define a ngOnDestroy', () => {
    @NgxDecorate()
    class C {
    }

    new C()['ngOnDestroy']();
  });

  it('Should call existing ngOnDestroy', () => {
    @NgxDecorate()
    class C {
      public calls = 0;

      public ngOnDestroy() {
        this.calls++;
      }
    }

    const c = new C();
    c.ngOnDestroy();
    expect(c.calls).to.eq(1);
  });

  it('Should call existing ngOnInit', () => {
    @NgxDecorate()
    class C {
      public calls = 0;

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

      public ngOnDestroy() {
        this.c1Calls++;
      }
    }

    @NgxDecorate()
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

    @NgxDecorate()
    class C2 extends C1 {

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
