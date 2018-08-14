import {expect} from 'chai';
import {Proto} from 'typescript-proto-decorator';
import {NgxDecorate, TrackInit} from '../src';

describe('Init', () => {
  interface Mock {
    init: boolean;

    ngOnInit(): void;
  }

  let mock: Mock;

  beforeEach('init', () => {
    @NgxDecorate()
    class C implements Mock {
      @TrackInit()
      @Proto(false)
      public init: boolean;

      public ngOnInit(): void {
        //noop
      }
    }

    mock = new C();
  });

  it('Property should be untouched initially', () => {
    expect(mock.init).to.be.false;
  });

  it('Should set property to true once initialised', () => {
    mock.ngOnInit();
    expect(mock.init).to.be.true;
  });
});
