import {HookFn} from '../type/HookFn';
import {MockDestroyable, MockInitable} from '../type/Mocks';
import {defineImmutable} from './defineProp';
import {Lifecycle, LifecycleAbridged, toAbridged} from './Lifecycle';
import {_hookMgr} from './symbols';

/** @internal */
function ngOnDestroy(): void {
  //mock
}

/** @internal */
function ngOnInit(): void {
  // mock
}

/** @internal */
export class HookManager {

  private readonly origDestroy: () => void;

  private readonly origInit: () => void;

  private readonly postDestroys: Set<HookFn> = new Set<HookFn>();

  private readonly postInits: Set<HookFn> = new Set<HookFn>();

  private readonly preDestroys: Set<HookFn> = new Set<HookFn>();

  private readonly preInits: Set<HookFn> = new Set<HookFn>();

  private constructor(private readonly proto: MockInitable & MockDestroyable) {
    this.origInit = proto.ngOnInit || ngOnInit;
    this.origDestroy = proto.ngOnDestroy || ngOnDestroy;
  }

  private get newDestroy(): () => void {
    const value = this.newFn(this.preDestroys, this.postDestroys, this.origDestroy);
    defineImmutable(this, 'newDestroy', value);

    return value;
  }

  private get newInit(): () => void {
    const value = this.newFn(this.preInits, this.postInits, this.origInit);
    defineImmutable(this, 'newInit', value);

    return value;
  }

  public static for(proto: any): HookManager {
    if (!proto[_hookMgr]) {
      defineImmutable(proto, _hookMgr, new HookManager(proto));
    }

    return proto[_hookMgr];
  }

  public add(lifecycle: Lifecycle, hookFn: HookFn): void {
    this.hooks(lifecycle).add(hookFn);
    const type = toAbridged(lifecycle);

    if (type === LifecycleAbridged.DESTROY) {
      this.proto.ngOnDestroy = this.preDestroys.size || this.postDestroys.size ? this.newDestroy : this.origDestroy;
    } else {
      this.proto.ngOnInit = this.preInits.size || this.postInits.size ? this.newInit : this.origInit;
    }
  }

  private hooks(lifecycle: Lifecycle): Set<HookFn> {
    switch (lifecycle) {
      case Lifecycle.PRE_INIT:
        return this.preInits;
      case Lifecycle.PRE_DESTROY:
        return this.preDestroys;
      case Lifecycle.POST_INIT:
        return this.postInits;
      default:
        return this.postDestroys;
    }
  }

  private newFn(pres: Set<HookFn>, posts: Set<HookFn>, orig: Function): () => void {
    const value = function (this: any): void {
      try {
        for (const fn of pres) {
          fn(this);
        }
        orig.apply(this, arguments);
      } finally {
        for (const fn of posts) {
          fn(this);
        }
      }
    };

    return value;
  }
}

defineImmutable(HookManager.prototype, Symbol.toStringTag, 'HookManager');
