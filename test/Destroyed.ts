import {expect} from 'chai';
import {Proto} from 'typescript-proto-decorator';
import {NgxDecorate, TrackDestroyed} from '../src';

describe('Destroyed', () => {
  interface Mock {
    destroyed: boolean;

    ngOnDestroy(): void;
  }

  let mock: Mock;

  beforeEach('init', () => {
    @NgxDecorate()
    class C implements Mock {
      @TrackDestroyed()
      @Proto(false)
      public destroyed: boolean;

      public ngOnDestroy(): void {
        //noop
      }
    }

    mock = new C();
  });

  it('Property should be untouched initially', () => {
    expect(mock.destroyed).to.be.false;
  });

  it('Should set property to true once destroyed', () => {
    mock.ngOnDestroy();
    expect(mock.destroyed).to.be.true;
  });
});
